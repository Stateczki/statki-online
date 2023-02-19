import { useEffect, useState } from "react";

export default function PlayButton(props : any){
    const rooms = props.rooms;
    const userInfo = props.userInfo;
    return (
        <main className="flex justify-center">
            <div>
                <h1 className="text-2xl text-center">Play</h1>
                <form action="createRoom/" method="POST">
                    <input type="hidden" name="userId" value={userInfo.id}></input>
                    <input type="text" name="room_name" placeholder="Room name"></input>
                    <button type="submit" className="m-2 p-2 w-36">Create Room</button>
                </form>
                <form action = "joinRoom/" method="POST">
                    <input type="hidden" name="userId" value={userInfo.id}></input>
                    <input type="text" name="room_name" placeholder="Room name"></input>
                    <button type="submit" className="m-2 p-2 w-36">Join Room</button>
                </form>
                <h1 className="text-2xl text-center">List of rooms:</h1>
                
                <ul id="roomList" className="flex w-96 flex-wrap justify-evenly">
                        {
                            rooms.map((room:any) => (
                                <li key={room.id}>
                                    <form action="joinRoom/" method="POST">
                                        <input type="hidden" name="userId" value={userInfo.id} className="text-black"></input>
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