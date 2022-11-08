window.onload = () => {
  getLeaderBoard();
};

async function getLeaderBoard() {
  const resp = await fetch(`/board`);
  const board = await resp.json();
  let htmlStr = `
    <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
    </tr>`;
    for (const i in board){
        if (board[i].username){
            console.log(i)
            htmlStr += `
                <tr>
                    <td>${parseInt(i)+1}</td>
                    <td>${board[i].username}</td>
                    <td>${board[i].score}</td>
                </tr>
                `
        }
    };
  document.querySelector("#leader-board").innerHTML = htmlStr;
}
