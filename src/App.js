import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Views/Home/Home';
import Quotes from './Views/Quotes/Quotes';
import Diet from './Views/Diet/Diet';
import Medication from './Views/Medication/Medication';
import Routines from './Views/Routines/Routines';
import Login from './Views/Login/Login';
import HomeDr from './Views/HomeDr/HomeDr';
import Register from './Views/Register/Register';
import Profile from './Views/Profile/Profile';
import Navbar from './Components/NavBar/Navbar'; // Importa tu barra de navegación aquí
import ProtectedRoute from './Utils/ProtectedRoute';
import Admin from './Views/Admin/Admin';
import { useSelector } from "react-redux"

function App() {

  const { currentUser } = useSelector(state => state.user);
  return (
    <Router>
      <Switch>
        {/* Las rutas Login y Register no tendrán la barra de navegación */}
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />

        {currentUser?.tipo === 'medico' ? (
          // Si es un médico, muestra las rutas específicas para médicos
          <Route path="/" component={HomeDr} />
        ) : (
          // Si no es un médico (es un paciente), muestra las rutas específicas para pacientes
          <Route>
            <Navbar />
            <Switch>
              <ProtectedRoute path="/citas" component={Quotes} />
              <ProtectedRoute path="/medication" component={Medication} />
              <ProtectedRoute path="/diet" component={Diet} />
              <ProtectedRoute path="/routines" component={Routines} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/" component={Home} />
            </Switch>
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
