const express =  require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3003;
app.get("/",function(req,res){
    res.sendFile(`${__dirname}/index.html`);
})
app.post('/', (req, res)=>{
  const country = req.body.country;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=0d8b724b92995f0fc8775050e70724c6`

  https.get(url, (response)=>{
    console.log(response.statusCode)
    response.on('data',(data)=>{
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const desc = weatherData.weather[0].description
       const ic = weatherData.weather[0].icon
       const icons = `https://openweathermap.org/img/wn/${ic}@4x.png` 
          res.send(`
       <p>The Weather in ${country} is: ${desc}</p>
       <h1>The Temperature in ${country} is: ${temp} degree celcius</h1>
       <img src=${icons} alt="weather icon">
       <button onclick="history.back()"> move back</button>l
       `)

    })
});
})

https

app.listen(port, (req, res)=>{
    console.log(`server running on: ${port}`);
});