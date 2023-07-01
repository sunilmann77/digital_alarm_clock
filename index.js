let alarms = [];
let alarmTime = null;
let alarmTimeout = null;
const alarmList = document.getElementById('alarm-list');
const addalarmInput = document.getElementById('add');
const alarmsCounter = document.getElementById('alarm-counter');
const input =document.querySelector('input');



// display current  time or current time function
(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }
    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        document.getElementById('current-time').innerHTML = h + ":" + m + ":" + s;
        setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
})
();


// adding a alarm in the list
function addalarm (alarm) {
    if(alarm){
        alarms.push(alarm);
        setAlarm();
        renderList(); 
    }
}

// deleting the alarm_id
function deletealarm(alarmId) {
    const newalarms = alarms.filter(function(alarm) {
        return alarm.id !== alarmId;
    });
    alarms = newalarms;
    renderList();
}

// add alarm to dom
function addalarmToDom(alarm) {
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" id="${alarm.id}" ${alarm.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${alarm.id}">${alarm.text}</label>
    <button class="delete" data-id="${alarm.id}">Del</button>`;
    alarmList.append(li);
}

function renderList () {
    alarms.sort(function(a, b) {
        const dateA = new Date(a.text);
        const dateB = new Date(b.text);
        return dateA - dateB;
      });
    alarmList.innerHTML = '';
    for (let i =0; i< alarms.length; i++){
        addalarmToDom(alarms[i]);
    }
    alarmsCounter.innerHTML = alarms.length;
}

function Togglealarm(alarmId) {
    const alarm = alarms.filter(function(alarm) {
        return alarm.id === alarmId;
    });
    if (alarm.length > 0) {
        const currentalarm = alarm[0];
        currentalarm.done = !currentalarm.done;
        renderList();
        showNotification("alarm toggled");
        return;
    }
}

function handleinputkeypress (event) {
    if(event.key === 'Enter'){
        const text = event.target.value;
        if(!text){

            return;
        }
        const alarm ={
            text,
            id:Date.now().toString(),
            done:false
        }
        event.target.value = '';
        addalarm(alarm);
    }
}

function handleClickListener(event) {
    const target = event.target;
    if (target.className === 'delete') {
        const alarmId = target.dataset.id;
        deletealarm(alarmId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const alarmId = target.id;
        Togglealarm(alarmId);
        return;
    }
}

// let me show you once   ek or doubt tha   sort karna h alarm list ko
input.addEventListener('input',setAlarmTime);

function setAlarmTime(e) {
    alarmTime = e.target.value;
  }
  function setAlarm() {
    if (alarmTime) {
      const current = new Date();
      const timeToAlarm = new Date(alarmTime);
  
      if (timeToAlarm > current) {
        const timeout = timeToAlarm.getTime() - current.getTime();
        alarmTimeout = setTimeout(function() {
          alert("WakeUp");
          deletealarm();
        }, timeout);
        alert("Alarm set");
      }
    }
  }

function initializeApp(){
    addalarmInput.addEventListener('keyup',handleinputkeypress);
    document.addEventListener('click',handleClickListener);
}

initializeApp();
