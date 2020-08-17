import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login'
import Register from './register'
import image_upload from './image_upload'
import image_private from './private_images'
import { Route, BrowserRouter as Router ,Switch , Redirect } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/home' component={App}/>
        <Route exact path='/image_upload' component={image_upload}/>
        <Route exact path='/private_image' component={image_private}/>
        <Redirect to='/home'/>
    </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);