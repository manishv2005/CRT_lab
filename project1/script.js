/**
 * Personal Portfolio Interactive Functionalities
 * - Mobile navigation menu toggle with ARIA accessibility
 * - Active navigation link highlight on scroll
 * - Project filtering by category
 * - Client-side contact form validation with user feedback
 * - Dynamic copyright year
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Hamburger Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navbar) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link (especially helpful on mobile)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navbar.classList.contains('open')) {
          navbar.classList.remove('open');
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu on clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        if (navbar.classList.contains('open')) {
          navbar.classList.remove('open');
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // 2. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      const correspondingLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);
      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 3. Project Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Contact Form Validation and Simulated Submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const messageInput = document.getElementById('user-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        messageInput.closest('.form-group').classList.remove('has-error');
      }

      if (isValid) {
        // Show sending state
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          // Display success alert
          if (formStatus) {
            formStatus.classList.remove('hidden');
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          // Reset form fields
          contactForm.reset();

          // Hide status message after 6 seconds
          setTimeout(() => {
            if (formStatus) {
              formStatus.classList.add('hidden');
            }
          }, 6000);
        }, 1200);
      }
    });

    // Clear error on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }

  // 5. Dynamic Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
