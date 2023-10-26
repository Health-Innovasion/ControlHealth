import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CitasDr.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitasdr } from '../../redux/action/action';
import Modal from '../../Components/Modal/Modal';
import { actualizarCita } from '../../redux/action/DoctorAction';

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
            start: new Date(cita.data.data.cita.date),
            Tip_Diabe: cita.data.data.cita.typeDiabetes,
            description: cita.data.data.cita.description,
            end: new Date(cita.data.data.cita.date),
            importante: cita.data.data.status,
        }));
    }

    const myEventsList = extractParamsFromCitas(citas);
  
    //prueba
    const myEventsListEditable = myEventsList.map((cita) => ({
        ...cita,
        editable: true, // Hacer que la cita sea editable
    }));
      

    const eventStyleGetter = (event) => {
        const eventStyle = {
            color: 'white', // Color de texto
        };

        //color de las card dependiendo del estado
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
                console.log(res); //mostrando respuesta de la consulta 
            })
            .catch((error) => {
                console.error("Error al reagendar la cita:", error);
            });
    };


    return (
        <div style={calendarStyle}>
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