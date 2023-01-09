export default function PlayButton(){
    let userId = 2137;
    let roomID = 1;
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
                            <input type="hidden" name="roomName" value={roomID}></input>
                            <button type="submit" className="m-2 p-2 w-36">Room 1</button>
                        </form>
                    </li>
                </ul>
            </div>
        </main>
    )
}