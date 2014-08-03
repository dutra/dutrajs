
// var tile = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var tile = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';

$(document).ready(function() {
    var map = L.map('map', {
	center: [25,-70],
	zoom: 2,
	minZoom: 1
    });
    L.tileLayer(tile, {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under	<a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    }).addTo(map);

    $.getJSON("/travel/scenes", function(data) {
	data.forEach(function(element) {
	    console.dir(element);
	    L.marker(element.coords).addTo(map);
	});
    });
    
});
