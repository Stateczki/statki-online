import { useEffect, useState } from "react";
import profilowe from "../profilowe.jpg"
export default function WeatherAndIcon(){
    //user parameters
    let userData : any;
    let temp:number = 22;
    let sky:string = "Sunny";
    let humidity:number = 80;
    let rainfall:string = "None at all";
    let atmosphericPressure = 1019;
    const [image, setImage] = useState(profilowe);

    //fetch section
    fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => {
            setImage(data.image);
        });
    return(
        <main className="flex justify-around m-20">
            <div>
                <img src={image} className="w-56 rounded-full"></img>
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