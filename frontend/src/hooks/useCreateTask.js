import { useState } from 'react'
import toast from 'react-hot-toast';

const useCreateTask = () => {
    const [loading, setLoading] = useState(false);

    const createTask = async (input) => {
        setLoading(true);
        try {
            const response = await fetch('/api/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }

            toast.success(data.message || 'Task created successfully');
            return data;
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return { createTask, loading };
}

export default useCreateTask
