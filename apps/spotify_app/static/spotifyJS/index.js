$(document).ready(function(){
    var genres = ['g.21', 'g.5', 'g.394', 'g.156', 'g.146']
    var key = 'NjY4YzkwMWUtNGIzMS00ZGZmLWE2NGQtMTJhNWI5MTFhYzhk'
    for (let index=0; index<genres.length; index++) {
        $.get(`http://api.napster.com/v2.2/genres/${genres[index]}/tracks/top?apikey=${key}&limit=5`).done(function(res) {
            for(let i=0; i < res.tracks.length; i++){
                var item = res.tracks            
                $.get(`https://api.napster.com/v2.2/albums/${item[i]['albumId']}/images?apikey=${key}`).done(function(imageRes) {
                    console.log(imageRes)
                    let htmlString = ""
                    htmlString+="<div class='column'>"
                    htmlString+=`<div class='ui center aligned segment'><a href="/spotify/tracks/${item[i].id}"><img src=${imageRes.images[0].url}></a></div>`
                    htmlString+="<div class='item'>Name: " + item[i]['name'] + '</div>'
                    htmlString+="<div class='item'>Album: " + item[i]['albumName'] + '</div>'
                    htmlString+="<div class='item'>Artist: " + item[i]['artistName'] + ' </div>'
                    htmlString+="</div>"    
                    console.log(`#genre${index}`)
                    $(`#genre${index}`).append(htmlString);
                });
            }
        });
    }       
})