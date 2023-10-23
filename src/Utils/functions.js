export const steps = (Review) => {
  return [
    {
      id: '1',
      message:
        'Hola, soy tu asistente personal médico, ¡es un placer poder atenderte! Elige la opción que deseas realizar.',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        {
          value: 'Crear una cita con un diabetólogo',
          label: 'Crear una cita con un diabetólogo',
          trigger: '24',
        },
        {
          value: 'Realizar un pre diagnóstico',
          label: 'Realizar un pre diagnóstico',
          trigger: '3',
        },
      ],
    },

    {
      id: '3',
      message: '¡Por favor!, escribe tus nombres y apellidos completos.',
      trigger: 'name',
    },
    {
      id: 'name',
      user: true,
      trigger: '4',
      validator: (value) => {
        if (!value) {
          return 'El nombre es obligatorio'
        } else if (!isNaN(value)) {
          return 'Nombre inválido'
        }

        return true
      },
    },

    {
      message: `Un gusto, {previousValue}. Escribe tu peso en libras.`,
      id: '4',
      trigger: 'weight',
    },
    {
      id: 'weight',
      user: true,
      trigger: '5',
      validator: (value) => {
        if (isNaN(value)) {
          return 'El dato tiene que ser numérico'
        } else if (value < 0) {
          return 'El dato tiene que ser positivo'
        }

        return true
      },
    },
    {
      id: '5',
      message: 'Escribe tu edad',
      trigger: 'age',
    },
    {
      id: 'age',
      user: true,
      trigger: '6',
      validator: (value) => {
        if (isNaN(value)) {
          return 'El dato tiene que ser numérico'
        } else if (value < 0) {
          return 'El dato tiene que ser positivo'
        }

        return true
      },
    },
    {
      id: '6',
      message: 'Selecciona tu género ',
      trigger: 'gender',
    },
    {
      id: 'gender',
      options: [
        { value: 'Masculino', label: 'Masculino', trigger: '9' },
        { value: 'Femenino', label: 'Femenino', trigger: '31' },
      ],
    },
    {
      id: '31',
      message: '¿Tienes hijos?',
      trigger: 'sons',
    },
    {
      id: 'sons',
      options: [
        { value: 'Sí', label: 'Sí', trigger: '7' },
        { value: 'No', label: 'No', trigger: '7' },
      ],
    },
    {
      id: '7',
      message: '¿Ha presentado síntomas de diabetes durante el embarazo?',
      trigger: 'diabetesPregnancy',
    },

    {
      id: 'diabetesPregnancy',
      options: [
        { value: 'Sí', label: 'Sí', trigger: '9' },
        { value: 'No', label: 'No', trigger: '9' },
      ],
    },
    {
      //si es masculino
      id: '9',
      message: '¿Padece de alguna enfermedad crónica?',
      trigger: 'chronicDisease',
    },

    {
      id: 'chronicDisease',
      options: [
        { value: 'Sí', label: 'Sí', trigger: '10' },
        { value: 'No', label: 'No', trigger: '10' },
      ],
    },

    {
      id: '10',
      message: '¿Tiene familiares con diagnóstico de diabetes?',
      trigger: 'famililyMemberDiabetes',
    },

    {
      id: 'famililyMemberDiabetes',
      options: [
        { value: 'Sí', label: 'Sí', trigger: '16' },
        { value: 'No', label: 'No', trigger: '16' },
      ],
    },
    {
      id: '16',
      message: '¿Siente una ansiedad inusual por beber agua?',
      trigger: 'anxietyWater',
    },

    {
      id: 'anxietyWater',
      options: [
        { value: 'Sí', label: 'Sí', trigger: '18' },
        { value: 'No', label: 'No', trigger: '18' },
      ],
    },
    {
      id: '18',
      message: '¿Presenta ganas de ir al baño frecuentemente?',
      trigger: 'frequentBathing',
    },

    {
      id: 'frequentBathing',
      options: [
        { value: 'Sí', label: 'Sí', trigger: '21' },
        { value: 'No', label: 'No', trigger: '21' },
      ],
    },
    {
      id: '21',
      message: '¿Has perdido peso últimamente?',
      trigger: 'loseWeight',
    },

    {
      id: 'loseWeight',
      options: [
        { value: 'Sí', label: 'Sí', trigger: '23' },
        { value: 'No', label: 'No', trigger: '23' },
      ],
    },

    {
      id: '23',
      message:
        'Ten en cuenta que esta evaluación se basa en mi algoritmo, y te recomiendo que solicites una consulta médica si deseas obtener una validación más precisa por parte de un profesional de la salud.',
      trigger: '25',
    },
    {
      id: '25',
      message: 'Este es tu previo expediente y tu pre diagnóstico',
      trigger: 'review',
    },
    {
      id: 'review',
      component: <Review />,
      asMessage: true,
      trigger: '24',
    },
    {
      id: '24',
      component: <a href="/citas">Agenda tu cita aquí</a>,
    },
  ]
}

export const InputField = ({
  id,
  type,
  placeholder,
  value,
  name,
  handleChange,
  handleBlur,
  touched,
  error,
  options,
}) => (
  <div className="register-form-group">
    <label htmlFor={id}></label>
    {type === 'select' ? (
      <select
        className={`register-form-control ${
          touched && error ? 'input-invalid' : ''
        }`}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option key={id} disabled hidden value="">
          {placeholder}
        </option>{' '}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea
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
    ) : (
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
    )}
    {touched && error && (
      <div className="text-invalid">
        <strong>{error}</strong>
      </div>
    )}
  </div>
)
