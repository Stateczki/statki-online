import { useEffect, useState } from "react";

export default function ProfilePage(props:any){
    const userInfo = props.userInfo;
    return(
        <div className="text-xl text-center grid justify-self-center">
            <h1 className="underline-offset-4"><u>Account details:</u></h1>
            <ul>
                <li>Username: {userInfo.username} </li>
                <li>Email: {userInfo.email} </li>
                <li>Player ID: {userInfo.id} </li>
                <li>Premium: {userInfo.premium} </li>
                <li className="mt-20">Change your profile picture:</li>
                <form action="changeProfile/" method="POST" className="flex flex-col">
                    <input type="file" name="file" id="file" required className="m-auto w-80 mt-2"></input>
                    <button type="submit" className="p-2 m-auto mt-2" >Change</button>
                </form>
            </ul>
        </div>
    )
}