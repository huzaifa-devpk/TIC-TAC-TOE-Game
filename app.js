let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let clickSound = document.querySelector("#clickSound");
let drawSound = document.querySelector("#drawSound");
let winnerSound = document.querySelector("#winnerSound");

let turnO = true;  

const winPatterns = [  
    [0,1,2],           
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const restGame = () => {
    turnO = true; 
    clickSound.currentTime = 0;         
    clickSound.play();                     
    enableboxes();
    msgContainer.classList.add("hide");        
    resetBtn.classList.remove("hide");           
}

for(box of boxes){
    
}
boxes.forEach((box) => {                    
    box.addEventListener("click", () => {      
        clickSound.currentTime = 0;
        clickSound.play();                   
        if(turnO){   
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;                     
        } else {   
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;                     
        }
        box.disabled = true;                
        checkwinner();                   
    });
});

const checkDraw = () => {
    let isDraw = true;    
    for(box of boxes){
        if(box.innerText === ""){
            isDraw = false;  
            break;         
        }
    }
    if(isDraw){             
        for(box of boxes){
            box.classList.add("winner");     
        }
        showWinner("Draw");
        disableboxes();
        resetBtn.classList.add("hide");
    }
}

const showWinner = (winner) => {                   
    if(winner === "Draw"){                       
        msg.innerText = `Game Draw!`;
        drawSound.play();
    } else {
        msg.innerText = `Congatulations, winner is ${winner}`;
        winnerSound.play();
    }
    msgContainer.classList.remove("hide");          
    resetBtn.classList.add("hide");                 
}

const disableboxes = () => {         
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableboxes = () => {    
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o","x","winner");   
    }
}

const checkwinner = () => {

    let winnerFound = false;       

    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;   
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;    

        if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){   
            if(pos1Val === pos2Val && pos2Val === pos3Val){    

                boxes[pattern[0]].classList.add("winner");     
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");

                showWinner(pos1Val);                        
                disableboxes();
                winnerFound = true;
                break;
            }
        }
    }
    if(!winnerFound){      
        checkDraw();      
    }                     
};

newGameBtn.addEventListener("click",restGame);  
resetBtn.addEventListener("click",restGame);
