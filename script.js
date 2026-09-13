const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
const canAnimate = !prefersReducedMotion && typeof gsap !== 'undefined';

if (canAnimate) {
    gsap.registerPlugin(ScrollTrigger);
}

/* ─── Scroll progress + header + active nav ───────── */
const progressBar = document.getElementById('scroll-progress');
const header = document.getElementById('header');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;

    header.classList.toggle('scrolled', scrollTop > 40);

    let current = '';
    sections.forEach(section => {
        if (scrollTop >= section.offsetTop - 160) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─── Burger menu ─────────────────────────────────── */
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

/* ─── Smooth scroll for anchor links ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
});

/* ─── Back to top ──────────────────────────────────── */
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
}

/* ─── Custom cursor ────────────────────────────────── */
if (isFinePointer && canAnimate) {
    document.documentElement.classList.add('has-custom-cursor');
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    const dotX = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power3' });
    const ringX = gsap.quickTo(cursorRing, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(cursorRing, 'y', { duration: 0.45, ease: 'power3' });

    window.addEventListener('mousemove', (e) => {
        dotX(e.clientX); dotY(e.clientY);
        ringX(e.clientX); ringY(e.clientY);
        document.documentElement.classList.add('cursor-ready');
    });

    const hoverTargets = 'a, button, .project-row, input, textarea';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) cursorRing.classList.add('is-active');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) cursorRing.classList.remove('is-active');
    });
}

/* ─── Magnetic buttons ─────────────────────────────── */
if (isFinePointer && canAnimate) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: relX * 0.35, y: relY * 0.5, duration: 0.4, ease: 'power3' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
    });
}

/* ─── Hero intro + line reveal ────────────────────── */
document.querySelectorAll('.hero-title .line-inner').forEach((el, i) => {
    if (!canAnimate) { el.style.transform = 'translateY(0)'; return; }
    gsap.to(el, { y: 0, duration: 1.1, ease: 'power4.out', delay: 0.15 + i * 0.12 });
});

const heroFadeEls = document.querySelectorAll('.hero .reveal-line');
if (canAnimate) {
    gsap.set(heroFadeEls, { y: 16 });
    gsap.to(heroFadeEls, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.5 });
} else {
    heroFadeEls.forEach(el => { el.style.opacity = 1; });
}

const portrait = document.querySelector('.hero-visual');
if (canAnimate) {
    gsap.set(portrait, { opacity: 0, scale: 0.96 });
    gsap.to(portrait, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 });
} else if (portrait) {
    portrait.style.opacity = 1;
}

/* ─── Portrait subtle tilt ─────────────────────────── */
const portraitFrame = document.querySelector('.portrait');
if (portraitFrame && isFinePointer && canAnimate) {
    portraitFrame.addEventListener('mousemove', (e) => {
        const rect = portraitFrame.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(portraitFrame, { rotateY: px * 10, rotateX: -py * 10, duration: 0.6, ease: 'power2.out', transformPerspective: 700 });
    });
    portraitFrame.addEventListener('mouseleave', () => {
        gsap.to(portraitFrame, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
    });
}

/* ─── Scroll reveals ───────────────────────────────── */
if (canAnimate) {
    gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
        });
    });

    gsap.utils.toArray('.project-row').forEach((row, i) => {
        gsap.fromTo(row, { opacity: 0, y: 24 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 92%' },
        });
    });
} else {
    document.querySelectorAll('.reveal, .project-row').forEach(el => { el.style.opacity = 1; });
}

/* ─── Stat counters ────────────────────────────────── */
document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const run = () => {
        const obj = { val: 0 };
        if (canAnimate) {
            gsap.to(obj, {
                val: target,
                duration: 1.6,
                ease: 'power2.out',
                onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
            });
        } else {
            el.textContent = target + suffix;
        }
    };
    if (canAnimate) {
        ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: run });
    } else {
        run();
    }
});

/* ─── Project preview follows cursor ──────────────── */
const preview = document.getElementById('projectPreview');
const previewImg = document.getElementById('projectPreviewImg');
const projectRows = document.querySelectorAll('.project-row');

if (preview && isFinePointer && canAnimate) {
    const previewX = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3' });
    const previewY = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3' });

    document.addEventListener('mousemove', (e) => {
        previewX(e.clientX);
        previewY(e.clientY);
    });

    projectRows.forEach(row => {
        const img = row.querySelector('.project-row-media img');
        if (!img) return;
        row.addEventListener('mouseenter', () => {
            previewImg.src = img.getAttribute('src');
            previewImg.alt = img.getAttribute('alt') || '';
            gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
        });
        row.addEventListener('mouseleave', () => {
            gsap.to(preview, { autoAlpha: 0, scale: 0.94, duration: 0.35, ease: 'power3.in' });
        });
    });
}

/* ─── Contact form ─────────────────────────────────── */
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
