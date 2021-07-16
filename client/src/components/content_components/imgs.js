import React from 'react';
import { Container } from '../../styles';

let imgCount = 0;

export default function Images (props) {

  console.log('running');
  fetch('http://localhost:3100/res/imgs').then(raw => raw.json()).then((data) => {
    console.log(data)
  }).catch(err => console.error(err))

  if (imgCount > 0) {
    return <Container></Container>
  } else {
    return <p>No {props.name} found.</p>
  }

}