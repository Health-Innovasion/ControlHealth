import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginInitiate } from '../../redux/action/action'
import { useHistory } from 'react-router-dom'
import './Login.css'
import logo from '../../Assets/Images/logo.png'
import Modal from 'react-modal'
import { FaSpinner } from 'react-icons/fa' // Icono de carga
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SweetAlertComponent from '../../Components/Alerts/alerts'

// Configura react-modal
Modal.setAppElement('#root')

const Login = () => {
  const state = {
    email: '',
    password: '',
  }

  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.user)

  const history = useHistory()
  const [isLodingLogin, setIsLodingLogin] = useState(false)

  const required = 'Campo requerido'

  const formik = useFormik({
    initialValues: state,
    validationSchema: Yup.object({
      email: Yup.string()
        .required(required)
        .email('Ingrese una dirección de correo electrónico válida')
        .nullable(),
      password: Yup.string().required(required).nullable(),
    }),

    validate: () => {
      const errors = {}

      return errors
    },
    onSubmit: (values) => {
      handleSubmit(values)
    },
  })

  const handleSubmit = (values) => {
    const { email, password } = values

    setIsLodingLogin(true)
    dispatch(
      loginInitiate(
        email,
        password,
        setIsLodingLogin,
        SweetAlertComponent.showSuccessAlert,
      ),
    )
  }

  useEffect(() => {
    if (currentUser) {
      history.push('/')
    }
  }, [currentUser, history])

  return (
    <div className="login-container">
      <div className="box">
        <img src={logo} alt="Logo" className="login-logo" />
        <form onSubmit={formik.handleSubmit}>
          <div className="login-form-group">
            <div className="input">
              <label htmlFor="email"></label>
              <input
                type="email"
                className={`login-form-control ${
                  formik.touched.email && formik.errors.email
                    ? 'input-invalid'
                    : ''
                }`}
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                value={formik.values.email}
                name="email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-invalid">
                  <strong>{formik.errors.email}</strong>
                </div>
              )}
            </div>
            <div className="login-form-group">
              <label htmlFor="password"></label>
              <input
                type="password"
                className={`login-form-control ${
                  formik.touched.password && formik.errors.password
                    ? 'input-invalid'
                    : ''
                }`}
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="password"
                value={formik.values.password}
                name="password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-invalid">
                  <strong>{formik.errors.password}</strong>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isLodingLogin ? (
              <FaSpinner className="spinner" />
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>
        <p className="text">¿No estás registrado aún?</p>
        <Link to="/register" className="Registro-Text">
          Regístrate
        </Link>
      </div>
    </div>
  )
}

export default Login
