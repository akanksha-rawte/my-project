var bigPlayer = document.getElementById("player");
function playPause() {
  var icon = document.getElementById("playIcon");
  if(icon.className=="fa fa-play-circle") {
    bigPlayer.play();
    icon.className="fa fa-pause-circle";
  } else {
    bigPlayer.pause();
    icon.className="fa fa-play-circle";
  }
}

function uploadVideo() {
  var input = document.createElement("INPUT");
  input.type="file";
  input.click();
  input.onchange = function() {
    var file = input.files[0];
    if(file.type=="video/mp4") {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        var binary = reader.result;
        bigPlayer.src=binary;
        bigPlayer.play();
        var icon = document.getElementById("playIcon");
        icon.className="fa fa-pause-circle";
      }
    } else {
      window.alert("select video file only");
    }

  }
}

function videoProgress() {
  var progress = document.getElementById("progressBar");
  var ctime = bigPlayer.currentTime;
  var total = bigPlayer.duration;
  // console.log((total/60).toFixed(2));
  var per = (ctime/total)*100;
  progress.style.width=per+"%";
}

function fullVideo() {
  bigPlayer.requestFullscreen();
}

function handleVolume() {
  var input = document.getElementById("volumeBar");
  if(input.style.display=="none") {
    input.style.display="block";
  } else {
    input.style.display="none";
  }
}

function changeVolume() {
  var icon = document.getElementById("volumeIcon");
  var input = document.getElementById("volumeBar").value;
  bigPlayer.volume=input;
  if(input==0) {
    icon.className="fa fa-volume-off";
  } else {
    icon.className="fa fa-volume-up";
  }
}

function handleSpeed(e) {
  var txt = document.getElementById("speedTxt");
  var speed = e.target.value;
  bigPlayer.playbackRate=speed;
  txt.innerHTML=speed;
}

var bgInput = document.getElementById("bgInput");
bgInput.onchange = function() {
  var bgcolor = this.value;
  var header = document.getElementById("videoHeader");
  var footer = document.getElementById("videoFooter");
  header.style.backgroundColor=bgcolor;
  footer.style.backgroundColor=bgcolor;
  localStorage.setItem("bgtheme",bgcolor);

}

function readBg() {
  var bgcolor = localStorage.getItem("bgtheme");
  if(bgcolor != null) {
    var header = document.getElementById("videoHeader");
    header.style.backgroundColor=bgcolor;
    var footer = document.getElementById("videoFooter");
    footer.style.backgroundColor=bgcolor;
  }
}

readBg();

var txtInput = document.getElementById("txtInput");
txtInput.onchange = function() {
  var txtcolor = this.value;
  var header = document.getElementById("videoHeader");
  header.style.color=txtcolor;
  var allIcon = document.getElementsByClassName("actionIcon");
  for(i=0;i<allIcon.length;i++) {
    allIcon[i].style.color=txtcolor;
  }
  localStorage.setItem("txttheme",txtcolor);
}

function readTxtTheme() {
  var color = localStorage.getItem("txttheme");
  if(color != null) {
    var header = document.getElementById("videoHeader");
    header.style.color=color;
    var allIcon = document.getElementsByClassName("actionIcon");
    for(i=0;i<allIcon.length;i++) {
      allIcon[i].style.color=color;
    }
  }
}

readTxtTheme();

var settingIcon = document.getElementById("settingIcon");
settingIcon.onclick = function() {
  var box = document.getElementById("settingBox");
  // var originalHeight = box.offsetWidth;
  var originalHeight = box.offsetHeight;
  if(originalHeight==0) {
    box.style.height="170px";
    box.style.padding="5px";
  } else {
    box.style.height="0px";
    box.style.padding="0px";
  }
}


function openMiniPlayer() {
  var bigbox = document.getElementById("videoSection");
  var miniBox = document.getElementById("miniPlayerBox");
  bigbox.style.display="none";
  miniBox.style.display="block";
  var link = bigPlayer.src;
  var smallplayer = document.getElementById("miniPlayer");
  smallplayer.src=link;

  var icon = document.getElementById("playIcon");
  if(icon.className=="fa fa-pause-circle") {
    smallplayer.play();
  } else {
    smallplayer.pause();
  }

  bigPlayer.pause();
  icon.className="fa fa-play-circle";
  smallplayer.currentTime = bigPlayer.currentTime;


}

var closeIcon = document.getElementById("closeIcon");
closeIcon.onclick = function() {
  var bigbox = document.getElementById("videoSection");
  var miniBox = document.getElementById("miniPlayerBox");
  bigbox.style.display="block";
  miniBox.style.display="none";
  var smallplayer = document.getElementById("miniPlayer");
  var playIcon = document.getElementById("playIcon");
  if(smallplayer.paused) {
    bigPlayer.pause();
    playIcon.className="fa fa-play-circle";
  } else {
    bigPlayer.play();
    playIcon.className="fa fa-pause-circle";
  }
  smallplayer.pause();
  var ctime = smallplayer.currentTime;
  bigPlayer.currentTime = ctime;

}
