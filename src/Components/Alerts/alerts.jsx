import { t } from 'i18next'
import Swal from 'sweetalert'
import './alerts.css'

const SweetAlertComponent = {
  // Define una función para mostrar una alerta de éxito
  showSuccessAlert: ({ text, icon }) => {
    Swal({
      icon,
      title: t(icon),
      text: t(text),
    })
  },
}

export default SweetAlertComponent
