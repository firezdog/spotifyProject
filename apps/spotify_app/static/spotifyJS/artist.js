$(document).ready(function () {
    var artist_id = $("data").val();
    var key = 'NjY4YzkwMWUtNGIzMS00ZGZmLWE2NGQtMTJhNWI5MTFhYzhk'
    $.get(`http://api.napster.com/v2.2/artists/${artist_id}?apikey=${key}`, function (similar) {
            $.get(`${similar.artists[0].links.images.href}?apikey=${key}`, function (ArtistImage) {
                console.log(ArtistImage);
                console.log(artist[0]);
            })
        
    })
    
})  