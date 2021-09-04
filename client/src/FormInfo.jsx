import React, { useState } from 'react'
import axios from "axios"

const baseUrl = "http://localhost:5000/weather"

const FormInfo = () => {
    const [data, setData] = useState([])

    async function handleDetails(e) {
        e.preventDefault()
        console.log("clicked handle")
        axios.get(baseUrl).then(res => {
            // setData(res.data)
            console.log(res.data);

        })
    }

    return (
        <>

            <div className="flex justify-center items-center h-screen bg-black text-white">
                {/* <h1 className="flex font-semibold text-3xl">Weather App</h1> */}
                <div className="container p-10 rounded bg-purple-800 text-white mx-10 lg:mx-48">

                    <form >
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex justify-center align-center pt-2">
                                <label className="text-2xl font-semibold">Enter Country Name</label>
                            </div>
                            <input
                                type='text'
                                className="shadow appearance-none leading-tight focus:outline-none focus:shadow-outline rounded mx-4 lg:mx-24 text-gray-800 px-2 py-2"
                                id='cityName'
                                name='cityName'
                                required />
                        </div>
                        <div className="flex justify-center align-center">
                        </div>
                    </form>
                    <div className="flex">
                        <button
                            className="bg-green-700 hover:bg-green-600 w-auto px-5 mt-6 py-2 font-semibold rounded"
                            type="submit"
                            onClick={(e) => handleDetails(e)}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormInfo
