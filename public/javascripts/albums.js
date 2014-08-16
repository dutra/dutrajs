

$(document).ready(function () {
    albums.forEach(function(album) {
        var $id = $('#'+album.id);
        // $id.children('img').fadeTo(100, 0.2);
	$id.children('.album-title').fadeTo(100, 0);
        $id.hover(function() {
            $id.children('img').fadeTo(100, 0.3);
            $id.children('.album-title').fadeTo(100, 1);
        }, function() {
            $id.children('img').fadeTo(100, 1);
            $id.children('.album-title').fadeTo(100, 0);
        });

    });
});
