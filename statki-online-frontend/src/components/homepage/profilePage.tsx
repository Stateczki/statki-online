import { useEffect, useState } from "react";

export default function ProfilePage(){
    /*
    * get user info from server to be displayed
    */
    const [username, setUsername] = useState("default");
    const [email, setEmail] = useState("default");
    let playerId = 541245929;
    let premium = "no";
    fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => {
            setUsername(data.username);
            setEmail(data.email);
        });
    /**
     * return html code
     */
    return(
        <div className="text-xl text-center grid justify-self-center">
            <h1 className="underline-offset-4"><u>Account details:</u></h1>
            <ul>
                <li>Username: {username} </li>
                <li>Email: {email} </li>
                <li>Player ID: {playerId} </li>
                <li>Premium: {premium} </li>
                <li className="mt-20">Change your profile picture:</li>
                <form action="changeProfile/" method="POST" className="flex flex-col">
                    <input type="file" name="file" id="file" required className="m-auto w-80 mt-2"></input>
                    <button type="submit" className="p-2 m-auto mt-2" >Change</button>
                </form>
            </ul>
        </div>
    )
}