export default function ProfilePage(){
     //ACCOUNT STATS
     let username = "PapiezPolak";
     let email = "papiez.polak@gmail.va";
     let playerId = 2137911420;
     let premium = "yes";
    return(
        <div className="text-xl grid justify-self-center">
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