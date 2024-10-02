import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from '../../hooks/useLogout';
import { useAuthContext } from '../../context/AuthContext';


const Navbar = () => {
    const { loading, logout } = useLogout();
    const { selectedFilter, setSelectedFilter } = useAuthContext();
    const [search, setSearch] = useState('')

    const handleOnClick = (e) => {
        e.preventDefault();
        setSelectedFilter(search);
        setSearch('');
    }

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className='w-full flex justify-between items-center h-14 p-2 bg-white'>

            {/* search bar */}
            <div className='p-2 ml-60'>
                <form className='flex items-center gap-2'>
                    <input
                        type='text'
                        placeholder='Search by priority'
                        className='input input-bordered rounded-full w-80 py-2 px-4 bg-gray-100'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type='submit' onClick={handleOnClick} className='text-gray-400'>
                        <IoSearchSharp className='w-6 h-6 outline-none' />
                    </button>
                </form>
            </div>


            <div className='flex items-start p-2'>
                {loading ? "Loading..." :
                    <RiLogoutBoxLine onClick={handleLogout} className='text-3xl text-black cursor-pointer hover:scale-95' />
                }
            </div>
        </div>
    )
}

export default Navbar
