import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Button,
  InputContainer,
  Input,
  List,
  Name,
  Users,
  Peak,
  Card,
  QueryOption,
} from './styles';

const App = () => {
  const [data, setData] = useState([]);
  const [option, setOption] = useState('current');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [sortOption, setSortOption] = useState(option);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCurrent, setManualCurrent] = useState('');
  const [manualPeak, setManualPeak] = useState('');

  useEffect(() => {
    fetchData();
  }, [option, fromValue, toValue, sortOption, showManualInput]);

  const handleOptionChange = (selectedOption) => {
    setOption(selectedOption);
    setSortOption(selectedOption);

    if (selectedOption === 'current' || selectedOption === 'peak') {
      setFromValue('');
      setToValue('');
      setShowManualInput(false);
    }
  };

  const handleManualInputButtonClick = () => {
    setFromValue('');
    setToValue('');
    setShowManualInput(true);
  }

  const handleInputChange = (field, value) => {
    if (field === 'from') {
      setFromValue(value);
    } else {
      setToValue(value);
    }
  };

  const handleManualInputChange = (field, value) => {
    switch (field) {
      case 'name':
        setManualName(value);
        break;
      case 'current':
        setManualCurrent(value);
        break;
      case 'peak':
        setManualPeak(value);
        break;
      default:
        break;
    }
  };

  const handleManualSubmit = async () => {
    if (manualName && manualCurrent && manualPeak) {
      try {
        const response = await fetch('http://localhost:3001/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: manualName,
            current: manualCurrent,
            peak: manualPeak,
          }),
        });

        const result = await response.json();
        console.log(result);

        setManualName('');
        setManualCurrent('');
        setManualPeak('');
        setShowManualInput(false);

        fetchData();
      } catch (error) {
        console.error('Error adding manual data:', error);
      }
    } else {
      console.error('Invalid input for manual data');
    }
  };

  const fetchData = async () => {
    let url = 'http://localhost:3001/crawl';

    if (option === 'current' || option === 'peak') {
      url += `?option=${option}&from=${fromValue}&to=${toValue}`;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();

      const sortedData = result.sort((a, b) => {
        return b[sortOption] - a[sortOption];
      });

      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = () => {
    if (option === 'current') {
      return data.filter((item) => item.current >= fromValue && item.current <= toValue);
    }
    else
    {
      return data.filter((item) => item.peak >= fromValue && item.peak <= toValue);
    }
    return data;
  };

  return (
    <Container>
      <Heading>Find Trending Games!</Heading>

      <div>
        <Button onClick={() => handleOptionChange('current')}>Query with Current Player</Button>
        <Button onClick={() => handleOptionChange('peak')}>Query with Peak Player</Button>
        <Button onClick={() => handleManualInputButtonClick()}>Add data Manually</Button>
      </div>

      {!showManualInput && (
        <QueryOption>
          <p>Current Query Option: {sortOption === 'current' ? 'Sort by Current Player' : 'Sort by Peak Player'}</p>
        </QueryOption>
      )}

      {!showManualInput && (option === 'current' || option === 'peak') && (
        <InputContainer>
          <label>From: </label>
          <Input type="number" value={fromValue} onChange={(e) => handleInputChange('from', e.target.value)} />
          <label>To: </label>
          <Input type="number" value={toValue} onChange={(e) => handleInputChange('to', e.target.value)} />
        </InputContainer>
      )}

      {showManualInput && (
        <div>
          <InputContainer>
            <label>Name: </label>
            <Input value={manualName} onChange={(e) => handleManualInputChange('name', e.target.value)} />
          </InputContainer>
          <InputContainer>
            <label>Current Players: </label>
            <Input
              type="number"
              value={manualCurrent}
              onChange={(e) => handleManualInputChange('current', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label>Peak Players: </label>
            <Input type="number" value={manualPeak} onChange={(e) => handleManualInputChange('peak', e.target.value)} />
          </InputContainer>
          <Button onClick={handleManualSubmit}>Submit Manual Data</Button>
        </div>
      )}

      <List>
        {filterData().map((item) => (
          <Card key={item.id}>
            <Name>{`Game Name: ${item.name}`}</Name>
            <Users>{`Current Users: ${item.current}`}</Users>
            <Peak>{`Monthly Peak Users: ${item.peak}`}</Peak>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default App;