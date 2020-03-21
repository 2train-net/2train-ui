import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const TempComponent = () => <h1>Hello World</h1>;

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={TempComponent} />
        <Route path="/completed" component={TempComponent} />
      </div>
    </Router>
  );
};

export default App;
