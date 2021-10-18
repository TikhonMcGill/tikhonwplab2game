function Bear() {
  this.dBear = 100;
  this.htmlElement = document.getElementById("bear");
  this.id = this.htmlElement.id;
  this.x = this.htmlElement.offsetLeft;
  this.y = this.htmlElement.offsetTop;
  this.move = function (xDir, yDir) {
    this.fitBounds(); //we add this instruction to keep bear within board
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    this.display();
  };

  this.display = function () {
    this.htmlElement.style.left = this.x + "px";
    this.htmlElement.style.top = this.y + "px";
    this.htmlElement.style.display = "block";
  };

  this.fitBounds = function () {
    let parent = this.htmlElement.parentElement;
    let iw = this.htmlElement.offsetWidth;
    let ih = this.htmlElement.offsetHeight;
    let l = parent.offsetLeft;
    let t = parent.offsetTop;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    if (this.x < 0) this.x = 0;
    if (this.x > w - iw) this.x = w - iw;
    if (this.y < 0) this.y = 0;
    if (this.y > h - ih) this.y = h - ih;
  };

  this.setSpeed = function (speedToSet) {
    if (isNaN(speedToSet)) {
      window.alert("Invalid bear speed!");
    } else {
      this.dBear = speedToSet;
    }
  };
}

// Handle keyboad events
// to move the bear
function moveBear(e) {
  //codes of the four keys
  duration = document.getElementById("duration");
  let longestDuration = Number(duration.innerHTML);
  if (longestDuration === 0) {
    lastStingTime = new Date();
  }
  const KEYUP = 38;
  const KEYDOWN = 40;
  const KEYLEFT = 37;
  const KEYRIGHT = 39;
  if (e.keyCode === KEYRIGHT) {
    bear.move(1, 0);
  } // right key
  if (e.keyCode === KEYLEFT) {
    bear.move(-1, 0);
  } // left key
  if (e.keyCode === KEYUP) {
    bear.move(0, -1);
  } // up key
  if (e.keyCode === KEYDOWN) {
    bear.move(0, 1);
  } // down key
}

function createBeeImg(wNum) {
  //get dimension and position of board div
  let boardDiv = document.getElementById("board");
  let boardDivW = boardDiv.offsetWidth;
  let boardDivH = boardDiv.offsetHeight;
  let boardDivX = boardDiv.offsetLeft;
  let boardDivY = boardDiv.offsetTop;
  //create the IMG element
  let img = document.createElement("img");
  img.setAttribute("src", "images/bee.gif");
  img.setAttribute("width", "100");
  img.setAttribute("alt", "A bee!");
  img.setAttribute("id", "bee" + wNum);
  img.setAttribute("class", "bee"); //set class of html tag img
  //add the IMG element to the DOM as a child of the board div
  img.style.position = "absolute";
  boardDiv.appendChild(img);
  //set initial position
  let x = getRandomInt(boardDivW);
  let y = getRandomInt(boardDivH);
  img.style.left = boardDivX + x + "px";
  img.style.top = y + "px";
  //return the img object
  return img;
}

class Bee {
  constructor(beeNumber) {
    //the HTML element corresponding to the IMG of the bee
    this.htmlElement = createBeeImg(beeNumber);
    //iits HTML ID
    this.id = this.htmlElement.id;
    //the left position (x)
    this.x = this.htmlElement.offsetLeft;
    //the top position (y)
    this.y = this.htmlElement.offsetTop;
    this.move = function (dx, dy) {
      //move the bees by dx, dy
      this.x += dx;
      this.y += dy;
      this.display();
    };
    this.display = function () {
      //adjust position of bee and display it
      this.fitBounds(); //add this to adjust to bounds
      this.htmlElement.style.left = this.x + "px";
      this.htmlElement.style.top = this.y + "px";
      this.htmlElement.style.display = "block";
    };
    this.fitBounds = function () {
      //check and make sure the bees stays in the board space
      let parent = this.htmlElement.parentElement;
      let iw = this.htmlElement.offsetWidth;
      let ih = this.htmlElement.offsetHeight;
      let l = parent.offsetLeft;
      let t = parent.offsetTop;
      let w = parent.offsetWidth;
      let h = parent.offsetHeight;
      if (this.x < 0) this.x = 0;
      if (this.x > w - iw) this.x = w - iw;
      if (this.y < 0) this.y = 0;
      if (this.y > h - ih) this.y = h - ih;
    };
  }
}

function makeBees() {
  //remove all previous bees, if any
  if (bees.length > 0) {
    deleteBees();
  }
  //get number of bees specified by the user
  let nbBees = document.getElementById("nbBees").value;
  nbBees = Number(nbBees); //try converting the content of the input to a number
  if (isNaN(nbBees)) {
    //check that the input field contains a valid number
    window.alert("Invalid number of bees");
    return;
  }
  //create bees
  let i = 1;
  while (i <= nbBees) {
    var num = i;
    var bee;
    bee = new Bee(num); //create object and its IMG element
    bee.display(); //display the bee
    bees.push(bee); //add the bee object to the bees array
    i++;
  }
}

function addBee() {
  //get number of bees specified by the user
  var beeCountHolder = document.getElementById("nbBees");
  beeCountHolder.value = Number(beeCountHolder.value) + 1;

  //create bee
  var bee = new Bee(beeCountHolder.value); //create object and its IMG element
  bee.display(); //display the bee
  bees.push(bee); //add the bee object to the bees array
}

