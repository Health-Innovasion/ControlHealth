import { FaSpinner } from 'react-icons/fa';
import './UserRegister.css';
import { InputField } from '../../Utils/functions';

const UserRegister = ({
  isDoctor,
  handleFileChange,
  selectedFile,
  isLoadingRegister,
  formik,
}) => {
  let formFields = [
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
  ];

  if (isDoctor) {
    // Add additional fields for doctors
    formFields = [
      ...formFields,
      {
        id: 'cedula',
        type: 'text',
        placeholder: 'Cedula',
        name: 'cedula',
      },
      {
        id: 'codigo_minsa',
        type: 'text',
        placeholder: 'Codigo MINSA',
        name: 'codigoMinsa',
      },
    ];
  }

  return (
    <form className="form-user" onSubmit={formik.handleSubmit}>
      <div className="form-fields-container">
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
      </div>

      {isDoctor && (
        <div className="register-form-group container-input-file">
          <label
            className={`custom-file-label ${
              selectedFile ? 'selected-file' : ''
            }`}
          >
            <div className="custom-file-input-container">
              <p>{selectedFile ? selectedFile.name : 'Código de MINSA'}</p>
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
        {isLoadingRegister ? (
          <FaSpinner className="spinner" />
        ) : (
          'Crear cuenta'
        )}
      </button>
    </form>
  );
};

export default UserRegister;
