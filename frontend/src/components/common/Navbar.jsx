import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from '../../hooks/useLogout';


const Navbar = () => {
    const {loading, logout} = useLogout();
    const [search, setSearch] = useState('')

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className='w-full flex justify-between items-center h-14 p-2 bg-white'>

            {/* search bar */}
            <div className='p-2'>
                <form className='flex items-center gap-2'>
                    <input
                        type='text'
                        placeholder='Search…'
                        className='input input-bordered rounded-full w-80 py-2 px-4 bg-gray-100'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type='submit' className='text-gray-400'>
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
