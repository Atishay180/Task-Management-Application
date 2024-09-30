import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useTasks = () => {
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
            setLoading(false);
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return { getTasks, tasks, loading };
}

export default useTasks;
