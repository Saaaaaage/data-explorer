// Get the modal
var modal = document.getElementById("aboutModal");

// Get the button that opens the modal
var btn = document.getElementById("aboutBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = () => {
    console.log('open modal');
    modal.style.display = "block";
};

// // When the user clicks on <span> (x), close the modal
// span.onclick = () => {
//     modal.style.display = "none";
// };