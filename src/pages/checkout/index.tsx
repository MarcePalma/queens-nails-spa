import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CheckoutForm from '@/components/checkout/checkout';

const CheckoutPage = () => {
    const router = useRouter();
    const date = typeof router.query.date === 'string' ? router.query.date : '';
    const time = typeof router.query.time === 'string' ? router.query.time : '';
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [turnCreated, setTurnCreated] = useState(false);

    // Obtenemos la información del turno desde sessionStorage
    const [selectedAppointment, setSelectedAppointment] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedScheduleId = sessionStorage.getItem('scheduleId');
            const scheduleId = storedScheduleId ? parseInt(storedScheduleId) : -1;
            return { date: null, time: null, scheduleId };
        } else {
            return { date: null, time: null, scheduleId: -1 };
        }
    });

    useEffect(() => {
        // Verificamos si hay un scheduleId almacenado en sessionStorage y lo asignamos al estado
        const storedScheduleId = sessionStorage.getItem('scheduleId');
        if (storedScheduleId) {
            setSelectedAppointment(prevState => ({ ...prevState, scheduleId: parseInt(storedScheduleId) }));
        }
    }, []);

    const handleConfirmTurn = (formData: { name: any; treatment: any; }) => {
        const newAppointment = {
            id: 0,
            name: formData.name,
            treatment: formData.treatment,
            date: date ? new Date(date).toISOString() : '',
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            time: time || '',
            scheduleId: selectedAppointment.scheduleId,
        };




        console.log('Nueva cita:', newAppointment);
        fetch('/api/appointments/create/route', {
            method: 'POST',
            body: JSON.stringify(newAppointment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    setConfirmationMessage('El turno se creó correctamente');
                    setTurnCreated(true);

                    console.log('ID de la nueva cita:', newAppointment.id);

                    handleDeleteSchedule(newAppointment.scheduleId);
                } else {
                    setConfirmationMessage('Error al crear el turno');
                    setTurnCreated(false);
                }
            })
            .catch(error => {
                setConfirmationMessage('Error al crear el turno');
                setTurnCreated(false);
                console.error('Error al agregar la cita:', error);
            });
    };

    const handleDeleteSchedule = async (scheduleId: number) => {
        try {
            const response = await fetch(`/api/schedule/delete/${scheduleId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el horario');
            }
            console.log('Horario eliminado correctamente');
        } catch (error) {
            console.error("Error al eliminar el horario:", error);
        }
    };

    return (
        <div>
            <h1>Proceso de Pago</h1>
            <p>Fecha seleccionada: {date}</p>
            <p>Hora seleccionada: {time}</p>
            {/* @ts-ignore */}
            <CheckoutForm onConfirm={handleConfirmTurn} selectedDate={date} selectedTime={time} />
            {confirmationMessage && <p>{confirmationMessage}</p>}
        </div>
    );
};

export default CheckoutPage;