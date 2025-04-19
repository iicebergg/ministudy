document.addEventListener('DOMContentLoaded', function() {
    const minutesInput = document.getElementById('minutes');
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const sound = document.getElementById('timerSound');

    let timer;
    let timeLeft = 0;
    let isRunning = false;
    
// Notifications
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            // Permission granted, you can send notifications
          } else if (permission === 'denied') {
            // Permission denied
          } else {
           // Permission is in default state (not granted or denied)
          }
        });
      } else {
        // Browser doesn't support notifications
        console.log('This browser does not support notifications.');
      }
    function timerFinishedNotification() {
        if (Notification.permission === 'granted') {
          const notification = new Notification('Hello!', {
            body: 'This is a sample notification.',
            icon: 'icon.png' // Optional icon
          });
        }
    }

// Play sound at end of timer
    function playSound() {
        sound.currentTime = 0;
        sound.play();
    }
// Initialize display
    updateDisplay(minutesInput.value * 60);
    
// Event listeners for increment/decrement buttons
    incrementBtn.addEventListener('click', function() {
        if (!isRunning) {
            const currentValue = parseInt(minutesInput.value) || 0;
            minutesInput.value = currentValue + 1;
            updateDisplay(minutesInput.value * 60);
        }
    });
    
    decrementBtn.addEventListener('click', function() {
        if (!isRunning) {
            const currentValue = parseInt(minutesInput.value) || 0;
            if (currentValue > 0) {
                minutesInput.value = currentValue - 1;
                updateDisplay(minutesInput.value * 60);
            }
        }
    });
    
// Update display when input changes directly
    minutesInput.addEventListener('input', function() {
        if (!isRunning) {
            updateDisplay(minutesInput.value * 60);
        }
    });
    
// Start button
    startBtn.addEventListener('click', function() {
        if (!isRunning) {
            if (timeLeft === 0) {
                timeLeft = parseInt(minutesInput.value) * 60 || 0;
            }
            
            if (timeLeft > 0) {
                isRunning = true;
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                minutesInput.disabled = true;
                incrementBtn.disabled = true;
                decrementBtn.disabled = true;
                
                timer = setInterval(function() {
                    timeLeft--;
                    updateDisplay(timeLeft);
                    
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        isRunning = false;
                        startBtn.disabled = false;
                        pauseBtn.disabled = true;
                        minutesInput.disabled = false;
                        incrementBtn.disabled = false;
                        decrementBtn.disabled = false;
                        playSound();
                        timerFinishedNotification();
                    }
                }, 1000);
            }
        }
    });
    
// Pause button
    pauseBtn.addEventListener('click', function() {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    });
    
// Reset button
    resetBtn.addEventListener('click', function() {
        clearInterval(timer);
        isRunning = false;
        timeLeft = 0;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        minutesInput.disabled = false;
        incrementBtn.disabled = false;
        decrementBtn.disabled = false;
        updateDisplay(minutesInput.value * 60);
    });
    resetBtn.addEventListener('click', function() {
        sound.pause();
        sound.currentTime = 0;
      });
    
// Format and update the display
    function updateDisplay(seconds) {
        timeLeft = seconds;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        display.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
    });
    