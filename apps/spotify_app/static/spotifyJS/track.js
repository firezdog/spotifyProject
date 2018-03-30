$(document).ready(function() {
    var track_id = $("data").val();
    var key = 'NjY4YzkwMWUtNGIzMS00ZGZmLWE2NGQtMTJhNWI5MTFhYzhk'
    $.get(`http://api.napster.com/v2.2/tracks/${track_id}?apikey=${key}`, function(track) {
        $.get(`https://api.napster.com/v2.2/albums/${track.tracks[0].albumId}/images?apikey=${key}`, function(album) {
            $("#album-picture").attr("src",album.images[2].url);
        });
        
        $("#artist-name").text(track.tracks[0].artistName)
        $("#track-title").text(track.tracks[0].name)
        $("#album-title").text(track.tracks[0].albumName)
        console.log(track.tracks[0].previewURL)
        $("#audio").html(`<source src='${track.tracks[0].previewURL}' type='audio/mp3'> Your browser does not support the audio element.'`)
        $.get(`http://api.napster.com/v2.2/artists/${track.tracks[0].artistId}/similar?apikey=${key}` , function(similar){
            for(let i=0; i < 25; i++){
                $.get(`${similar.artists[i].links.images.href}?apikey=${key}`, function(ArtistImage){
                    console.log(ArtistImage)
                    let str = ''
                    str+="<div class='column'>"
                    str +=`<div class='ui center aligned segment'><a href='/spotify/${track.tracks[0].artistId}/artist'><img src=${ArtistImage.images[2].url}></a></div>`
                    str+="<div class='item'>" + similar.artists[i].name + '</div>'
                    str += "</div>"
                    $("#similar-artists").append(str)
                })
             }
        });
    });
})
