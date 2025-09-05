var map = L.map('map').setView([4.6130845568829235, -74.15656299018546], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([4.6130845568829235, -74.15656299018546]).addTo(map);
