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

                // Formatear las fechas de las citas
                const formattedAppointments = data.map((appointment: { date: string | number | Date; }) => {
                    const formattedDate = new Date(appointment.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    return { ...appointment, date: formattedDate };
                });

                setAppointments(formattedAppointments);
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
        <section className="mx-auto max-w-4xl mt-20">
            <h2 className="text-2xl font-bold mb-4">Agenda</h2>
            <form onSubmit={addAppointment} className="mb-8">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del paciente"
                    value={newAppointment.name}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="treatment"
                    placeholder="Tratamiento"
                    value={newAppointment.treatment}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Fecha"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Hora"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <button type="submit" className="button">Agregar cita</button>
            </form>
            <table className="w-full">
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
                        <tr key={appointment.id} className='table-row'>
                            <td>{appointment.name}</td>
                            <td>{appointment.treatment}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>
                                <button onClick={() => deleteAppointment(appointment.id)} className="delete-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
            .input-field {
              width: 100%;
              padding: 8px;
              margin-bottom: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              outline: none;
              background-color:#fff;
            }
    
            .button {
              background-color: #fff;
              color: #E91E63;
              padding: 10px 20px;
              border: 2px solid #E91E63;
              border-radius: 5px;
              cursor: pointer;
              font-weight: bold;
              transition: background-color 0.3s, color 0.3s;
            }
    
            .button:hover {
              background-color: #E91E63;
              color: #fff;
            }
    
            .delete-button {
              background-color: #fff;
              color: #E91E63;
              padding: 6px 12px;
              border: 1px solid #E91E63;
              border-radius: 5px;
              cursor: pointer;
              font-weight: bold;
              transition: background-color 0.3s, color 0.3s;
            }
    
            .delete-button:hover {
              background-color: #E91E63;
              color: #fff;
            }

            .table-row {
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                outline: none;
                background-color: #fff;
            }
            
            .table-row td {
                padding: 8px;
            }
          `}</style>
        </section>
    );
};

export default Agenda;