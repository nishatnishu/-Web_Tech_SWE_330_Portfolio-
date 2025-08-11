document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const body = document.body;
    const header = document.querySelector('.header');
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const sections = document.querySelectorAll('.page-section');

    // --- Utility Functions ---
    const customModal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModalButton = customModal.querySelector('.close-button');
    const modalOkButton = document.getElementById('modal-ok-button');

    function showModal(message) {
        modalMessage.textContent = message;
        customModal.classList.add('show');
    }

    function hideModal() {
        customModal.classList.remove('show');
    }

    closeModalButton.addEventListener('click', hideModal);
    modalOkButton.addEventListener('click', hideModal);
    customModal.addEventListener('click', (e) => {
        if (e.target === customModal) {
            hideModal();
        }
    });

    // --- Mobile Navigation Toggle ---
    const toggleNav = () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('active');
        
        navLinks.querySelectorAll('li').forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    };

    burger.addEventListener('click', toggleNav);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                toggleNav();
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const scrollProgressHeight = scrollProgressBar.offsetHeight;
                const totalOffset = headerHeight + scrollProgressHeight + 10;

                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - totalOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                navLinks.querySelectorAll('a').forEach(navA => navA.classList.remove('active-link'));
                this.classList.add('active-link');
            }
        });
    });

    // --- Scroll-triggered Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .slide-in, .slide-in-left, .slide-in-right, .slide-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => sectionObserver.observe(el));

    // --- Theme Toggling (Light/Dark Mode) ---
    const setTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        } else {
            body.classList.remove('light-theme');
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        }
        localStorage.setItem('portfolio-theme', theme);
    };

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // --- Scroll Progress Indicator ---
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / totalHeight) * 100;
        scrollProgressBar.style.width = `${progress}%`;
    });

    // --- Animated Typing Role Text in Hero Section ---
    const roles = ["Software Engineering Student", "UI/UX Enthusiast", "Loves Turning Ideas into Reality", "Creative App & Web Builder","Responsive UI Crafter","Game Development Explorer", "Algorithm & Data Structure Enthusiast"];
    const roleTextElement = document.querySelector('.role-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        const displayChar = isDeleting
            ? currentRole.substring(0, charIndex - 1)
            : currentRole.substring(0, charIndex + 1);

        roleTextElement.textContent = displayChar;

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        charIndex += isDeleting ? -1 : 1;
        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // --- Animate Timeline Items Sequentially ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('active');
        }, index * 200);
    });

    // --- Animate Education Cards ---
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('active');
        }, index * 200);
    });

    // --- Animate Skills Sections ---
    const skillsCategories = document.querySelectorAll('.skills-category, .skills-tags-container');
    skillsCategories.forEach((category, index) => {
        setTimeout(() => {
            category.classList.add('active');
        }, index * 200);
    });

    // --- Animate Progress Bars ---
    const progressBars = document.querySelectorAll('.progress-fill, .meter-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // --- Language Skill Bar Animation on Scroll ---
    const languageProgressBars = document.querySelectorAll('.language-item .progress-bar');
    const skillsSection = document.getElementById('skills');

    const progressBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                languageProgressBars.forEach(bar => {
                    const progress = bar.dataset.progress;
                    bar.style.width = `${progress}%`;
                });
                progressBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        progressBarObserver.observe(skillsSection);
    }

    // --- Set Current Year in Footer ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Simple Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const formMessageElement = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            showModal('Thank you for your message, Nishat! I will get back to you soon.');
            formMessageElement.textContent = '';
            contactForm.reset();
        } else {
            showModal('Please fill out all fields.');
            formMessageElement.textContent = 'Please complete all required fields.';
            formMessageElement.style.color = '#e74c3c';
        }
    });

    // --- Page View Animation ---
    const pageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        pageObserver.observe(section);
    });

    // --- Particle.js configuration ---
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#8e44ad"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#8e44ad",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // --- Additional Scroll Animations ---
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.content-col > *, .education-card, .skills-category, .skills-tags-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
                
                // Animate progress bars
                if (element.querySelector('.progress-fill')) {
                    const progressBars = element.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    });
                }
            }
        });
    };
       // Animation trigger on scroll
    document.addEventListener('DOMContentLoaded', function() {
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                const delay = element.dataset.delay || 0;
                
                if (elementPosition < windowHeight - 100) {
                    setTimeout(() => {
                        element.classList.add('active');
                    }, delay * 300);
                }
            });
        };
        
        // Initial check
        animateOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
        const contactSection = document.querySelector('.contact-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactSection.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(contactSection);
    });
    

    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});