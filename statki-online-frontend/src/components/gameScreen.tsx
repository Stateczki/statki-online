import {useState, useEffect} from 'react'

export default function GameScreen() {
    /*
    *   This is the main component of the game. It contains all the logic of the game.
    *   It is responsible for the game board, ships, drag and drop, web socket connection,
    *   sending and receiving messages from the server.
    *   It also contains the logic of the game, such as checking if the shot was successful,
    *   checking if the ship was sunk, checking if the game is over, etc.
    */
    let socketUrl = `ws://127.0.0.1:8000/ws/game/${window.location.pathname.split('/')[2]}/`;
    let shipsAlreadySet = false;
    const [gameStarted, setGameStarted] = useState(false);
    const [playersTurn, setPlayersTurn] = useState(true);
    const [enemyFound, setEnemyFound] = useState(true);
    const [userId, setUserId] = useState("default");    
    const [playerUsername, setPlayerUsername] = useState("you");
    const [enemyUsername, setEnemyUsername] = useState("opponent");
    const [socket, setSocket] = useState(new WebSocket(socketUrl)); 
    /* 
    *  Fetching necessary data from the server, connecting web socket and operating on messages from the server.
    *  socket.onmessage - operating on messages from the server, taking appropriate actions.
    */
    useEffect(() => {
        fetch('http://127.0.0.1:8000/userInfo/')
        .then(response => response.json())
        .then(data => {
            setPlayerUsername(data.username);
            setUserId(data.id);
            socket.send(JSON.stringify({
                'type': 'connect',
                'clientId': data.username,
                'message': 'User connected'
            }));
        });

    }, []);
    
    socket.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if(data.type == 'enemy'){
            console.log("Enemy found");
            setEnemyFound(true);
            setEnemyUsername(data.message);
            return;
        }
        if(data.type == 'turn'){
            console.log("It's my turn");
            setPlayersTurn(true);
            return;
        }
        if(data.type == 'enemyshot'){
            console.log("Enemy has shot");
            enemyShot(data.id);
            return;
        }
        if(data.type == 'yourshot'){
            console.log("You have shot");
            yourShot(data);
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


    socket.onerror = (e) => {
        console.log("Error: ", e);
    }

    

    /*
    *   Those functions are responsible for ships management, drag and drop, checking if the move is legal.
    *   isItLegallMoveBoard - checking if the ship is not out of the board.
    *   isItLegallMoveOtherShips - checking if the ship is not on another ship.
    *   drag - setting dataTransfer, which is used in drop function.
    *   drop - deleting old ship and inserting new ship.
    *   getShipSize - getting the size of the ship.
    *   allowDrop - allowing drop.
    */
    
    let allFields = document.querySelector('div#user-board')?.children;

    function getShipSize (ship:any) {
        if(ship.classList.contains('large'))
          return 4;
      
        if(ship.className.match('big'))
          return 3;
      
        if(ship.className.match('medium'))
          return 2;
      
        if(ship.className.match('small'))
          return 1;
      
        else 
          return 0;
      }

    const allowDrop = (ev:any) => {
        ev.preventDefault();
    }

    const drag = (ev:any) => {
        
        const shipClassName = ev.target.className;
        ev.dataTransfer.setData("className", shipClassName);
        ev.dataTransfer.setData('shipId', ev.target.id);
      
        //Transfer coordinates of the ship
        const shipCoordinates = []
        for(let element of allFields!) 
          if(element.className == shipClassName)
            shipCoordinates.push(element.id);
      
        ev.dataTransfer.setData('list', shipCoordinates);
    }
    
    const drop = (ev:any) => {
        ev.preventDefault();

        const shipClassName = ev.dataTransfer.getData("className");

        const shipCoordinatesText = ev.dataTransfer.getData('list');
        const movementDistance = ev.target.id - ev.dataTransfer.getData('shipId');

        if(!isItLegallMoveBoard(shipCoordinatesText.split(","), movementDistance))
            return;

        if(!isItLegallMoveOtherShips(shipCoordinatesText.split(","), movementDistance))
            return;

        //Delete old ship
        for(let shipId of shipCoordinatesText.split(",")) {

            allFields![parseInt(shipId)].removeAttribute('draggable');
            allFields![parseInt(shipId)].setAttribute('class', 'field');
        }
        //Insert new ship
        for(let shipId of shipCoordinatesText.split(",")) {
            allFields![parseInt(shipId) + movementDistance].setAttribute('class', shipClassName);
            allFields![parseInt(shipId) + movementDistance].setAttribute('draggable', 'true');
        }
    }
    function isItLegallMoveBoard(oldShipCoordinates:any, movementDistance:any) {


        let minOldCoordinates = parseInt(oldShipCoordinates[0]);
        let maxOldCoordinates = parseInt(oldShipCoordinates[oldShipCoordinates.length - 1]);
      
        let minNewCoordinates = minOldCoordinates + movementDistance;
        let maxNewCoordinates = maxOldCoordinates + movementDistance;
      
        //Out off the map
        if(minNewCoordinates <  12)
          return false;
        if(maxNewCoordinates > 121)
          return false;
      
        //Cliked ship is horizontal
        if(parseInt(oldShipCoordinates[1]) - parseInt(oldShipCoordinates[0]) == 1) {
      
          //There are fields on different rows
          if(Math.floor(minNewCoordinates / 11) != Math.floor(maxNewCoordinates / 11))
            return false;
          
          //Field out off the map on the left side
          if(minNewCoordinates % 11 == 0)
            return false;
        }
      
        //Otherwise clied ship is vertical. Above conditions are enough.
      
        return true;
      }

    function isItLegallMoveOtherShips(oldShipCoordinates:any, movementDistance:any) {

        let newShipCoordinates = [];

        for(let coordinates of oldShipCoordinates) {
            newShipCoordinates.push(parseInt(coordinates) + movementDistance);
        }

        const shipClassName = allFields![oldShipCoordinates[0]].className;
        let allShipsCoordinates = [];

        for(let element of allFields!) 
            if(element.classList.contains('ship') && element.className != shipClassName)
                allShipsCoordinates.push(parseInt(element.id));

        for(let coordinates of newShipCoordinates)
            for(let freeSpace of [0, -1, 1, -11, 11, -10, 10, -12, 12])
            if(allShipsCoordinates.includes(coordinates + freeSpace))
                return false;
            
        return true;
    }
      
    const rotation = (ev:any) => {
        if(gameStarted) return;
        const shipClassName = ev.target.className;
        const shipCoordinates = [];
      
        for(let element of allFields!) 
          if(element.className == shipClassName)
            shipCoordinates.push(element.id);
        
        const shipSize = getShipSize(ev.target);
        const pivotPointId = parseInt(shipCoordinates[0]);
        
        if(shipSize == 1)
          return;
      
        //Clicked ship is horizontal. We need to check the correctness of the move
        if(parseInt(shipCoordinates[1]) - parseInt(shipCoordinates[0]) == 1) {
      
          let newShipCoordinates = [];
          
          for(let i = 0; i < shipSize; i++)
            newShipCoordinates.push(pivotPointId + 11 * i);
      
          if(!isItLegallMoveBoard(newShipCoordinates, 0))
            return;
      
          if(!isItLegallMoveOtherShips(newShipCoordinates, 0))
            return;
        }
      
        //Cliked ship is vertival. We also need to check the correctness of the move
        else {
      
          let newShipCoordinates = [];
      
          for(let i = 0; i < shipSize; i++)
            newShipCoordinates.push(pivotPointId + i);
      
          if(!isItLegallMoveBoard(newShipCoordinates, 0))
            return;
      
          if(!isItLegallMoveOtherShips(newShipCoordinates, 0))
            return;
        }
      
        //erase old ship
        for(let i = 0; i < shipSize; i++) {
      
          allFields![parseInt(shipCoordinates[i])].removeAttribute('draggable');
      
          allFields![parseInt(shipCoordinates[i])].setAttribute('class', 'field');
          }
      
        //Clicked ship is horizontal
        if(parseInt(shipCoordinates[1]) - parseInt(shipCoordinates[0]) == 1) {
      
          for(let i = 0; i < shipSize; i++) {
      
      
          allFields![pivotPointId + 11 * i].setAttribute('class', shipClassName);
          allFields![pivotPointId + 11 * i].setAttribute('draggable', 'true');
          }
        }
      
        //Cliked ship is vertical
        else {
      
          for(let i = 0; i < shipSize; i++) {        
            allFields![pivotPointId + i].setAttribute('class', shipClassName);
            allFields![pivotPointId + i].setAttribute('draggable', 'true');
          }
        }
      }
    

    /**
     * sendBoard() - send board to server
     * sendShot() - send your shot to server
     * enemyShot() - show enemy shot on your board
     * yourShot() - show your shot on enemy board
     */
    function sendBoard(){
        if(gameStarted || !enemyFound) return;
        setGameStarted(true);
        const board = boardToArray();
        socket.send(JSON.stringify({
            'type': 'board',
            'clientId': userId,
            'message': board
        }));
        for(let element of allFields!) {
            element.setAttribute('draggable', 'false');
        }
    }

    function sendShot(ev:any){
        if(!playersTurn) return;
        if(ev.target.classList.match(/(hit|miss)/)) return;
        let id = ev.target.id;
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
            shot.classList.add('player-hit');
        } else {
            shot.classList.add('player-miss');
        }
    }

    function yourShot(data:any){
        let shot = document.getElementById(data.id);
        if(shot == null) return;
        if(data.type === 'hit'){
            shot.classList.add('enemy-hit');
        } else {
            shot.classList.add('enemy-miss');
        }
    }

    /*
    *   setShipSizes() - sets the size of the ships on the board, adding classes to the fields
    *   boardToArray() - converts the board to an array to be sent to the server
    *   board() - creates the board, rednering html elements
    */
    function setShipSizes(){
        if(shipsAlreadySet) return;
        document.getElementById("12")?.classList.add("large");
        document.getElementById("13")?.classList.add("large");
        document.getElementById("14")?.classList.add("large");
        document.getElementById("15")?.classList.add("large");
        document.getElementById("34")?.classList.add("big-1");
        document.getElementById("35")?.classList.add("big-1");
        document.getElementById("36")?.classList.add("big-1");
        document.getElementById("38")?.classList.add("big-2");
        document.getElementById("39")?.classList.add("big-2");
        document.getElementById("40")?.classList.add("big-2");
        document.getElementById("56")?.classList.add("medium-1");
        document.getElementById("57")?.classList.add("medium-1");
        document.getElementById("59")?.classList.add("medium-2");
        document.getElementById("60")?.classList.add("medium-2");
        document.getElementById("62")?.classList.add("medium-3");
        document.getElementById("63")?.classList.add("medium-3");
        document.getElementById("78")?.classList.add("small-1");
        document.getElementById("80")?.classList.add("small-2");
        document.getElementById("82")?.classList.add("small-3");
        document.getElementById("84")?.classList.add("small-4");
        shipsAlreadySet = true;
    }
    
    const board = (player:string) => {
        //array for iteration over rows and columns, defaultShips for default ships positions (those numbers are ids of fields)
        let array = [1,2,3,4,5,6,7,8,9,10];
        //DO NOT CHANGE WITHOUT CHANGING SHIPS CLASSES
        let defaultShips = [12,13,14,15,34,35,36,38,39,40,56,57,59,60,62,63,78,80,82,84];

        let iterator = 11;
        let ship = "ship";
        let field = "field";
        return <>
            <div className="field-h" id="0"></div>
            <div className="field-h" id="1">A</div>
            <div className="field-h" id="2">B</div>
            <div className="field-h" id="3">C</div>
            <div className="field-h" id="4">D</div>
            <div className="field-h" id="5">E</div>
            <div className="field-h" id="6">F</div>
            <div className="field-h" id="7">G</div>
            <div className="field-h" id="8">H</div>
            <div className="field-h" id="9">I</div>
            <div className="field-h" id="10">J</div>
            {array.map((colEl) => {

                    return <>
                        <div className="field-h" key={"0_"+iterator} id={""+iterator++}>{colEl}</div>
                        {array.map((rowEl)=>{
                            if(player === "player"){
                                if(defaultShips.includes(iterator))
                                    return <div className={ship} key={colEl+"_"+rowEl} id={""+iterator++} onClick = {(event) => rotation(event)} onDragStart = {(event) => drag(event)} onDrop = {(event) => drop(event)} onDragOver={(event) => allowDrop(event)} draggable="true"></div>
                                else
                                    return <div className={field} key={colEl+"_"+rowEl} id={""+iterator++} onClick = {(event) => rotation(event)} onDragStart = {(event) => drag(event)} onDrop = {(event) => drop(event)} onDragOver={(event) => allowDrop(event)}></div>
                            }
                            else if (player === "enemy") {
                                return <div className={field+"-enemy"} key={colEl+"_"+rowEl} id={""+iterator++} onClick={sendShot}></div>
                            }
                            
                        })}
                    </>
                }
            )
            }
            {console.log("THE BOARD HAS BEEN RERENDERED")}
            {setShipSizes()}
            </>
    }
    
    function boardToArray() {
        let boardArray = [
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0]
        ];
        let iterator = 0;
        for(let i = 0; i < 11; i++)
            for(let j = 0; j < 11; j++){
                if(document.getElementById(""+iterator)!.classList.contains("ship"))
                    boardArray[i][j] = 1;
                iterator++;
            }
        return boardArray;
    }
    
    /*
    *   Rendering html
     */
    return (
        <div>
            <header className="text-center m-1 h-16">
                {!gameStarted && enemyFound && <button className="action-button" onClick={sendBoard} type="submit">Start</button>}
            </header>
            <main id="boards" className='flex justify-evenly'>
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
