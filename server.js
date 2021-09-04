
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {

    // res.sendFile(__dirname + "/index.html")
    res.send("Server running")
})

app.get("/weather", async (req, res) => {

    try {
        console.log("received")
        // res.send()
        const query = "belgium"
        const appId = "c2f2c006d14606aa404898a8efd5beb6"
        const units = "metric"

        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appId}&units=${units}`

        let config = {
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appId}&units=${units}`,
            headers: {
                'accept': 'application/json'
            }
        }
        const response = await axios(config)
        console.log(response);
        res.json(
            response.data
        )
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: "server error"
        })
    }
})



// console.log(res);

// https.get(URL, (response) => {
//     response.once('data', (data) => {
//         const weatherData = JSON.parse(data)
//         console.log(weatherData);
//         res.json(weatherData)
//         res.send(data)
//     })

// })
app.listen(process.env.PORT || 5000, () => {
    console.log('Server running at port 5000!')
})