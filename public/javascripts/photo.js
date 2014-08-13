
var tile = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';

$(document).ready(function() {
    console.log(scene.coords);
    var map = L.map('map-photo', {
        center: scene.coords,
        zoom: 4,
        minZoom: 1
    });
    L.tileLayer(tile, {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    }).addTo(map);

    var markers = L.markerClusterGroup();

    var marker = L.marker(scene.coords, {title: scene.name});

    var popup_content = '<p><strong>' + scene.name + '</strong></p>'
        + '<p>' + scene.description + '</p>';
    marker.bindPopup(popup_content);

    markers.addLayer(marker);
    map.addLayer(markers);


});
