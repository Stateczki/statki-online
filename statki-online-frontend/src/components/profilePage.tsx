import { useEffect, useState } from "react";

export default function ProfilePage(){
    //ACCOUNT STATS
    const [username, setUsername] = useState("default");
    const [email, setEmail] = useState("default");
    let playerId = 2137911420;
    let premium = "yes";
    let userData : any;
    fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => {
            setUsername(data.username);
            setEmail(data.email);
        });
    return(
        <div className="text-xl text-center grid justify-self-center">
            <h1 className="underline-offset-4"><u>Account details:</u></h1>
            <ul>
                <li>Username: {username} </li>
                <li>Email: {email} </li>
                <li>Player ID: {playerId} </li>
                <li>Premium: {premium}% </li>
            </ul>
        </div>
    )
}