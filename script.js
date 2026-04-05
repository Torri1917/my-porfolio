
const nameElement = document.getElementById('typingName');
const fullName = "Лев Савельев";
let i = 0;

function typeWriter() {
    if (i < fullName.length) {
        nameElement.innerHTML += fullName.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();


const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class MovingLine {
    constructor() {
        this.reset();
    }
    reset() {
        this.x1 = Math.random() * canvas.width;
        this.y1 = Math.random() * canvas.height;
        this.x2 = Math.random() * canvas.width;
        this.y2 = Math.random() * canvas.height;
        this.speedX1 = (Math.random() - 0.5) * 0.4;
        this.speedY1 = (Math.random() - 0.5) * 0.4;
        this.speedX2 = (Math.random() - 0.5) * 0.4;
        this.speedY2 = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.life = Math.random() * 200 + 100;
    }
    update() {
        this.x1 += this.speedX1;
        this.y1 += this.speedY1;
        this.x2 += this.speedX2;
        this.y2 += this.speedY2;
        this.life--;
        if (this.life <= 0 || this.x1 < -100 || this.x1 > canvas.width + 100 ||
            this.y1 < -100 || this.y1 > canvas.height + 100 ||
            this.x2 < -100 || this.x2 > canvas.width + 100 ||
            this.y2 < -100 || this.y2 > canvas.height + 100) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = `rgba(245, 245, 220, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x1, this.y1, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 220, ${this.opacity + 0.1})`;
        ctx.fill();
    }
}

let lines = [];
for (let i = 0; i < 30; i++) lines.push(new MovingLine());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(line => {
        line.update();
        line.draw();
    });
    requestAnimationFrame(animate);
}
animate();

let clickCount = 0;
const clicker = document.getElementById('clickCounter');
if (clicker) {
    // Пасхалка со счётчиком
    clicker.addEventListener('click', () => {
        clickCount++;
        clicker.textContent = `[ клик → ${clickCount} ]`;
        if (clickCount === 5) clicker.textContent = `[ ты внимателен! ]`;
        if (clickCount === 10) clicker.textContent = `[ лев красавчик 🤘 ]`;
    });
}


const skillBars = document.querySelectorAll('.fill');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = getComputedStyle(entry.target).width;
        }
    });
}, { threshold: 0.3 });
skillBars.forEach(bar => observer.observe(bar));