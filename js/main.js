document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Portfolio filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  // Observe reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
  
  // Observe stagger children
  document.querySelectorAll('.stagger-children').forEach(el => {
    observer.observe(el);
  });
  
  // Additional scroll animations - Section by section
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        
        // Animate section header
        const header = section.querySelector('.section-header');
        if (header) {
          header.style.opacity = '0';
          header.style.transform = 'translateY(30px)';
          header.style.transition = 'all 0.6s ease';
          setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
          }, 100);
        }
        
        // Animate cards with stagger
        const cards = section.querySelectorAll('.about-card, .service-card, .testimonial-card, .portfolio-item');
        cards.forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(40px)';
          card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 150 + (index * 100));
        });
      }
    });
  }, { threshold: 0.15 });
  
  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Parallax effect for hero background elements
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroHeight = hero.offsetHeight;
      if (scrolled < heroHeight) {
        const parallaxElements = hero.querySelectorAll('.floating-element');
        parallaxElements.forEach(el => {
          const speed = el.dataset.speed || 0.5;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    }
  });
  
  // Button ripple effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        pointer-events: none;
        width: 10px;
        height: 10px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${x}px;
        top: ${y}px;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add keyframe for ripple in style
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(20);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Testimonial cards auto-rotate (optional)
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Service numbers animation
  const serviceNumbers = document.querySelectorAll('.service-number');
  serviceNumbers.forEach((num, index) => {
    num.style.opacity = '0';
    num.style.transform = 'translateY(20px)';
    setTimeout(() => {
      num.style.transition = 'all 0.5s ease';
      num.style.opacity = '1';
      num.style.transform = 'translateY(0)';
    }, 500 + (index * 150));
  });
  
  // CTA section entrance animation
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.3 });
    
    ctaSection.style.opacity = '0';
    ctaSection.style.transform = 'translateY(30px)';
    ctaSection.style.transition = 'all 0.8s ease';
    ctaObserver.observe(ctaSection);
  }
});