import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import './App.css';
import Assets from './features/Assets';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Route path="/" exact component={Assets}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
