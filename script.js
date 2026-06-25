/**
 * Sathish Kumar - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       MOBILE MENU TOGGLE
       ========================================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger icon to cross icon
            const menuIcon = navToggle.querySelector('.menu-icon');
            const closeIcon = navToggle.querySelector('.close-icon');
            if (navMenu.classList.contains('show-menu')) {
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('show-menu');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
                const menuIcon = navToggle.querySelector('.menu-icon');
                const closeIcon = navToggle.querySelector('.close-icon');
                if (menuIcon && closeIcon) {
                    menuIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            }
        });
    });

    /* ==========================================
       TYPING ANIMATION
       ========================================== */
    const typingText = document.getElementById('typing-text');
    const phrases = [
        "ECE Undergraduate",
        "IoT & Embedded Dev",
        "Circuit Design Enthusiast",
        "Tech Innovator"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 120; // default speed

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            delay = 60; // Erase faster
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            delay = 120; // Type standard speed
        }

        // Handle word completion / erasure completion
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            delay = 1500; // Wait at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500; // Pause before starting next word
        }

        setTimeout(typeEffect, delay);
    }

    if (typingText) {
        typeEffect();
    }

    /* ==========================================
       SKILL PROGRESS BARS ANIMATION ON SCROLL
       ========================================== */
    const skillsSection = document.getElementById('skills');
    const skillFills = document.querySelectorAll('.skill-fill');
    
    // Store original widths and reset them to 0% initially
    const originalWidths = [];
    skillFills.forEach((fill, index) => {
        originalWidths[index] = fill.style.width || '0%';
        fill.style.width = '0%';
    });

    const animateSkills = () => {
        skillFills.forEach((fill, index) => {
            fill.style.width = originalWidths[index];
        });
    };

    // Use Intersection Observer for triggers
    if (skillsSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, { threshold: 0.15 });

        observer.observe(skillsSection);
    } else {
        // Fallback for older browsers
        setTimeout(animateSkills, 1000);
    }

    /* ==========================================
       SCROLL ACTIVE NAV LINKS HIGHLIGHTING (SCROLLSPY)
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Adjust offset for sticky header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);

    /* ==========================================
       CONTACT FORM INTERACTIVE SUBMISSION
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm && submitBtn && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtnSpan = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            if (submitBtnSpan && submitBtnIcon) {
                submitBtnSpan.textContent = 'Sending Message...';
                submitBtnIcon.className = 'fa-solid fa-spinner fa-spin';
            }
            
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            // Get form inputs
            const nameInput = document.getElementById('name').value;
            const emailInput = document.getElementById('email').value;
            
            // Simulate network latency (1.5 seconds)
            setTimeout(() => {
                // Success path
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                if (submitBtnSpan && submitBtnIcon) {
                    submitBtnSpan.textContent = 'Send Message';
                    submitBtnIcon.className = 'fa-solid fa-paper-plane';
                }
                
                formStatus.classList.add('success');
                formStatus.textContent = `Thank you, ${nameInput}! Your message has been sent successfully.`;
                
                // Clear the form
                contactForm.reset();
                
                // Remove success notification after 5 seconds
                setTimeout(() => {
                    formStatus.classList.remove('success');
                    formStatus.textContent = '';
                }, 5000);
                
            }, 1500);
        });
    }
});
