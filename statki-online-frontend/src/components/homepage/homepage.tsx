import PlayButton from "./playButton";
import TopBar from "./topBar";
import WeatherAndIcon from "./weatherAndIcon";
import {
    Route,
    Routes as Switch,
  } from 'react-router-dom';
import ProfilePage from "./profilePage";
import StatPage from "./statPage";

export default function Homepage() {
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