function changeBulbColor() {
    var bulb = document.getElementById("bulb");
    if (bulb.src.match("pic_bulboff")) {
        bulb.src = "pic_bulbon.gif";
    }
    else if (bulb.src.match("pic_bulbon")) {
        bulb.src = "pic_bulboff.gif";
    }
}

function myFunction() {
    alert(5 + 6);
}