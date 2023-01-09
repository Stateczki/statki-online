import { useState } from "react";

export default function PlayButton(){
    //GET ROOMS AND USER ID
    const [userId, setUserId] = useState([]);
    fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => setUserId(data.id));
    const [rooms, setRooms] = useState([
        { roomName: "EMPTY" }
    ]);
    fetch('http://127.0.0.1:8000/game/allRooms/')
        .then(response => response.json())
        .then(data => setRooms(data));
    // OUTPUT ALL AVILABLE ROOMS
    function mapAllRooms(){
        console.log(rooms)
        return rooms.map((room) => {
            return (
                <li>
                    <form action="game/joinRoom" method="POST">
                        <input type="hidden" name="userId" value={userId}></input>
                        <input type="hidden" name="roomName" value={room.roomName}></input>
                        <button type="submit" className="m-2 p-2 w-36">{room.roomName}</button>
                    </form>
                </li>
            )
        })
    }
    return (
        <main className="flex justify-center">
            <div>
                <h1 className="text-2xl text-center">Play</h1>
                <form action="game/createRoom" method="POST">
                    <input type="hidden" name="userId" value={userId}></input>
                    <input type="text" name="roomName" placeholder="Room name"></input>
                    <button type="submit" className="m-2 p-2 w-36">Create Room</button>
                </form>
                <form action = "game/joinRoom" method="POST">
                    <input type="hidden" name="userId" value={userId}></input>
                    <input type="text" name="roomName" placeholder="Room name"></input>
                    <button type="submit" className="m-2 p-2 w-36">Join Room</button>
                </form>
                <h1 className="text-2xl text-center">List of rooms:</h1>
                
                <ul id="roomList" className="flex w-96 flex-wrap justify-evenly">
                    <li>
                        <form action="game/joinRoom" method="POST">
                            <input type="hidden" name="userId" value={userId}></input>
                            <input type="hidden" name="roomName" value='1'></input>
                            <button type="submit" className="m-2 p-2 w-36">Prop room</button>
                        </form>
                    </li>
                    {
                        mapAllRooms()
                    }
                </ul>
            </div>
        </main>
    )
}