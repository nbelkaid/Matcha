//

var socket = io.connect();
function create_notif(type, data) {
  var div = document.createElement('div');
  var container = document.getElementById('notification')
  if (type == 1) {
    div.className = "alert alert-info one_notif"
  }
  else if (type == 2 || type == 3) {
    div.className = "alert alert-success one_notif"
  }
  div.id = data.id_not
  div.onclick = function() {
    this.style.display='none';
    socket.emit('read_not', {id_not: data.id_not})
  }
  div.innerHTML = data.message
  container.appendChild(div);
}
function get_all_notif() {
  socket.emit('get_all_notif')
}


socket.on('notif-nbr', function(data) {
  console.log(data)
  $('#notif_nbr').html(data.nbr);
})
socket.on('one_read', function() {
  var current = parseInt($('#notif_nbr').html());
  $('#notif_nbr').html(current - 1 + "");   
})

socket.on('all_notif', function(data) {
  document.getElementById('notification').innerHTML = "";
  for (var i = data.notif.length - 1; i >= 0; i--) {
    if (data.notif[i].type == 1) {
      data.notif[i].message = data.notif[i].login + " a visité ton profil"
    }
    if (data.notif[i].type == 2) {
      data.notif[i].message = data.notif[i].login + " a liké ton profil"
    }
    if (data.notif[i].type == 3) {
      data.notif[i].message = "Félicitations ! Tu as matché avec " + data.notif[i].login
    }
    create_notif(data.notif[i].type, data.notif[i])
  }
})

socket.on('visit', function(data) {
  var current = parseInt($('#notif_nbr').html());
  $('#notif_nbr').html(current + 1 + "");
  create_notif(1, data)
})
socket.on('like', function(data) {
  var current = parseInt($('#notif_nbr').html());
  $('#notif_nbr').html(current + 1 + "");
  create_notif(2, data)
})
socket.on('match', function(data) {
  var current = parseInt($('#notif_nbr').html());
  $('#notif_nbr').html(current + 1 + "");
  create_notif(3, data)
})


// geo
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("False")
      socket.emit('no_geo')
    }
}
function showPosition(position) {
  console.log(position.coords)
  socket.emit('geo', {lat: position.coords.latitude,
    lng: position.coords.longitude})
}

getLocation()