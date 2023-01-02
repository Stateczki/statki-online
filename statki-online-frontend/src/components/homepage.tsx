import PlayButton from "./playButton";
import TopBar from "./topBar";
import WeatherAndIcon from "./weatherAndIcon";
import {
    BrowserRouter as Router,
    Route,
    Routes as Switch,
    Link
  } from 'react-router-dom';
import ProfilePage from "./profilePage";
import StatPage from "./statPage";
import { useEffect } from "react";

export default function Homepage() {
    //GETTING USER OBJECT
    useEffect(() => {
        fetch("http://localhost:8000/homepage/", {
            method: "GET",
            credentials: "include"
        }).then(response => response.json()).then(data => {
            console.log(data);
        });
    }, []);
    return(
        <>
            <TopBar />
            <Switch>
                <Route path="/" element={<><WeatherAndIcon /><PlayButton /></>}/> 
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/stats" element={<StatPage/>} />
            </Switch>
        </>
    )
}