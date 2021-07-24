import React, { useState, useEffect } from 'react';
import { Container } from '../../styles';
import styled from 'styled-components';

const UpdatedContainer = styled(Container)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledImg = styled.img`
  max-width: 150px;
  margin: 10px;
`;

export default function Images (props) {

  const [imgContent, setImgContent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3100/res/imgs')
    .then(raw => raw.json())
    .then((data) => {
      setImgContent(data.images);
    }).catch(err => console.error(err))
  }, []);

  const renderGallery = () => {
    let display = [];

    imgContent.forEach((img) => {
      display.push(<StyledImg src={'/imgs/' + img} key={img} alt={img}/>);
    })

    return display;
  }

  if (imgContent.length > 0) {
    return <UpdatedContainer>{renderGallery()}</UpdatedContainer>
  } else {
    return <p>No {props.name} found.</p>
  }

}