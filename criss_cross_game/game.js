let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes =Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winner_blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let count_plays = 0

console.log(spaces)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(e){
    const id = e.target.id

    if(!spaces[id] && count_plays < 9){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() != false){
            playerText.innerText = `${currentPlayer} has won!`
            let winner_blocks = playerHasWon()
            count_plays = 10
            winner_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }
        count_plays++
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
    if(count_plays == 9) {
        playerText.innerHTML = 'Draw Game!'
        boxes.forEach(box => box.style.color = drawIndicator)
    }
}

const winning = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

function playerHasWon() {
    for(const condition of winning) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b]) && (spaces[a] == spaces[c])) {
            return [a,b,c]
        } 
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    count_plays = 0
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
        box.style.color = '#F2C14E'
    })

    playerText.innerText = `Criss Cross`

    currentPlayer = X_TEXT
}

startGame()