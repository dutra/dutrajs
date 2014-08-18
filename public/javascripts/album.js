
var tile = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';

$(document).ready(function() {
    var map = L.map('map-album', {
        center: photos[0].coords,
        zoom: 14,
        minZoom: 1
    });
    L.tileLayer(tile, {
        attribution: 'Map tiles by <a href="http://1stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    }).addTo(map);

    var markers = L.markerClusterGroup();
    photos.forEach(function(p) {
        var marker = L.marker(p.coords, {title: p.title});
	
        var popup_content = '<div class="text-center popup"> <a href="/photos/' + p.id + '"</a>' 
	    + '<img class="img-responsive img-rounded img-popup" src="http://static.dutra.io/photos/'+p.album_id+'/'+p.id+'_thumb.jpg" >'
//	    + '<p><strong>'+p.title+'</strong></p>'
	    + '</a></div>';
        marker.bindPopup(popup_content);

        markers.addLayer(marker);
    });
    map.addLayer(markers);

  
});
