/* =====================================================
   MUHAMMAD SHOAIB PERSONAL WEBSITE
   Main JavaScript — Complete (All Pages)
   ===================================================== */


/* =====================================================
   MOBILE MENU
   ===================================================== */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        const isOpen = navbar.classList.toggle("show");

        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            if (isOpen) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
                menuBtn.setAttribute("aria-label", "Close Menu");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
                menuBtn.setAttribute("aria-label", "Open Menu");
            }
        }

    });

    navbar.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("show");
            menuBtn.setAttribute("aria-expanded", "false");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

            menuBtn.setAttribute("aria-label", "Open Menu");

        });

    });

}


/* =====================================================
   CLOSE MOBILE MENU WITH ESCAPE KEY
   ===================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape" && navbar && navbar.classList.contains("show")) {

        navbar.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        menuBtn.setAttribute("aria-label", "Open Menu");

    }

});


/* =====================================================
   TYPING EFFECT
   ===================================================== */

const typingElement = document.getElementById("typing-text");

const typingWords = [
    "Research & Thesis",
    "Web Development",
    "AI & Machine Learning",
    "Computer Education"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingElement) return;

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }

    } else {

        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex++;
            if (wordIndex >= typingWords.length) {
                wordIndex = 0;
            }
        }

    }

    const speed = deleting ? 45 : 85;
    setTimeout(typeEffect, speed);
}

typeEffect();


/* =====================================================
   CURRENT YEAR
   ===================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =====================================================
   SMOOTH SCROLL
   ===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =====================================================
   SCROLL REVEAL ANIMATION
   ===================================================== */

const revealElements = document.querySelectorAll(
    ".reveal, .service-card, .project-card, .about-content, " +
    ".portfolio-item, .student-project-card, .course-card, " +
    ".why-academy-card, .service-page-card, .mission-card, " +
    ".portfolio-card, .process-card, .skill-item, .portfolio-thesis-meta"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

}


/* =====================================================
   NAVBAR SHADOW ON SCROLL
   ===================================================== */

const header = document.querySelector(".header");

function handleNavbarScroll() {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleNavbarScroll, { passive: true });
handleNavbarScroll();


/* =====================================================
   CONTACT FORM — Netlify (Client-side validation only)
   ===================================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        if (name && name.value.trim().length < 2) {
            alert("Please enter your name.");
            name.focus();
            event.preventDefault();
            return;
        }

        if (email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                alert("Please enter a valid email address.");
                email.focus();
                event.preventDefault();
                return;
            }
        }

        if (message && message.value.trim().length < 10) {
            alert("Please enter at least 10 characters.");
            message.focus();
            event.preventDefault();
            return;
        }

    });

}


/* =====================================================
   CONTACT FORM — SUCCESS MESSAGE
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('success') === 'true') {
        alert('✅ Thank you! Your message has been sent successfully.');
    }

});


/* =====================================================
   PORTFOLIO FILTER FUNCTIONALITY
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {

                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });

                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(function(item) {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });

            });
        });

    }

});


/* =====================================================
   PREVENT MOBILE MENU FROM STAYING OPEN ON RESIZE
   ===================================================== */

window.addEventListener("resize", () => {

    if (!navbar || !menuBtn) return;

    if (window.innerWidth > 768) {

        navbar.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        menuBtn.setAttribute("aria-label", "Open Menu");

    }

});


/* =====================================================
   LEVEL 4: SCROLL PROGRESS + LOADER + BACK TO TOP
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ---- PAGE LOADER ----
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 800);
        });

        setTimeout(() => {
            loader.classList.add('hidden');
        }, 3000);
    }

    // ---- SCROLL PROGRESS BAR ----
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, { passive: true });
    }

    // ---- BACK TO TOP BUTTON ----
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to Top');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});


/* =====================================================
   LEVEL 5: THEME TOGGLE (DARK/LIGHT)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (!themeToggle) return;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');

        const isLight = document.body.classList.contains('light-theme');

        if (themeIcon) {
            if (isLight) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }

        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

});


/* =====================================================
   END OF SCRIPT
   ===================================================== */
