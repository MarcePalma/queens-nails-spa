"use-client"
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { addMonths, format, isSunday, isBefore, startOfMonth, endOfMonth, isSameDay, isSameMonth } from "date-fns";
import { Locale } from "date-fns";
import { es as esLocale } from "date-fns/locale";

interface Appointment {
  date: Date | null;
  time: string | null;
}

interface CalendarProps { }

const Calendar: React.FC<CalendarProps> = () => {
  const Router = useRouter()
  const currentDate = new Date();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>({ date: null, time: null });
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
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
    const dayOfWeek = date.toLocaleDateString("es-ES", { weekday: "short" });

    return `${day}/${month} (${dayOfWeek})`;
  };

  const handleDateClick = (date: Date) => {
    setSelectedAppointment(prevAppointment => ({ ...prevAppointment, date }));
    const mockAvailableTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "3:00 PM"];
    setAvailableTimes(mockAvailableTimes);
    if (selectTimeRef.current) {
      selectTimeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedAppointment(prevAppointment => ({ ...prevAppointment, time }));
  };

  const handleCheckout = () => {
    console.log("Fecha seleccionada:", selectedAppointment.date);
    console.log("Hora seleccionada:", selectedAppointment.time);
    Router.push('/checkout')
  };

  const isAppointmentSelected = selectedAppointment.date !== null && selectedAppointment.time !== null;

  return (
    <div className="calendar">
      {Array.from({ length: 2 }).map((_, index) => {
        const month = addMonths(currentDate, index);
        const monthDates = getMonthDates(month);

        return (
          <div key={index} className="month">
            <h2>{format(month, "MMMM", { locale: esLocale as unknown as Locale }).toUpperCase()}</h2>
            <div className="day-container">
              {monthDates.map((date, i) => (
                <div
                  key={date.toISOString()}
                  className={`day ${selectedAppointment.date && isSameDay(date, selectedAppointment.date) ? "selected" : ""}`}
                  onClick={() => handleDateClick(date)}
                >
                  {formatDate(date)}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {availableTimes.length > 0 && (
        <div ref={selectTimeRef} className="time-dropdown">
          <select onChange={(e) => handleTimeSelect(e.target.value)}>
            <option value="">Seleccione un horario</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
      )}
      {isAppointmentSelected && (
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      )}
      <style jsx>{`
        .calendar {
          padding-top: 10rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .month {
          text-align: left;
          color: white;
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
          background-color: white;
          color: black;
        }

        .selected {
          background-color: #0070f3;
          color: #fff;
        }

        .time-dropdown {
          color:#000;
          margin-top: 1rem;
        }

        .time-dropdown select {
          padding: 0.5rem;
          border-radius: 5px;
        }

        .checkout-button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 5px;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
