import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Views/Home/Home'
import Quotes from './Views/Quotes/Quotes'
import Diet from './Views/Diet/Diet'
import Medication from './Views/Medication/Medication'
import Routines from './Views/Routines/Routines'
import Login from './Views/Login/Login'
import HomeDr from './Views/HomeDr/HomeDr'
import Register from './Views/Register/Register'
import Profile from './Views/Profile/Profile'
import Navbar from './Components/NavBar/Navbar'
import ProtectedRoute from './Utils/ProtectedRoute'
import Admin from './Views/Admin/Admin'
import { useSelector } from 'react-redux'
import { typeUsers } from './Utils/constants'
import ScreenChat from './Views/ScreenChat/ScreenChat'
import ProtectedRouteMedico from './Utils/ProtectedRouteMedico'
import CitasDr from './Views/CitasDr/CitasDr'
import Admindoctors from './Views/Admin_doctors/Admindoctors'

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/admindoctors" component={Admindoctors} />

        {currentUser && currentUser?.typeUser === typeUsers.doctor ? (
          <React.Fragment>
            <Switch>
              <ProtectedRouteMedico path="/citasdr" component={CitasDr} />
              <ProtectedRouteMedico path="/" component={HomeDr} />
            </Switch>
          </React.Fragment>
        ) : (
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
      </Switch>
    </Router>
  );
}

export default App;
