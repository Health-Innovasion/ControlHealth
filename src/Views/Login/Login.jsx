import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginInitiate } from "../../redux/action/action";
import { useHistory } from "react-router-dom";
import './Login.css';
import logo from '../../Assets/Images/logo.png';
import Modal from 'react-modal';
import { FaSpinner } from 'react-icons/fa'; // Icono de carga

// Configura react-modal
Modal.setAppElement('#root');

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const dispatch = useDispatch();

  const { currentUser} = useSelector((state) => state.user);
  
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    dispatch(loginInitiate(email, password));
    openModal(); // Abre el modal cuando el inicio de sesión es exitoso
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="login-container">
      <div className="box">
        <img src={logo} alt="Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <div className="input">
              <label htmlFor="email"></label>
              <input
                type="email"
                className="login-form-control"
                placeholder="Email"
                onChange={handleChange}
                id="email"
                value={email}
                name="email"
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password"></label>
              <input
                type="password"
                className="login-form-control"
                placeholder="Password"
                onChange={handleChange}
                id="password"
                value={password}
                name="password"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Iniciar Sesión
          </button>
        </form>
        <p className="text">¿No estás registrado aún?</p>
        <Link to="/register" className="Registro-Text">
          Regístrate
        </Link>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Inicio Exitoso"
        className="custom-modal-login"
        overlayClassName="custom-modal-overlay-login"
      >
        <div className="modal-content">
              <div className="loading-icon">
                <FaSpinner className="spinner" /> {/* Icono de carga */}
              </div>
              <p>Iniciando sesión...</p>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
