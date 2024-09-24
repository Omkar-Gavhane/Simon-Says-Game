let gameSeq = [];
let userSeq = [];

let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let h3 = document.querySelector("h3");
let btns = ["yellow", "red", "green", "blue"];
let allBtns = document.querySelectorAll(".btn");
let startBtn = document.getElementById("start-btn");

let started = false;
let level = 0;
let highScore = 0;

let start = startBtn.addEventListener("click", () => {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerHTML = `Level ${level}`;

  let rand = Math.floor(Math.random() * 4);
  let randColor = btns[rand];
  let randBtn = document.querySelector(`.${randColor}`);
  btnFlash(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
}

function btnFlash(random) {
  random.classList.add("flash");
  setTimeout(function () {
    random.classList.remove("flash");
  }, 200);
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.getAttribute("id");

  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerText = "Game Over! Press any key to start.";
    body.classList.add("red");
    setTimeout(()=>{
        body.classList.remove("red");
    },200);
    h3.innerText = `Your score was ${level} and Highest score is ${storeHighScore()}`;
    reset();
  }
}

function storeHighScore() {
    if (highScore <= level) {
       highScore = level;
    }
    return highScore;
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
