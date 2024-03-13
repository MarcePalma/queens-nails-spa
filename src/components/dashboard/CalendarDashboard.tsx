import React, { useState, useRef } from 'react';
import { addMonths, format, isSunday, isBefore, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { Locale } from 'date-fns';
import { es as esLocale } from 'date-fns/locale';

interface CalendarDashboardProps {
    onSelectDate: (date: Date) => void;
}

const CalendarDashboard: React.FC<CalendarDashboardProps> = ({ onSelectDate }) => {
    const currentDate = new Date();
    const [selectedAppointment, setSelectedAppointment] = useState<Date | null>(null);
    const selectTimeRef = useRef<HTMLDivElement>(null);

    const getMonthDates = (month: Date): Date[] => {
        const start = startOfMonth(month);
        const end = endOfMonth(month);
        const currentDate = new Date();
        const dates: Date[] = [];

        for (let date = start; isBefore(date, end); date.setDate(date.getDate() + 1)) {
            if (!isSunday(date) && isBefore(currentDate, date)) {
                dates.push(new Date(date));
            }
        }

        return dates;
    };

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const dayOfWeek = date.toLocaleDateString('es-ES', { weekday: 'short' });

        return `${day}/${month} (${dayOfWeek})`;
    };

    const handleDateClick = (date: Date) => {
        setSelectedAppointment(date);
        onSelectDate(date); // Llamar a la función onSelectDate con la fecha seleccionada
        console.log('Fecha seleccionada en CalendarDashboard:', date); // Agregamos un console.log() para verificar la fecha seleccionada
    };

    return (
        <section className="calendar">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-3xl lg:leading-normal font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 z-10">
                    Selecciona un día y un horario y agregalos al calendario!
                </span>
            </h1>
            {Array.from({ length: 2 }).map((_, index) => {
                const month = addMonths(currentDate, index);
                const monthDates = getMonthDates(month);

                return (
                    <div key={index} className="month">
                        <h2>{format(month, 'MMMM', { locale: esLocale as unknown as Locale }).toUpperCase()}</h2>
                        <div className="day-container">
                            {monthDates.map((date, i) => (
                                <div
                                    key={date.toISOString()}
                                    className={`day ${selectedAppointment && isSameDay(date, selectedAppointment) ? 'selected' : ''}`}
                                    onClick={() => handleDateClick(date)}
                                >
                                    {formatDate(date)}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            <style jsx>{`
                .calendar {
                    padding-top: 10rem;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .month {
                    text-align: left;
                    color: #E91E63;
                    margin-bottom: 1rem;
                }

                .day-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                }

                .day {
                    padding: 5px;
                    margin: 5px;
                    border: 1px solid #ccc;
                    display: inline-block;
                    cursor: pointer;
                    border-radius: 10%;
                    background-color: #E91E63;
                    color: white;
                }

                .selected {
                    background-color: #0070f3;
                    color: #fff;
                }
            `}</style>
        </section>
    );
};

export default CalendarDashboard;