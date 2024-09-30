import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import toast from "react-hot-toast";


const useLogin = () => {
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);

    const login = async ({email, password}) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            localStorage.setItem("User", JSON.stringify(data));
            setAuthUser(data);
            toast.success(`Welcome back ${data.fullName}`);
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return {login, loading};
}

export default useLogin
