import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';

import Landing from '../Landing/Landing'
import Footer from '../Footer/Footer'
import Article from '../Article/Article'
import Create from '../Article/Create'
import Edit from '../Article/Edit';

// import Login from '../Login/Login'
import Home from '../Home/Home'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:articleId" component={Article} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/edit/:articleId" component={Edit} />
      <Footer />
    </div>
  );
}

export default App;
