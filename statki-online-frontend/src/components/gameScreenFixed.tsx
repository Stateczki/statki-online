export default function gameScreenFixed() {
    const board = () => {
        let array = [1,2,3,4,5,6,7,8,9,10]
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
                            return <div className="field" id={""+iterator} key={iterator++}></div>
                        })}
                    </>
                }
            )}
            </>
    }

    return (
        <>
        <div id="start">
                <button id="start-button">Start</button>
        </div>

        <div id="boards">
            <div id="user-board">
                {board()}  
            </div>
            <div id="computer-board">
                {board()}  
            </div>
        </div>
        

        </>
    )
}