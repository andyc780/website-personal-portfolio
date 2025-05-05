// executes the following code when the DOM is fully loaded to prevent any 
document.addEventListener("DOMContentLoaded", function() {
    generateStars();
    console.log("DOM Loaded Successfully.");
    console.log("Window Height: " + window.innerHeight);
    console.log("Window Width: " + window.innerWidth);
    // for(let i = 0; i < 1000; i++){
    //     let rand = Math.round(Math.random() * 1) + 1; // random number between 1 and 2
    //     console.log(rand);
    // }
});

document.addEventListener('mousemove', function (cursor) {
    // getting the circle div element
    const circle = document.getElementById('cursor-circle');
    // getting positions of where the mouse is, split into x and y coordinates, no clue js does this but it's cool!!
    const positionX = cursor.clientX;
    const positionY = cursor.clientY;
    const positionScrollY = window.scrollY;
    updatePosition(positionX, positionY, positionScrollY)

    
    // using left and right positioning because of the position absolute from the circle ID from the css and now we got cool mouse effects
   function updatePosition(positionX, positionY, positionScrollY){
        circle.style.left = `${positionX}px`;
        circle.style.top = `${positionY + positionScrollY}px`;
    }
});
document.addEventListener('dblclick', function () {
    const allElements = document.querySelectorAll('body *'); // Select all elements in the body
    allElements.forEach(element => {
        element.style.transition = 'opacity 0.5s ease-out'; // Smooth fade-out effect
        element.style.opacity = '0'; // Fade out
        setTimeout(() => {
            element.style.display = 'none'; // Hide the element after fade-out
        }, 500); // Match the timeout with the transition duration
    });
});

let count = 0;
let maxStars = 100;
function generateStars(){
    const getDocumentBody = document.querySelector('body');

    const starLoop = setInterval(() => {
        const createStar = document.createElement('div');
        createStar.classList.add('star-specks');
        // getting random x and y coordinates for the stars, using the window height and width.
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        // positioning the stars aftering gathering the information.
        createStar.style.left = `${randomX}px`;
        createStar.style.top = `${randomY}px`;
        // fade in animation
        createStar.style.transition = 'opacity 0.2s ease-in';
        setTimeout(() => {
            createStar.style.opacity = '0.2';
        }, 500);
        // add the star to the document body.
        getDocumentBody.appendChild(createStar);

        count++;
        if(count > maxStars){
            clearInterval(starLoop);    
        }
    }, 10);
    setTimeout(() => {
        animateStars();
    }, 3000)
}
function animateStars(){
    let velocitySpeed = 0.15; // speed of the stars, can be adjusted to make them faster or slower with this value.
    // get all stars in the document
    const getStars = document.querySelectorAll('.star-specks');
    // iterates through each star using a loop
    getStars.forEach(star => {
        // Random velocity for each star (either a positve or negative velocity) in both X and Y directions.
        // a range from -1 to +1 will be chosen for the base velcoity speed and ensuring that the stars can move in any direction.
        let velocityX = Math.random() * 2 - 1; 
        let velocityY = Math.random() * 2 - 1; 

        // nesting a function to move the stars.
        function moveStar() {
            // get current positions of the stars for when they were loaded in from the generateStars function.
            // parsing the string values into a float, integer is not good for this as decimal values are best for smoothness.
            let currentX = parseFloat(star.style.left);
            let currentY = parseFloat(star.style.top);

            // update the positions with velocities
            let newX = currentX + (velocityX * velocitySpeed);
            let newY = currentY + (velocityY * velocitySpeed);

            // Check for collisions with window edges. basicallty checking if the stars are going to go off screen
            if (newX <= 0 || newX >= window.innerWidth) {
                velocityX *= -1; // Reverse X direction to 'bounce' off the edge
            }
            if (newY <= 0 || newY >= window.innerHeight) {
                velocityY *= -1; // Reverse Y direction to 'bounce' off the edge
            }

            // Apply new position using css
            star.style.left = `${newX}px`;
            star.style.top = `${newY}px`;

            requestAnimationFrame(moveStar); // Continue animation infinitely
        }

        moveStar(); // Start animation for this star
    });
   
}