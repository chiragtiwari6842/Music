 var songQueue = [];

 function playNextSong(){
    if (songQueue.length > 0){
        var nextSong = songQueue.shift();
        PlayAudio(nextSong.audio_url, nextSong.song_id);
    }
 }

function PlayAudio(audio_url, song_id){
    var audio = document.getElementById('player');
    var source = document.getElementById('audioSource');
    source.src = audio_url;
    var name = document.getElementById(song_id + "-n").textContent;
    var album = document.getElementById(song_id + "-a").textContent;
    var image = document.getElementById(song_id + "-i").getAttribute("src");
      
    document.title = name + " - " + album;
    var bitrate = document.getElementById('music-bitrate');
    var bitrate_i = bitrate.options[bitrate.selectedIndex].value;
    var quality = 360;
    document.getElementById("player-name").innerHTML = name;
    document.getElementById("player-album").innerHTML = album;
    document.getElementById("player-image").setAttribute("src",image);
    var promise = audio.load();
    if(promise){
        promise.catch(function(error){ 
            console.error(error); 
        });
    }
    audio.play(); 
    audio.onended = playNextSong;
};

function searchSong(search_term){
    document.getElementById('search-box').value=search_term;
    var goButton = document.getElementById("search-trigger");
    goButton.click();    
}
  
function AddToQueue(audio_url, song_id){
    songQueue.push({audio_url: audio_url, song_id:song_id});
    var audio = document.getElementById('player');
    if (audio.paused){
        playNextSong();
    }
}