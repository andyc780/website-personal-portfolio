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

let count = 0;
let maxStars = 80;
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
        createStar.style.transition = 'opacity 0.25s ease-in';
        setTimeout(() => {
            createStar.style.opacity = '0.2';
        }, 500);
        // add the star to the document body.
        getDocumentBody.appendChild(createStar);

        count++;
        if(count > maxStars){
            clearInterval(starLoop);    
        }
    }, 20);
    
}