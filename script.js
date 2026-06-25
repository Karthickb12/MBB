document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Theme Toggle (Dark / Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  // Retrieve previous choice or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') {
    body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      const isLight = body.classList.contains('light-theme');
      
      // Save selection
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      
      // Toggle Icon
      if (themeIcon) {
        if (isLight) {
          themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
          themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
      }
    });
  }

  // ==========================================
  // 2. Typewriter Effect
  // ==========================================
  const typewriterText = [
    "Global Goodwill Ambassador",
    "Gen-Z Beauty Entrepreneur",
    "Award-Winning Producer",
    "Creative Visionary"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterSpan = document.getElementById('typewriter');

  function typeEffect() {
    if (!typewriterSpan) return;
    
    const currentWord = typewriterText[textIndex];
    
    if (isDeleting) {
      typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = 80;
    if (isDeleting) {
      typeSpeed /= 2; // Delete twice as fast
    }

    // Determine state change
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1500; // Wait at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typewriterText.length;
      typeSpeed = 500; // Small pause before next word starts
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Init Typewriter
  setTimeout(typeEffect, 800);

  // ==========================================
  // 3. Scroll-triggered Statistics Counter
  // ==========================================
  const statsSection = document.getElementById('statsSection');
  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  function animateStats() {
    statNums.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'), 10);
      const duration = 2000; // 2 seconds
      const steps = 50;
      const stepTime = duration / steps;
      let currentVal = 0;
      const stepIncrement = target / steps;

      const counterInterval = setInterval(() => {
        currentVal += stepIncrement;
        if (currentVal >= target) {
          clearInterval(counterInterval);
          // Format final value
          if (target === 1200) {
            num.textContent = "$1.2B+";
          } else if (target === 25 || target === 18) {
            num.textContent = target + "+";
          } else {
            num.textContent = target;
          }
        } else {
          // Format progressive value
          if (target === 1200) {
            num.textContent = `$${Math.ceil(currentVal)}M+`;
          } else {
            num.textContent = Math.ceil(currentVal);
          }
        }
      }, stepTime);
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateStats();
        statsAnimated = true;
      }
    });
  }, { threshold: 0.2 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 4. Scroll Fade-in Animations
  // ==========================================
  const scrollElements = document.querySelectorAll('.animate-on-scroll');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        scrollObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  scrollElements.forEach(el => scrollObserver.observe(el));

  // ==========================================
  // 5. Filmography Item Filtering
  // ==========================================
  const filterButtons = document.querySelectorAll('#filmographyFilters .filter-btn');
  const filmItems = document.querySelectorAll('.film-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button highlight
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      filmItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCat === filterVal) {
          item.style.display = 'block';
          // Force layout reflow to trigger CSS transition
          item.offsetHeight; 
          item.style.opacity = '1';
          item.style.transform = 'translateY(0) scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px) scale(0.95)';
          // Delay display setting to wait for opacity fadeout
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  // Ensure film items have basic styles for transition
  filmItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'translateY(0) scale(1)';
  });

  // ==========================================
  // 5b. Trailer Item Filtering
  // ==========================================
  const trailerFilterButtons = document.querySelectorAll('.trailer-filter-btn');
  const trailerItems = document.querySelectorAll('.trailer-item');

  trailerFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button highlight
      trailerFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      trailerItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCat === filterVal) {
          item.style.display = 'block';
          // Force layout reflow to trigger CSS transition
          item.offsetHeight; 
          item.style.opacity = '1';
          item.style.transform = 'translateY(0) scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px) scale(0.95)';
          // Delay display setting to wait for opacity fadeout
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  // Ensure trailer items have basic styles for transition
  trailerItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'translateY(0) scale(1)';
  });

  // ==========================================
  // 6. Interactive Image Lightbox Gallery & Filtering
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxActiveImage');
  const lightboxCaption = document.getElementById('lightboxCaptionText');
  const lightboxClose = document.getElementById('lightboxCloseBtn');
  const lightboxPrev = document.getElementById('lightboxPrevBtn');
  const lightboxNext = document.getElementById('lightboxNextBtn');
  const lightboxIndexText = document.getElementById('lightboxIndexText');
  const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');

  let activeGalleryIndex = 0;
  let visibleGalleryItems = Array.from(galleryItems);

  function getGalleryData() {
    return visibleGalleryItems.map(item => ({
      src: item.getAttribute('data-src'),
      caption: item.getAttribute('data-caption')
    }));
  }

  function openLightbox(index) {
    const clickedItem = galleryItems[index];
    activeGalleryIndex = visibleGalleryItems.indexOf(clickedItem);
    if (activeGalleryIndex === -1) activeGalleryIndex = 0;

    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scroll
  }

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50; // Minimum 50px swipe distance
    
    if (swipeDistance < -minSwipeDistance) {
      // Swiped left -> next image
      showNextImage();
    } else if (swipeDistance > minSwipeDistance) {
      // Swiped right -> previous image
      showPrevImage();
    }
  }

  function updateLightboxContent() {
    const dataList = getGalleryData();
    if (dataList.length === 0) return;

    const data = dataList[activeGalleryIndex];
    lightboxImg.src = data.src;
    lightboxCaption.textContent = data.caption;
    if (lightboxIndexText) {
      lightboxIndexText.textContent = `${activeGalleryIndex + 1} / ${dataList.length}`;
    }
  }

  function showNextImage() {
    const dataList = getGalleryData();
    if (dataList.length === 0) return;
    activeGalleryIndex = (activeGalleryIndex + 1) % dataList.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    const dataList = getGalleryData();
    if (dataList.length === 0) return;
    activeGalleryIndex = (activeGalleryIndex - 1 + dataList.length) % dataList.length;
    updateLightboxContent();
  }

  // Gallery Item Filtering
  galleryFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCat === filterVal) {
          item.style.display = 'block';
          item.offsetHeight; 
          item.style.opacity = '1';
          item.style.transform = 'translateY(0) scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });

      // Update visible elements list for the Lightbox dynamically
      setTimeout(() => {
        visibleGalleryItems = Array.from(galleryItems).filter(item => {
          return filterVal === 'all' || item.getAttribute('data-category') === filterVal;
        });
      }, 310);
    });
  });

  // Ensure gallery items have transition styles
  galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'translateY(0) scale(1)';
  });

  // Click triggers
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Click outside lightbox content close trigger
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
        closeLightbox();
      }
    });
  }

  // Key navigation supports (Escape, ArrowLeft, ArrowRight)
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') showNextImage();
    else if (e.key === 'ArrowLeft') showPrevImage();
  });

  // ==========================================
  // 7. Navbar Scroll Adjustments & Active Links
  // ==========================================
  const navbar = document.getElementById('mainNavbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  // Back to Top button click listener
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active Section Highlighting using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Focuses detection in the active viewport band
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  window.addEventListener('scroll', () => {
    // Scroll shrink effect
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Update Scroll Progress Bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Toggle Back to Top Button Visibility
    if (backToTopBtn) {
      if (window.scrollY > window.innerHeight) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // ==========================================
  // 8. Contact Form Validation & Submission
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('contactFormSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (name && email && subject && message) {
        // Simple visual validation success feedback
        formSuccessAlert.classList.remove('d-none');
        contactForm.reset();

        // Clear success state after 5 seconds
        setTimeout(() => {
          formSuccessAlert.classList.add('d-none');
        }, 5000);
      }
    });
  }

  // ==========================================
  // 9. Press Quotes Slider
  // ==========================================
  const quoteCards = document.querySelectorAll('.quote-card');
  const quoteDots = document.querySelectorAll('.quote-dot');
  let currentQuoteIndex = 0;
  let quoteTimer = null;

  function showQuote(index) {
    quoteCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
        quoteDots[i].classList.add('active');
      } else {
        card.classList.remove('active');
        quoteDots[i].classList.remove('active');
      }
    });
    currentQuoteIndex = index;
  }

  function startQuoteTimer() {
    stopQuoteTimer();
    quoteTimer = setInterval(() => {
      let nextIndex = (currentQuoteIndex + 1) % quoteCards.length;
      showQuote(nextIndex);
    }, 4000); // Auto-rotate every 4 seconds
  }

  function stopQuoteTimer() {
    if (quoteTimer) clearInterval(quoteTimer);
  }

  // Dot Click Handlers
  quoteDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showQuote(index);
      startQuoteTimer(); // Reset timer on click
    });
  });

  // Init Slider
  if (quoteCards.length > 0) {
    startQuoteTimer();
  }

  // ==========================================
  // 10. Inline Video Showcase Player
  // ==========================================
  const videoTabsContent = document.getElementById('videoTabsContent');
  const originalVideoHTMLs = new Map();
  let activeVideoContainer = null;

  function revertActiveVideo() {
    if (activeVideoContainer) {
      const originalHTML = originalVideoHTMLs.get(activeVideoContainer);
      if (originalHTML) {
        activeVideoContainer.innerHTML = originalHTML;
      }
      activeVideoContainer = null;
    }
  }

  if (videoTabsContent) {
    videoTabsContent.addEventListener('click', (e) => {
      // Find the closest anchor that represents the youtube play link
      const videoLink = e.target.closest('.video-link-wrapper');
      
      // Find the closest close button for the video
      const closeBtn = e.target.closest('.video-close-btn');

      if (videoLink) {
        e.preventDefault();
        const videoWrap = videoLink.closest('.video-wrap');
        if (!videoWrap) return;

        // Cache the original HTML of .video-wrap if not already cached
        if (!originalVideoHTMLs.has(videoWrap)) {
          originalVideoHTMLs.set(videoWrap, videoWrap.innerHTML);
        }

        // Revert any currently playing video
        if (activeVideoContainer && activeVideoContainer !== videoWrap) {
          revertActiveVideo();
        }

        // Extract YouTube ID
        const href = videoLink.getAttribute('href');
        let videoId = '';
        if (href.includes('youtube.com/watch')) {
          try {
            const url = new URL(href);
            videoId = url.searchParams.get('v');
          } catch (err) {
            // Fallback regex parsing if URL construction fails
            const match = href.match(/[?&]v=([^&#]+)/);
            videoId = match ? match[1] : '';
          }
        } else if (href.includes('youtu.be/')) {
          videoId = href.split('youtu.be/')[1].split('?')[0];
        }

        if (videoId) {
          activeVideoContainer = videoWrap;
          videoWrap.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <button class="video-close-btn" aria-label="Close video"><i class="fa-solid fa-xmark"></i></button>
          `;
        }
      } else if (closeBtn) {
        revertActiveVideo();
      }
    });
  }

  // Hook Bootstrap's show.bs.tab events to revert any active playing video
  const tabButtons = document.querySelectorAll('#videoTabs button');
  tabButtons.forEach(button => {
    button.addEventListener('show.bs.tab', () => {
      revertActiveVideo();
    });
  });
});
