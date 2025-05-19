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
    // const positionScrollY = window.scrollY; // we don't need this because our circle is now positioned fixed
    updatePosition(positionX, positionY)
    // using left and right positioning because of the position absolute from the circle ID from the css and now we got cool mouse effects
   function updatePosition(positionX, positionY){
        circle.style.left = `${positionX}px`;
        circle.style.top = `${positionY}px`;
    }
});
// For when a link is clicked, it will fade out the body and redirect to the link for a smooth transition
document.querySelectorAll('a').forEach(link => {
    if (link.id === "redirect"){
        return; // only for the projects page when interacting with the links
    }

    link.addEventListener('click', function (e) {
        e.preventDefault(); // prevents the default action of the link so these transitions can happen.
        const href = this.href; // get the href of the link clicked
        const body = document.querySelector('body');
        // fade out the body and redirect to the link
        body.style.transition = 'opacity 0.5s ease-in';
        body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});