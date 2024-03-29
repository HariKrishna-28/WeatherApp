import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import ScaleLoader from "react-spinners/ScaleLoader"


// const baseUrl = "http://localhost:5000"
// Heroku server
const baseUrl = "https://weather-app-using-api28.herokuapp.com"


const FormInfo = () => {

    const [weatherData, setWeatherData] = useState([])
    const nameRef = useRef()
    const [name, setName] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadAni, setLoadAni] = useState(false)
    const [url, setUrl] = useState("")
    const [msg, setMsg] = useState("Enter the location in the box to know the weather")


    const hStyle = {
        color: "rgba(139, 92, 246)",
    }


    useEffect(() => {

        axios.get(`${baseUrl}/weather/${name}`).then(res => {
            setWeatherData(res.data)

            if (res.data.success === false) {
                // alert("Please enter a valid name")
                setMsg("Please enter a valid name")
                setLoading(false)
            } else {
                nameRef.current.value = "";
                // setLoadAni(true)
                // setLoading(true)
                setLoadAni(false)
                const weatherIcon = res.data.weather[0].icon
                setUrl(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
            }
            // console.log("rendered useEffect");


        })
        // eslint-disable-next-line
    }, [name])



    // console.log(weatherData)

    return (
        <>

            <div className="flex justify-center items-center py-10 bg-black text-white">

                <div className="container p-10 rounded bg-purple-800 text-white mx-6 lg:mx-48">

                    <form >

                        <div className="grid grid-cols-1 gap-4">

                            <div className="flex justify-center align-center pt-2">
                                <label className="text-2xl font-semibold text-center">Enter a Location</label>
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

                                onClick={(e) => {

                                    e.preventDefault()
                                    const CountryName = nameRef.current.value.charAt(0).toUpperCase() + nameRef.current.value.slice(1);
                                    if (CountryName !== name && CountryName.length !== 0) {
                                        setName(CountryName)
                                        setLoading(true)
                                        setLoadAni(true)
                                    }

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

                {loadAni && loading ? <ScaleLoader color="white" className="mt-5" /> :
                    !loading ? (<h1 className="text-center">{msg}</h1>) :
                        loading &&
                        (

                            <div className="font-semibold">

                                <div className="flex flex-row justify-center align-center">
                                    <h1 className="text-4xl pb-2 mt-5">Weather Data</h1>
                                    <img src={url} alt="weather" width="100" />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 pt-3 gap-4 mb-10">
                                    <h3>Country : {name}</h3>
                                    <h3>Coordinates : {weatherData.coord.lon} <span style={hStyle}>lon</span>  {weatherData.coord.lat} <span style={hStyle}>lat</span></h3>
                                    <h3>Weather : {weatherData.weather[0].description}</h3>
                                    <h2>Pressure  : {weatherData.main.pressure} <span style={hStyle}>Pa</span></h2>
                                    <h2>Temperature : {weatherData.main.temp} <span style={hStyle}>°C </span></h2>
                                    <h2>Humidity  : {weatherData.main.humidity} <span style={hStyle}>% </span></h2>
                                    <h2>Sea Level  : {weatherData.main.sea_level} <span style={hStyle}>m </span></h2>
                                    <h2>Ground Level  : {weatherData.main.grnd_level} <span style={hStyle}>m </span></h2>

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
