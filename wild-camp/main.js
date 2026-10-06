/**
 * Wild Camp - Main JavaScript
 * Funcionalidades completas para aventuras en la naturaleza
 */

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader with camping theme
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      // Add special camping sounds effect (optional)
      console.log('🏕️ Welcome to Wild Camp! Adventure awaits...');
      
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.remove();
        }, 300);
      }, 800);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: true,
        mirror: false,
        offset: 100
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders with camping theme
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      // Add camping-specific effects
      config.effect = 'fade';
      config.autoplay = {
        delay: 4000,
        disableOnInteraction: false
      };

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        if (typeof Swiper !== 'undefined') {
          const swiper = new Swiper(swiperElement, config);
          
          // Add camping sound effects on slide change (optional)
          swiper.on('slideChange', function () {
            console.log('🌲 Exploring new adventure...');
          });
        }
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters for expeditions
   */
  function initIsotope() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      const container = isotopeItem.querySelector('.isotope-container');
      if (container) {
        // Enhanced layout for camping expeditions
        function layoutItems() {
          const items = container.querySelectorAll('.isotope-item');
          items.forEach((item, index) => {
            item.style.display = 'block';
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-in');
          });
        }
        
        // Initialize layout
        layoutItems();
        
        // Handle expedition filters
        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filterBtn) {
          filterBtn.addEventListener('click', function() {
            // Remove active class from all buttons
            isotopeItem.querySelectorAll('.isotope-filters .filter-active').forEach(btn => {
              btn.classList.remove('filter-active');
            });
            // Add active class to clicked button
            this.classList.add('filter-active');
            
            // Enhanced filter logic for expeditions
            const filterValue = this.getAttribute('data-filter');
            const items = container.querySelectorAll('.isotope-item');
            
            items.forEach((item, index) => {
              if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
                  item.style.transition = 'all 0.4s ease';
                }, index * 100);
              } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-30px)';
                setTimeout(() => {
                  item.style.display = 'none';
                }, 400);
              }
            });
            
            // Re-trigger AOS animations
            if (typeof AOS !== 'undefined') {
              setTimeout(() => {
                AOS.refresh();
              }, 500);
            }
            
            // Add expedition selection sound effect
            console.log(`🏕️ Filtering expeditions: ${filterValue}`);
          });
        });
      }
    });
  }

  window.addEventListener('load', initIsotope);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Enhanced Navmenu Scrollspy for adventure sections
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
        
        // Add section change notification
        const sectionName = section.id;
        console.log(`🌲 Now exploring: ${sectionName}`);
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Animated counter for adventure stats
   */
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace('+', ''));
      const duration = 2500; // 2.5 seconds for adventure feel
      const step = target / (duration / 16); // 60 FPS
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
          // Add completion effect
          counter.style.transform = 'scale(1.1)';
          setTimeout(() => {
            counter.style.transform = 'scale(1)';
          }, 200);
        }
      };
      
      // Start animation when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
            console.log('📊 Adventure stats revealed!');
          }
        });
      }, {
        threshold: 0.5
      });
      
      observer.observe(counter);
    });
  }

  window.addEventListener('load', animateCounters);

  /**
   * Enhanced smooth scrolling for adventure navigation
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 90;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        // Add adventure navigation sound effect
        console.log(`🧭 Navigating to: ${target.id}`);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * Enhanced image loading with adventure theme
   */
  function initImageLoading() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
      });
      
      img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%238B4513" width="200" height="200"/><text x="100" y="100" text-anchor="middle" fill="white" font-size="20">🏕️</text></svg>';
        console.warn('🖼️ Adventure image loading failed:', this.alt || 'Unknown image');
      });
      
      // Set initial styles for adventure loading effect
      img.style.opacity = '0';
      img.style.transform = 'scale(0.95)';
      img.style.transition = 'all 0.4s ease-out';
      
      // If image is already loaded
      if (img.complete) {
        img.classList.add('loaded');
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }
    });
  }

  window.addEventListener('load', initImageLoading);

  /**
   * Adventure parallax effect for hero section
   */
  function initAdventureParallax() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const speed = 0.3; // Slower for adventure feel
        heroSection.style.transform = `translateY(${scrolled * speed}px)`;
        
        // Add subtle rotation based on scroll
        const rotation = scrolled * 0.01;
        heroSection.style.filter = `hue-rotate(${rotation}deg)`;
      });
    }
  }

  window.addEventListener('load', initAdventureParallax);

  /**
   * Adventure typing animation for hero title
   */
  function initAdventureTyping() {
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      heroTitle.style.borderRight = '3px solid #8B4513';
      
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          
          // Add random typing speed for adventure feel
          const speed = Math.random() * 100 + 50;
          setTimeout(typeWriter, speed);
        } else {
          // Remove cursor after typing
          setTimeout(() => {
            heroTitle.style.borderRight = 'none';
          }, 1000);
        }
      }
      
      // Start typing animation after preloader
      setTimeout(() => {
        console.log('⛺ Starting adventure story...');
        typeWriter();
      }, 1200);
    }
  }

  window.addEventListener('load', initAdventureTyping);

  /**
   * Adventure booking system
   */
  function initAdventureBooking() {
    const bookingButtons = document.querySelectorAll('.btn-book, .btn-menu');
    
    bookingButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        // Add adventure booking sound effect
        console.log('🎒 Adventure booking initiated!');
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }

  window.addEventListener('load', initAdventureBooking);

  /**
   * Weather simulation for adventure feel
   */
  function initWeatherSimulation() {
    const weatherEffects = ['☀️', '⛅', '🌤️', '🌦️', '❄️'];
    let currentWeather = 0;
    
    function changeWeather() {
      const hero = document.querySelector('.hero');
      if (hero) {
        currentWeather = (currentWeather + 1) % weatherEffects.length;
        console.log(`🌤️ Weather update: ${weatherEffects[currentWeather]}`);
        
        // Subtle weather effects on hero section
        const opacity = 0.05;
        switch(currentWeather) {
          case 0: // Sunny
            hero.style.filter = 'brightness(1.1) contrast(1.1)';
            break;
          case 1: // Cloudy
            hero.style.filter = 'brightness(0.9) contrast(0.9)';
            break;
          case 2: // Partly cloudy
            hero.style.filter = 'brightness(1) contrast(1)';
            break;
          case 3: // Rainy
            hero.style.filter = 'brightness(0.8) sepia(0.1)';
            break;
          case 4: // Snowy
            hero.style.filter = 'brightness(1.2) contrast(1.1) hue-rotate(180deg)';
            break;
        }
      }
    }
    
    // Change weather every 30 seconds for dynamic feel
    setInterval(changeWeather, 30000);
  }

  window.addEventListener('load', initWeatherSimulation);

  /**
   * Adventure expedition cards interaction
   */
  function initExpeditionCards() {
    const expeditionCards = document.querySelectorAll('.menu-item');
    
    expeditionCards.forEach((card, index) => {
      card.addEventListener('mouseenter', function() {
        console.log(`⛰️ Exploring expedition: ${this.querySelector('h5')?.textContent}`);
        
        // Add expedition preview effect
        this.style.transform = 'translateY(-10px) rotate(1deg) scale(1.02)';
        
        // Add subtle glow effect
        this.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.4), 0 0 20px rgba(34, 139, 34, 0.3)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        this.style.boxShadow = '';
      });
      
      card.addEventListener('click', function() {
        console.log(`🎒 Expedition selected: ${this.querySelector('h5')?.textContent}`);
        
        // Add selection feedback
        this.style.animation = 'pulse 0.3s ease-in-out';
        setTimeout(() => {
          this.style.animation = '';
        }, 300);
      });
    });
  }

  window.addEventListener('load', initExpeditionCards);

  /**
   * Campfire effect simulation
   */
  function initCampfireEffect() {
    const campfireElements = document.querySelectorAll('.feature-icon, .feature-icon-small');
    
    campfireElements.forEach(element => {
      // Add flickering effect to icons
      const flicker = () => {
        const intensity = Math.random() * 0.3 + 0.7;
        element.style.filter = `brightness(${intensity}) contrast(${intensity + 0.2})`;
        
        setTimeout(flicker, Math.random() * 1000 + 500);
      };
      
      // Start flickering when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            flicker();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(element);
    });
  }

  window.addEventListener('load', initCampfireEffect);

  /**
   * Adventure sound effects (console logs for development)
   */
  function initAdventureSounds() {
    const soundEffects = {
      scroll: () => console.log('🌿 Footsteps through nature...'),
      click: () => console.log('🔥 Adventure action taken!'),
      hover: () => console.log('👁️ Exploring options...'),
      load: () => console.log('🏕️ Base camp established!')
    };
    
    // Add scroll sound effects
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(soundEffects.scroll, 100);
    });
    
    // Add click sound effects to buttons
    document.querySelectorAll('button, .btn, a[href^="#"]').forEach(element => {
      element.addEventListener('click', soundEffects.click);
    });
    
    // Add hover sound effects to interactive elements
    document.querySelectorAll('.feature-box, .amenity-item, .contact-item').forEach(element => {
      element.addEventListener('mouseenter', soundEffects.hover);
    });
    
    // Announce when adventure is ready
    window.addEventListener('load', () => {
      setTimeout(soundEffects.load, 1000);
    });
  }

  window.addEventListener('load', initAdventureSounds);

  /**
   * Adventure contact form with validation
   */
  function initAdventureContactForm() {
    const contactForm = document.querySelector('.contact-form, .adventure-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name') || formData.get('adventurer-name');
        const email = formData.get('email');
        const message = formData.get('message') || formData.get('adventure-request');
        const expedition = formData.get('expedition');
        
        // Adventure-specific validation
        if (!name || !email || !message) {
          alert('🏕️ Por favor, complete todos los campos para unirse a la aventura.');
          return;
        }
        
        if (!isValidEmail(email)) {
          alert('📧 Por favor, ingrese un email válido para enviarle los detalles de la expedición.');
          return;
        }
        
        // Success message with adventure theme
        const expeditionText = expedition ? ` para la expedición "${expedition}"` : '';
        alert(`🎒 ¡Gracias ${name}! Su solicitud de aventura${expeditionText} ha sido recibida. 
        
Nuestro equipo de guías expertos se pondrá en contacto pronto para planificar su expedición salvaje.

¡Prepárese para la aventura de su vida! 🏔️`);
        
        console.log(`🎯 New adventure request from ${name}${expeditionText}`);
        this.reset();
      });
    }
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  window.addEventListener('load', initAdventureContactForm);

  /**
   * Adventure newsletter with survival tips
   */
  function initAdventureNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form, .survival-tips-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
          alert('🏕️ Por favor, ingrese su email para recibir consejos de supervivencia.');
          return;
        }
        
        if (!isValidEmail(email)) {
          alert('📧 Por favor, ingrese un email válido.');
          return;
        }
        
        alert(`🌲 ¡Bienvenido al Wild Camp Newsletter! 

Recibirá consejos de supervivencia, rutas secretas, técnicas de camping y ofertas exclusivas para aventureros como usted.

¡Su próxima aventura épica está por comenzar! ⛰️`);
        
        console.log(`📬 New survival tips subscriber: ${email}`);
        this.reset();
      });
    }
  }

  window.addEventListener('load', initAdventureNewsletter);

  /**
   * Equipment check simulation
   */
  function initEquipmentCheck() {
    const equipmentItems = document.querySelectorAll('.amenity-item');
    
    equipmentItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        const itemName = this.querySelector('span')?.textContent || 'Unknown item';
        console.log(`✅ Equipment checked: ${itemName}`);
        
        // Add check animation
        const icon = this.querySelector('i');
        if (icon) {
          const originalIcon = icon.className;
          icon.className = 'bi bi-check-circle-fill';
          icon.style.color = '#228B22';
          
          setTimeout(() => {
            icon.className = originalIcon;
            icon.style.color = '';
          }, 1000);
        }
      });
    });
  }

  window.addEventListener('load', initEquipmentCheck);

  /**
   * Adventure mode toggle (day/night cycle)
   */
  function initAdventureMode() {
    let isNightMode = false;
    
    // Create adventure mode toggle button
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '🌙';
    toggleButton.style.cssText = `
      position: fixed;
      top: 100px;
      right: 25px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 3px solid #8B4513;
      background: #F5F5DC;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 999;
      transition: all 0.3s ease;
    `;
    
    toggleButton.addEventListener('click', function() {
      isNightMode = !isNightMode;
      
      if (isNightMode) {
        // Night mode
        document.body.style.filter = 'brightness(0.7) contrast(1.2) hue-rotate(30deg)';
        this.innerHTML = '☀️';
        console.log('🌙 Night mode activated - Adventure under the stars!');
      } else {
        // Day mode
        document.body.style.filter = '';
        this.innerHTML = '🌙';
        console.log('☀️ Day mode activated - Perfect for hiking!');
      }
    });
    
    document.body.appendChild(toggleButton);
  }

  window.addEventListener('load', initAdventureMode);

  /**
   * Performance monitoring for adventure
   */
  function initAdventurePerformance() {
    // Monitor page load time
    window.addEventListener('load', function() {
      const loadTime = performance.now();
      console.log(`⚡ Adventure camp loaded in ${loadTime.toFixed(2)}ms`);
      
      if (loadTime > 3000) {
        console.warn('🐌 Adventure loading slower than expected - optimizing gear...');
      } else {
        console.log('🚀 Adventure camp ready - gear optimized!');
      }
    });
    
    // Monitor scroll performance
    let scrolling = false;
    window.addEventListener('scroll', function() {
      if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(function() {
          scrolling = false;
        });
      }
    });
  }

  window.addEventListener('load', initAdventurePerformance);

  /**
   * Adventure error handling
   */
  function initAdventureErrorHandling() {
    window.addEventListener('error', function(e) {
      console.error('🚨 Adventure error encountered:', e.error);
      console.log('🔧 Adventure guide team notified for assistance...');
    });
    
    window.addEventListener('unhandledrejection', function(e) {
      console.error('⚠️ Adventure promise rejected:', e.reason);
      console.log('🎯 Redirecting to base camp for safety...');
    });
  }

  window.addEventListener('load', initAdventureErrorHandling);

  /**
   * Adventure local storage for preferences
   */
  function initAdventureStorage() {
    // Save adventure preferences
    const adventurePreferences = {
      theme: 'wild',
      difficulty: 'intermediate',
      visitCount: 0,
      favoriteExpedition: null,
      lastVisit: new Date().toISOString()
    };
    
    // Load existing preferences
    const savedPreferences = localStorage.getItem('wildCampPreferences');
    if (savedPreferences) {
      Object.assign(adventurePreferences, JSON.parse(savedPreferences));
    }
    
    // Increment visit count
    adventurePreferences.visitCount++;
    
    // Save preferences
    localStorage.setItem('wildCampPreferences', JSON.stringify(adventurePreferences));
    
    // Welcome message for adventurers
    if (adventurePreferences.visitCount === 1) {
      setTimeout(() => {
        alert(`🏕️ ¡Bienvenido a Wild Camp, aventurero! 

Esta es tu primera expedición con nosotros. Prepárate para vivir experiencias que despertarán tu espíritu salvaje.

¿Listo para comenzar la aventura? ⛰️`);
        console.log('🎒 New adventurer welcomed to base camp!');
      }, 2500);
    } else {
      console.log(`🎯 Welcome back, adventurer! Visit #${adventurePreferences.visitCount}`);
    }
  }

  window.addEventListener('load', initAdventureStorage);

  /**
   * Adventure print functionality
   */
  function initAdventurePrint() {
    const printBtn = document.querySelector('.print-btn, .expedition-print');
    if (printBtn) {
      printBtn.addEventListener('click', function() {
        console.log('🖨️ Printing adventure expedition details...');
        window.print();
      });
    }
    
    // Prepare adventure page for printing
    window.addEventListener('beforeprint', function() {
      document.body.classList.add('printing');
      console.log('📄 Preparing adventure documents...');
    });
    
    window.addEventListener('afterprint', function() {
      document.body.classList.remove('printing');
      console.log('✅ Adventure documents ready!');
    });
  }

  window.addEventListener('load', initAdventurePrint);

  /**
   * Initialize all adventure functions
   */
  function initWildCamp() {
    console.log(`
🏕️ ======================================
   WILD CAMP ADVENTURE INITIALIZED!    
🏔️ ======================================

🌲 Base camp established
⛺ Equipment checked and ready
🔥 Campfire lit
🌟 Adventure mode activated
🧭 Navigation systems online
🎒 All gear secured

Ready for the adventure of a lifetime!
======================================`);
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.current-year');
    copyrightElements.forEach(element => {
      element.textContent = currentYear;
    });
    
    // Initialize adventure statistics
    const stats = {
      expeditions: '500+',
      adventurers: '2000+',
      years: '5+',
      satisfaction: '100%'
    };
    
    console.log('📊 Adventure Statistics:', stats);
  }

  // Initialize everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWildCamp);
  } else {
    initWildCamp();
  }

  /**
   * Easter egg: Konami code for secret adventure mode
   */
  let konamiCode = [];
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  
  document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      console.log(`
🎉 SECRET ADVENTURE MODE UNLOCKED! 🎉

🔥 Legendary Explorer Status Achieved
⭐ Hidden expeditions now available
🏆 Special survival gear unlocked
🌟 Master adventurer privileges granted

Welcome to the elite Wild Camp explorers! 🏔️
      `);
      
      document.body.style.animation = 'rainbow 2s ease-in-out';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 2000);
      
      konamiCode = []; // Reset
    }
  });

})();