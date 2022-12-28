export default function PlayButton(){
    let userId = 2137;
    return (
        <main className="flex justify-center">
            <form action="game" method="POST">
                <input type="hidden" name="userId" value={userId} />
                <button type="submit" className="p-10 w-72 text-4xl transition-colors ease-in delay-250" >
                    Play
                </button>
            </form>
        </main>
    )
}