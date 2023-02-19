export default function StatPage(props:any){
    const userInfo = props.userInfo;
    /*
    * Default user stats to be displayed if server does not provide any
    */
    let games = 12;
    let wins = 5;
    let loses = games - wins;
    let winrate = Math.floor(wins / games *100);
    let shots = 70;
    let hits = 34;
    let hitratio = Math.floor(hits/shots *100);
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