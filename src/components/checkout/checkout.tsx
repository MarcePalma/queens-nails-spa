import React, { useState } from 'react';
import { format } from 'date-fns';

interface CheckoutFormProps {
    onConfirm: (formData: { 
        name: string; 
        email: string; 
        phoneNumber: string; 
        payInPerson: boolean; 
        treatment: string;
        selectedDate: string;
        selectedTime: string;
    }) => void;
    selectedDate: string;
    selectedTime: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onConfirm, selectedDate, selectedTime }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [payInPerson, setPayInPerson] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleConfirm = () => {
        if (!validateEmail(email)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Ingrese un correo electrónico válido'
            }));
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                phoneNumber: 'Ingrese un número de celular válido'
            }));
            return;
        }

        setErrors({});

        onConfirm({ name, email, phoneNumber, payInPerson, treatment: selectedTreatment, selectedDate, selectedTime });
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneRegex = /^3\d{9}$/;
        return phoneRegex.test(phoneNumber);
    };

    return (
        <div className="checkout-form max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <label className="block mb-2 font-bold">Nombre:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />

            <label className="block mt-4 mb-2 font-bold">Correo electrónico:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />

            <label className="block mt-4 mb-2 font-bold">Número de celular:</label>
            <div className="flex items-center mb-2">
                <span className="bg-gray-200 px-2 py-1 rounded-l-md flex items-center">
                    <img src="/images/colombia-flag.webp" alt="Colombia Flag" className="w-5 mr-2" />
                    +57
                </span>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input flex-1 rounded-r-md" />
            </div>

            <label className="block mt-4 mb-2 font-bold">
                Pagar en el lugar:
                <input type="checkbox" checked={payInPerson} onChange={(e) => setPayInPerson(e.target.checked)} className="ml-2" />
            </label>

            <label className="block mt-4 mb-2 font-bold">Tratamiento:</label>
            <select value={selectedTreatment} onChange={(e) => setSelectedTreatment(e.target.value)} className="form-select">
                <option value="">Seleccione un tratamiento</option>
                <option value="Manicura">Manicura</option>
                <option value="Pedicura">Pedicura</option>
                <option value="Quiropedia">Quiropedia</option>
            </select>

            <label className="block mt-4 mb-2 font-bold">Fecha seleccionada:</label>
            <p className="text-gray-600">{format(new Date(selectedDate), 'dd/MM/yyyy')}</p>

            <label className="block mt-4 mb-2 font-bold">Hora seleccionada:</label>
            <p className="text-gray-600">{selectedTime}</p>

            <button onClick={handleConfirm} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Confirmar Turno
            </button>
        </div>
    );
};

export default CheckoutForm;
