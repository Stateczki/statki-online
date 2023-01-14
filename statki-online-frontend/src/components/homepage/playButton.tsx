import { useEffect, useState } from "react";

export default function PlayButton(){
    const [userId, setUserId] = useState([]);
    const [rooms, setRooms] = useState([
        { id: 9999, room_name: "empty" }
    ]);
    //GET ROOMS AND USER ID
    useEffect(() => {
        fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => setUserId(data.id));

        fetch('http://127.0.0.1:8000/game/allRooms/')
        .then(response => response.json())
        .then(data => {
            setRooms(data.rooms);
            console.log(rooms);
        });
    }, []);
    
    
    // OUTPUT ALL AVILABLE ROOMS
    return (
        <main className="flex justify-center">
            <div>
                <h1 className="text-2xl text-center">Play</h1>
                <form action="createRoom/" method="POST">
                    <input type="hidden" name="userId" value={userId}></input>
                    <input type="text" name="room_name" placeholder="Room name"></input>
                    <button type="submit" className="m-2 p-2 w-36">Create Room</button>
                </form>
                <form action = "joinRoom/" method="POST">
                    <input type="hidden" name="userId" value={userId}></input>
                    <input type="text" name="room_name" placeholder="Room name"></input>
                    <button type="submit" className="m-2 p-2 w-36">Join Room</button>
                </form>
                <h1 className="text-2xl text-center">List of rooms:</h1>
                
                <ul id="roomList" className="flex w-96 flex-wrap justify-evenly">
                        {
                            rooms.map((room) => (
                                <li key={room.id}>
                                    <form action="joinRoom/" method="POST">
                                        <input type="hidden" name="userId" value={userId} className="text-black"></input>
                                        <input type="hidden" name="room_name" value={room.room_name} className="text-black"></input>
                                        <button type="submit" className="m-2 p-2 w-36">{room.room_name}</button>
                                    </form>
                                </li>
                            ))
                        }
                </ul>
            </div>
        </main>
    )
}