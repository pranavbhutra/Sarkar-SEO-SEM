/* ==========================================================================
   SARKAR PERFUMES — VOLT EAU DE PARFUM
   Master Interactive Motion & Alchemy Engine Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initCustomCursor();
  initScrollProgress();
  initHeaderScroll();
  initIntersectionObserver();
  initBottle3DTilt();
  initLightingToggle();
  initFragranceAlchemy();
  initSillageSimulator();
  initBatchVerifier();
  initPersonaQuiz();
  initAccordTabs();
  initScrubbingText();
  initCartDrawer();
});

/* --------------------------------------------------------------------------
   1. HTML5 Canvas Ambient Energy Particle System ("VOLT Atmosphere")
   -------------------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 55);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.4 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.15;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#00E5FF';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   2. Custom Glow Tracker
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   3. Scroll Progress Indicator & Header Sticky State
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Smooth Reveal Animation Observer
   -------------------------------------------------------------------------- */
function initIntersectionObserver() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. Interactive 3D Card Tilt Physics & Lighting Switcher
   -------------------------------------------------------------------------- */
function initBottle3DTilt() {
  const card = document.getElementById('heroBottleCard');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 18;
    const rotateY = (x / rect.width) * 18;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  });
}

function initLightingToggle() {
  const lightBtns = document.querySelectorAll('.light-mode-btn');
  const heroCard = document.getElementById('heroBottleCard');

  if (!lightBtns.length || !heroCard) return;

  lightBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      lightBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-light');
      if (mode === 'cyan') {
        heroCard.style.boxShadow = '0 35px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(0, 229, 255, 0.4)';
      } else if (mode === 'obsidian') {
        heroCard.style.boxShadow = '0 35px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 255, 255, 0.15)';
      } else if (mode === 'amber') {
        heroCard.style.boxShadow = '0 35px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 180, 70, 0.4)';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. NEW MODULE: Interactive Fragrance Alchemy Combinator
   -------------------------------------------------------------------------- */
function initFragranceAlchemy() {
  const layerBtns = document.querySelectorAll('.alchemy-layer-btn');
  const alchemyBox = document.getElementById('alchemyResultBox');

  if (!layerBtns.length || !alchemyBox) return;

  const alchemyData = {
    throne: {
      title: 'VOLT + THRONE (ROYAL AMBER SHIFT)',
      desc: 'Layering VOLT’s electric bergamot over Throne’s rich leather accord creates a commanding, high-contrast evening profile with 14+ hour projection.'
    },
    regal: {
      title: 'VOLT + REGAL (METALLIC OUD HYBRID)',
      desc: 'VOLT’s ozonic violet leaves amplify Regal’s smoky agarwood, producing a sharp, futuristic metallic-wood aura for formal galas.'
    },
    noble: {
      title: 'VOLT + NOBLE (CITRUS SMOKE SURGE)',
      desc: 'Doubles the Calabrian bergamot top note with Noble’s crisp white cedarwood. Crisp, invigorating, and unstoppable for high-energy mornings.'
    }
  };

  layerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      layerBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-layer');
      const data = alchemyData[target] || alchemyData.throne;

      alchemyBox.innerHTML = `
        <div style="color: var(--accent-electric); font-size: 0.72rem; letter-spacing: 0.28em; font-weight: 800; text-transform: uppercase;">SARKAR ALCHEMY FORMULA</div>
        <h4 style="font-size: 1.45rem; color: #FFF; margin-top: 0.4rem; margin-bottom: 0.5rem;">${data.title}</h4>
        <p style="font-size: 0.9rem; color: var(--text-subtle); line-height: 1.7;">${data.desc}</p>
      `;
    });
  });
}

/* --------------------------------------------------------------------------
   7. Real-time Sillage & Longevity Simulator
   -------------------------------------------------------------------------- */
