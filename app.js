let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let clickSound = document.querySelector("#clickSound");
let drawSound = document.querySelector("#drawSound");
let winnerSound = document.querySelector("#winnerSound");

let turnO = true;  //If this value true=>print O  &  false=>print X.

const winPatterns = [  //2D Array [[],[],[],[],[]];
    [0,1,2],           //patterns from Tick Cross box all possible winning patterns; 0,1,2,3,4,5,6,7,8
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
    clickSound.currentTime = 0;                  //sound start se play
    clickSound.play();                          //instant sound
    enableboxes();
    msgContainer.classList.add("hide");          //hide class show ho jaye gi
    resetBtn.classList.remove("hide");           ////Yani hide class remove → .hide{display:none;} → button wapis.
}

for(box of boxes){
    
}
boxes.forEach((box) => {                        //box is a individual box
    box.addEventListener("click", () => {       //click krney se ye arrow function chaley 
        clickSound.currentTime = 0;
        clickSound.play();                      //hr click pr sound chaley isliye loop main rakha
        if(turnO){    //means if(turnO === true) => Player-O
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;                      //O print krney k baad turn ko X(false) kr diya 
        } else {     //means if(turnO === false) => Player-X
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;                      //again X print k baad bari(turn) change 
        }
        box.disabled = true;                   //dobara click se value change ho rhi thi hi box main X->O->X->O ; ab box disabled kr diya just 1 click bs khatam box

        checkwinner();                        //function call
    });
});

const checkDraw = () => {
    let isDraw = true;    //board ke sab boxes filled hon ; agar baad me koi empty box mile → false karenge.
    for(box of boxes){
        if(box.innerText === ""){
            isDraw = false;   // agar koi empty box hai → draw nahi
            break;            //loop stop, kyunki ek empty box hi draw ko cancel karta hai
        }
    }
    if(isDraw){               //Agar isDraw true hai → matlab sab boxes filled hain
        for(box of boxes){
            box.classList.add("winner");      //sab 9 boxes me .winner class(styling css)lag jayegi
        }
        showWinner("Draw");
        disableboxes();
        resetBtn.classList.add("hide");
    }
}

const showWinner = (winner) => {                    //argument hai winner → ye X, O, ya "Draw" ho sakta hai.
    if(winner === "Draw"){                          //Agar winner "Draw" hai → matlab board full hai aur koi jeeta nahi
        msg.innerText = `Game Draw!`;
        drawSound.play();
    } else {
        msg.innerText = `Congatulations, winner is ${winner}`;
        winnerSound.play();
    }
    msgContainer.classList.remove("hide");             //upper msg hide hoga jaisi hi win to wo hide-class yahan remove krdi
    resetBtn.classList.add("hide");                    //Yani hide class add → .hide{display:none;} → button gaib.
}

const disableboxes = () => {           //win k baad or button na press hon / disabled
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableboxes = () => {            //for restart / enabled
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o","x","winner");    //ye 3 classes remove,means x or o k color khatam
    }
}

const checkwinner = () => {

    let winnerFound = false;          //winner mila to sahi warna draw tak jana hoga isliye

    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;    //first box
        let pos2Val = boxes[pattern[1]].innerText;    //second box
        let pos3Val = boxes[pattern[2]].innerText;    //third box

        if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){   //Agar teeno empty na ho
            if(pos1Val === pos2Val && pos2Val === pos3Val){     //Agar teeno same ho (X ya O) → winner

                boxes[pattern[0]].classList.add("winner");       //winnig pattern highlight
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");

                showWinner(pos1Val);                         //function call & argument passed
                disableboxes();
                winnerFound = true;
                break;
            }
        }
    }
    if(!winnerFound){      
        checkDraw();       //Winner nahi → winnerFound = false → checkDraw() call
    }                      //Winner → winnerFound = true → draw check skip
};

newGameBtn.addEventListener("click",restGame);    //in dono ko click krney se restart ho jaye
resetBtn.addEventListener("click",restGame);