import { useState } from "react"
import toast from "react-hot-toast"


const useEditTask = () => {
    const [loading, setLoading] = useState(false)

    const editTask = async (id, {
        title,
        priority,
        dueDate,
        status,
        description,
    }) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/task/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    priority,
                    dueDate,
                    status,
                    description,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message || "Something went wrong");
                return;
            }

            toast.success(data.message || "Task updated successfully")
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }


    return { editTask, loading }
}

export default useEditTask
