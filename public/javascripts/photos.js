$(document).ready(function () {
    $("#gallery").nanoGallery({
	kind : 'flickr',
	userID : '85128398@N05',
 	locationHash: true,
 	colorScheme : 'none',
	thumbnailHoverEffect: 'labelAppear75,borderDarker',
	theme : 'clean',
	i18n : {'thumbnailImageDescription':'View Photo', 'thumbnailAlbumDescription':'Open Album'},
	thumbnailLabel : {hideIcons: true, display:true,position:'overImageOnMiddle', align: 'center'},
	thumbnailWidth : 'auto',
	thumbnailHeight : 250,
	galleryToolbarWidthAligned: true,
	galleryToolbarHideIcons: true
    });
});

