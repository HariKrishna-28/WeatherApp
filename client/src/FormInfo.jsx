import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"

// const baseUrl = "http://localhost:5000"
const baseUrl = "http://localhost:5000"


const FormInfo = () => {
    const [weatherData, setWeatherData] = useState([])
    const nameRef = useRef()
    const [name, setName] = useState([])
    const [loading, setLoading] = useState(false)
    // const [wdesc, setWdesc] = useState("")
    // const [temp, setTemp] = useState("")
    // const [pres, setPres] = useState("")
    // const [ico, setIco] = useState("")


    useEffect(() => {

        axios.get(`${baseUrl}/weather/${name}`).then(res => {
            setWeatherData(res.data)
            console.log("rendered useEffect");
            setLoading(true)


        })
        // eslint-disable-next-line
    }, [name])



    console.log(weatherData)

    return (
        <>

            <div className="flex justify-center items-center py-10 bg-black text-white">
                {/* <h1 className="flex font-semibold text-3xl">Weather App</h1> */}
                <div className="container p-10 rounded bg-purple-800 text-white mx-6 lg:mx-48">

                    <form action={baseUrl + "/formdata"} method="POST" >

                        <div className="grid grid-cols-1 gap-4">

                            <div className="flex justify-center align-center pt-2">
                                <label className="text-2xl font-semibold text-center">Enter Country Name</label>
                            </div>

                            <input
                                type='text'
                                ref={nameRef}
                                className="shadow appearance-none leading-tight focus:outline-none focus:shadow-outline rounded mx-0 lg:mx-24 text-gray-800 px-2 py-1"
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
                                    // console.log(name)
                                }}
                            >
                                Submit
                            </button>

                        </div>

                    </form>

                </div>
            </div>

            <div className="flex justify-center align-center">
                {loading && (
                    <div className="font-semibold">

                        <div className="flex justify-center align-center">
                            <h1 className="text-4xl">Weather Data</h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 pt-3 gap-4">
                            <h3>Country : {name}</h3>
                            <h3>Coordinates : {weatherData.coord.lon}  {weatherData.coord.lat}</h3>
                            <h3>Weather : {weatherData.weather[0].description}</h3>
                            <h2>Pressure  : {weatherData.main.pressure}</h2>
                            <h2>Temperature : {weatherData.main.temp}</h2>
                            <h2>Humidity  : {weatherData.main.humidity}</h2>
                            <h2>Sea Level  : {weatherData.main.sea_level}</h2>
                            <h2>Ground Level  : {weatherData.main.grnd_level}</h2>

                            {/* <h2>Wind: <br />
                                Speed : {weatherData.wind.speed} <br />
                                Degree : {weatherData.wind.deg}<br />
                                gust : {weatherData.wind.gust}<br />

                            </h2> */}
                        </div>

                    </div>
                )
                }


            </div>


        </>
    )
}

export default FormInfo
