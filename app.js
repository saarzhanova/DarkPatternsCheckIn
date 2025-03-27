const selectedSeat = document.getElementById('selectedSeat');
const allSeats = document.querySelectorAll('.seat');
const nextButton = document.getElementById('nextButton');
const expensiveSeatNumbers = [1,2,3,4,5,6,7,8,9,22,23,24,25,26,27];
const budgetSeatNumbers = [10,12,13,15,16,18,19,21,28,30,31,33,34,36,37,39,40,42,43,45];
const expensiveSeatPrice = 300;
const budgetSeatPrice = 50;
let seatPrice = 0;
let totalPrice = 0;

const allBaggage = document.querySelectorAll('.baggage');

const total = document.getElementById('total');

function selectSeats() {
    allSeats.forEach(seat => {
        seat.addEventListener('click', function () {
            const selectedSrc = 'src/images/selectedSeat.png';
            const defaultSrc = 'src/images/defaultSeat.png';
            let isSeatSelected = this.classList.contains('selected');

            if (isSeatSelected) {
                this.classList.remove('selected');
                this.src = defaultSrc;
                selectedSeat.innerHTML = "<span class='text-secondary text-opacity-50 h6'>No seet is selected</span>";
                disableNextButton();
                seatPrice = 0
            } else {
                let seatNumber = this.id;
                allSeats.forEach(s => {
                    s.classList.remove('selected');
                    s.src = defaultSrc;
                    seatPrice = 0
                });
                enableNextButton();
                selectedSeat.innerText = this.id;
                this.classList.add('selected');
                this.src = selectedSrc;
                countSeatPrice(seatNumber);
            }
        });
    });
}
function disableNextButton() {
    nextButton.innerHTML = '<img src="src/images/nextButtonDisabled.png" class="nextButton" style="position: relative; bottom: -120px;">';
    nextButton.style.pointerEvents = "none";
}
function enableNextButton() {
    nextButton.innerHTML = '<img src="src/images/nextButton.png" class="nextButton" style="position: relative; bottom: -120px;">';
    nextButton.style.pointerEvents = "auto";
}
function countSeatPrice(seatNumber) {
    if (expensiveSeatNumbers.includes(Number(seatNumber))) {
        seatPrice = expensiveSeatPrice
    } else if (budgetSeatNumbers.includes(Number(seatNumber))) {
        seatPrice = budgetSeatPrice
    } else {
        seatPrice = 0
    }
    localStorage.setItem('seat', seatPrice);
}
function countTotalPrice() {
    totalPrice += seatPrice
    console.log(totalPrice)
}

function selectBaggage() {
    allBaggage.forEach(baggage => {
        baggage.addEventListener('click', function () {
            let selectedBagSrc = "";
            let disabledBagSrc = "";
            switch (this.id) {
                case "small":
                    selectedBagSrc = 'src/images/baggageSmall.png';
                    disabledBagSrc = 'src/images/baggageSmallDisabled.png';
                    break;
                case "middle":
                    selectedBagSrc = 'src/images/baggageMiddle.png';
                    disabledBagSrc = 'src/images/baggageMiddleDisabled.png';
                    break;
                case "large":
                    selectedBagSrc = 'src/images/baggageLarge.png';
                    disabledBagSrc = 'src/images/baggageLargeDisabled.png';
                    break;
                default:
                    console.log('Unknown id in baggages')
            }

            let isBaggageSelected = this.classList.contains('selected');

            if (isBaggageSelected) {
                this.classList.remove('selected');
                this.src = disabledBagSrc;
                // seatPrice = 0
            } else {
                let baggageNumber = this.id;
                this.classList.add('selected');
                this.src = selectedBagSrc;
                // countSeatPrice(seatNumber);
            }
        });
    });
}

console.log('totalPrice', totalPrice)
console.log('seatPrice', seatPrice)
if (total) {
    const seatPrice = localStorage.getItem('seat');
    totalPrice += Number(seatPrice);
    if (totalPrice > 0) {
        console.log('trying')
        total.innerText = totalPrice + "€";
    } else {
        total.innerHTML = "<span class='h6 text-secondary'>Error: No Price</span>"
    }
}

selectSeats();
selectBaggage();


