import React, { useState, useEffect } from 'react';

interface Appointment {
    id: number;
    name: string;
    treatment: string;
    date: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    time: string;
}

const Agenda: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [newAppointment, setNewAppointment] = useState<Appointment>({
        id: 0,
        name: '',
        treatment: '',
        date: new Date().toISOString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        time: ''
    });

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/api/appointments/route');
                if (!response.ok) {
                    throw new Error('Error al obtener las citas');
                }
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchAppointments();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAppointment({
            ...newAppointment,
            [name]: value
        });
    };

    const addAppointment = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('/api/appointments/create/route', {
            method: 'POST',
            body: JSON.stringify(newAppointment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setAppointments([...appointments, data]);
                setNewAppointment({
                    id: 0,
                    name: '',
                    treatment: '',
                    date: new Date().toISOString(),
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    time: ''
                });
            })
            .catch(error => console.error('Error al agregar la cita:', error));
    };

    const deleteAppointment = (id: number) => {
        fetch(`/api/appointments/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setAppointments(appointments.filter(appointment => appointment.id !== id));
                } else {
                    throw new Error('Error al eliminar la cita');
                }
            })
            .catch(error => console.error('Error al eliminar la cita:', error));
    };

    return (
        <section>
            <h2>Agenda</h2>
            <form onSubmit={addAppointment}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del paciente"
                    value={newAppointment.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="treatment"
                    placeholder="Tratamiento"
                    value={newAppointment.treatment}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Fecha"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Hora"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                />
                <button type="submit">Agregar cita</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tratamiento</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.name}</td>
                            <td>{appointment.treatment}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>
                                <button onClick={() => deleteAppointment(appointment.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Agenda;