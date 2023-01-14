export default function StatPage(){
    /*
    * Default user stats to be displayed if server does not provide any
    */
    let games = 2100;
    let wins = 911;
    let loses = games - wins;
    let winrate = wins / games *100;
    let shots = 10000;
    let hits = 5900;
    let hitratio = hits/shots *100;
    /**
     * return html code
     */
    return(
        <div className="text-xl text-center">
                <h1 className="underline-offset-4"><u>Personal statistics:</u></h1>
                <ul>
                    <li>Games: {games} </li>
                    <li>Wins: {wins} </li>
                    <li>Loses: {loses} </li>
                    <li>Winrate: {winrate}% </li>
                    <li>Shots fired: {shots} </li>
                    <li>Ships hit: {hits} </li>
                    <li>Hitratio: {hitratio}% </li>
                </ul>
        </div>
    )
}