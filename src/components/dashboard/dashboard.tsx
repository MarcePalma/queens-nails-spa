import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddAppointmentForm from './addAppointmentsForm';
import Schedule from './schedule';

export default function Dashboard() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const [showSchedule, setShowSchedule] = useState(false)

    const handleToggleSchedule = () => {
        setShowSchedule(!showSchedule)
    }

    const handleToggleForm = () => {
        setShowForm(!showForm)
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        console.log('Fecha seleccionada:', date);
    };

    const handleSubmitAppointment = async (date: Date, time: string) => {
        try {
            // Realizamos la solicitud POST para agregar un turno
            const response = await fetch('/api/schedule/create/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date,
                    time
                })
            });

            if (!response.ok) {
                throw new Error('Error al agregar el turno.');
            }

            // Mostrar el componente de éxito
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);

            console.log('Turno agregado con éxito.');
        } catch (error) {
            console.error('Error:', error);
            setShowError(true);
            setShowSuccess(false);
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }
    };

    return (
        <div className="flex w-screen h-screen flex-col justify-between border-e bg-#121212 p-24">
            <div>
                <span className="grid h-10 w-32 place-content-center rounded-lg bg-#121212 text-xs text-gray-600">
                    <Image src={"/images/logo.webp"} width={70} height={70} alt='Logo' />
                </span>

                <ul className="mt-6 space-y-1">
                    <li>
                        <Link href="/turnos" className="block rounded-lg px-4 py-2 text-sm font-medium text-pink-500 hover:bg-gray-100 hover:text-gray-700">
                            Turnos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/agregar-publicaciones"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-pink-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Publicaciones
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleToggleForm}
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-pink-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Agregar Horarios
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleToggleSchedule}
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-pink-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Ver Horarios
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                {showSuccess && (
                    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
                        <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
                            <div className="flex items-start gap-4">
                                <span className="text-green-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>

                                <div className="flex-1">
                                    <strong className="block font-medium text-gray-900"> Cambios Guardados! </strong>
                                    <p className="mt-1 text-sm text-gray-700">Turnos agregados con exito!.</p>
                                </div>

                                <button className="text-gray-500 transition hover:text-gray-600">
                                    <span className="sr-only">Dismiss popup</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}{showError && (
                    <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                        <strong className="block font-medium text-red-800">Algo salio mal</strong>
                        <p className="mt-2 text-sm text-red-700">
                            Algo salio mal y no se ah agendado el turno!
                        </p>
                    </div>
                )}
                {showForm && (
                    <AddAppointmentForm onSubmit={handleSubmitAppointment} />
                )}
                {
                    showSchedule && (
                        <Schedule />
                    )
                }
            </div>
        </div>
    )
}
