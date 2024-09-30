import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"

import toast from "react-hot-toast";

const useLogout = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Something went wrong")
                return;
            }

            localStorage.removeItem("User")
            setAuthUser(null)

            toast.success("Logged out successfully")

        } catch (error) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    } 

    return { loading, logout }
}

export default useLogout
