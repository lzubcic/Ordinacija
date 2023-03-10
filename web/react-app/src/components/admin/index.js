import { Route, Switch, useRouteMatch } from "react-router-dom";
import Appointments from "./appointments";
import CreateNews from "./news/CreateNews";
import Users from "./users";

export const Admin = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/addNews`} component={CreateNews} />
      <Route path={`${match.path}/users`} component={Users} />
      <Route path={`${match.path}/appointments`} component={Appointments} />
    </Switch>
  );
};
