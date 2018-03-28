$(document).ready(function() {
    var track_id = $("data").val();
    var key = 'NjY4YzkwMWUtNGIzMS00ZGZmLWE2NGQtMTJhNWI5MTFhYzhk'
    $.get(`http://api.napster.com/v2.2/tracks/${track_id}?apikey=${key}`, function(track) {
        $.get(`https://api.napster.com/v2.2/albums/${track.tracks[0].albumId}/images?apikey=${key}`, function(album) {
            $("#album-picture").attr("src",album.images[2].url);
        });
        $("#track-title").text(track.tracks[0].name)
        console.log(track.tracks[0].previewURL)
        $("#audio").html(`<source src='${track.tracks[0].previewURL}' type='audio/mp3'> Your browser does not support the audio element.'`)
    });
});