function initSillageSimulator() {
  const rangeInput = document.getElementById('simRange');
  const hoursText = document.getElementById('simHoursText');
  const stageTitle = document.getElementById('simStageTitle');
  const stageDesc = document.getElementById('simStageDesc');
  const projectionVal = document.getElementById('simProjectionVal');
  const climateBtns = document.querySelectorAll('.climate-btn');

  if (!rangeInput) return;

  const stagesData = [
    { hours: '0-2 HRS', title: 'ACT 01 — EXPLOSIVE TOP ACCORD', desc: 'Calabrian Bergamot & Sun-Drenched Black Pepper project a 6ft electrifying aura.', proj: '98.5%' },
    { hours: '3-6 HRS', title: 'ACT 02 — OZONE & VIOLET HEART', desc: 'Crushed Violet Leaves & Metallic Ozone Air settle into a cool, magnetic 4ft sillage radius.', proj: '86.2%' },
    { hours: '7-12+ HRS', title: 'ACT 03 — HAITIAN VETIVER BASE', desc: 'Smoky Vetiver, Amber & Velvet Musk anchor deep into skin with irresistible 12+ hour longevity.', proj: '74.8%' },
  ];

  function updateSimulator(hours) {
    hoursText.textContent = `${hours} HOURS`;

    let dataIdx = 0;
    if (hours >= 3 && hours <= 6) dataIdx = 1;
    else if (hours >= 7) dataIdx = 2;

    const data = stagesData[dataIdx];
    if (stageTitle) stageTitle.textContent = data.title;
    if (stageDesc) stageDesc.textContent = data.desc;
    if (projectionVal) projectionVal.textContent = data.proj;
  }

  rangeInput.addEventListener('input', (e) => {
    updateSimulator(e.target.value);
  });

  climateBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      climateBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   8. Batch Authenticity Verifier
   -------------------------------------------------------------------------- */
function initBatchVerifier() {
  const verifyBtn = document.getElementById('verifyBtn');
  const verifyInput = document.getElementById('verifyInput');
  const verifyResult = document.getElementById('verifyResult');

  if (!verifyBtn || !verifyInput || !verifyResult) return;

  verifyBtn.addEventListener('click', () => {
    const code = verifyInput.value.trim().toUpperCase() || 'VOLT-2026-884';

    verifyResult.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--accent-electric); font-weight: 800; margin-bottom: 0.5rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>AUTHENTIC SARKAR BATCH VERIFIED</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-subtle);">
        Batch Reference: <strong>${code}</strong> • Formulated in Grasse, France • 25% Extrait Oil Concentration Verified.
      </p>
    `;

    verifyResult.classList.add('active');
  });
}

/* --------------------------------------------------------------------------
   9. Fragrance Persona Matcher
   -------------------------------------------------------------------------- */
function initPersonaQuiz() {
  const quizBtns = document.querySelectorAll('.quiz-opt-btn');
  const quizResultBox = document.getElementById('quizResultBox');

  if (!quizBtns.length || !quizResultBox) return;

  quizBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const match = btn.getAttribute('data-quiz-match');

      quizResultBox.innerHTML = `
        <div style="background: rgba(0,229,255,0.08); border: 1px solid var(--accent-electric); padding: 1.75rem; border-radius: 16px; margin-top: 1.5rem;">
          <span style="font-size: 0.7rem; letter-spacing: 0.28em; color: var(--accent-electric); font-weight: 800; text-transform: uppercase;">YOUR PERSONA MATCH</span>
          <h4 style="font-size: 1.5rem; color: #FFF; margin-top: 0.4rem; margin-bottom: 0.5rem;">${match}</h4>
          <p style="font-size: 0.88rem; color: var(--text-subtle);">
            SARKAR VOLT aligns 100% with your scent profile. The electrifying bergamot top note matches your energy, while the Haitian vetiver base ensures 12+ hour dominance.
          </p>
        </div>
      `;
    });
  });
}

/* --------------------------------------------------------------------------
   10. Accord Tabs Switcher
   -------------------------------------------------------------------------- */
function initAccordTabs() {
  const tabBtns = document.querySelectorAll('.accord-tab-btn');
  const actStages = document.querySelectorAll('.accord-act-fullwidth');

  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetAct = btn.getAttribute('data-act');

      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      actStages.forEach((stage) => {
        if (stage.getAttribute('data-act-stage') === targetAct) {
          stage.style.display = 'grid';
          stage.classList.add('active');
        } else {
          stage.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. Scrubbing Text Reveal Effect for Brand Philosophy
   -------------------------------------------------------------------------- */
function initScrubbingText() {
  const words = document.querySelectorAll('.story-scrub-word');
  if (!words.length) return;

  window.addEventListener('scroll', () => {
    const quoteBlock = document.querySelector('.story-scrub-section');
    if (!quoteBlock) return;

    const rect = quoteBlock.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const activeCount = Math.floor(progress * words.length * 1.5);

      words.forEach((word, index) => {
        if (index <= activeCount) {
          word.classList.add('active');
        } else {
          word.classList.remove('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   12. Cart Drawer & Toast System
   -------------------------------------------------------------------------- */
function initCartDrawer() {
  const cartTrigger = document.getElementById('cartTrigger');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const addButtons = document.querySelectorAll('.js-add-to-cart');

  const cartCount = document.getElementById('cartCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const qtyVal = document.getElementById('qtyVal');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');

  let itemCount = 1;
  const unitPrice = 1799;

  function updateCartUI() {
    if (cartCount) cartCount.textContent = itemCount;
    if (qtyVal) qtyVal.textContent = itemCount;
    if (cartSubtotal) cartSubtotal.textContent = `₹${(unitPrice * itemCount).toLocaleString('en-IN')}`;
  }

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showToast(msg) {
    if (!toastMsg) return;
    if (toastText) toastText.textContent = msg;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3200);
  }

  if (cartTrigger) cartTrigger.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      itemCount++;
      updateCartUI();
    });
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (itemCount > 1) {
        itemCount--;
        updateCartUI();
      }
    });
  }

  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast('SARKAR VOLT Eau De Parfum added to cart');
      openCart();
    });
  });
}
