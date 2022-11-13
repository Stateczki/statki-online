import LoggingInterface from './loggingInterface';
import RegistrationInterface from './registrationInterface';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import Homepage from './homepage';

export default function App(){
    return(
    <Router>
        <Switch>
            <Route path="/" element={<LoggingInterface/>} />
            <Route path="/register" element={<RegistrationInterface />} />                
            <Route path="/homepage/*" element={<Homepage />}/>                
        </Switch>
    </Router> 
    )
}