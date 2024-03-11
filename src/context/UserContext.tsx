import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definimos el tipo para el contexto del usuario
interface UserContextType {
    token: string | null;
    setToken: (token: string) => void;
}

// Creamos el contexto del usuario
const UserContext = createContext<UserContextType | undefined>(undefined);

// Propiedades para el componente UserProvider
interface UserProviderProps {
    children: ReactNode;
}

// Componente proveedor del contexto del usuario
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // Estado para almacenar el token de autenticación
    const [token, setTokenState] = useState<string | null>(null);

    // Función para establecer el token de autenticación y guardarlo en el almacenamiento local
    const setToken = (newToken: string) => {
        localStorage.setItem('authToken', newToken); // Guardar en el almacenamiento local
        setTokenState(newToken); // Actualizar el estado del token
    };

    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para acceder al contexto del usuario
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser utilizado dentro de un UserProvider');
    }
    return context;
};
