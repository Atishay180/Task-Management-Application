import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("User")) || null)
    const [selectedFilter, setSelectedFilter] = useState("All")
    const [sidebarBtn, setSidebarBtn] = useState("dashboard")

    return <AuthContext.Provider
        value={{
            authUser,
            setAuthUser,

            selectedFilter,
            setSelectedFilter,

            sidebarBtn,
            setSidebarBtn
        }}
    >
        {children}
    </AuthContext.Provider>
}