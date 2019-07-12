import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/';
import Loader from './src/modules/Loader';

import configureStore from './src/redux/store';

const store = configureStore()

export default function App() {
  return (
    <Provider store = { store }>
      <Navigation />
    </Provider>
  );
}
// Client Secret Norwegian: da67a39aa1e749019389feb4a88c5d18
// Client ID 8e89a7cf69914346968314d446798475
// <Loader />
// https://ml5js.org/
// https://www.tensorflow.org/js/tutorials

/*
const str = '2019.07.10.variable.food:200';

console.clear()

const objHandler = (input) => {
  const [namespace, value] = input.split(':');
  const arr = namespace.split('.').reverse()

  
  let output = {}
  
  for(let i = 0; i < arr.length; i++) {
    const v = (i+1 === arr.length) ? { ...output,[arr[0]]:value} : { ...output }
    console.log(v)
    output = {
      [arr[i]]: v
    }
  }
  
  console.log(JSON.stringify(output))
  
  return output;
}
objHandler(str)
*/