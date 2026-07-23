/* ─── Scroll Progress Bar ─────────────────────────── */
const progressBar = document.getElementById('scroll-progress');

function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
}

/* ─── Header scroll effect ────────────────────────── */
const header = document.getElementById('header');

function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 50);
}

/* ─── Active nav link on scroll ───────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollY = window.scrollY;
    let current = '';

    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    updateProgress();
    updateHeader();
    updateActiveNav();
}, { passive: true });

/* ─── Burger Menu ─────────────────────────────────── */
const burger = document.getElementById('burger');
const navLinksContainer = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
});

navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinksContainer.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ─── Typing Effect ───────────────────────────────── */
const typedEl = document.getElementById('typed-text');
const phrases = [
    'Développeur Full Stack',
    'React Native · JavaScript',
    'Laravel · Django · REST API',
    'Docker · Docker Compose',
    'PHP · Python',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    typingTimeout = setTimeout(type, delay);
}

type();

/* ─── Reveal on scroll ────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Skill bar animation ─────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                bar.classList.add('animate');
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

/* ─── Contact form ────────────────────────────────── */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

const CONTACT_EMAIL = 'papaaliounef25@gmail.com';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) return;

    const mailSubject = subject || `Contact depuis le portfolio — ${name}`;
    const mailBody = `${message}\n\n— ${name} (${email})`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Ouverture...';

    window.location.href = mailtoUrl;

    setTimeout(() => {
        submitBtn.classList.add('success');
        submitBtn.innerHTML = '<i class="bx bx-check"></i> Client mail ouvert !';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.classList.remove('success');
            submitBtn.innerHTML = '<i class="bx bx-send"></i> Envoyer le message';
            form.reset();
        }, 3000);
    }, 600);
});

/* ─── Smooth scroll for anchor links ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
