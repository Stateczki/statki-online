import React from 'react';
function allowDrop(ev:any) {
    ev.preventDefault();
}
function drag(ev:any) {
    let allFields = document.getElementById('user-board')!.children;        
    const shipClassName = ev.target.className;
    const shipId = ev.target.id;
    ev.dataTransfer.setData("className", shipClassName);
    ev.dataTransfer.setData("shipId", shipId);

    //transfer coordinates of the ship
    const shipCoordinates = []
    for(let element of allFields) {
        if(element.className == shipClassName) {
        shipCoordinates.push(element.id);
        element.removeAttribute("ondragstart");
        element.removeAttribute("draggable");
        element.setAttribute("class", "field");
        element.setAttribute("ondrop", "this.drop");
        element.setAttribute("ondragover", "this.allowDrop");
        }
    }
    ev.dataTransfer.setData('list', shipCoordinates);
}

function drop(ev:any) {
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
        allFields[parseInt(shipId) + distance].setAttribute('ondragstart', 'drag');
        allFields[parseInt(shipId) + distance].setAttribute('draggable', 'true');
    }
}
export default function GameScreen(this: any) {
    React.useEffect(() => {
        //get all fields
        let allFields = document.getElementById('user-board')!.children;        
        
        //set appropriate properties
        let fieldId = 0;
        for(let element of allFields) {
            element.setAttribute('id', String(fieldId));

            if(element.getAttribute('class') == 'field') {
                element.setAttribute('ondrop', 'drop');
                element.setAttribute('ondragover', 'allowDrop');
            }
            if(element.classList.contains('ship')) {
                element.setAttribute('ondragstart', 'drag');
                element.setAttribute('draggable', 'true');
            }
            
            fieldId++;
        } 
    }, []);
    
    return (
        <div>
            <div id="start">
                <button id="start-button">Start</button>
            </div>

            <div id="boards">
                <div id="user-board">
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
                    <div className="field-h">1</div>
                    <div className="ship large"></div>
                    <div className="ship large"></div>
                    <div className="ship large"></div>
                    <div className="ship large"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">2</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">3</div>
                    <div className="ship big-1"></div>
                    <div className="ship big-1"></div>
                    <div className="ship big-1"></div>
                    <div className="field"></div>
                    <div className="ship big-2"></div>
                    <div className="ship big-2"></div>
                    <div className="ship big-2"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">4</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">5</div>
                    <div className="ship medium-1"></div>
                    <div className="ship medium-1"></div>
                    <div className="field"></div>
                    <div className="ship medium-2"></div>
                    <div className="ship medium-2"></div>
                    <div className="field"></div>
                    <div className="ship medium-3"></div>
                    <div className="ship medium-3"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">6</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">7</div>
                    <div className="ship small-1"></div>
                    <div className="field"></div>
                    <div className="ship small-2"></div>
                    <div className="field"></div>
                    <div className="ship small-3"></div>
                    <div className="field"></div>
                    <div className="ship small-4"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">8</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">9</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">10</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                </div>

                <div id="computer-board">
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
                    <div className="field-h">1</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">2</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">3</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">4</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">5</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">6</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">7</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">8</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">9</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field-h">10</div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                </div>
            </div>
        </div>
    )
}


