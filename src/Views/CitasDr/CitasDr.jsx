import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'moment/locale/es';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitasdr } from '../../redux/action/action';
import Modal from '../../Components/Modal/Modal';
import { actualizarCita } from '../../redux/action/DoctorAction';
import Dropdown from '../../Components/Dropdown/Dropdown';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


moment.locale('es');
moment.tz.setDefault('America/Bogota');
const localizer = momentLocalizer(moment);


const CitasDr = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [citas, setCitas] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const DraggableCalendar = withDragAndDrop(Calendar);

    useEffect(() => {
        const unsubscribe = getCitasdr(currentUser.uid, (citasData) => {
            setCitas(citasData);
        });

        return () => {
            unsubscribe();
        };
    }, [currentUser.uid]);

function extractParamsFromCitas(citasArray) {
    return citasArray.map((cita) => ({
        uid: cita.id,
        title: cita.data.data.cita.name,
        start: moment(cita.data.data.cita.date).toDate(),  // Parsea la fecha con moment
        Tip_Diabe: cita.data.data.cita.typeDiabetes,
        description: cita.data.data.cita.description,
        end: moment(cita.data.data.cita.date).toDate(),    // Parsea la fecha con moment
        importante: cita.data.data.status,
        direccion: cita.data.data.cita.address,
    }));
}
    const myEventsList = extractParamsFromCitas(citas);

    const myEventsListEditable = myEventsList.map((cita) => ({
        ...cita,
        editable: true,
    }));

    const eventStyleGetter = (event) => {
        const eventStyle = {
            color: 'white',
        };

        if (event.importante === 'Aprobada') {
            eventStyle.backgroundColor = 'green';
        } else if (event.importante === 'En revisión') {
            eventStyle.backgroundColor = 'orange';
        } else if (event.importante === 'Denegada') {
            eventStyle.backgroundColor = 'red';
        } else {
            eventStyle.backgroundColor = 'gray';
        }

        return {
            style: eventStyle,
        };
    };

    const calendarStyle = {
        width: '100%',
        height: '100vh',
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleEventDrop = (event) => {
        actualizarCita(event.event.uid, event.start)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error("Error al reagendar la cita:", error);
            });
    };
    return (
        <div style={calendarStyle}>
        <div>
        <div className="navbar">
        <Link to="/homedr">
        <Button variant="primary" style={{ marginTop: '5px',marginLeft:'5px' }}>
                     <AiOutlineArrowLeft /> Volver
                </Button>

            </Link> 
        <Dropdown />
        </div>
        </div>

            <br />
            <DraggableCalendar
                localizer={localizer}
                events={myEventsListEditable}
                startAccessor="start"
                endAccessor="end"
                onEventDrop={handleEventDrop}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
                editable
            />

            {selectedEvent && (
                <Modal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};

export default CitasDr;
