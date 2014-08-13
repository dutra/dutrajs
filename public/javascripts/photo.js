
var tile = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';

$(document).ready(function() {
    console.log(scene.coords);
    var map = L.map('map-photo', {
        center: photo.coords,
        zoom: 14,
        minZoom: 1
    });
    L.tileLayer(tile, {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    }).addTo(map);

    var markers = L.markerClusterGroup();
    scene.photos.forEach(function(p) {
	if(p.id == photo.id)
            var marker = L.marker(p.coords, {title: scene.name});
	else
	    var marker = L.marker(p.coords, {title: scene.name, opacity: 0.6});
	
        var popup_content = '<div class="text-center popup"> <a href="/photos/' + p.id + '"</a>' 
	    + '<img class="img-responsive img-rounded img-popup" src="http://static.dutra.io/photos/'+p.album_id+'/'+p.id+'_thumb.jpg" >'
//	    + '<p><strong>'+p.title+'</strong></p>'
	    + '</a></div>';
        marker.bindPopup(popup_content);

        markers.addLayer(marker);
    });
    map.addLayer(markers);

    $('.img-main-photo i').fadeTo(200, 0.2);

    $('.img-main-photo').hover(function() {
	$('.img-main-photo i').fadeTo(200, 1);
    }, function() {
	$('.img-main-photo i').fadeTo(200, 0.2);
    });

});
