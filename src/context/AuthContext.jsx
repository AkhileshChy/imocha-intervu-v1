import { createContext, useContext, useEffect, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to validate user
    const validateUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('https://intervu-1-0.onrender.com/validateUser', {
                method: 'POST',
                headers: {
                    "Authorization": `${token}`
                },
                credentials: 'include',
                // body: formData
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data); // Assuming API returns user data
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Validation error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Validate user on component mount
    useEffect(() => {
        validateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, validateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
