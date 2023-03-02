import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login/Login";
import Register from "./components/register";
import {authenticationService} from "./services/authentication.service";
import Header from "./components/header";
import Profile from "./components/profile";
import News from "./components/news";
import {Admin} from "./components/admin";
import About from "./components/about";
import Contact from "./components/contact";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();

  useEffect(() => {
    authenticationService.currentUser.subscribe((user) => setCurrentUser(user));
  }, [currentUser]);

  return (
      <Router history={history}>
        <div>
          <Header currentUser={currentUser} />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/news" component={News} />
            <Route path="/admin" component={Admin} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
