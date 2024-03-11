import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext'; // Importar el hook useUser

const LoginPage = () => {
    const [token, setToken] = useState('');
    const router = useRouter();
    const { setToken: setContextToken } = useUser(); // Obtener la función setToken del contexto de usuario

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }), // Enviar el token al backend
            });

            if (response.ok) {
                const data = await response.json();
                // Guardar el token devuelto en el contexto de usuario
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingrese su token de autenticación"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default LoginPage;