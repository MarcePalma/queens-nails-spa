import React, { useEffect, useState } from 'react';

export default function Schedule() {

    type Schedule = {
        id: number;
        date: string;
        time: string;
    };

    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/schedule/route");
                if (!response.ok) {
                    throw new Error("Error al obtener los horarios");
                }
                const data = await response.json();
                setSchedules(data.map((schedule: { date: string | number | Date; }) => ({
                    ...schedule,
                    date: new Date(schedule.date).toLocaleDateString('es-ES', { timeZone: 'UTC' })
                })));
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteSchedule = async (id: number) => {
        try {
            const response = await fetch(`/api/schedule/delete/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el horario');
            }
            setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id !== id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Ordenar los horarios por fecha de forma descendente
    const sortedSchedules = schedules.slice().sort((a, b) => {
        const dateA = new Date(a.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1'));
        const dateB = new Date(b.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1'));
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-whitetext-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-black">Fecha</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-black">Horario</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-black">x</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {sortedSchedules.map((schedule) => (
                        <tr key={schedule.id}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{schedule.date}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{schedule.time}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                <button onClick={() => handleDeleteSchedule(schedule.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}