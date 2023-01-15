import { useEffect, useState } from "react";
export default function WeatherAndIcon(){
    /*
    * default weather data if server does not provide any
    */
    const[temp, setTemp] = useState(22);
    const[sky, setSky] = useState("Sunny");
    const[humidity, setHumidity] = useState(80);
    const[rainfall, setRainfall] = useState("None at all");
    const[atmosphericPressure, setAtmosphericPressure] = useState(1019);
    const [image, setImage] = useState("../profilowe.jpg");

    /*
    * get user info from server to be displayed
    */
    fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => {
                console.log("zdjecie");
                setImage(data.image);
        }).catch(error => {
            console.log(error);
        });
    fetch("https://api.open-meteo.com/v1/forecast?latitude=54.35&longitude=18.65&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,rain,surface_pressure,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m&daily=rain_sum&timezone=Europe%2FBerlin")
        .then(response => response.json())
        .then(data => {
            setTemp(data.hourly.temperature_2m[0]);
            setHumidity(data.hourly.relativehumidity_2m[0]);
            setRainfall(data.hourly.rain[0]);
            setAtmosphericPressure(data.hourly.surface_pressure[0]);
            if(data.hourly.rain[0] > 0){
                setSky("Rainy");
            }else if(data.hourly.windspeed_10m[0] > 10){
                setSky("Windy");
            }else if(data.hourly.temperature_2m[0] > 25){
                setSky("Sunny");
            }else if(data.hourly.temperature_2m[0] < 10){
                setSky("Cold");
            }else{
                setSky("Cloudy");
            }
        }).catch(error => {
            console.log(error);
        });
    /**
     * return html code
     */
    return(
        <main className="flex justify-around m-20">
            <div>
                <img src={image} alt="YEAH BUDDY" className="w-72 h-72 rounded-full"></img>
            </div>
            <div className="text-xl">
                <h1 className="underline-offset-4"><u>Today's Weather:</u></h1>
                <ul>
                    <li>Temperature: {temp} Celsius</li>
                    <li>Sky: {sky}</li>
                    <li>Humidity: {humidity}%</li>
                    <li>Rainfall: {rainfall}</li>
                    <li>Atmospheric pressure: {atmosphericPressure} hPa</li>
                </ul>
            </div>
        </main>
    )
}