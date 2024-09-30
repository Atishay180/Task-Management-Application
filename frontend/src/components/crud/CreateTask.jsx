import React from 'react'

const CreateTask = () => {
    return (
        <div className="p-4 mt-3 flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg sm:w-[80%] w-[90%] mx-auto">

                {/* Header */}
                <div className='pt-5 flex justify-center'>
                    <span className="grid h-10 w-full md:text-2xl text-center font-bold place-content-center bg-gray-100 text-gray-600">
                        Create Task
                    </span>
                </div>

                <form className="p-5">
                    <div className="flex md:flex-row flex-col md:px-5 justify-between">
                        <label htmlFor="full-name" className="text-xl md:mb-0 mb-1">Priority : </label>
                        <input type="text" name="full-name" id="" placeholder="Enter your full name"
                            className="bg-gray-100 md:w-[35%] w-1/1 px-4 py-2 md:mb-0 mb-3 rounded-xl" />

                        <label htmlFor="full-name" className="text-xl pl-4 md:mb-0 mb-1">Due Date : </label>
                        <input type="date" name="email-id" id="" placeholder="Enter your email"
                            className="bg-gray-100 md:w-[35%] w-1/1 px-4 py-2 rounded-xl" />
                    </div>
                    <div className="md:p-5 p-1 sm:mt-1 mt-1">

                        <div className="md:mt-1 mt-2">
                            <label htmlFor="subject" className="text-xl">Title : </label><br />
                            <input type="text" name="subject" placeholder="Enter your title"
                                className="bg-gray-100 w-[100%] px-4 py-2 mt-1 rounded-xl" />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="subject" className="text-xl">Description : </label><br />
                            <textarea name="message" rows="5" placeholder="Write your description here"
                                className="bg-gray-100 w-[100%] px-4 py-2 rounded-xl appearance-none text-heading text-md"
                                autoComplete="off" spellCheck="false">

                            </textarea>
                        </div>
                    </div>

                    <div className='p-4'>
                        <label htmlFor="full-name" className="text-xl md:mb-0 mb-1">Add Users : </label>
                        <input type="text" name="full-name" id="" placeholder="Enter your full name" className="bg-gray-100 md:w-[35%] w-1/1 px-4 py-2 md:mb-0 mb-3 rounded-xl" />
                    </div>

                    <div className="btn mt-2 w-[100%] bg-transparent flex items-center">
                        <button type="submit"
                            className="px-4 py-2 mx-auto rounded-lg font-semibold text-center text-xl bg-primary text-white hover:bg-pink-600 shadow-md">
                            Create Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTask
