import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login/Login";
import Register from "./components/register";
import {authenticationService} from "./services/authentication.service";
import Header from "./components/header";
import Profile from "./components/profile";
import Users from "./components/admin/users";

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
            <Route path="/users" component={Users} />
            {/*<Route path="/admin" component={Admin} />*/}
          </Switch>
        </div>
      </Router>
  );
}

export default App;
