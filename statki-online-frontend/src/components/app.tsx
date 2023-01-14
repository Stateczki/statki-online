import LoggingInterface from './login-and-registration/loggingInterface';
import RegistrationInterface from './login-and-registration/registrationInterface';
import GameScreen from './gameScreen';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import Homepage from './homepage/homepage';

export default function App(){
    return(
    <Router>
        <Switch>
            <Route path="/" element={<LoggingInterface/>} />
            <Route path="/register" element={<RegistrationInterface />} />                
            <Route path="/homepage/*" element={<Homepage />}/>   
            <Route path="/game/*" element={<GameScreen/>} />             
        </Switch>
    </Router> 
    )
}