import {useState, useEffect} from 'react'

export default function GameScreen() {
    //GAME FUNCTIONS
        let socketUrl = `ws://127.0.0.1:8000/ws/game/${window.location.pathname.split('/')[2]}/`;
        const [gameStarted, setGameStarted] = useState(true);
        const [playersTurn, setPlayersTurn] = useState(true);
        const [enemyFound, setEnemyFound] = useState(true);
        const [userId, setUserId] = useState("default");    
        const [playerUsername, setPlayerUsername] = useState("you");
        const [enemyUsername, setEnemyUsername] = useState("opponent");
        const [socket, setSocket] = useState(new WebSocket(socketUrl));
    //WEB SOCKET STUFF
    useEffect(() => {
        fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => {
            setPlayerUsername(data.username);
            setUserId(data.id);
            socket.send(JSON.stringify({
                'type': 'connect',
                'clientId': userId,
                'message': 'User connected'
            }));
        });

        socket.onopen = () => {
            socket.send(JSON.stringify({
                'type': 'connecting',
                'message': 'User is connecting...'
            }));
        }

        socket.onclose = () => {
            socket.send(JSON.stringify({
                'type': 'disconnect',
                'clientId': userId,
                'message': 'Disconnected'
            }));
        }

        socket.onerror = (e) => {
            console.log("Error: ", e);
        }
    }, []);
    
    socket.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if(data.type == 'enemy'){
            setEnemyFound(true);
            setEnemyUsername(data.message);
            return;
        }
        if(data.type == 'turn'){
            setPlayersTurn(true);
            return;
        }
        if(data.type == 'shot'){
            enemyShot(data.id);
            return;
        }
        if(data.type == 'win'){
            alert("You win!");
            return;
        }
        if(data.type == 'lose'){
            alert("You lose!");
            return;
        }
        if(data.type == 'disconnect'){
            alert("Enemy disconnected, you win!");
            return;
        }
    }

    function sendBoard(){
        if( !checkBoard(boardToArray())) return;
        setGameStarted(true);
        const board = boardToArray();
        socket.send(JSON.stringify({
            'type': 'board',
            'clientId': userId,
            'message': board
        }));
    }

    function sendShot(ev:any){
        let id = ev.target.id;
        console.log(id);
        socket.send(JSON.stringify({
            'type': 'shot',
            'clientId': userId,
            'message': id
        }));
    }

    function enemyShot(id:any){
        let shot = document.getElementById(id);
        if(shot == null) return;
        if(shot.classList.contains('ship')){
            shot.classList.add('hit');
        } else {
            shot.classList.add('miss');
        }
    }

    //CHECK IF ARRAY CORRECT - READY
    const checkBoard = (array:any) => {
        //check if ships are not joined on the corners
        for(let i = 0; i < array.length-1; i++) {
            for(let j = 0; j < array.length-1; j++) {
                if(array[i][j] == 1) {
                    if(array[i+1][j+1] == 1) {
                        return false;
                    }
                }
            }
        }
        //check if there are not enough ships
        // index 0 - all ships, index 1 - 1mast, index 2 - 2mast, index 3 - 3mast, index 4 - 4mast
        let shipsOnMap = [0,0,0,0,0];
        let visited = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ];
        for(let i = 0; i < array.length; i++) {
            for(let j = 0; j < array.length; j++) {
                if(array[i][j] == 1 && visited[i][j] == 0) {
                    let shipLength = 1;
                    shipsOnMap[0]++;
                    visited[i][j] = 1;
                    if(j < array.length-1) {
                        if(array[i][j+1] == 1) {
                            for(let k = j+1; k < array.length; k++) {
                                if(array[i][k] == 1) {
                                    shipLength++;
                                    visited[i][k] = 1;
                                } else {
                                    break;
                                }
                            }
                        }
                    } else if(i < array.length-1) {
                        if(array[i+1][j] == 1) {
                            for(let k = i+1; k < array.length; k++) {
                                if(array[i][k] == 1) {
                                    shipLength++;
                                    visited[k][j] = 1;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                    shipsOnMap[shipLength]++;
                    }
                }
            }
        if(shipsOnMap[0] != 10 || shipsOnMap[1] != 4 || shipsOnMap[2] != 3 || shipsOnMap[3] != 2 || shipsOnMap[4] != 1) {
            return false;
        }
        return true;
    }

    //DRAG AND DROP FUNCTIONS - NOT READY
    
    function allowDrop(ev:any) {
        ev.preventDefault();
    }
    const drag = (ev:any) => {
        console.log(ev);
        /*
        let allFields = document.getElementById('user-board')!.children;        
        const shipClassName = ev.target.className;
        ev.dataTransfer.setData("className", shipClassName);
        ev.dataTransfer.setData('shipId', ev.target.id);

        //transfer coordinates of the ship
        const shipCoordinates = []
        for(let element of allFields) {
            if(element.className == shipClassName) {
            shipCoordinates.push(element.id);
            element.removeAttribute('ondragstart');
            element.removeAttribute('draggable');

            element.setAttribute('class', 'field');
            element.setAttribute('ondrop', 'drop(event)');
            element.setAttribute('ondragover', 'allowDrop(event)');
            }
        }
        ev.dataTransfer.setData('list', shipCoordinates);*/
    }
    const drop = (ev:any) => { 
        console.log(ev)
        /*
        let allFields = document.getElementById('user-board')!.children;        

        ev.preventDefault();
        const shipClass = ev.dataTransfer.getData("className");

        const shipCoordinatesText = ev.dataTransfer.getData('list');
        const distance = ev.target.id - ev.dataTransfer.getData('shipId');
        console.log(distance);

        for(let shipId of shipCoordinatesText.split(",")) {
            allFields[parseInt(shipId) + distance].removeAttribute('ondrop');
            allFields[parseInt(shipId) + distance].removeAttribute('ondragover');

            allFields[parseInt(shipId) + distance].setAttribute('class', shipClass);
            allFields[parseInt(shipId) + distance].setAttribute('ondragstart', 'drag(event)');
            allFields[parseInt(shipId) + distance].setAttribute('draggable', 'true');
        }*/
      }
    //BOARD FUNCTIONS - READY
    const board = (player:string) => {
        //array for iteration over rows and columns, defaultShips for default ships positions (those numbers are ids of fields)
        let array = [1,2,3,4,5,6,7,8,9,10];
        let defaultShips = [1,2,3,4,21,22,23,25,26,27,41,42,44,45,47,48,61,63,65,67];
        let iterator = 1;
        let ship = "ship";
        let field = "field";
        return <>
            <div className="field-h"></div>
            <div className="field-h">A</div>
            <div className="field-h">B</div>
            <div className="field-h">C</div>
            <div className="field-h">D</div>
            <div className="field-h">E</div>
            <div className="field-h">F</div>
            <div className="field-h">G</div>
            <div className="field-h">H</div>
            <div className="field-h">I</div>
            <div className="field-h">J</div>
            <div className="field-h"></div>
            {array.map((colEl) => {
                    return <>
                        <div className="field-h" key={"0_"+iterator}>{colEl}</div>
                        {array.map((rowEl)=>{
                            if(player === "player"){
                                if(defaultShips.includes(iterator))
                                    return <div className={ship} key={colEl+"_"+rowEl} id={""+iterator++} onDragStart={drag} draggable="true"></div>
                                else
                                    return <div className={field} key={colEl+"_"+rowEl} id={""+iterator++} onDrop = {drop} onDragOver={allowDrop}></div>
                            }
                            else if (player === "enemy") {
                                return <div className={field+"-enemy"} key={colEl+"_"+rowEl} id={""+iterator++} onClick={sendShot}></div>
                            }
                            
                        })}
                        <div className="field-h"></div>
                    </>
                }
            )}
            {array.map(() => {
                return <div className="field-h"></div>
            })}
            </>
    }
    
    function boardToArray() {
        let boardArray = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ];
        let iterator = 1;
        for(let i = 0; i < 10; i++)
            for(let j = 0; j < 10; j++){
                if(document.getElementById(""+iterator)!.className === "ship")
                    boardArray[i][j] = 1;
                iterator++
            }
        return boardArray;
    }
    
    //RENDER
    return (
        <div>
            
            <header className="text-center m-1 h-16">
                {!gameStarted && enemyFound && <button className="action-button" onClick={sendBoard} type="submit">Start</button>}
            </header>
            <main id="boards">
                <div>
                    <p className="text-center text-2xl">{playerUsername}</p>
                    <div id="user-board">
                        {board("player")}  
                    </div>
                </div>
                <div>
                    <p className="text-center text-2xl">{enemyUsername}</p>
                    <div id="computer-board">
                        {board("enemy")}  
                    </div>
                </div>
            </main>
            
            <footer className="text-center h-16">
            { gameStarted && playersTurn && <button className="action-button" type="submit" disabled>Your Turn</button>}
            </footer> 
            
        </div>
    )
}