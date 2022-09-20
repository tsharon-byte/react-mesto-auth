import { useEffect, useState } from "react";
import Header from "./Header";
import { auth } from "../utils/api";
import NewCurrentUserContext from "../contexts/NewCurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import InfoTooltip from "./InfoTooltip";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const history = useHistory();
  const [newCurrentUser, setNewCurrentUser] = useState({});
  const [success, setSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getMe(jwt)
        .then(({ data }) => {
          setLoggedIn(true);
          setNewCurrentUser({ email: data.email });
        })
        .catch((err) => {
          console.log("User JWT has expired, please log in", err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleNotificationPopupClosed = () => {
    setNotificationOpen(false);
    if (loggedIn) {
      history.push("/react-mesto-auth/");
    }
  };

  return (
    <NewCurrentUserContext.Provider value={newCurrentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route path="/react-mesto-auth/sign-up">
            <Register
              setSuccess={setSuccess}
              setNotificationOpen={setNotificationOpen}
              setLoggedIn={setLoggedIn}
              setNewCurrentUser={setNewCurrentUser}
            />
          </Route>
          <Route path="/react-mesto-auth/sign-in">
            <Login
              setSuccess={setSuccess}
              setLoggedIn={setLoggedIn}
              setNotificationOpen={setNotificationOpen}
              setNewCurrentUser={setNewCurrentUser}
            />
          </Route>
          <ProtectedRoute
            component={Home}
            path="/react-mesto-auth/"
            loggedIn={loggedIn}
          />
        </Switch>
        <InfoTooltip
          success={success}
          isOpen={isNotificationOpen}
          onClose={handleNotificationPopupClosed}
        />
      </div>
    </NewCurrentUserContext.Provider>
  );
}

export default App;
