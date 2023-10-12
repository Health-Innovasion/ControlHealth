import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerInitiate } from '../../redux/action/action'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Register.css'
import logo from '../../Assets/Images/logo.png'
import Modal from 'react-modal'
import { Tab, Tabs } from 'react-bootstrap'
import FormUser from '../../Components/UserRegister/UserRegister'
import ModalAlert from '../../Components/ModalAlert/ModalAlert'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Configura react-modal
Modal.setAppElement('#root')

const Register = () => {
  const state = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    file: '',
  }

  const [selectedFile, setSelectedFile] = useState(null)

  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const history = useHistory()
  const [isLoadingRegister, setisLoadingRegister] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [tabs, setTabs] = useState(null)

  const required = 'Campo requerido'
  const passInvalid = 'La contraseña debe tener al menos 6 caracteres'

  const formik = useFormik({
    initialValues: state,
    validationSchema: Yup.object({
      name: Yup.string()
        .required(required)
        .matches(/^[a-zA-Z]+$/, 'El nombre solo debe contener letras')
        .nullable(),
      lastName: Yup.string()
        .required(required)
        .matches(/^[a-zA-Z]+$/, 'El apellido solo debe contener letras')
        .nullable(),
      email: Yup.string()
        .required(required)
        .email('Ingrese una dirección de correo electrónico válida')
        .nullable(),
      password: Yup.string().required(required).min(6, passInvalid).nullable(),
      passwordConfirm: Yup.string()
        .required('Debe confirmar la contraseña')
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .min(6, passInvalid)
        .nullable(),
      file: Yup.string().nullable(),
    }),

    validate: () => {
      const errors = {}

      if (tabs === 'doctor' && !selectedFile) {
        errors.file = 'Código de MINSA requerido'
      }

      return errors
    },
    onSubmit: (values) => {
      handleSubmit(values)
    },
  })

  const handleSubmit = async (values) => {
    const { name, lastName, email, password } = values

    dispatch(
      registerInitiate(
        name,
        lastName,
        email,
        password,
        selectedFile,
        setModalOpen,
        formik.resetForm,
        setSelectedFile,
        setisLoadingRegister
      ),
    )
    openModal()
  }

  useEffect(() => {
    if (currentUser) {
      history.push('/') // Redirige a la página de inicio si el usuario está autenticado
    }
  }, [currentUser, history])

  const openModal = () => {
    setisLoadingRegister(true)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
    formik.errors.file = ''
  }

  useEffect(() => {
    formik.resetForm()
  }, [tabs])

  return (
    <div className="register-container ">

      <div className="box">
        <img src={logo} alt="Logo" className="register-logo" />
        <Tabs
          defaultActiveKey="patient"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(key) => setTabs(key)}
        >
          <Tab eventKey="patient" title="Paciente">
            <FormUser
              isDoctor={false}
              handleFileChange={handleFileChange}
              isLoadingRegister={isLoadingRegister}
              formik={formik}
            />
          </Tab>
          <Tab eventKey="doctor" title="Doctor">
            <FormUser
              isDoctor={true}
              handleFileChange={handleFileChange}
              selectedFile={selectedFile}
              isLoadingRegister={isLoadingRegister}
              formik={formik}
            />
          </Tab>
        </Tabs>

        <p className="register-text">¿Ya tienes una cuenta?</p>
        <Link to="/login" className="register-link">
          Login
        </Link>
      </div>
      <ModalAlert
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title={'Alerta'}
        message={'Se envió la solicitud y se realizará validación del código'}
      />
    </div>
  )
}

export default Register
