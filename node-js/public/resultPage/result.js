window.onload = () => {
  getLeaderBoard();
  getScore();
  callLeaderBoard();
};

let lowestScore = 0;
let isRegistered = false;

async function getLeaderBoard() {
  const resp = await fetch(`/board`);
  const board = await resp.json();
  let htmlStr = `
    <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
    </tr>`;
  let writeScore = false;
    for (const i in board){
      if (board[i].username && i < 10){
          let rank = parseInt(i) + 1;
          if (score > board[i].score && !writeScore){
            htmlStr += `
            <tr>
            <td>${rank}</td>
            <td id="your-name"><div class="input-group">
            <input type="text" class="form-control" placeholder="Input Your Name" aria-label="Username" aria-describedby="addon-wrapping">
          </div></td>
            <td>${score}</td>
            </tr>
            `;
            writeScore = true;
          }  
          if (writeScore){
            rank += 1;
          }
          htmlStr += `
                <tr>
                    <td>${rank}</td>
                    <td>${board[i].username}</td>
                    <td>${board[i].score}</td>
                </tr>
                `
          lowestScore = board[i].score;
        }
    };
  document.querySelector("#leader-board").innerHTML = htmlStr;
  console.log(lowestScore)
}

let params = new URLSearchParams(window.location.search);
let score = parseInt(params.get("points"),10);
let correct = parseInt(params.get("correct"),10);

// get score from game
async function getScore() {
  document.querySelector('#score').innerHTML = score;
  document.querySelector('#correct').innerHTML = `${correct}/25`
}

// call leaderboard up when score is within top ten.
async function callLeaderBoard() {
  if (score > lowestScore){
    console.log("Yes you are on board")
    document.querySelector('.btn').click();
  }
}