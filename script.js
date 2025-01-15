// Modern text animation with TypeIt-like effect
const phrases = [
    "Backend Developer",
    "Python Expert",
    "ML Engineer",
    "Problem Solver",
    "Cat Lover",
    "Code Enthusiast",
    "Tech Explorer",
    "Open Source Contributor",
    "AI Enthusiast",
    "Web Developer",
    "Lego Master Builder",
];

let last_section = "home";
let current_section = "home";
const sections = ["home", "about", "skills", "projects", "contact"]; // <section id =?>

class TextAnimator {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.currentIndex = 0;
        this.options = {
            displayTime: options.displayTime || 3000,
            fadeTime: options.fadeTime || 500
        };
    }

    start() {
        // Set initial text
        this.element.textContent = this.phrases[this.currentIndex];
        
        setInterval(() => {
            // Add fade out class
            this.element.classList.add('fade-out');
            
            // After fade out, change text and fade in
            setTimeout(() => {
                this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
                this.element.textContent = this.phrases[this.currentIndex];
                this.element.classList.remove('fade-out');
                this.element.classList.add('fade-in');
                
                // Remove fade in class after animation
                setTimeout(() => {
                    this.element.classList.remove('fade-in');
                }, this.options.fadeTime);
            }, this.options.fadeTime);
        }, this.options.displayTime);
    }
}

const initTextAnimation = () => {
    const textElement = document.querySelector('.changing-text');
    if (textElement) {
        const animator = new TextAnimator(textElement, phrases, {
            displayTime: 3000,
            fadeTime: 500
        });
        animator.start();
    }
};

// Enhanced scroll-based animations
const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.project-card, .stat, .skill-category, .section-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';

                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
};

// Enhanced skill bars animation
const initSkillBars = () => {
    const skillBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const value = progress.getAttribute('data-progress');
                progress.style.width = `${value}%`;
                
                // Add shimmer effect after width animation
                setTimeout(() => {
                    progress.classList.add('shimmer');
                }, 500);
                
                observer.unobserve(progress);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => observer.observe(bar));
};

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    if (currentScroll > lastScroll) {
        navbar.style.top = '-80px';
    } else {
        navbar.style.top = '0';
    }

    var middleHeight = window.innerHeight / 2;

    sections.forEach(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        // rect.top -> distance from top of viewport
        // rect.bottom -> distance from bottom of viewport

        // check what secion is in the middle of the viewport

        if (rect.top <= middleHeight && rect.bottom >= middleHeight) {
            last_section = current_section;
            current_section = section;
            console.log(current_section);
        }
    }
    );

    // Highlight current section in navbar
    if (current_section !== last_section) {
        var section_id = sections.indexOf(current_section);
        var nav_links = document.querySelectorAll('.nav-link');
        console.log(nav_links.length);
        for (var i = 0; i < nav_links.length; i++) {
            nav_links[i].classList.remove("active");
            if (i === section_id) {
                nav_links[i].classList.add("active");
            }
            console.log(nav_links[i]);
        }
        
    }

    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .stat, .skill-category');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element observed:', entry.target);
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
};

// Smooth scroll with dynamic easing
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                const ease = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

                const animation = (currentTime) => {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easeProgress = ease(progress);
                    
                    window.scrollTo(0, startPosition + distance * easeProgress);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                };

                requestAnimationFrame(animation);
            }
        });
    });
};

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    initTextAnimation();
    initScrollAnimations();
    initSkillBars();
    initSmoothScroll();
});
