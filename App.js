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