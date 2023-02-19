import PlayButton from "./playButton";
import TopBar from "./topBar";
import WeatherAndIcon from "./weatherAndIcon";
import {
    Route,
    Routes as Switch,
  } from 'react-router-dom';
import ProfilePage from "./profilePage";
import StatPage from "./statPage";
import { useEffect, useState } from "react";

export default function Homepage() {
    const [userInfo, setUserInfo] = useState({
        id: 1234,
        username: "testValue",
        email: "testValue",
        premium: false,
        image: "#",
    });
    
    const [weather, setWeather] = useState({
        temperature: 1234,
        humidity: 1234,
        rainfall: 1234,
        windspeed: 1234,
        atmosphericPressure: 1234,
        sky: "testValue",
        notFetched: false
    });
    
    const [rooms, setRooms] = useState([
        { id: 9999, room_name: "empty" }
    ]);
    const [roomsNotFetched, setRoomsNotFetched] = useState(true);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => 
                setUserInfo({
                    ...userInfo,
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    premium: data.premium,
                    image: data.image,
                })
       )
        .catch((error) => {
            console.error('User info Error:', error);
        });
        fetch("https://api.open-meteo.com/v1/forecast?latitude=54.35&longitude=18.65&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,rain,surface_pressure,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m&daily=rain_sum&timezone=Europe%2FBerlin")
        .then(response => response.json())
        .then(data => {
                setWeather({
                    ...weather,
                    temperature: data.hourly.temperature_2m[0],
                    humidity: data.hourly.relativehumidity_2m[0],
                    rainfall: data.hourly.rain[0],
                    windspeed: data.hourly.windspeed_10m[0],
                    atmosphericPressure: data.hourly.surface_pressure[0],
                    sky: data.hourly.rain[0] > 0 ? "Rainy" : data.hourly.windspeed_10m[0] > 10 ? "Windy" : data.hourly.temperature_2m[0] > 25 ? "Sunny" : data.hourly.temperature_2m[0] < 10 ? "Cold" : "Cloudy",
                })
        }).catch((error) => {
            console.error('Weather Error:', error);
        });
        fetch('http://127.0.0.1:8000/game/allRooms/')
        .then(response => response.json())
        .then(data => 
                setRooms(data.rooms)
        )
        .catch((error) => {
            console.error('Rooms Error:', error);
        });

    }, []);
    
    return(
        <>
            <TopBar userInfo = {userInfo} />
            <Switch>
                <Route path="/" element={<><WeatherAndIcon userInfo={userInfo} weather = {weather} /> <PlayButton rooms = {rooms} userInfo = {userInfo}/> </>}/> 
                <Route path="/profile" element={<ProfilePage userInfo={userInfo} />} />
                <Route path="/stats" element={<StatPage userInfo={userInfo} />} />
            </Switch>
        </>
    )
}