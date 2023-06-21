const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    //console.log(req.body.City);

    let city = req.body.City;
    let apiKey = "Enter Your API Key here";
    let units = "metric";

    let url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+city+"&units="+units;
    
   https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){

        const WeatherData = JSON.parse(data);
        //console.log(WeatherData);
        let temp = WeatherData.main.temp;
        let cityName = WeatherData.name;
        let weatureDes = WeatherData.weather[0].description;
        let icon = WeatherData.weather[0].icon;
        //let imageURL = "https://api.openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<h1> Temperature in " + cityName + " is " + temp + " °C <\h1>")
        res.write("<br><h1> Weature in " + cityName + " is " + weatureDes + "<\h1>")
        //res.write("<img src ="+imageURL+">")



        res.send();
        //console.log(cityName +" : "+ temp);
        //console.log(weatureDes);


    })

   })

})


app.listen(3000,function(){
    console.log("Your server is running on port 3000 Bitch!!!");
})
