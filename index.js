money = 0;
moneyup = 1;
msec = 0;
upcost = 15;
slavecost = 25;
jewcost = 250;
upown = 0;
slaveown = 0;
jewown = 0;
slaveadd = 1;
jewadd = 15;
cboost = 1;
wboost = 1;
slavemax = 0;
jewmax = 0;

//save before exiting
function closingCode() {
  if (confirm("You have closed the window, would you like to save?") === true) {
    save();
    return null;
  }
}

function addcomma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
//updates all values
function reloadall() {
  document.getElementById("click").innerHTML =
    "LB/click: " + addcomma(moneyup) + " | LB/sec: " + addcomma(msec);
  document.getElementById("total").innerHTML = "LB: " + addcomma(money);
  document.getElementById("cat").innerHTML =
    slaveown + "-clicker cat: " + addcomma(slavecost) + " | +" + addcomma(slaveadd) + "/sec";
  document.getElementById("worker").innerHTML =
    jewown + "-worker: " + addcomma(jewcost) + " | +" + addcomma(jewadd) + "/sec";
  document.getElementById("upgrade").innerHTML =
    addcomma(upown) + "-main upgrade: " + addcomma(upcost);
}
//overwrites save file
function save() {
  localStorage.setItem("money", money);
  localStorage.setItem("moneyup", moneyup);
  localStorage.setItem("msec", msec);
  localStorage.setItem("upcost", upcost);
  localStorage.setItem("slavecost", slavecost);
  localStorage.setItem("slaveadd", slaveadd);
  localStorage.setItem("jewcost", jewcost);
  localStorage.setItem("jewadd", jewadd);
  localStorage.setItem("slaveown", slaveown);
  localStorage.setItem("jewown", jewown);
  localStorage.setItem("upown", upown);
  localStorage.setItem("slaveadd", slaveadd);
  localStorage.setItem("jewadd", jewadd);
  localStorage.setItem("cboost", cboost);
  localStorage.setItem("wboost", wboost);
  localStorage.setItem("slavemax", slavemax);
  localStorage.setItem("jewmax", jewmax);
}
//loads save file
function load() {
  money = parseInt(localStorage.getItem("money"));
  moneyup = parseInt(localStorage.getItem("moneyup"));
  msec = parseInt(localStorage.getItem("msec"));
  upcost = parseInt(localStorage.getItem("upcost"));
  slavecost = parseInt(localStorage.getItem("slavecost"));
  upown = parseInt(localStorage.getItem("slaveadd"));
  jewcost = parseInt(localStorage.getItem("jewcost"));
  upown = parseInt(localStorage.getItem("jewadd"));
  slaveown = parseInt(localStorage.getItem("slaveown"));
  jewown = parseInt(localStorage.getItem("jewown"));
  upown = parseInt(localStorage.getItem("upown"));
  slaveadd = parseInt(localStorage.getItem("slaveadd"));
  jewadd = parseInt(localStorage.getItem("jewadd"));
  cboost = parseInt(localStorage.getItem("cboost"));
  wboost = parseInt(localStorage.getItem("wboost"));
  slavemax = parseInt(localStorage.getItem("slavemax"));
  jewmax = parseInt(localStorage.getItem("jewmax"));

  reloadall();
}
//resets all values
function reset() {
  if (confirm("Are you sure you want to reset?") === true) {
    money = 0;
    moneyup = 1;
    msec = 0;
    upcost = 15;
    slavecost = 25;
    jewcost = 250;
    slaveown = 0;
    jewown = 0;
    upown = 0;
    slaveadd = 1;
    jewadd = 15;
    reloadall();
  }
}
//timer
function myTimer() {
    money += msec;
  document.getElementById("total").innerHTML = "Money: " + addcomma(money);
}
setInterval(myTimer, 1000);

//what happens when button is clicked
function clicked() {
  money += moneyup;
  document.getElementById("total").innerHTML = "Money: " + addcomma(money);
}
//upgrade function
function upgrade(name) {
  if (name == "Black Slave") {
    if (money >= slavecost && slaveown < 50) {
      
      if (slaveown <= 13) {
        msec += slaveadd;
        slaveadd++;
        cboost = 1;
      } else if (slaveown == 14) {
        msec += slaveadd;
        slaveadd++;
        cboost = 200;
      } else if (slaveown <= 23) {
        msec += 200 * slaveadd;
        slaveadd++;
        cboost = 200;
      } else if (slaveown == 24) {
        msec += 200 * slaveadd;
        slaveadd++;
        cboost = 5000;
      } else if (slaveown <= 48) {
        msec += 5000 * slaveadd;
        slaveadd++;
        cboost = 5000;
      } else if (slaveown == 49) {
        msec += 5000 * slaveadd;
        slaveadd++;
        cboost = 15000;
      } else {
        msec += 15000 * slaveadd;
        slaveadd++;
        cboost = 15000;
      }
      slaveown += 1;
      money -= slavecost;
      slavecost = slavecost * 2;
      document.getElementById("slave").innerHTML =
        slaveown + "-Black Slave: " + addcomma(slavecost) + " | +" + addcomma(slaveadd * cboost) + "/sec";
    } else if (slaveown == 50) {
      document.getElementById("slave").innerHTML =
        slaveown + "-Black Slave: MAX | +15% click/sec";
    }
  }

  if (name == "Jewish Banker") {
    if (money >= jewcost && jewown < 50) {
      
      if (jewown <= 13) {
        msec += jewadd;
        jewadd++;
        wboost = 1;
      } else if (jewown == 14) {
        msec += jewadd;
        jewadd++;
        wboost = 200;
      } else if (jewown <= 23) {
        msec += 200 * jewadd;
        jewadd++;
        wboost = 200;
      } else if (jewown == 24) {
        msec += 200 * jewadd;
        jewadd++;
        wboost = 5000;
      } else if (jewown <= 48) {
        msec += 5000 * jewadd;
        jewadd++;
        wboost = 5000;
      } else if (jewown == 49) {
        msec += 5000 * jewadd;
        jewadd++;
        wboost = 15000;
      } else {
        msec += 15000 * jewadd;
        jewadd++;
        wboost = 15000;
      }
      jewown += 1;
      money -= jewcost;
      jewcost = jewcost * 3;
      document.getElementById("jew").innerHTML = 
        jewown + "-Jewish Banker: " + addcomma(jewcost) + " | +" + addcomma(jewadd * wboost) + "/sec";
    } else if (jewown == 50) {
      document.getElementById("jew").innerHTML =
        jewown + "-Jewish Banker: MAX | +35% click/sec";
    }
  }

  if (name == "Manual Labor") {
    if (money >= upcost) {
      moneyup += upcost / 15;
      money -= upcost;
      upown += 1;
      upcost = upcost * 5;
      document.getElementById("upgrade").innerHTML =
        addcomma(upown) + "-Manual Labor: " + addcomma(upcost);
      if (slaveown == 50) {
        msec -= slavemax;
        slavemax = Math.floor(moneyup * 0.15);
        msec += slavemax;
      }
      if (jewown == 50) {
        msec -= jewmax;
        jewmax = Math.floor(moneyup * 0.35);
        msec += jewmax;
      }
    }
  }

  document.getElementById("click").innerHTML =
    "Money/click: " + addcomma(moneyup) + " | Money/sec: " + addcomma(msec);
  document.getElementById("total").innerHTML = "Money: " + addcomma(money);
}
