import { useState } from "react";
import {Link} from "react-router-dom";

export default function TopBar (props : any) {
    const userInfo = props.userInfo;
    return (
        <nav>
            <div className="flex m-2">
                <img src={userInfo.image} alt="Statek" className="mr-2 rounded-full w-10 h-auto"></img> 
                <h1 className="text-2xl ml-2">Shipstorm</h1>
            </div>
            <div className="mb-20 flex flex-row items-stretch justify-around">
                <Link to="/homepage/" className="flex-1 grid justify-self-center"><button type="button" className="transition-colors pt-4 pb-4">Homepage</button></Link>
                <Link to="/homepage/profile" className="flex-1 grid justify-self-center"><button type="button" className="transition-colors pt-4 pb-4">Profile</button></Link>
                <Link to="/homepage/stats" className="flex-1 grid justify-self-center"><button type="button" className="transition-colors pt-4 pb-4">Stats</button></Link>
            </div>
        </nav>  
    )
}