import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';
import Header from './Header';
import LinkList from './LinkList';
import CreateLink from './CreateLink';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="">
          <Switch>
            <Route exact path="/" component={LinkList}/>
            <Route exact path="/create" component={CreateLink}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
