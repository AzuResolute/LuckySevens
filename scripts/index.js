// class

class LuckySevens {
    constructor(startingCash) {
        this._start = this._peak = this._cash = startingCash;
        this._rollCount = this._peakPosition = 0;
    }

    RollDice = () => {
        return Math.floor(Math.random() * 6) + 1;
    }

    Bet = () => {
        let Roll1 = this.RollDice();
        let Roll2 = this.RollDice();
        this._cash += (Roll1 + Roll2) === 7 ? 4 : -1;
    }
    
    UpdateRecord = () => {
        this._rollCount++;
        if(this._cash > this._peak){
            this._peak = this._cash;
            this._peakPosition = this._rollCount;
        }
    }

    Session = () => {
        while(this._cash > 0){
            this.Bet();
            this.UpdateRecord();
        }
    }

    RenderResults = () => {
        let results = document.getElementById("results");
        results.innerHTML = 
        `<h1>Results</h1>
        <table>
            <tbody>
                <tr>
                    <td>Starting Bet</td>
                    <td>$${this._start.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total Rolls Before Going Broke</td>
                    <td>${this._rollCount}</td>
                </tr>
                <tr>
                    <td>Highest Amount Won</td>
                    <td>$${this._peak.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Roll Count at Highest Amount Won</td>
                    <td>${this._peakPosition}</td>
                </tr>
            </tbody>
        </table>`
        results.style.marginTop = "1rem";
        results.style.borderTop = "2px solid black";
    }
}

let Play = () => {
    let starting = Number(document.getElementById('starting').value);
    if(starting > 0) {
        let game = new LuckySevens(starting);
        game.Session();
        game.RenderResults();
    } else {
        alert("Invalid Starting Amount");
    }
}
