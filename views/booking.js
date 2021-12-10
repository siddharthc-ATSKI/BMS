const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const price = document.getElementById('price');
let ticketPrize = Math.floor(Math.random() * 350) + 250;
function updateSelectedSeatsCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  const enteredSeat = document.getElementById('seats').value;
  const movie=document.getElementById("movie").value;
  const button=document.getElementById('button');
  if(movie===" " && enteredSeat=== " " ){
     button.disabled=true;
     }
      else{
        button.disabled=false;
        count.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount *ticketPrize;
      }
// count.innerText = selectedSeatsCount;
//   price.innerText = selectedSeatsCount *ticketPrize;
}
container.addEventListener('click', e => {
  const enteredSeat = document.getElementById('seats').value;
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) 
  {
    if(e.target.classList.contains('selected')){
      count.innerText=parseInt(count.innerText)-1;
      price.innerText=parseInt(price.innerText)-ticketPrize;
      e.target.classList.toggle('selected');
    }
  else  if(enteredSeat === count.innerText){
      alert('You Have Selected Your Entered Number Of Seats');
        }
        else{
    e.target.classList.toggle('selected');
   updateSelectedSeatsCount();
        }
  }
});
