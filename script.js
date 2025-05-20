// executes the following code when the DOM is fully loaded to prevent any
let clickable = false;
document.addEventListener("DOMContentLoaded", function() {
    // cool fade in animations for the website when the user loads it in.
    setTimeout(() => {
        const getBackground = document.querySelector('body');
        getBackground.style.backgroundColor = '#151515'; // change the background color to black
    }, 1000);
    // display the main introduction webpage to the user after the background is faded in.
    setTimeout(() => {
        const getBody = document.querySelector('body');
        getBody.style.transition = 'opacity 2s ease-in-out';
        getBody.style.opacity = '1';
        generateStars();
    },2000)
    // displays the message after a few moments and applies a nice pulsing effect to the text for extra detail.
    setTimeout(() => {
        const getInfoMessage = document.querySelector(".message");
        getInfoMessage.style.transition = 'opacity 1.5s ease-in-out';
        getInfoMessage.style.opacity = '1';
        setInterval(() => {
            getInfoMessage.style.transition = 'color 1.5s ease';
            setTimeout(() => {
                getInfoMessage.style.color = '#bcbcbc'; // pulse to white
                setTimeout(() => {
                    getInfoMessage.style.color = '#787878'; // pulse back to gray
                }, 1000);
            }, 1000);


        }, 2000); // interval (note)
    }, 5500); // main timeout (note)
    setTimeout(() => {
        clickable = true;
    },6000)
    console.log("DOM Loaded Successfully.");
    console.log("Window Height: " + window.innerHeight);
    console.log("Window Width: " + window.innerWidth);
});
// Cursor effect code, this is a custom cursor that follows the mouse around the screen.
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

// adding a click count in the event i want to make more pages in the home area, but right now, its kinda useless...
let clickCount = 0;
document.addEventListener('click', function () {
    if(clickCount == 0 && clickable == true){
        clickCount++;
        const mainElement = document.querySelector('main'); // select the main element
        const getCursor = document.getElementById('cursor-circle'); // get circle cursor
        const getNavigation = document.querySelector('nav'); // get nav bar
        getNavigation.appendChild(getCursor); // append the cursor to the navigation bar before removing it so it can be tracked still

        fadeStars();
        mainElement.style.transition = 'opacity 0.5s ease-out'; // Smooth fade-out effect
        mainElement.style.opacity = '0'; // Fade out
        setTimeout(() => {
            mainElement.style.display = 'none'; // Hide the element after fade-out
        }, 500);

        setTimeout(() => {
            const getNavigation = document.querySelector('nav');
            getNavigation.style.display = 'block'; // Ensure the element is visible for the transition
            getNavigation.style.transition = 'opacity 2s ease-out';
            setTimeout(() => {
                getNavigation.style.opacity = '1'; // Apply the fade-in effect
            }, 10); // Slight delay to allow the transition to take effect
            generateStars();
        }, 1000);
    }

});

function displayNewSection(location){
    const getNavigation = document.querySelector('nav');
    getNavigation.style.transition = 'opacity 0.35s ease-in-out'; // Smooth fade-out effect
    getNavigation.style.opacity = '0'; // Fade out
    fadeStars();
    setTimeout(() => {
        getNavigation.style.display = 'none'; // Hide the element after fade-out
    }, 350);

    // Switch their location based on the button clicked
    setTimeout(() => {
        switch(location){
            case "about":
                window.location.href = 'about.html';
                break;
            case "projects":
                window.location.href = 'projects.html';
                break;
            case "contact":
                window.location.href = 'contact.html';
                break;
        }
    },500);
}


// declaration for the variables to be used for the stars later on in the function.
function generateStars(){
    let count = 0;
    let maxStars = 120;
    if(window.innerWidth < 1000) { // 60 stars for medium screens <1000px
        maxStars = 65;
    }
    if (window.innerWidth < 500) { // 30 stars for small screens <500px
        maxStars = 30;
    }
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
    },1100);
}
function animateStars(){
    let velocitySpeed = 0.35; // speed of the stars, can be adjusted to make them faster or slower with this value.
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
function fadeStars(){
     const getStars = document.querySelectorAll('.star-specks');
     getStars.forEach(star => {
         star.style.transition = 'opacity 0.5s ease-in-out';
         star.style.opacity = '0';
         setTimeout(() => {
             star.remove();
         }, 500);
     });
}
function reload(){
    const getNavigation = document.querySelector('nav');
    getNavigation.style.transition = 'opacity 0.5s ease-in-out'; // Smooth fade-out effect
    getNavigation.style.opacity = '0'; // Fade out
    fadeStars();
    setTimeout(() => {
        getNavigation.style.display = 'none'; // Hide the element after fade-out
    }, 500);
    setTimeout(() =>{
        location.reload();
    }, 1000);
}




