// Selecting input Box
var guessnumber = document.getElementById("guessnumber");

// Select The Result
var your = document.getElementById("your");
var computer = document.getElementById("computer");
var score = document.getElementById("score");
var scoreresult = 10;
score.textContent = scoreresult;
// Function For The Button Click Event
function check() {
  // Creating a Random Number
  var randomnumber = Math.floor(Math.random() * 10) + 1;
  // Store Text to Number
  var entenrednumber = guessnumber.value;
  if (scoreresult > 0) {
    if (entenrednumber <= 10) {
      if (entenrednumber === "" || entenrednumber == null) {
        alert("Please Enter The Number");
      } else {
        if (randomnumber == entenrednumber) {
          your.textContent = entenrednumber;
          computer.textContent = randomnumber;
          alert("Right");
          scoreresult = scoreresult + 1;
          score.textContent = scoreresult;
        } else {
          your.textContent = entenrednumber;
          computer.textContent = randomnumber;
          //   alert("Wrong");
          scoreresult = scoreresult - 1;
          score.textContent = scoreresult;
        }
      }
    } else {
      alert("Please Enter 1-10 Numbers only");
    }
  } else {
    alert("You Lose The Game! Please Refresh The Page");
  }
}
