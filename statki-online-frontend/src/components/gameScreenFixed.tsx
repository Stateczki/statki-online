import {useEffect} from 'react'
export default function gameScreenFixed() {
    const board = (player:string) => {
        let array = [1,2,3,4,5,6,7,8,9,10];
        let defaultShips = [1,2,3,4,21,22,23,25,26,27,41,42,44,45,47,48,61,63,65,67];
        let iterator = 1;
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
                        <div className="field-h" key={"0_"+colEl}>{colEl}</div>
                        {array.map((rowEl)=>{
                            if(defaultShips.includes(iterator) && player === "player")
                                return <div className="large ship" key={colEl+"_"+rowEl} id={""+iterator++} onDragStart={drag} draggable="true"></div>
                            else
                                return <div className="field" key={colEl+"_"+rowEl} id={""+iterator++}></div>
                        })}
                    </>
                }
            )}
            </>
    }
    const drag = (e:any) => {console.log(e.target.id)}
    return (
        <>
        <div id="start">
                <button id="start-button">Start</button>
        </div>

        <div id="boards">
            <div id="user-board">
                {board("player")}  
            </div>
            <div id="computer-board">
                {board("enemy")}  
            </div>
        </div>
        

        </>
    )
}