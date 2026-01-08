// =========================
// Typewriter
// =========================
function initTypewriter() {
  const staticPhrase = "Hi, I'm Anisha Imran";
  const staticTextEl = document.getElementById("static-text");
  const typewriterText = document.getElementById("typewriter-text");

  const phrases = [
    "Bachelor of Software Engineering (Honours).",
    "Front End Developer · Growing into Fullstack.",
    "IBM · Meta · Microsoft coursework credentials."
  ];

  let currentPhrase = 0;
  let currentChar = 0;

  function typeStaticText(i = 0) {
    if (i < staticPhrase.length) {
      staticTextEl.textContent += staticPhrase.charAt(i);
      setTimeout(() => typeStaticText(i + 1), 100);
    } else {
      setTimeout(typeDynamic, 500);
    }
  }

  function typeDynamic() {
    const phrase = phrases[currentPhrase];
    if (currentChar < phrase.length) {
      typewriterText.textContent += phrase.charAt(currentChar);
      currentChar++;
      setTimeout(typeDynamic, 100);
    } else {
      setTimeout(eraseDynamic, 2000);
    }
  }

  function eraseDynamic() {
    if (currentChar > 0) {
      typewriterText.textContent = phrases[currentPhrase].substring(0, currentChar - 1);
      currentChar--;
      setTimeout(eraseDynamic, 50);
    } else {
      currentPhrase = (currentPhrase + 1) % phrases.length;
      setTimeout(typeDynamic, 500);
    }
  }

  typeStaticText();
}

// =========================
// Particles
// =========================
function initParticles(options = {}) {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = window.innerWidth;
  let h = window.innerHeight;
  let particles = [];
  const DPR = window.devicePixelRatio || 1;

  const defaultColor = options.color || "#C8D9E6";
  const lineMaxDist = options.lineMaxDist || 120;
  const lineBaseAlpha = typeof options.lineBaseAlpha === 'number' ? options.lineBaseAlpha : 0.22;
  const clearPadding = options.clearPadding || 24;

  const heroContent = document.querySelector('.hero-content');
  let heroRect = heroContent ? heroContent.getBoundingClientRect() : null;

  function hexToRgb(hex) {
    const m = hex.replace('#','');
    if(m.length === 3){
      return {
        r: parseInt(m[0]+m[0],16),
        g: parseInt(m[1]+m[1],16),
        b: parseInt(m[2]+m[2],16)
      };
    } else if(m.length === 6){
      return {
        r: parseInt(m.slice(0,2),16),
        g: parseInt(m.slice(2,4),16),
        b: parseInt(m.slice(4,6),16)
      };
    }
    return {r:47,g:65,b:86};
  }

  const rgb = hexToRgb(defaultColor);

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const target = Math.min(100, Math.floor((w * h) / 8000));
    while(particles.length < target) particles.push(createParticle());
    while(particles.length > target) particles.pop();

    updateHeroRect();
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2.2 + 0.8,
      a: 0.75 + Math.random() * 0.25
    };
  }

  function updateHeroRect() {
    heroRect = heroContent ? heroContent.getBoundingClientRect() : null;
  }

  function inHeroArea(p) {
    if (!heroRect) return false;
    return (
      p.x >= heroRect.left - clearPadding &&
      p.x <= heroRect.right + clearPadding &&
      p.y >= heroRect.top - clearPadding &&
      p.y <= heroRect.bottom + clearPadding
    );
  }

  function update() {
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if(p.x<-10) p.x=w+10;
      if(p.x>w+10) p.x=-10;
      if(p.y<-10) p.y=h+10;
      if(p.y>h+10) p.y=-10;

      if(!inHeroArea(p)){
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(1,p.a*1.2)})`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }

      for(let j=i+1;j<particles.length;j++){
        const q = particles[j];
        if(inHeroArea(p) || inHeroArea(q)) continue;
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < lineMaxDist){
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${lineBaseAlpha*(1-dist/lineMaxDist)})`;
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.moveTo(p.x,p.y);
          ctx.lineTo(q.x,q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(update);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", updateHeroRect, {passive:true});
  resize();
  requestAnimationFrame(update);
}

// =========================
// Glass Nav
// =========================
function initGlassNav() {
  const glassNav = document.getElementById("glassNav");
  const navItems = document.querySelectorAll(".glass-nav-list li");
  const indicator = document.querySelector(".glass-indicator");
  const sections = Array.from(document.querySelectorAll("section"));

  function updateIndicator(activeIndex){
    const activeItem = navItems[activeIndex];
    indicator.style.width = `${activeItem.offsetWidth}px`;
    indicator.style.left = `${activeItem.offsetLeft}px`;
  }

  function onScroll(){
    const scrollPos = window.scrollY;
    const heroHeight = document.getElementById("home").offsetHeight;

    // Show nav after hero
    glassNav.classList.toggle("visible", scrollPos > heroHeight - 20);

    // Highlight current section
    let currentIndex = 0;
    sections.forEach((sec, idx)=>{
      if(scrollPos >= sec.offsetTop - 120) currentIndex = idx;
    });

    navItems.forEach(item => item.classList.remove("active"));
    navItems[currentIndex].classList.add("active");

    updateIndicator(currentIndex);
  }

  navItems.forEach((item, idx)=>{
    item.addEventListener("click", ()=>{
      sections[idx].scrollIntoView({behavior:"smooth"});
    });
  });

  window.addEventListener("scroll", onScroll);
  onScroll(); // initialize
}

// =========================
// Init all
// =========================
document.addEventListener("DOMContentLoaded", ()=>{
  initTypewriter();
  initParticles({color:"#C8D9E6", lineMaxDist:120});
  initGlassNav();
});
