import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CheckoutForm from '@/components/checkout/checkout';
import emailjs from 'emailjs-com';
import BackButton from '@/components/buttons/buttons';

const CheckoutPage = () => {
    const router = useRouter();
    const date = typeof router.query.date === 'string' ? router.query.date : '';
    const time = typeof router.query.time === 'string' ? router.query.time : '';
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [turnCreated, setTurnCreated] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState({
        date: null,
        time: null,
        scheduleId: -1
    });
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        if (turnCreated) {
            sendConfirmationEmail(); // Envía correo de confirmación si se ha creado el turno correctamente
        }
    }, [turnCreated]);

    useEffect(() => {
        // Verificamos si hay un scheduleId almacenado en sessionStorage y lo asignamos al estado
        const storedScheduleId = sessionStorage.getItem('scheduleId');
        if (storedScheduleId) {
            setSelectedAppointment(prevState => ({ ...prevState, scheduleId: parseInt(storedScheduleId) }));
        }
    }, []);

    const sendConfirmationEmail = () => {
        emailjs.send('service_id', 'template_id_cliente', {
            to_email: customerEmail,
            from_email: "marcelobaltazarpalma@gmail.com",
            from_name: 'Tatiana Ramirez',
            subject: 'Confirmacion del Turno',
            message: 'Esto es para avisar que se confirmo el turno de prueba de momento'
        }, 'user_id')
            .then((response) => {
                console.log('Correo de confirmación enviado al cliente:', response);
            })
            .catch((error) => {
                console.error('Error al enviar correo de confirmación al cliente:', error);
            });

        // Envía correo de confirmación al propietario del sitio
        emailjs.send('service_id', 'template_id_propietario', {
            to_email: 'correo_del_propietario',
            from_name: 'Nombre_del_remitente',
            subject: 'Asunto_del_correo',
            message: 'Mensaje_del_correo'
        }, 'user_id')
            .then((response) => {
                console.log('Correo de confirmación enviado al propietario:', response);
            })
            .catch((error) => {
                console.error('Error al enviar correo de confirmación al propietario:', error);
            });
    };

    const handleConfirmTurn = (formData: { name: any; treatment: any; email: any; }) => {
        const { name, treatment, email } = formData;
        setCustomerEmail(email);
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
            <CheckoutForm onConfirm={handleConfirmTurn} selectedDate={date} selectedTime={time} />
            {confirmationMessage && <p>{confirmationMessage}</p>}
            {/* @ts-ignore */}
            <BackButton path="turnos" />
        </div>
    );
};

export default CheckoutPage;
