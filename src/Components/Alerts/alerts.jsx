import Swal from 'sweetalert2';

// Define una función para mostrar una alerta de éxito
export const showSuccessAlert = (title, text) => {
  Swal.fire({
    icon: 'success',
    title: title,
    text: text,
  });
};

// Define una función para mostrar una alerta de error
export const showErrorAlert = (title, text) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text,
  });
};

// Define una función para mostrar una alerta de advertencia
export const showWarningAlert = (title, text) => {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
  });
};

export default SweetAlertComponent;
