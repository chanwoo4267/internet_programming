import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

export const Heading = styled.h1`
  color: #333;
  text-align: center;
`;

export const Button = styled.button`
  margin: 5px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input`
  padding: 5px;
  font-size: 14px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Card = styled.div`
  margin: 10px 0;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Popularity = styled.span`
  font-weight: bold;
  color: #3498db;
  display: block; 
`;

export const Name = styled.span`
  font-size: 18px;
  margin-top: 5px; 
  display: block; 
`;

export const Users = styled.div`
  margin-top: 10px;
  color: #2ecc71;
`;

export const Peak = styled.div`
  color: #e74c3c;
`;

export const QueryOption = styled.p`
  font-size: 16px;
  color: #61dafb;
  margin: 10px 0;
`;