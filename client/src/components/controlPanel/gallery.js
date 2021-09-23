import React, { useState, useEffect } from 'react';
import { Container } from '../../styles';
import styled from 'styled-components';

const UpdatedContainer = styled(Container)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledImg = styled.img`
  max-width: 100px;
  margin: 10px;
`;

export default function Gallery (props) {

  const [imgContent, setImgContent] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3100/res/${props.name}`)
    .then(raw => raw.json())
    .then((data) => {
      setImgContent(data.images);
    }).catch(err => console.error(err))
  }, []);

  const renderGallery = () => {
    let display = [];

    imgContent.forEach((img) => {
      display.push(<StyledImg src={'/images/' + img} key={img} alt={img}/>);
    })

    return display;
  }

  if (imgContent.length > 0) {
    return <UpdatedContainer>{renderGallery()}</UpdatedContainer>
  } else {
    return <p>No {props.name} found.</p>
  }

}