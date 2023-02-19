import { useEffect, useState } from "react";
export default function WeatherAndIcon(props : any){
    const userInfo = props.userInfo;
    const weather = props.weather;
    return(
        <main className="flex justify-around m-20">
            <div>
                <img src={userInfo.image} alt="YEAH BUDDY" className="w-72 h-72 rounded-full"></img>
            </div>
            <div className="text-xl">
                <h1 className="underline-offset-4"><u>Today's Weather:</u></h1>
                <ul>
                    <li>Temperature: {weather.temp} Celsius</li>
                    <li>Sky: {weather.sky}</li>
                    <li>Humidity: {weather.humidity}%</li>
                    <li>Rainfall: {weather.rainfall}</li>
                    <li>Atmospheric pressure: {weather.atmosphericPressure} hPa</li>
                </ul>
            </div>
        </main>
    )
}