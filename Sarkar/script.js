/* ==========================================================================
   SARKAR PERFUMES — VOLT EAU DE PARFUM
   Production Interactivity & Performance Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Scroll Progress Bar ---
  const progressBar = document.getElementById('scrollProgress');
  const handleScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  };

  // --- Sticky Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', () => {
    handleScrollProgress();
    handleHeaderScroll();
  }, { passive: true });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Cart Drawer Logic ---
  const cartTrigger = document.getElementById('cartTrigger');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const addToCartBtns = document.querySelectorAll('.js-add-to-cart');
  const cartCountEl = document.getElementById('cartCount');
  const toastEl = document.getElementById('toastMsg');
  const toastTextEl = document.getElementById('toastText');
  
  let cartItemCount = 0;

  const openCart = () => {
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (cartTrigger) cartTrigger.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // --- Toast Notification ---
  const showToast = (message) => {
    if (!toastEl) return;
    toastTextEl.textContent = message;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  };

  // --- Add to Cart Handler ---
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartItemCount += 1;
      if (cartCountEl) cartCountEl.textContent = cartItemCount;
      
      showToast('VOLT Eau De Parfum (100ml) added to cart');
      openCart();
    });
  });

  // --- Quantity Controller ---
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyVal = document.getElementById('qtyVal');
  let currentQty = 1;

  if (qtyPlus && qtyMinus && qtyVal) {
    qtyPlus.addEventListener('click', () => {
      currentQty += 1;
      qtyVal.textContent = currentQty;
      updateSubtotal();
    });

    qtyMinus.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty -= 1;
        qtyVal.textContent = currentQty;
        updateSubtotal();
      }
    });
  }

  const updateSubtotal = () => {
    const subtotalEl = document.getElementById('cartSubtotal');
    if (subtotalEl) {
      const total = currentQty * 1799;
      subtotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
  };
});
