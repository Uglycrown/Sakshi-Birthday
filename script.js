// Countdown to Birthday
function updateCountdown() {
    const birthday = new Date('November 16, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdown');
    
    if (distance < 0) {
        countdownElement.innerHTML = `
            <div style="font-size: 2rem; color: white; font-weight: bold;">
                🎉 It's Your Birthday! 🎉
            </div>
        `;
    } else if (days === 0 && hours === 0 && minutes === 0) {
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    } else {
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    }
}

// Check if content should be unlocked
function checkUnlock() {
    const unlockTime = new Date('November 16, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    
    if (now >= unlockTime) {
        // Unlock the content
        document.getElementById('lockedOverlay').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        return true;
    } else {
        // Keep locked
        document.getElementById('lockedOverlay').style.display = 'flex';
        document.getElementById('mainContent').style.display = 'none';
        updateLockedCountdown();
        return false;
    }
}

// Update locked screen countdown
function updateLockedCountdown() {
    const unlockTime = new Date('November 16, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = unlockTime - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const lockedCountdownElement = document.getElementById('lockedCountdown');
    
    if (distance < 0) {
        checkUnlock();
    } else {
        lockedCountdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    }
}

// Calculate friendship days
function calculateFriendshipDays() {
    const startDate = new Date('May 22, 2025');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    document.getElementById('friendshipDays').textContent = diffDays;
}

// Candle blow effect
const cake = document.getElementById('cake');
const flame = document.getElementById('flame');
const instruction = document.getElementById('instruction');

cake.addEventListener('click', () => {
    flame.classList.add('blown');
    instruction.textContent = '🎉 Happy Birthday Sakshi! May all your wishes come true! 🎉';
    instruction.style.color = '#ff1493';
    instruction.style.fontSize = '1.5rem';
    
    // Create confetti effect
    createConfetti();
    
    setTimeout(() => {
        flame.classList.remove('blown');
        instruction.textContent = 'Click the candle to blow it out!';
        instruction.style.color = '#ff69b4';
        instruction.style.fontSize = '1.3rem';
    }, 5000);
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#ffb6c1', '#ff91c7', '#ffd700'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const rotation = Math.random() * 360;
        const xMovement = (Math.random() - 0.5) * 100;
        
        confetti.animate([
            { 
                transform: `translateY(0) translateX(0) rotate(0deg)`,
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Initialize
checkUnlock();
setInterval(checkUnlock, 1000);
updateCountdown();
calculateFriendshipDays();
setInterval(updateCountdown, 1000);

// Smooth scroll for any future navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .timeline-item, .wish-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
