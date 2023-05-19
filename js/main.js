const jsonUrl = "/fh5Cars/data/cars.json";
// const jsonUrl = "/data/cars.json";

let cars;
let currentActiveCard;
let numberOfSpins;
let currentSpin = 0;

const getCars = () => {
  return $.getJSON(jsonUrl).then((data) => {
    return data;
  });
};

const convertCarID = (carID) => {
  let idString = carID.toString();

  switch (idString.length) {
    case 1:
      idString = `00${idString}`;
      break;

    case 2:
      idString = `0${idString}`;
      break;
  }

  return idString;
};

const animateCards = () => {
  currentSpin++;

  const lastActiveCard = currentActiveCard;
  lastActiveCard.addClass("animate__out");

  setTimeout(() => {
    lastActiveCard.removeClass("animate__out");
    lastActiveCard.attr("data-active", "false");
  }, 200);

  nextCard = $(currentActiveCard).next();
  if (nextCard.length == 0) nextCard = $(".car--card").first();

  $(nextCard).attr("data-active", "true");

  currentActiveCard = nextCard;

  if (numberOfSpins != currentSpin) return;

  currentSpin = 0;
  setTimeout(() => {
    currentActiveCard.addClass("animate__finished");
  }, 250);

  console.log("Spin finished!", currentActiveCard);

  setTimeout(() => {
    currentActiveCard.removeClass("animate__finished");
    $("#spin-btn").removeClass("disabled");
    $("#spin-btn").html("Spin again!");
  }, 1000);
};

const pickRandomCar = async (numberOfCars) => {
  if (!cars) cars = await getCars();
  const carsContainer = $("#cars");

  // clear the cars container
  $(carsContainer).html("");

  const shuffledCars = cars.sort(() => 0.5 - Math.random());
  const randomCars = shuffledCars.slice(0, numberOfCars);
  console.log(randomCars);

  randomCars.forEach((car, i) => {
    carCard = `
    <div class="car--card" data-active="${i == 0 ? true : false}">
        <div class="image-container">
        <img src="https://www.kudosprime.com/fh5/images/cars/big/fh5_car_${convertCarID(car["K' iD"])}.jpg?v=1">
        </div>
        <div class="car--info">
        <div class="car-title">
        <h3>${car.Maker}</h3>
        <h4>${car.Model}</h4>
        </div>
        <div class="car-tags">
          <div class="tag year"><span>${car.Year}</span></div>
          <div class="tag car-type"><span>${car.Group.toLowerCase()}</span></div>
          <div class="tag class">
            <span> <b class="letter ${car.Class}">${car.Class} </b><b class="score">${car.Score}</b> </span>
          </div>
          <div class="tag drivetrain"><span>${car.DriveTrain}</span></div>

          <div class="tag hp">
            <span><b class="value">${car.StockHp}</b><b class="tag">PK</b></span>
          </div>
        </div>
      </div>
        <div class="car-link">
            <a href="https://www.kudosprime.com/fh5/car_sheet.php?id=${car["K' iD"]}" target="_blank"><i class="fa-solid fa-link"></i></a>	
        </div>
    </div>`;

    $(carsContainer).html($(carsContainer).html() + carCard);
  });

  currentActiveCard = $(".car--card[data-active='true']");
  numberOfSpins = Math.floor(Math.random() * (40 - 15 + 1) + 15);
  timer(numberOfSpins, 250, animateCards);
};

const timer = (limit, interval, func = null) => {
  for (var i = 0; i < limit; i++) {
    setTimeout(function () {
      if (func != null) func();
      else console.warn("Timer is running, but no function is set!");
    }, interval * i);
  }
};

$("#spin-btn").on("click", () => {
  setTimeout(() => {
    pickRandomCar(Math.floor(Math.random() * (25 - 10 + 1) + 25));
  }, 500);

  $("#spin-btn").addClass("disabled");
});
