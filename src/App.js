import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Views/Home/Home';
import Quotes from './Views/Quotes/Quotes';
import Diet from './Views/Diet/Diet';
import Medication from './Views/Medication/Medication';
import Routines from './Views/Routines/Routines';
import Login from './Views/Login/Login';
import HomeDr from './Views/HomeDr/HomeDr';
import Register from './Views/Register/Register';
import Profile from './Views/Profile/Profile';
import Navbar from './Components/NavBar/Navbar';
import ProtectedRoute from './Utils/ProtectedRoute';
import Admin from './Views/Admin/Admin';
import { useSelector } from 'react-redux';
import { typeUsers } from './Utils/constants';
import ScreenChat from './Views/ScreenChat/ScreenChat';
import ProtectedRouteMedico from './Utils/ProtectedRouteMedico';
import CitasDr from './Views/CitasDr/CitasDr';
import Admindoctors from './Views/Admin_doctors/Admindoctors';
import HomeAdmin from './Views/HomeAdmin/HomeAdmin';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser) //ver el usuario en estado 
  const isAdmin = currentUser?.typeUser === typeUsers.admin; // verificar si es admin 

  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />

        {/* Admin Routes */}
        {isAdmin && (
          <Switch>
            <Route path="/" component={Admindoctors} />
            <Route path="/admin" component={Admin} />
            <Route path="/homeadmin" component={HomeAdmin} />
          </Switch>
        )}

        {/* doc Routes */}
        {currentUser && currentUser?.typeUser === typeUsers.doctor && (
          <Switch>
            <ProtectedRouteMedico path="/citasdr" component={CitasDr} />
            <ProtectedRouteMedico path="/" component={HomeDr} />
          </Switch>
        )}

        {/* User Routes */}
        {currentUser && currentUser?.typeUser !== typeUsers.doctor && (
          <React.Fragment>
            <Navbar />
            <Switch>
              <ProtectedRoute path="/citas" component={Quotes} />
              <ProtectedRoute path="/medication" component={Medication} />
              <ProtectedRoute path="/diet" component={Diet} />
              <ProtectedRoute path="/routines" component={Routines} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/chat" component={ScreenChat} />
              <ProtectedRoute path="/" component={Home} />
            </Switch>
          </React.Fragment>
        )}

        {/* Redirect to Home for unknown routes */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
