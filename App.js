import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/'

import configureStore from './src/redux/store'

const store = configureStore()

export default function App() {
  return (
    <Provider store = { store }>
      <Navigation />
    </Provider>
  );
}