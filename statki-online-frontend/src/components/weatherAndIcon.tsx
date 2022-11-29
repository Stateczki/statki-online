import profilowe from "../profilowe.jpg"
export default function WeatherAndIcon(){
    let temp:number = 22;
    let sky:string = "Sunny";
    let humidity:number = 80;
    let rainfall:string = "None at all";
    let atmosphericPressure = 1019;
    return(
        <main className="flex justify-around m-20">
            <div>
                <img src={profilowe} className="w-56 rounded-full"></img>
            </div>
            <div className="text-xl">
                <h1 className="underline-offset-4"><u>Today's Weather:</u></h1>
                <ul>
                    <li>Temperature: {temp} Celsius</li>
                    <li>Sky: {sky}</li>
                    <li>Humidity: {humidity}%</li>
                    <li>Rainfall: {rainfall}</li>
                    <li>Atmospheric pressure: {1019} hPa</li>
                </ul>
            </div>
        </main>
    )
}