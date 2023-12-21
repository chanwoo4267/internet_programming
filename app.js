const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

let corsOptions = {
  origin: '*',      // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
}
app.use(cors(corsOptions))
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', 
  password: 'password!',
  database: 'project'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL Error : ', err);
  } else {
    console.log('MySQL Connected!');
  }
});

const url = 'https://steamcharts.com/top';

// Function to clear all data from the table
const clearTable = () => {
  const clearQuery = 'DELETE FROM game';
  connection.query(clearQuery, (err) => {
    if (err) {
      console.error('Error clearing data from MySQL table:', err);
    } else {
      console.log('Table cleared successfully');
    }
  });
};

const fillTable = async () => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const data = [];

    $('#top-games tbody tr').each((index, element) => {
      const popularity = $(element).find('td:first-child').text().trim().replace('.', '');
      const name = $(element).find('.game-name a').text().trim();
      const currentUser = $(element).find('.num').eq(0).text().trim();
      const peakPlayers = $(element).find('.num.period-col.peak-concurrent').text().trim();

      data.push({
        popularity,
        name,
        currentUser,
        peakPlayers,
      });
    });

    // Insert data into the MySQL table
    data.forEach((item) => {
      const insertQuery = `
        INSERT INTO game (popularity, name, current, peak)
        VALUES (?, ?, ?, ?)
      `;

      const values = [item.popularity, item.name, item.currentUser, item.peakPlayers];

      connection.query(insertQuery, values, (err) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
        }
      });
    });

    console.log('Data inserted into MySQL table');
  } catch (error) {
    console.error('Error fetching and inserting data:', error);
  }
};

// Initial call to clear and fill the table
clearTable();
fillTable();

// Endpoint to send data from MySQL to React frontend
app.get('/crawl', async (req, res) => {
  try {
    const selectQuery = 'SELECT * FROM game';
    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error retrieving data from MySQL:', err);
        res.status(500).send('Error retrieving data from MySQL');
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Error sending data to frontend:', error);
    res.status(500).send('Error sending data to frontend');
  }
});

// Route to add manually entered data
app.post('/add', (req, res) => {
  const { name, current, peak } = req.body;

  // Validate the received data (add more validation as needed)
  if (!name || !current || !peak) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const insertQuery = `
    INSERT INTO game (popularity, name, current, peak)
    VALUES (?, ?, ?, ?)
  `;

  const values = [0, name, current, peak];

  // Execute the INSERT query
  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return the inserted data
    res.json({ message: 'Data added successfully', insertedData: { id: results.insertId, ...req.body } });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
