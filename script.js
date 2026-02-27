window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#2C5364',    // Slate Blue
                'primary-neon': '#517fa4', // Vibrant Aquatic Blue
                secondary: '#203A43',  // Deep Slate
                accent: '#f8fafc',     // Aqua White
                'accent-muted': 'rgba(248, 250, 252, 0.9)',
                dark: '#162b33',      // Darker Slate
                darker: '#0F2027',    // Midnight Ocean
                surface: '#12252d',
                'surface-light': '#1b3b45'
            }
        }
    }
};

const typingPhrases = ['Web Developer & E-Commerce Specialist', 'IT Student & Passionate Learner', 'Digital Solution Builder'];

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg', 'bg-darker/90');
            } else {
                nav.classList.remove('shadow-lg', 'bg-darker/90');
            }
        });
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Typing effect for Hero Role
    const typingTarget = document.getElementById('hero-role');
    if (typingTarget) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentPhrase = typingPhrases[phraseIndex];

            if (isDeleting) {
                typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % typingPhrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });
    };

    // Unified Scroll Listener
    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg', 'bg-darker/90');
            } else {
                nav.classList.remove('shadow-lg', 'bg-darker/90');
            }
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });

        // Reveal animations
        const revealPoint = 150;
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }, { passive: true });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values for extra check
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const service = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value.trim();

            // Strict validation check
            if (!name || !email || !service || !message || !contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;

            // Visual feedback - Loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-arrow-repeat animate-spin"></i> <span>Mengirim...</span>';

            // Simulate sending (1.5s delay)
            setTimeout(() => {
                successMessage.classList.remove('hidden');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simplified Scroll Helpers removed (Consolidated above)

    // Scroll Progress Bar & Reveal on Scroll
    window.addEventListener('scroll', () => {
        // Reveal animations
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    });
    // --- Luxury 3D Tilt Effect ---
    const cards = document.querySelectorAll('.service-card, .elevated-3d, .tech-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 80;
            const rotateY = (centerX - x) / 80;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // --- Order Chatbot Logic ---
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatMessages = document.getElementById('chat-messages');
    const nameInput = document.getElementById('chat-name-input');
    const sendNameBtn = document.getElementById('send-name');
    const inputContainer = document.getElementById('chat-input-container');
    const packageContainer = document.getElementById('chat-package-container');

    let userName = '';

    const addMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser ? 'flex flex-col space-y-1' : 'flex flex-col space-y-1';

        const bubble = document.createElement('div');
        bubble.className = isUser
            ? 'message-user p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-lg'
            : 'bg-gray-800/50 text-gray-200 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] border border-gray-700';
        bubble.textContent = text;

        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const showPackageButtons = () => {
        inputContainer.classList.add('hidden');
        packageContainer.classList.remove('hidden');

        const packages = [
            { name: 'Basic', waColor: 'primary' },
            { name: 'Professional', waColor: 'secondary' },
            { name: 'Enterprise', waColor: 'accent' }
        ];

        packages.forEach(pkg => {
            const btn = document.createElement('button');
            // Static Tailwind classes for reliability
            btn.className = "package-btn w-full py-2 bg-surface border border-gray-700 text-white rounded-lg text-sm font-medium hover:border-primary transition-all mb-2 px-4 text-left flex items-center justify-between";
            btn.innerHTML = `<span>Paket ${pkg.name}</span> <i class="bi bi-chevron-right text-[10px]"></i>`;

            btn.onclick = () => {
                const waUrl = `https://wa.me/6282226832521?text=Halo%20Nanang,%20saya%20${encodeURIComponent(userName)}%20ingin%20pesan%20Paket%20${pkg.name}`;
                window.open(waUrl, '_blank');
                addMessage(`Saya ingin pesan Paket ${pkg.name}`, true);
                setTimeout(() => {
                    addMessage(`Baik ${userName}! Link WhatsApp sudah dibuka. Mari kita diskusikan project Anda di sana! 🚀`);
                }, 1000);
            };

            packageContainer.appendChild(btn);
        });
    };

    if (chatbotTrigger && chatbotWindow && closeChatbot) {
        chatbotTrigger.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
            chatbotTrigger.classList.toggle('hidden', chatbotWindow.classList.contains('open'));
        });

        closeChatbot.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
            chatbotTrigger.classList.remove('hidden');
        });

        const handleNameSubmit = () => {
            const name = nameInput.value.trim();
            if (name) {
                userName = name;
                addMessage(name, true);
                nameInput.value = '';

                setTimeout(() => {
                    addMessage(`Salam kenal, ${userName}! 👋`);
                    addMessage(`Paket mana yang ingin Anda pesan hari ini?`);
                    showPackageButtons();
                }, 800);
            }
        };

        sendNameBtn.addEventListener('click', handleNameSubmit);
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleNameSubmit();
        });
    }

    // Initialize scroll state
    window.dispatchEvent(new Event('scroll'));
});
