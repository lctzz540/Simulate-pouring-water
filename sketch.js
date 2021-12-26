let bottles = [];
let counter = 0;
let filling = false;
let fillWaterPoint = 520;
let inSecondline = 0;
let box = 0;
let closed = 0;
let emergency = false;
let stop = false;
let bt = true;
function setup() {
  mycanvas = createCanvas(900, 600);
  mycanvas.parent("simulator");
}
function createBottle() {
  if (counter % 120 == 0 && stop == false && 6 * box + bottles.length < need) {
    let newBottle = new Bottle(-50, 250, false);
    bottles.push(newBottle);
  }
  for (let c = 0; c < bottles.length; c++) {
    bottles[c].display();
    if (bottles[c].x == fillWaterPoint) {
      filling = true;
    }
    if (filling == true && bottles[c].x == fillWaterPoint) {
      bottles[c].fillWater();
      try {
        bottles[c - 1].closeTheLid();
      } catch (e) {}
      if (bottles[c].yc <= bottles[c].full) {
        filling = false;
        closed += 1;
      }
    }
    if (filling == false && emergency == false && stop == false && bt == true) {
      bottles[c].move();
    }
    if (bottles[c].lid == false && bottles[c].x == 650) {
      filling = true;
      bottles[c].closeTheLid();
    } else {
      if (bottles[c].lid == true && bottles[c].x == 650) {
        filling = false;
      }
    }
  }
  if (inSecondline == 6) {
    box += 1;
    for (i = 1; i <= 6; i++) {
      bottles.shift();
    }
    inSecondline = 0;
  }
  if (filling == false && emergency == false && stop == false && bt == true) {
    counter++;
  }
}
function draw() {
  background("#0087AA");
  fill("green");
  rect(0, 330, width, 20);
  fill("blue");
  rect(590, 100, 100, 100);
  fill("white");
  rect(500, 100, 100, 100);
  need = document.getElementById("needForm").value;
  createBottle();
  if (closed == 0) {
    document.getElementById("countBottle").innerHTML = 0;
  } else {
    document.getElementById("countBottle").innerHTML = closed - 1;
  }
  document.getElementById("countBox").innerHTML = box;
  light();
}
function auto() {
  document.getElementById("checkPump").setAttribute("disabled", "");
  document.getElementById("checkValve").setAttribute("disabled", "");
  document.getElementById("checkXL1").setAttribute("disabled", "");
  document.getElementById("checkXL2").setAttribute("disabled", "");
  document.getElementById("checkConvayor").setAttribute("disabled", "");
  document.getElementById("check1").setAttribute("disabled", "");
  document.getElementById("check2").setAttribute("disabled", "");
  document.getElementById("check3").setAttribute("disabled", "");
  document.getElementById("start").removeAttribute("disabled", "");
  document.getElementById("stop").removeAttribute("disabled", "");
}
function autoStart() {
  var tab = document.getElementById("check");
  var chk = tab.getElementsByTagName("input");
  var num = chk.length;
  for (var i = 0; i < num; i++) {
    var status = chk[i].getAttribute("type");
    if (status == "checkbox") {
      chk[i].checked = true;
    }
  }
  stop = false;
  document.getElementById("needForm").removeAttribute("disabled", "");
}
function autoStop() {
  stop = true;
}
function manual() {
  document.getElementById("checkPump").removeAttribute("disabled", "");
  document.getElementById("checkValve").removeAttribute("disabled", "");
  document.getElementById("checkXL1").removeAttribute("disabled", "");
  document.getElementById("checkXL2").removeAttribute("disabled", "");
  document.getElementById("checkConvayor").removeAttribute("disabled", "");
  document.getElementById("check1").removeAttribute("disabled", "");
  document.getElementById("check2").removeAttribute("disabled", "");
  document.getElementById("check3").removeAttribute("disabled", "");
  document.getElementById("start").setAttribute("disabled", "");
  document.getElementById("stop").setAttribute("disabled", "");
}
function light() {
  if (emergency == false && stop == false && bt == true) {
    document.getElementById("runlight").style.backgroundColor = "lightgreen";
    document.getElementById("errorlight").style.backgroundColor = "gray";
    document.getElementById("stoplight").style.backgroundColor = "gray";
  }
  if (emergency == true) {
    document.getElementById("errorlight").style.backgroundColor = "gold";
    document.getElementById("stoplight").style.backgroundColor = "red";
    document.getElementById("runlight").style.backgroundColor = "gray";
  }

  if (stop == true) {
    document.getElementById("stoplight").style.backgroundColor = "red";
    document.getElementById("runlight").style.backgroundColor = "gray";
  }
  if (bt == false) {
    document.getElementById("runlight").style.backgroundColor = "gray";
    document.getElementById("stoplight").style.backgroundColor = "red";
  }
}
function handleEmergency() {
  emergency = true;
}
function handleReset() {
  emergency = false;
  stop = false;
  bt = true;
}
function handleCheckConvayor() {
  var checkBT = document.getElementById("checkConvayor");
  if (checkBT.checked != true) {
    bt = false;
  } else {
    bt = true;
  }
}
