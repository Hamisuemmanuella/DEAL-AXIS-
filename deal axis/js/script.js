// ── CURSOR ──
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
const clabel = document.getElementById('cursor-label');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, .deal-card, .who-card, .feat-box').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hovering'); ring.classList.add('hovering'); clabel.textContent = el.dataset.label || ''; });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hovering'); ring.classList.remove('hovering'); });
});

// ── LOADER ──
const prog = document.getElementById('loader-progress');
const cnt = document.getElementById('loader-count');
let p = 0;
const loaderTimer = setInterval(() => {
  p += Math.random() * 18;
  if (p > 100) p = 100;
  prog.style.width = p + '%';
  cnt.textContent = Math.round(p) + '%';
  if (p >= 100) {
    clearInterval(loaderTimer);
    setTimeout(() => {
      const loader = document.getElementById('loader');
      loader.style.transform = 'translateY(-100%)';
      loader.style.transition = 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)';
      setTimeout(() => { loader.style.display = 'none'; startHeroAnimations(); }, 900);
    }, 300);
  }
}, 80);

// ── HERO ANIMATIONS ──
function startHeroAnimations() {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const sub = document.querySelector('.hero-sub');
  const btns = document.querySelector('.hero-btns');
  const stats = document.querySelector('.hero-stats');
  setTimeout(() => { eyebrow.style.opacity='1'; eyebrow.style.transform='none'; eyebrow.style.transition='opacity 0.7s ease, transform 0.7s ease'; }, 100);
  setTimeout(() => { sub.style.opacity='1'; sub.style.transform='none'; sub.style.transition='opacity 0.7s ease, transform 0.7s ease'; }, 400);
  setTimeout(() => { btns.style.opacity='1'; btns.style.transform='none'; btns.style.transition='opacity 0.7s ease, transform 0.7s ease'; }, 600);
  setTimeout(() => { stats.style.opacity='1'; stats.style.transform='none'; stats.style.transition='opacity 0.7s ease, transform 0.7s ease'; animateCounters(); }, 800);
  setTimeout(() => scrambleText(document.querySelector('.hero h1'), "The centre of every serious deal."), 200);
}

// ── TEXT SCRAMBLE ──
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
function scrambleText(el, finalText) {
  let frame = 0;
  const totalFrames = 35;
  const interval = setInterval(() => {
    let output = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ') { output += ' '; continue; }
      if (finalText[i] === '.') { output += '.'; continue; }
      if (frame > (i / finalText.length) * totalFrames) {
        output += finalText[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    // Preserve the em and gold span structure
    el.innerHTML = output.slice(0, output.lastIndexOf(' ')) + ' <span class="gold">' + output.slice(output.lastIndexOf(' ')+1) + '</span>';
    frame++;
    if (frame > totalFrames) {
      el.innerHTML = 'The centre of every serious <span class="gold">deal.</span>';
      clearInterval(interval);
    }
  }, 45);
}

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 40;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(t); }
      else el.textContent = Math.round(current);
    }, 30);
  });
}

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  // How-it-works line draw
  const line = document.getElementById('howLine');
  if (line) {
    const howEl = document.getElementById('how');
    if (howEl) {
      const rect = howEl.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight * 0.6)));
      if (window.innerWidth > 900) {
        line.style.width = (pct * 100) + '%';
        line.style.height = '100%';
      } else {
        line.style.height = (pct * 100) + '%';
        line.style.width = '100%';
      }
      line.style.transition = 'none';
    }
  }
});

// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .stagger').forEach(el => revealObserver.observe(el));

// ── MOBILE NAV ──
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');
if (burger) burger.addEventListener('click', () => mobileNav.classList.add('open'));
if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// ── FORM TABS ──
function switchTab(type) {
  document.querySelectorAll('.ftab').forEach((t,i) => t.classList.toggle('active', (type==='buyer'&&i===0)||(type==='seller'&&i===1)));
  document.getElementById('fc-buyer').classList.toggle('active', type==='buyer');
  document.getElementById('fc-seller').classList.toggle('active', type==='seller');
}

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.btn-mag').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const dx = (e.clientX - cx) * 0.3, dy = (e.clientY - cy) * 0.3;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; btn.style.transition = 'transform 0.4s ease'; });
});

// ── FORM SUBMISSION ──
document.querySelectorAll('.fsub').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const originalText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';
    
    setTimeout(() => {
      btn.textContent = 'Success! We will contact you.';
      btn.style.background = 'var(--green-light)';
      btn.style.opacity = '1';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.pointerEvents = 'all';
      }, 3000);
    }, 1500);
  });
});

// ── THREE.JS PARTICLE FIELD ──
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
  camera.position.z = 4;
  const count = 2200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i*3]   = (Math.random()-0.5)*14;
    positions[i*3+1] = (Math.random()-0.5)*9;
    positions[i*3+2] = (Math.random()-0.5)*6;
    const t = Math.random();
    if (t < 0.6) { colors[i*3]=0.11; colors[i*3+1]=0.62; colors[i*3+2]=0.38; }
    else if (t < 0.85) { colors[i*3]=0.12; colors[i*3+1]=0.2; colors[i*3+2]=0.14; }
    else { colors[i*3]=0.79; colors[i*3+1]=0.66; colors[i*3+2]=0.3; }
    speeds[i] = 0.0002 + Math.random() * 0.0004;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 0.028, vertexColors: true, transparent: true, opacity: 0.7 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  let mouse = { x: 0, y: 0 };
  document.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
  });
  function resize() {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.001;
    pts.rotation.y += 0.00012;
    pts.rotation.x += 0.00006;
    camera.position.x += (mouse.x - camera.position.x) * 0.03;
    camera.position.y += (-mouse.y - camera.position.y) * 0.03;
    const pos = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i*3+1] += speeds[i];
      if (pos[i*3+1] > 4.5) pos[i*3+1] = -4.5;
    }
    geo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  animate();
})();
