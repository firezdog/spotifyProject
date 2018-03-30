$(document).ready(function () {
    
    var artist_id = $("data").val();
    console.log(artist_id)
    var key = 'NjY4YzkwMWUtNGIzMS00ZGZmLWE2NGQtMTJhNWI5MTFhYzhk'
    $.get(`http://api.napster.com/v2.2/artists/${artist_id}?apikey=${key}`, function (similar) {
            console.log(similar)
            $.get(`${similar.artists[0].links.images.href}?apikey=${key}`, function (ArtistImage) {
                console.log(ArtistImage);
                console.log(similar.artists[0].name);
                let htmlString = ""
                htmlString += `<div><img src='${ArtistImage.images[0].url}'></div>`
                htmlString += `<div>${similar.artists[0].name}</div>`
                $('#artistProfile').append(htmlString)
                $.get(`http://api.napster.com/v2.2/artists/${artist_id}/tracks/top?apikey=${key}&limit=10`).done(function(top){
                    console.log(top)
                    let otherString = ""
                    for(var i= 0; i < top.tracks.length; i++){
                        otherString += "<div class='artist_data'>"
                        otherString += `<div><a class='track_names' href='/spotify/tracks/${top.tracks[i].id}/'>${top.tracks[i].name}</a></div>`
                        otherString += "</div>"
                    }
                    $('#topTracks').append(otherString)
                    console.log(otherString)
                })
            })
    })
    
})  