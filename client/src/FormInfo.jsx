import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"

const baseUrl = "http://localhost:5000"

const FormInfo = () => {
    const [weatherData, setWeatherData] = useState([])
    const nameRef = useRef()
    const [name, setName] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // if (nameRef.current.value == null) return
        axios.get(`${baseUrl}/weather/${name}`).then(res => {
            setWeatherData(res.data)
            // console.log(weatherData)
            setLoading(true)
            // console.log(weatherData.length)
            // const weatherTemp = weatherData.main.temp
            //         const weatherDescription = weatherData.weather[0].description
            //         const weatherIcon = weatherData.weather[0].icon
            //         const imageUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            console.log("rendered useEffect");
        })
        // eslint-disable-next-line
    }, [name])

    // async function handleDetails(e) {
    //     e.preventDefault()
    //     console.log("clicked handle")

    //     axios.get(`${baseUrl}/weather`).then(res => {
    //         setWeatherData(res.data)
    //         // console.log(res.data)
    //         console.log(weatherData);

    //     })
    // }

    // console.log(weatherData)

    return (
        <>

            <div className="flex justify-center items-center h-screen bg-black text-white">
                {/* <h1 className="flex font-semibold text-3xl">Weather App</h1> */}
                <div className="container p-10 rounded bg-purple-800 text-white mx-10 lg:mx-48">

                    <form action={baseUrl + "/formdata"} method="POST" >
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex justify-center align-center pt-2">
                                <label className="text-2xl font-semibold">Enter Country Name</label>
                            </div>
                            <input
                                type='text'
                                ref={nameRef}
                                className="shadow appearance-none leading-tight focus:outline-none focus:shadow-outline rounded mx-4 lg:mx-24 text-gray-800 px-2 py-1"
                                id='cityName'
                                name='cityName'
                                autoFocus
                                required />
                        </div>
                        <div className="flex justify-center align-center">

                            <button
                                className="bg-green-700 hover:bg-green-600 w-auto px-5 mt-6 py-2 font-semibold rounded shadow appearance-none leading-tight focus:outline-none"
                                type="submit"
                                // onClick={(e) => handleDetails(e)}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setName(nameRef.current.value)
                                    console.log(name)
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>


            {/* <div>
                {loading && (
                    <h1>Weather Data</h1>
                    {console.log(weatherData)}

                )
                }


            </div> */}

        </>
    )
}

export default FormInfo
