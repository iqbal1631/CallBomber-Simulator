const simulationBtn = document.getElementById('simulationBtn');
const phoneNumberInput = document.getElementById('phoneNumber');
const timerDisplay = document.getElementById('timer');
const callLogContainer = document.getElementById('callLog');

let simulationInterval;
let countdownInterval;
let timeLeft = 30;

simulationBtn.addEventListener('click', () => {
    const phoneNumber = phoneNumberInput.value;

    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    if (simulationBtn.textContent.includes('Start')) {
        startSimulation(phoneNumber);
    } else {
        stopSimulation();
    }
});

function startSimulation(phoneNumber) {
    simulationBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Simulation';
    simulationBtn.classList.add('btn-stop');
    timerDisplay.style.display = 'block';
    callLogContainer.style.display = 'block';
    callLogContainer.innerHTML = ''; 

    startCountdown();
    startCommunicationSimulation();
}

function startCountdown() {
    timeLeft = 30;
    countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Remaining: 00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;

        if (timeLeft <= 0) {
            stopSimulation();
            alert('Call Bombing Completed');
        }
    }, 1000);
}

function startCommunicationSimulation() {
    simulationInterval = setInterval(() => {
        const randomNumber = generateRandomPhoneNumber();
        const status = getRandomStatus();
        addCallLogEntry(randomNumber, status);
    }, 3000);
}

function stopSimulation() {
    clearInterval(simulationInterval);
    clearInterval(countdownInterval);

    simulationBtn.innerHTML = '<i class="fas fa-play"></i> Start Simulation';
    simulationBtn.classList.remove('btn-stop');
    timerDisplay.style.display = 'none';
    callLogContainer.style.display = 'none';
    phoneNumberInput.value = '';
}

function generateRandomPhoneNumber() {
    return `${Math.floor(Math.random() * 9000000000) + 1000000000}`;
}

function getRandomStatus() {
    return ['completed', 'failed', 'not-connected'][Math.floor(Math.random() * 3)];
}

function addCallLogEntry(number, status) {
    const logItem = document.createElement('div');
    logItem.classList.add('call-log-item');
    logItem.innerHTML = `<span>${number}</span><span class="status status-${status}">${status}</span>`;
    callLogContainer.prepend(logItem);
}
