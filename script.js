document.addEventListener('DOMContentLoaded', function() {
    
    // The hero image is now static - no animations on the image itself
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = Math.random() > 0.5 ? '#00ff00' : '#ff0000';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        let posY = startY;
        let posX = startX;
        let velocityY = -Math.random() * 3 - 2;
        let velocityX = (Math.random() - 0.5) * 2;
        let opacity = 1;
        
        const animateParticle = () => {
            posY += velocityY;
            posX += velocityX;
            opacity -= 0.01;
            
            particle.style.top = posY + 'px';
            particle.style.left = posX + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0 && posY > -10) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animateParticle);
    }
    
    setInterval(createParticle, 200);
    
    const guestCards = document.querySelectorAll('.guest-card');
    guestCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const microphone = document.querySelector('.microphone-container');
    let mouseX = 0;
    let mouseY = 0;
    let micX = 0;
    let micY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / 50;
        mouseY = (e.clientY - window.innerHeight / 2) / 50;
    });
    
    function animateMicrophone() {
        micX += (mouseX - micX) * 0.1;
        micY += (mouseY - micY) * 0.1;
        
        if (microphone) {
            microphone.style.transform = `translate(${micX}px, ${micY}px)`;
        }
        
        requestAnimationFrame(animateMicrophone);
    }
    
    animateMicrophone();
    
    function updateLiveStatus() {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        const liveText = document.querySelector('.live-text');
        const liveDot = document.querySelector('.live-dot');
        
        if (day === 4 && hours === 12 && minutes < 60) {
            liveText.textContent = 'LIVE NOW';
            liveDot.style.animation = 'blink 0.5s ease-in-out infinite';
        } else {
            liveText.textContent = 'ON AIR';
            liveDot.style.animation = 'blink 1s ease-in-out infinite';
        }
    }
    
    updateLiveStatus();
    setInterval(updateLiveStatus, 60000);
    
    function createWaveAnimation() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.bottom = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100px';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '999';
        canvas.width = window.innerWidth;
        canvas.height = 100;
        
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        
        let time = 0;
        
        function drawWave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            for (let x = 0; x < canvas.width; x++) {
                const y = 50 + Math.sin((x * 0.01) + time) * 20 + 
                         Math.sin((x * 0.02) + time * 1.5) * 10;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
            
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.beginPath();
            
            for (let x = 0; x < canvas.width; x++) {
                const y = 50 + Math.sin((x * 0.01) + time + Math.PI) * 20 + 
                         Math.sin((x * 0.02) + time * 1.5 + Math.PI) * 10;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
            
            time += 0.05;
            requestAnimationFrame(drawWave);
        }
        
        drawWave();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
        });
    }
    
    createWaveAnimation();
    
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'rgba(255, 235, 59, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.appendChild(ripple);
            
            ripple.animate([
                { width: '0', height: '0', opacity: 1 },
                { width: '200px', height: '200px', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => ripple.remove();
        });
    });
    
    const frequencyNeedle = document.querySelector('.frequency-needle');
    let scanDirection = 1;
    let scanPosition = 10;
    
    function customScan() {
        scanPosition += scanDirection * 0.5;
        
        if (scanPosition >= 90 || scanPosition <= 10) {
            scanDirection *= -1;
        }
        
        if (frequencyNeedle) {
            frequencyNeedle.style.left = scanPosition + '%';
            
            const hue = (scanPosition / 100) * 120;
            frequencyNeedle.style.background = `hsl(${hue}, 100%, 50%)`;
            frequencyNeedle.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 50%)`;
        }
        
        requestAnimationFrame(customScan);
    }
    
    customScan();
    
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    const hostElement = document.querySelector('.host');
    if (hostElement) {
        const originalText = hostElement.textContent;
        setTimeout(() => {
            typeWriter(hostElement, originalText, 50);
        }, 2000);
    }
    
    console.log('2 Way Talk Radio Show - Interactive animations loaded successfully!');
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page is hidden - pausing animations');
    } else {
        console.log('Page is visible - resuming animations');
    }
});