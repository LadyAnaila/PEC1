//Elements from HTML 

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const selectedMovieName = document.getElementById('selected-movie-name');

const currencySelect = document.getElementById('currency-one');
const totalInCurrency = document.getElementById('total-in-currency');

populateUI();

let ticketPrice = +movieSelect.value;
let selectedCurrency = currencySelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice, movieCurrency) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
    localStorage.setItem('selectedMovieCurrency', movieCurrency);
}



// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const { price, currency } = getSelectedMovieInfo();

    count.innerText = selectedSeatsCount;
    total.innerText = (selectedSeatsCount * price).toFixed(2);
    totalInCurrency.innerText = `${(selectedSeatsCount * price).toFixed(2)} ${currency}`;
}

// Get data from localStorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }

        });

    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        const { currency } = getSelectedMovieInfo();
        selectedCurrency = localStorage.getItem('selectedMovieCurrency') || currency;
        currencySelect.value = selectedCurrency;
        updateSelectedCount();
    }
}

// Movie select event 
movieSelect.addEventListener('change', () => {
    const { price, currency } = getSelectedMovieInfo();
    ticketPrice = price;
    setMovieData(movieSelect.selectedIndex, price, currency);
    updateSelectedCount();
    selectedMovieName.innerText = movieSelect.options[movieSelect.selectedIndex].text;


});

// Currency select event
currencySelect.addEventListener('change', () => {
    selectedCurrency = currencySelect.value;
    updateSelectedCount();


});

// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();

    }
});

// Initial count and total set. 
updateSelectedCount();


// Function to get movie price and currency. 
function getSelectedMovieInfo() {
    const selectedMovieOption = movieSelect.options[movieSelect.selectedIndex];
    const moviePrice = parseFloat(selectedMovieOption.value);
    const movieCurrency = selectedMovieOption.getAttribute('data-currency');
    return { price: moviePrice, currency: movieCurrency };

}

// Function to calculate and update total in selected currency.
function calculateTotalInSelectedCurrency() {
    const { price, currency } = getSelectedMovieInfo();
    const selectedSeatsCount = parseInt(count.innerText);
    totalInCurrency.innerText = `${(selectedSeatsCount * price).toFixed(2)} ${currency}`;


}

// Event listeners for currency conversion. 
currencySelect.addEventListener('change', calculateTotalInSelectedCurrency);

count.addEventListener('DOMSubtreeModified', calculateTotalInSelectedCurrency);




