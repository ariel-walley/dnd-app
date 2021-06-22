import React from 'react';
//import { Container } from '../../styles';
import Imgs from './imgs';
import Gifs from './gifs';
import Backgrounds from './backgrounds';
import Filters from './filters'

function VisualContent() {
  return(
    <div>
      <Imgs/>
      <Gifs/>
      <Backgrounds/>
      <Filters/>
    </div>
  )
}

export default VisualContent;