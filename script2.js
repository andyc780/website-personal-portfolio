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
setTimeout(() => { // 3s delay
    // creation of the donut chart
    const data1 = {
        labels: ['Physical Events', 'Gaming', 'Social Activities', 'Other'],
        datasets: [{
            label: "Time Spent (%)",
            data: [30, 35, 25, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)'
            ],
            borderWidth: 0
        }]
    }
    const configDonut = {
        type: 'doughnut',
        data: data1,
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Time Spent on Activities',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                }
            }
        }
    }
    const getDonutChart = document.getElementById('donutChart').getContext('2d');
    const myDonutChart = new Chart(getDonutChart, configDonut);

    const data2 = {
        labels: ["HTML", "CSS", "JavaScript", "jQuery", "Python"],
        datasets: [{
            label: "", // Set label to empty string to hide it
            data: [30, 25, 20, 15, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    }
    const configBar = {
        type: 'bar',
        data: data2,
        options: {
            responsive: false,
            plugins: {
                legend: {
                    display: false // Hide legend to remove color box and label
                },
                title: {
                    display: true,
                    text: 'Coding Skills',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                }
            },
        }
    }
    const getBarChart = document.getElementById('barChart').getContext('2d');
    const myBarChart = new Chart(getBarChart, configBar);

}, 5000);
// setTimeout(() => {
//     const ctx = document.getElementById('donutChart').getContext('2d');
//     const myDonutChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
//             datasets: [{
//                 label: 'My Dataset',
//                 data: [12, 19, 3, 5, 2], // 5 values
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.7)',
//                     'rgba(54, 162, 235, 0.7)',
//                     'rgba(255, 206, 86, 0.7)',
//                     'rgba(75, 192, 192, 0.7)',
//                     'rgba(153, 102, 255, 0.7)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: false,
//             cutout: '70%', // Makes it a donut instead of pie
//             plugins: {
//                 legend: {
//                     position: 'right'
//                 }
//             }
//         }
//     });
// },3000);