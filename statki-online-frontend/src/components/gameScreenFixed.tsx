import {useEffect} from 'react'
export default function gameScreenFixed() {
    //check if the array is correct
    let arr1 = [
        [1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,0,1,1,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,1,0,1,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    let arr2 = [
        [1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,0,1,1,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,1,0,1,0,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    let arr3 = [
        [1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,0,1,1,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,1,0,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
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

    //DRAG AND DROP FUNCTIONS
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
    //BOARD FUNCTION
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
            {array.map((colEl) => {
                    return <>
                        <div className="field-h" key={"0_"+iterator}>{colEl}</div>
                        {array.map((rowEl)=>{
                            if(defaultShips.includes(iterator) && player === "player")
                                return <div className={ship} key={colEl+"_"+rowEl} id={""+iterator++} onDragStart={drag} draggable="true"></div>
                            else
                                return <div className={field} key={colEl+"_"+rowEl} id={""+iterator++} onDrop = {drop} onDragOver={allowDrop}></div>
                        })}
                    </>
                }
            )}
            </>
    }
    
    async function boardToArray(board:any) {
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
        
        return boardArray;
    }
    function sendBoard(board:any) {
        console.log(board);
    }
    function readCheckSend(){
        let board = document.getElementById('user-board')!.children;
        console.log(board);
        /*
        let boardArray = boardToArray(board);
        if(checkBoard(board))
            sendBoard(board);
        else{
            alert("Wrong board");
            console.log(board);
        }*/
    }
    return (
        <div>
            <header id="start">
                    <button id="start-button" onClick={readCheckSend}>Start</button>
            </header>
            <main id="boards">
                <div id="user-board">
                    {board("player")}  
                </div>
                <div id="computer-board">
                    {board("enemy")}  
                </div>
            </main>
        </div>
    )
}