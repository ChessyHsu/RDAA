for(var i = 1; i <= 27; i++) {
  var duration = 1 + Math.random() * 3;
  $("#star" + i).css({
    "animation" : duration + "s gleam infinite ease"
  })
}