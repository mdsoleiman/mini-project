document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let reset = document.querySelector("#reset");
    let newGame = document.querySelector("#Newgame");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    console.log(msgContainer); // Check if this logs the correct element
    console.log(msg); // Check if this logs the correct element

    let turnO = true;
    const winPattern = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("box was clicked");
            if (box.innerText === "") {
                box.innerText = turnO ? "O" : "X";
                turnO = !turnO;
                box.disabled = true;
                checkWinner();
            }
        });
    });

    const showWinner = (winner) => {
        if (msg && msgContainer) {
            msg.innerText = `Congratulations, ${winner} wins!`;
            msgContainer.classList.remove("hide");
        } else {
            console.error("msgContainer or msg is null");
        }
    };

    const showDraw = () => {
        if (msg && msgContainer) {
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hide");
        }
    };

    const checkWinner = () => {
        for (let pattern of winPattern) {
            let [a, b, c] = pattern;
            let pos1val = boxes[a].innerText;
            let pos2val = boxes[b].innerText;
            let pos3val = boxes[c].innerText;

            if (pos1val !== "" && pos1val === pos2val && pos1val === pos3val) {
                showWinner(pos1val);
                return;
            }
        }

        // Check for a draw
        const isDraw = [...boxes].every(box => box.innerText !== "");
        if (isDraw) {
            showDraw();
        }
    };

    const resetGame = () => {
        boxes.forEach(box => box.innerText = "");
        msgContainer.classList.add("hide");
        turnO = true;
    };

    // Attach event listeners for reset and new game buttons
    reset.addEventListener("click", resetGame);
    newGame.addEventListener("click", resetGame);
});
