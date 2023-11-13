import React, { useState, useEffect } from 'react'
import './Form.css' // Asegúrate de que este archivo contenga tus estilos CSS
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io' // Importa el ícono IoIosCloseCircle
import { GetDoctors } from '../../redux/action/DoctorAction'
import { combineData, createAppointment } from '../../redux/action/action'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { onlyLetters, regexOnlyLetters, required } from '../../Utils/constants'
import { InputField } from '../../Utils/functions'
import { FaSpinner } from 'react-icons/fa'

const FormQuotes = () => {
  const dispatch = useDispatch()
  const { doctors } = useSelector((state) => state.doctors)
  const { currentUser } = useSelector((state) => state.user)

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const infoForm = {
    name: '',
    date: '',
    time: '',
    dni: '',
    numberPhone: '',
    typeDiabetes: '',
    description: '',
    doctor: '',
  }

  const formik = useFormik({
    initialValues: infoForm,
    validationSchema: Yup.object({
      name: Yup.string()
        .required(required)
        .matches(regexOnlyLetters, onlyLetters)
        .nullable(),
      date: Yup.string().required(required).nullable(),
      time: Yup.string().required(required).nullable(),
      dni: Yup.string()
        .required(required)
        .matches(/^\d{3}-\d{6}-\d{4}[A-Za-z]$/, 'Cédula inválida')
        .nullable(),
      numberPhone: Yup.string()
        .required(required)
        .matches(/^[2578]\d{7}$/, 'Número inválido')
        .nullable(),
      typeDiabetes: Yup.string().required(required).nullable(),
      description: Yup.string().required(required).nullable(),
      doctor: Yup.string().required(required).nullable(),
    }),

    validate: () => {
      const errors = {}

      return errors
    },
    onSubmit: (values) => {
      values.doctor = JSON.parse(formik.values.doctor)
      handleSubmit(values)
    },
  })

  useEffect(() => {
    dispatch(GetDoctors())
  }, [dispatch])

  const openFormModal = () => {
    setIsFormModalOpen(true)
  }

  const closeFormModal = () => {
    setIsFormModalOpen(false)
  }

  const handleSubmit = async (values) => {
    setIsLoadingCreate(true)
    const data = combineData(values, currentUser.uid)

    await createAppointment(
      data,
      setIsLoadingCreate,
      setIsFormModalOpen,
      formik.resetForm,
    )
  }

  const handleDNICheck = (event) => {
    const value = event.target.value
    let formattedValue = value.replace(/[^0-9A-Za-z]/g, '')
    let formattedDNI = ''

    for (let i = 0; i < formattedValue.length; i++) {
      if (i === 3 || i === 9) {
        formattedDNI += '-'
      }
      formattedDNI += formattedValue[i]
    }

    formik.setFieldValue('dni', formattedDNI)
  }

  const formFields = [
    {
      id: 'nombre',
      type: 'text',
      placeholder: 'Nombre',
      name: 'name',
    },
    {
      id: 'cédula',
      type: 'text',
      placeholder: 'Cédula',
      name: 'dni',
    },
    {
      id: 'fecha',
      type: 'date',
      placeholder: 'Fecha',
      name: 'date',
    },
    {
      id: 'hora',
      type: 'time',
      placeholder: 'Hora',
      name: 'time',
    },
    {
      id: 'teléfono',
      type: 'number',
      placeholder: 'Teléfono',
      name: 'numberPhone',
    },
    {
      id: 'tipo',
      type: 'select',
      placeholder: 'Seleccione tipo de diabetes',
      name: 'typeDiabetes',
      options: [
        { value: 'Tipo 1', label: 'Tipo 1' },
        { value: 'Tipo 2', label: 'Tipo 2' },
        { value: 'Otro', label: 'Otro' },
      ],
    },
    {
      id: 'doctor',
      type: 'select',
      placeholder: 'Seleccione médico',
      name: 'doctor',
      options: doctors?.map((doc) => ({
        value: JSON.stringify(doc),
        label: doc.userName,
      })),
    },
    {
      id: 'descripción',
      type: 'textarea',
      placeholder: 'Descripción',
      name: 'description',
    },
  ]

  return (
    <Container className="formquotes-container">
      <h1 className="formquotes-title">Citas</h1>
      <IoIosAddCircle className="formquotes-icon-add" onClick={openFormModal} />
      <Modal
        className="formquotes-modal-container"
        show={isFormModalOpen}
        onHide={closeFormModal}
        scrollable
      >
        <Modal.Header className="formquotes-modal-header">
          <Modal.Title className="formquotes-modal-title">
            Agendar cita
          </Modal.Title>
          <IoIosCloseCircle
            className="formquotes-close-icon"
            onClick={closeFormModal}
          />
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="formquotes-modal-body"
          >
            <Row>
              <Col>
                {formFields.map((field) => (
                  <div key={field.id}> 
                    {field.type === 'time' || field.type === 'date' ? (
                      <div style={{ textAlign: 'justify' }}>
                        <label>{field.placeholder}:</label>
                        <InputField
                          key={field.id} 
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formik.values[field.name]}
                          name={field.name}
                          handleChange={formik.handleChange}
                          handleBlur={formik.handleBlur}
                          touched={formik.touched[field.name]}
                          error={formik.errors[field.name]}
                          options={field.options}
                          autoComplete="current-password" 
                        />
                      </div>
                    ) : (
                      <InputField
                        key={field.id} 
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formik.values[field.name]}
                        name={field.name}
                        handleChange={
                          field.name === 'dni'
                            ? handleDNICheck
                            : formik.handleChange
                        }
                        handleBlur={formik.handleBlur}
                        touched={formik.touched[field.name]}
                        error={formik.errors[field.name]}
                        options={field.options}
                        autoComplete="current-password" 
                      />
                    )}
                  </div>
                ))}
              </Col>

            </Row>
            <Button type="submit" className="formquotes-save-btn">
              {isLoadingCreate ? (
                <FaSpinner className="spinner"></FaSpinner>
              ) : (
                'Crear cita'
              )}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default FormQuotes
