// Initialize GSAP ScrollTrigger when the CDN is available.
if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});

if (!window.toggleBrowseModal) {
    window.toggleBrowseModal = event => {
        if (event) event.preventDefault();
        const modal = document.getElementById('browseModal');
        if (!modal) {
            window.location.href = 'search-results.htm';
            return;
        }
        modal.classList.toggle('active');
        document.body.style.overflow = modal.classList.contains('active') ? 'hidden' : '';
    };
}

if (!window.closeBrowseModal) {
    window.closeBrowseModal = () => {
        const modal = document.getElementById('browseModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
}

if (!window.switchBrowseTab) {
    window.switchBrowseTab = (tabName, tabElement) => {
        document.querySelectorAll('.browse-tab-content').forEach(tab => {
            tab.style.display = 'none';
            tab.classList.remove('active');
        });
        document.querySelectorAll('.browse-tab').forEach(tab => tab.classList.remove('active'));
        const nextTab = document.getElementById(tabName + 'Tab');
        if (nextTab) {
            nextTab.style.display = 'block';
            nextTab.classList.add('active');
        }
        if (tabElement) tabElement.classList.add('active');
    };
}

/**
 * GSAP Scroll-driven animations
 */
function initScrollAnimations() {
    const revealItems = Array.from(document.querySelectorAll('.fade-up, .scale-in'));
    if (!revealItems.length) return;

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(element => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

    revealItems.forEach((element, index) => {
        element.classList.add('js-reveal');
        if (element.classList.contains('scale-in')) element.classList.add('from-scale');
        element.style.transitionDelay = `${Math.min(index % 5, 4) * 45}ms`;
        if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
            element.classList.add('is-visible');
            return;
        }
        observer.observe(element);
    });

    // Counter animation for stats (if any)
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.utils.toArray('.counter').forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
            },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power1.inOut"
        });
    });
}

/**
 * Global Helpers
 */
window.toggleMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    // Implement mobile menu toggle logic if needed
};
