import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("User")) || null)
    const [selectedFilter, setSelectedFilter] = useState("All")
    const [sidebarBtn, setSidebarBtn] = useState("dashboard")

    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/task/all');
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            setTasks(data.tasks);
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            getTasks();
    }, []);


    return <AuthContext.Provider
        value={{
            authUser,
            setAuthUser,

            selectedFilter,
            setSelectedFilter,

            sidebarBtn,
            setSidebarBtn,

            tasks,
            loading,
            getTasks
        }}
    >
        {children}
    </AuthContext.Provider>
}