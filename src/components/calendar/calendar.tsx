"use-client"

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { addMonths, format, isSunday, isBefore, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import { Locale } from "date-fns";
import { es as esLocale } from "date-fns/locale";
import { stringify } from "querystring";

interface Appointment {
  date: Date | null;
  time: string | null;
  scheduleId: number;
}

interface ScheduleDataItem {
  scheduleId: number;
  times: string[];
}

interface ScheduleData {
  [date: string]: ScheduleDataItem[];
}

interface CalendarProps { }

const Calendar: React.FC<CalendarProps> = () => {

  const Router = useRouter()
  const currentDate = new Date();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>({ date: null, time: null, scheduleId: -1 });
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const selectTimeRef = useRef<HTMLDivElement>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/schedule/route");
        if (!response.ok) {
          throw new Error("Error al obtener los horarios");
        }
        const data = await response.json();

        const formattedData = data.reduce((acc: { [date: string]: { scheduleId: number, times: string[] }[] }, appointment: { date: string; time: string, id: number }) => {
          const dateKey = formatDateForBackend(appointment.date);
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push({ scheduleId: appointment.id, times: [appointment.time] });
          return acc;
        }, {});

        setScheduleData(formattedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

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

  const formatDateForBackend = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  const handleDateClick = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const timesData = scheduleData[formattedDate];

    if (timesData) {
      const times = timesData.reduce((acc: string[], item) => {
        acc.push(...item.times);
        return acc;
      }, []);
      setAvailableTimes(times);

      // Obtener el scheduleId del primer elemento de timesData (asumiendo que solo hay uno por fecha)
      const scheduleId = timesData[0].scheduleId;
      setSelectedAppointment({ date, time: null, scheduleId }); // Actualizar el ID del turno seleccionado
      sessionStorage.setItem('scheduleId', scheduleId.toString()); // Guardar en sessionStorage
    } else {
      setAvailableTimes([]);
    }

    if (selectTimeRef.current) {
      selectTimeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedAppointment(prevAppointment => ({
      ...prevAppointment,
      time,
    }));
  };

  const handleCheckout = () => {
    if (selectedAppointment.date && selectedAppointment.time) {
      const queryParams = {
        date: selectedAppointment.date.toISOString(),
        time: selectedAppointment.time || '',
        scheduleId: selectedAppointment.scheduleId.toString(),
      };

      Router.push(`/checkout?${stringify(queryParams)}`);
    } else {
      console.error("Error: No se ha seleccionado una fecha y hora");
    }
  };


  const isAppointmentSelected = selectedAppointment.date !== null && selectedAppointment.time !== null;

  return (
    <div className="calendar">
      <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-4xl lg:leading-normal font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 z-10">
          Selecciona un día!
        </span>
      </h1>
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
      {availableTimes.length > 0 ? (
        <div ref={selectTimeRef} className="time-dropdown">
          <select onChange={(e) => handleTimeSelect(e.target.value)}>
            <option value="">Seleccione un horario</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
      ) : (
        <p>No hay horarios disponibles para esta fecha.</p>
      )}
      {isAppointmentSelected && (
        <button className="checkout-button" onClick={handleCheckout}>Pagar</button>
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

        .time-dropdown {
          border-color:black;
          color:#E91E63;
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
