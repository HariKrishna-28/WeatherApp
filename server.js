const { response } = require('express')
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")

})

app.post("/", (req, res) => {
    // console.log("received")
    // res.send()
    const query = req.body.cityName
    const appId = "c2f2c006d14606aa404898a8efd5beb6"
    const units = "metric"

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appId}&units=${units}`

    https.get(URL, (response) => {
        console.log(response.statusCode)

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const weatherTemp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon
            const imageUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

            res.write("<h1>Weather data </h1>")
            res.write(`<img src = ${imageUrl} alt = "image" />`)
            res.write(`<p>The weather is currently ${weatherDescription} in ${query} </p>`)
            res.write(`<p> The temperature in ${query} is ${weatherTemp}  </p>`)
            res.send()
        })
    })
})



app.listen(3000 || process.env.PORT, () => {
    console.log('Server running at port 3000!')
})