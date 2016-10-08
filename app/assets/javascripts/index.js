console.log("index.js loaded");

$(function() {
    $('#submitImage').on('click', function() {
    	$.post("/image/new", {url: $('#imageURL').val()}, function(data, status) {
    		if (status === "success") {
    			caption = data.captions[0]
    			$('#photoImage').html('<img src="' + $('#imageURL').val() + '">');
    			$('#photoInfo').html("I am <b>" + Math.round(parseFloat(caption.confidence) * 100) + "%</b> sure that this is a picture of <b>" + caption.text + "</b>");
    		}
    	} );
    });
});