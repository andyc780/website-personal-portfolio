document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const getBody = document.querySelector('body');
        getBody.style.transition = 'opacity 2s ease-out';
        getBody.style.opacity = '1'; // Fade in
    }, 1000);
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