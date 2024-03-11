import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/navigation/Navbar';

const LoginPage = () => {
    const [token, setToken] = useState('');
    const router = useRouter();
    const { setToken: setContextToken } = useUser();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                const data = await response.json();

                setContextToken(data.token);
                localStorage.setItem('authToken', data.token);
                setToken(data.token);
                router.push('/dashboard');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="bg-pink-500 p-4 rounded-lg shadow-lg mx-auto max-w-md mt-36"> {/* Add mt-16 for 16px top margin */}
                <h2 className="text-white text-lg mb-2">Iniciar Sesion</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ingrese su token de autenticación"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="bg-white text-gray-800 px-3 py-2 rounded-md w-full mb-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button className="bg-white text-pink-500 px-4 py-2 rounded-md text-lg font-semibold focus:outline-none hover:bg-gray-200" type="submit">Ingresar</button>
                </form>
            </div>
        </div>

    );
};

export default LoginPage;