// Card data
const cardsArray = [
  {
    name: "shell",
    img: "img/blueshell.png"
  },
  {
    name: "star",
    img: "img/star.png"
  },
  {
    name: "bobomb",
    img: "img/bobomb.png"
  },
  {
    name: "mario",
    img: "img/mario.png"
  },
  {
    name: "luigi",
    img: "img/luigi.png"
  },
  {
    name: "peach",
    img: "img/peach.png"
  },
  {
    name: "1up",
    img: "img/1up.png"
  },
  {
    name: "mushroom",
    img: "img/mushroom.png"
  },
  {
    name: "thwomp",
    img: "img/thwomp.png"
  },
  {
    name: "bulletbill",
    img: "img/bulletbill.png"
  },
  {
    name: "coin",
    img: "img/coin.png"
  },
  {
    name: "goomba",
    img: "img/goomba.png"
  }
];
// Duplicate array to create a match for each card
let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

let firstGuess = "";
let secondGuess = "";
let count = 0;
let previousTarget = null;
let delay = 1200;

// Grab the div with an id of root
const game = document.getElementById("game");

// Create a section with a class of grid
const grid = document.createElement("section");
grid.setAttribute("class", "grid");

// Append the grid section to the game div
game.appendChild(grid);

// For each item in the cardsArray array
gameGrid.forEach(item => {
  const { name, img } = item;
  // Create card element with the name dataset
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;

  // Create front of card
  const front = document.createElement("div");
  front.classList.add("front");

  // Create back of card, which contains
  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${img})`;

  // Append card to grid, and front and back to each card
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

// Add match CSS
const match = () => {
  let selected = document.querySelectorAll(".selected");
  selected.forEach(card => {
    card.classList.add("match");
  });
};

const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll(".selected");
  selected.forEach(card => {
    card.classList.remove("selected");
  });
};

// Add event listener to grid
grid.addEventListener("click", function(event) {
  // The event target is out clicked item
  let clicked = event.target;
  // Do not allow the grid section itself to be selected; only select divs inside the grid
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }
    // If both guesses are not empty..
    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
