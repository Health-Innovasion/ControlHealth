import { FaSpinner } from 'react-icons/fa'
import './UserRegister.css'

const InputField = ({
  id,
  type,
  placeholder,
  value,
  name,
  handleChange,
  handleBlur,
  touched,
  error,
}) => (
  <div className="register-form-group">
    <label htmlFor={id}></label>
    <input
      type={type}
      className={`register-form-control ${
        touched && error ? 'input-invalid' : ''
      }`}
      placeholder={placeholder}
      id={id}
      value={value}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {touched && error && (
      <div className="text-invalid">
        <strong>{error}</strong>
      </div>
    )}
  </div>
)

const UserRegister = ({
  isDoctor,
  handleFileChange,
  selectedFile,
  isLoadingRegister,
  formik,
}) => {
  const formFields = [
    {
      id: 'nombre',
      type: 'text',
      placeholder: 'Nombre',
      name: 'name',
    },
    {
      id: 'apellido',
      type: 'text',
      placeholder: 'Apellido',
      name: 'lastName',
    },
    {
      id: 'email',
      type: 'email',
      placeholder: 'Email',
      name: 'email',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: 'Contraseña',
      name: 'password',
    },
    {
      id: 'password_confirm',
      type: 'password',
      placeholder: 'Confirmar contraseña',
      name: 'passwordConfirm',
    },
  ]

  return (
    <form className="form-user" onSubmit={formik.handleSubmit}>
      {formFields.map((field) => (
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
          autocomplete="current-password"
        />
      ))}

      {isDoctor && (
        <div className="register-form-group container-input-file">
          <label
            className={`custom-file-label ${
              selectedFile ? 'selected-file' : ''
            }`}
          >
            <div className="custom-file-input-container">
              <p>
                {selectedFile ? selectedFile.name : 'Código de MINSA'}
              </p>
              <input
                type="file"
                className="custom-file-input"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={handleFileChange}
              />
            </div>
          </label>
          {formik.touched.file && formik.errors.file && (
            <div className="text-invalid">
              <strong>{formik.errors.file}</strong>
            </div>
          )}
        </div>
      )}
      <button
        type="submit"
        className="register-btn btn btn-primary"
        disabled={isLoadingRegister}
      >
        {isLoadingRegister ? <FaSpinner className="spinner" /> : 'Crear cuenta'}
      </button>
    </form>
  )
}

export default UserRegister
