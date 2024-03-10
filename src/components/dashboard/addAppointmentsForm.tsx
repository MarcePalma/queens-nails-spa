import React, { useState } from 'react';
import CalendarDashboard from './CalendarDashboard';

interface AddAppointmentFormProps {
    onSubmit: ( date: Date, time: string) => void;
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({ onSubmit }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDate || !time) {
            console.log('Por favor, selecciona una fecha y un horario para el turno. Datos actuales:', {
                selectedDate,
                time
            });
            alert('Por favor, selecciona una fecha y un horario para el turno.');
            return;
        }
        console.log('Enviando datos:', {
            
            selectedDate,
            time
        });
        onSubmit(selectedDate, time);
        setSelectedDate(null);
        setTime('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <CalendarDashboard onSelectDate={handleDateSelect} />
            <label>

                Hora:
                <select value={time} onChange={(e) => {
                    console.log('Hora seleccionada:', e.target.value); 
                    setTime(e.target.value);
                }}>
                    <option value="12:00 AM">10:00 AM</option>
                    <option value="12:10 AM">12:10 AM</option>
                    <option value="12:20 AM">12:20 AM</option>
                    <option value="12:30 AM">12:30 AM</option>
                    <option value="12:40 AM">12:40 AM</option>
                    <option value="12:50 PM">12:50 AM</option>
                    <option value="13:00 PM">13:00 PM</option>
                    <option value="13:10 PM">13:10 PM</option>
                    <option value="13:20 PM">13:20 PM</option>
                    <option value="13:30 PM">13:30 PM</option>
                    <option value="13:40 PM">13:40 PM</option>
                    <option value="13:50 PM">13:50 PM</option>
                    <option value="14:00 PM">14:00 PM</option>
                    <option value="14:10 PM">14:10 PM</option>
                    <option value="14:20 PM">14:20 PM</option>
                    <option value="14:30 PM">14:30 PM</option>
                    <option value="14:40 PM">14:40 PM</option>
                    <option value="14:50 PM">14:50 PM</option>
                    <option value="15:00 PM">15:00 PM</option>
                    <option value="15:10 PM">15:10 PM</option>
                    <option value="15:20 PM">15:20 PM</option>
                    <option value="15:30 PM">15:30 PM</option>
                    <option value="15:40 PM">15:40 PM</option>
                    <option value="15:50 PM">15:50 PM</option>
                    <option value="16:00 PM">16:00 PM</option>
                    <option value="16:10 PM">16:10 PM</option>
                    <option value="16:20 PM">16:20 PM</option>
                    <option value="16:30 PM">16:30 PM</option>
                    <option value="16:40 PM">16:40 PM</option>
                    <option value="16:50 PM">16:50 PM</option>
                    <option value="17:00 PM">17:00 PM</option>
                    <option value="17:10 PM">17:10 PM</option>
                    <option value="17:20 PM">17:20 PM</option>
                    <option value="17:30 PM">17:30 PM</option>
                    <option value="17:40 PM">17:40 PM</option>
                    <option value="17:50 PM">17:50 PM</option>
                    <option value="18:00 PM">18:00 PM</option>
                    <option value="18:10 PM">18:10 PM</option>
                    <option value="18:20 PM">18:20 PM</option>
                    <option value="18:30 PM">18:30 PM</option>
                    <option value="18:40 PM">18:40 PM</option>
                    <option value="18:50 PM">18:50 PM</option>
                    <option value="18:50 PM">19:00 PM</option>
                </select>
            </label>
            <button type="submit">Agregar Turno</button>
        </form>
    );
};

export default AddAppointmentForm;