function moveBees() {
  if (lastStingTime) {
    if (getRandomInt(100) === 1) {
      //With a 1 in 100 chance, play the buzz sound
      playBeeBuzzSound();
    }
    //get speed input field value
    let speed = document.getElementById("speedBees").value;
    //move each bee to a random location
    for (let i = 0; i < bees.length; i++) {
      let dx = getRandomInt(2 * speed) - speed;
      let dy = getRandomInt(2 * speed) - speed;
      bees[i].move(dx, dy);
      isHit(bees[i], bear); //we add this to count stings
    }
  }
}

function updateBees() {
  // update loop for game
  //move the bees randomly
  moveBees();
  //use a fixed update period
  let period = document.getElementById("beePeriod").value; //modify this to control refresh period
  //update the timer for the next move
  let stings = hits.innerHTML;
  if (stings >= 1000) {
    updateTimer = clearTimeout();
    deleteBees();
    createGameOverSign();
  } else {
    updateTimer = setTimeout("updateBees()", period);
  }
}

function overlap(element1, element2) {
  //consider the two rectangles wrapping the two elements
  //rectangle of the first element
  var left1 = element1.htmlElement.offsetLeft;
  var top1 = element1.htmlElement.offsetTop;
  var right1 =
    element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
  var bottom1 =
    element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;
  //rectangle of the second element
  var left2 = element2.htmlElement.offsetLeft; //e2x
  var top2 = element2.htmlElement.offsetTop; //e2y
  var right2 =
    element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
  var bottom2 =
    element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;
  //calculate the intersection of the two rectangles
  var x_intersect = Math.max(
    0,
    Math.min(right1, right2) - Math.max(left1, left2)
  );
  var y_intersect = Math.max(
    0,
    Math.min(bottom1, bottom2) - Math.max(top1, top2)
  );
  var intersectArea = x_intersect * y_intersect;
  //if intersection is nil no hit
  if (intersectArea === 0 || isNaN(intersectArea)) {
    return false;
  }
  return true;
}

function isHit(defender, offender) {
  if (overlap(defender, offender)) {
    //check if the two image overlap
    let score = hits.innerHTML;
    score = Number(score) + 1; //increment the score
    hits.innerHTML = score; //display the new score
    playBearHurtSound();

    //If the lastStingTime has been defined(i.e. the bear moved)
    if (lastStingTime) {
      //calculate longest duration
      duration = document.getElementById("duration");
      let newStingTime = new Date();
      let thisDuration = newStingTime - lastStingTime;
      lastStingTime = newStingTime;
      let longestDuration = Number(duration.innerHTML);
      if (longestDuration === 0) {
        longestDuration = thisDuration;
      } else {
        if (longestDuration < thisDuration) longestDuration = thisDuration;
      }
      duration.innerHTML = longestDuration;
    }
  }
}

function getRandomInt(max) {
  //Math.random returns a random float between 0 and 1
  //Multiply this random number by max and floor it, and you get a random integer
  return Math.floor(Math.random() * max);
}

function start() {
  console.log("STARTED!");
  updateTimer = clearTimeout();
  lastStingTime = undefined;
  document.getElementById("hits").innerHTML = 0; //Set stings to 0
  document.getElementById("duration").innerHTML = 0; //Set best duration to 0

  document.getElementById("restartButton").style.display = "none"; //Hide restart button
  document.getElementById("addBeeButton").style.display = "block"; //Show add Bee button

  //hide the game over text elements and the restart button
  let gameOverTexts = document.getElementsByClassName("gameOverText");
  gameOverTexts[0].style.display = "none";
  gameOverTexts[1].style.display = "none";
  document.getElementById("restartButton").style.display = "none";

  bear = new Bear();

  bearSound = new Audio("sounds/bearhurt.mp3");
  beeSound = new Audio("sounds/beebuzz.mp3");

  // Add an event listener to the keypress event.
  document.addEventListener("keydown", moveBear, false);

  //create the bees array if it hasn't been defined
  if (typeof bees === "undefined") {
    bees = new Array();
  }
  console.log(bear);
  //create bees
  makeBees();
  //initial call to updateBees()
  updateBees();
}

function randomChoice(arr) {
  return arr[getRandomInt(arr.length)];
}

function deleteBees() {
  for (let i = 0; i < bees.length; i++) {
    bees[i].htmlElement.remove();
    console.log("DELETED HTML ELEMENT!");
    delete bees[i];
  }
  bees = [];
}

function playBearHurtSound() {
  if (bearSound.paused) {
    bearSound.play();
  }
}

function playBeeBuzzSound() {
  if (beeSound.paused) {
    beeSound.play();
  }
}

function createGameOverSign() {
  //A set of arrays of strings
  var exclamation = ["Darn!", "Blast!", "Drat!", "Shoot!"];
  var comments_1 = [
    "It seems",
    "Looks like",
    "Seems like",
    "Perhaps",
    "Unfortunately,",
    "Tragically,"
  ];
  var comments_2 = ["was not", "wasn't"];
  var comments_3 = ["sufficiently *", "* enough"];
  var adjectives = ["fast", "good", "capable", "strong"];
  //Generate a random "comment" to do with the game over
  var comment =
    randomChoice(exclamation) +
    " " +
    randomChoice(comments_1) +
    " Brian " +
    randomChoice(comments_2) +
    " " +
    randomChoice(comments_3).replace("*", randomChoice(adjectives)) +
    "...";

  let gameOverTexts = document.getElementsByClassName("gameOverText");

  //set the comment text element to be the generated comment
  gameOverTexts[1].innerHTML = comment;

  //Make the game over-related texts and the restart button visible
  gameOverTexts[0].style.display = "block";
  gameOverTexts[1].style.display = "block";
  document.getElementById("restartButton").style.display = "block";
  document.getElementById("addBeeButton").style.display = "none"; //Hide add bee button
}
