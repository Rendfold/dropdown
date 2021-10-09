import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Select } from './components';
import { fakeApi } from '@lib/index';

function App() {
  return (
    <div className="App">
      <div style={{ width: '30%' }}>
        <span>Select:</span>
        <Select endpoint="hello" />
      </div>
    </div>
  );
}

export default App;
