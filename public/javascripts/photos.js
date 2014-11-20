// $(document).ready(function () {
//     $("#gallery").nanoGallery({
// 	kind : 'flickr',
// 	userID : '85128398@N05',
//  	locationHash: true,
//  	colorScheme : 'none',
// 	thumbnailHoverEffect: 'labelAppear75,borderDarker',
// 	theme : 'clean',
// 	i18n : {'thumbnailImageDescription':'View Photo', 'thumbnailAlbumDescription':'Open Album'},
// 	thumbnailLabel : {hideIcons: true, display:true,position:'overImageOnMiddle', align: 'center'},
// 	thumbnailWidth : 'auto',
// 	thumbnailHeight : 250,
// 	galleryToolbarWidthAligned: true,
// 	galleryToolbarHideIcons: true
//     });
// });


$(document).ready(function() {
    
    $('.swipebox').swipebox();

    $('.img-main-photo i').fadeTo(0, 0);
    
    $('.img-main-photo').hover(function(e) {
	$('.img-main-photo i').stop(false, true);
	$(e.currentTarget).find('i').fadeTo(300, 1);
    }, function(e) {
	$('.img-main-photo i').stop(false, true);
	$(e.currentTarget).find('i').fadeTo(300, 0);
    });

    
});
