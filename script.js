        // Loading Animation
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.querySelector('.loader').classList.add('hidden');
            }, 2000);
        });
        
        // Mobile Navigation
        const hamburger = document.querySelector('.nav__hamburger');
        const mobileNav = document.querySelector('.nav__mobile');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
        
        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.querySelectorAll('a, button, .product-card, .collection-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
        
        document.addEventListener('mousedown', () => {
            cursor.classList.add('clicked');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('clicked');
        });
        
        // Scroll Animations
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.hero__subtitle, .hero__title, .hero__text, .hero__button, .hero__scroll, .collections__header, .collection-card, .about__subtitle, .about__title, .about__text, .about__stat, .showcase__header, .product-card, .testimonials__header, .testimonial, .contact__info, .contact__form, .footer__col');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('animate');
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on page load
        
        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        mobileNav.classList.remove('active');
                    }
                }
            });
        });
        
        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                document.querySelector('.nav').classList.add('scrolled');
            } else {
                document.querySelector('.nav').classList.remove('scrolled');
            }
        });
        
        // Product Card Tilt Effect
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const x = e.offsetX;
                const y = e.offsetY;
                const width = this.offsetWidth;
                const height = this.offsetHeight;
                const moveX = (x - width / 2) / 20;
                const moveY = (y - height / 2) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });