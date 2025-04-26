const canvas = document.getElementById('lineCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouse = { x: null, y: null };
const particles = [];
const numParticles = 80;

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.targetVX = this.vx;
    this.targetVY = this.vy;
    this.radius = 2;
    this.baseOpacity = 0.5 + Math.random() * 0.3;
    this.opacitySpeed = (Math.random() - 0.5) * 0.002;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(85, 85, 85, ${this.baseOpacity})`;
    ctx.fill();
  }

  update() {
    // 緩慢變化速度（讓方向轉變更自然）
    this.targetVX += (Math.random() - 0.5) * 0.005;
    this.targetVY += (Math.random() - 0.5) * 0.005;
    this.vx += (this.targetVX - this.vx) * 0.05;
    this.vy += (this.targetVY - this.vy) * 0.05;

    this.x += this.vx;
    this.y += this.vy;

    // 邊界反彈
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // 呼吸動畫
    this.baseOpacity += this.opacitySpeed;
    if (this.baseOpacity > 0.8 || this.baseOpacity < 0.3) {
      this.opacitySpeed *= -1;
    }

    this.draw();
  }
}

function connectParticles() {
  for (let i = 0; i < numParticles; i++) {
    for (let j = i + 1; j < numParticles; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        let alpha = 0.3 * (1 - dist / 120);
        ctx.strokeStyle = `rgba(85, 85, 85, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    const dx = particles[i].x - mouse.x;
    const dy = particles[i].y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      ctx.beginPath();
      let alpha = 0.5 * (1 - dist / 150);
      ctx.strokeStyle = `rgba(85, 85, 85, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => p.update());
  connectParticles();
  requestAnimationFrame(animate);
}

function init() {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
  animate();
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('load', () => {
  canvas.style.opacity = 1;
});

init();
