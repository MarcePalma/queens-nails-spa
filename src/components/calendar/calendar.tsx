import React, { useState } from "react";
import { addMonths, format, isSunday, isBefore, startOfMonth, endOfMonth, isSameDay, isSameMonth } from "date-fns";
import { Locale } from "date-fns";
import { es as esLocale } from "date-fns/locale";


interface CalendarProps { }

const Calendar: React.FC<CalendarProps> = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    setSelectedDate(date);
    // Aqui ira la logica de los turnos
  };

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
                  className={`day ${selectedDate && isSameDay(date, selectedDate) ? "selected" : ""}`}
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
      `}</style>
    </div>
  );
};

export default Calendar;