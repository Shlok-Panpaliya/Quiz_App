import React from "react";
import Quiz from "./components/Quiz";
import QuizSummary from "./components/Summary";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Quiz} />
          <Route exact path="/summary" component={QuizSummary} />
        </Switch>
      
    </Router>
  );
};

export default App;
