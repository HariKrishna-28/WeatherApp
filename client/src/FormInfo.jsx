import React, { useState } from 'react'
import axios from "axios"

const baseUrl = "http://localhost:5000/"

const FormInfo = () => {
    const [data, setData] = useState([])

    async function handleDetails(e) {
        console.log("clicked handle")
        await axios.post(baseUrl).then(res => {
            setData(res.data)
            console.log(data);
        }
        )
    }

    return (
        <>

            <div className="flex justify-center items-center h-screen bg-black text-white">
                <div className="container p-10 rounded bg-purple-800 text-white mx-10 lg:mx-48">
                    <form action={baseUrl} method="POST">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex justify-center align-center pt-2">
                                <label className="text-2xl font-semibold">Country Name</label>
                            </div>
                            <input
                                type='text'
                                className="shadow appearance-none leading-tight focus:outline-none focus:shadow-outline rounded mx-4 lg:mx-24 text-gray-800 px-2 py-2"
                                id='cityName'
                                name='cityName'
                                required />
                        </div>
                        <div className="flex justify-center align-center">
                            <button className="bg-green-700 border-2 border-yellow-500 hover:bg-green-600 w-auto px-4 mt-4 py-1 rounded"
                                type="submit" onClick={(e) => handleDetails()}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormInfo
