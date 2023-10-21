import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CitasDr.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitasdr } from '../../redux/action/action';
import Modal from '../../Components/Modal/Modal';

const localizer = momentLocalizer(moment);

const CitasDr = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [citas, setCitas] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
            Tip_Diabe: cita.data.data.cita.Tip_Diabe,
            description: cita.data.data.cita.description,
            end: new Date(cita.data.data.cita.date),
            importante: cita.data.data.status,
        }));
    }

    const myEventsList = extractParamsFromCitas(citas);

    const eventStyleGetter = (event) => {
        const eventStyle = {
            color: 'black', // Color de texto
        };

        if (event.importante === 'Aprobada') {
            eventStyle.backgroundColor = 'blue';
        } else if (event.importante === 'En revisión') {
            eventStyle.backgroundColor = 'orange';
        } else if (event.importante === 'Denegada') {
            eventStyle.backgroundColor = 'red';
        } else {
            eventStyle.backgroundColor = 'green';
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

    return (
        <div style={calendarStyle}>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
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
