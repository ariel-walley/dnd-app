import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 50px;
  padding: 10px;
  background-color: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: white;
  font-size: 40px;
  font-weight: 700;
`;

const NavButton = styled.button`
  width: 150px;
  height: 35px;
  margin: 10px;
  background-color: pink;
  border: 0px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
`;

class Header extends React.Component {
  render() {
    return (
      <NavBar>
        <Link to={'/dm/start'}><NavButton>Start</NavButton></Link>
        <Link to={'/dm/send'}><NavButton>Send Content</NavButton></Link>
        <Link to={'/dm/history'}><NavButton>History</NavButton></Link>
        <Link to={'/dm/imitate'}><NavButton>Imitate Player</NavButton></Link>
      </NavBar>
    )
  }
}

export default Header;