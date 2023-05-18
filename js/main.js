let cars;
let currentActiveCard;

const getCars = () => {
  return $.getJSON("/fh5Cars/data/cars.json").then((data) => {
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
  console.log("animateCards");
};

const pickRandomCar = async (numberOfCars) => {
  if (!cars) cars = await getCars();
  const carsContainer = $("#cars");

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
            <h3>${car.Maker}</h3>
            <h4>${car.Model}</h4>
        </div>
        <div class="car-link">
            <a href="https://www.kudosprime.com/fh5/car_sheet.php?id=${car["K' iD"]}" target="_blank"><i class="fa-solid fa-link"></i></a>	
        </div>
    </div>`;

    $(carsContainer).html($(carsContainer).html() + carCard);
  });

  currentActiveCard = $(".car--card[data-active='true']");
  timer(10, 1000, animateCards);
};

pickRandomCar(10);

const timer = (limit, interval, func = null) => {
  for (var i = 0; i < limit + 1; i++) {
    setTimeout(function () {
      if (func != null) func();
      else console.warn("Timer is running, but no function is set!");
    }, interval * i);
  }
};
