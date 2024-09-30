import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

import toast from 'react-hot-toast';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, email, password, confirmPassword }) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, email, password, confirmPassword })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            localStorage.setItem("User", JSON.stringify(data));
            setAuthUser(data);
            toast.success(`Welcome ${data.fullName}`);
            
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return { signup, loading };
}

export default useSignUp
