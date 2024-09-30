import { useState } from 'react'
import toast from 'react-hot-toast';

const useFilterTasks = () => {
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const filterTasks = async (selectedFilter) => {
        setLoading(true);
        try {
            const res = await fetch('/api/task/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedFilter }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setFilteredTasks(data.tasks);
            
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return { filteredTasks, filterTasks, loading };
}

export default useFilterTasks
