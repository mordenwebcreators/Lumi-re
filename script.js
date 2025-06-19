document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-link');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const cartOverlay = document.querySelector('.cart-overlay');
    const modalOverlay = document.querySelector('.modal-overlay');
    const productModal = document.querySelector('.product-modal');
    const closeModal = document.querySelector('.close-modal');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevTestimonial = document.querySelector('.testimonial-prev');
    const nextTestimonial = document.querySelector('.testimonial-next');
    const newsletterForm = document.querySelector('.newsletter-form');
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-price');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const emptyCart = document.querySelector('.empty-cart');

    // Sample product data
    const products = [
        {
            id: 1,
            name: "Celestial Diamond Ring",
            price: 1899,
            category: "rings",
            image: "https://i.pinimg.com/736x/c9/f1/38/c9f138f87475d46bdead1e6dec8257de.jpg",
            description: "A stunning 18k gold ring featuring a brilliant 1.5 carat diamond center stone with a celestial-inspired halo setting.",
            details: {
                material: "18k Gold",
                gemstone: "Diamond (1.5ct)",
                size: "Adjustable"
            }
        },
        {
            id: 2,
            name: "Infinity Gold Necklace",
            price: 1299,
            category: "necklaces",
            image: "https://i.pinimg.com/736x/33/6c/9c/336c9ce959d069d16804a59305633910.jpg",
            description: "Elegant infinity symbol pendant crafted from 18k gold, representing eternal love and connection.",
            details: {
                material: "18k Gold",
                chain: "18\" adjustable",
                clasp: "Lobster"
            }
        },
        {
            id: 3,
            name: "Pearl Drop Earrings",
            price: 899,
            category: "earrings",
            image: "https://i.pinimg.com/736x/92/cb/d9/92cbd93a6004214cfe56e5756ea2cf7d.jpg",
            description: "Exquisite South Sea pearl drop earrings set in 14k gold with diamond accents.",
            details: {
                material: "14k Gold",
                pearls: "South Sea (10mm)",
                back: "French wire"
            }
        },
        {
            id: 4,
            name: "Eternity Diamond Bracelet",
            price: 2499,
            category: "bracelets",
            image: "https://i.pinimg.com/736x/40/69/03/4069034fbe94dc8591b6aa51c6cee002.jpg",
            description: "Timeless eternity bracelet featuring a continuous line of brilliant-cut diamonds set in platinum.",
            details: {
                material: "Platinum",
                diamonds: "1.5ct total",
                length: "7\" adjustable"
            }
        },
        {
            id: 5,
            name: "Sapphire Halo Ring",
            price: 1599,
            category: "rings",
            image: "https://i.pinimg.com/736x/94/8c/ef/948cef404af3fc91653f948773280a84.jpg",
            description: "Vintage-inspired ring with a vibrant blue sapphire center stone surrounded by a diamond halo.",
            details: {
                material: "18k Gold",
                center: "Blue Sapphire (1ct)",
                diamonds: "0.5ct total"
            }
        },
        {
            id: 6,
            name: "Diamond Tennis Necklace",
            price: 3499,
            category: "necklaces",
            image: "https://i.pinimg.com/736x/fd/90/8a/fd908ab385ae0fcc4e280c8cb7f06e2f.jpg",
            description: "Classic tennis necklace featuring a continuous line of perfectly matched brilliant-cut diamonds.",
            details: {
                material: "18k Gold",
                diamonds: "3ct total",
                length: "16\" adjustable"
            }
        },
        {
            id: 7,
            name: "Hoop Earrings",
            price: 599,
            category: "earrings",
            image: "https://i.pinimg.com/736x/76/24/e4/7624e4b0404b6a61bba6804e44219090.jpg",
            description: "Classic 18k gold hoop earrings with a modern twist featuring a delicate diamond accent.",
            details: {
                material: "18k Gold",
                diameter: "25mm",
                diamonds: "0.2ct total"
            }
        },
        {
            id: 8,
            name: "Bangle Bracelet",
            price: 799,
            category: "bracelets",
            image: "https://i.pinimg.com/736x/ac/9d/82/ac9d82e8042f156cef08869c644a7d38.jpg",
            description: "Sleek and modern 18k gold bangle bracelet with a subtle hammered texture for added dimension.",
            details: {
                material: "18k Gold",
                width: "8mm",
                closure: "Hinged"
            }
        },
        {
            id: 9,
            name: "Solitaire Diamond Ring",
            price: 2999,
            category: "rings",
            image: "https://i.pinimg.com/474x/9f/d0/ae/9fd0aebac50417c71b77c12815120e6b.jpg",
            description: "Iconic solitaire engagement ring featuring a premium 2 carat brilliant-cut diamond in a classic setting.",
            details: {
                material: "Platinum",
                diamond: "2ct (VS1, G color)",
                setting: "6-prong"
            }
        }
    ];

    // Featured products (first 4)
    const featuredProducts = products.slice(0, 4);

    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active class
                document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Cart Toggle
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
        renderCartItems();
    });

    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Product Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const newArrivalsGrid = document.querySelector('.new-arrivals-grid');
            
            if (filter === 'all') {
                // Show all products
                document.querySelectorAll('.new-arrival-item').forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                // Hide all products
                document.querySelectorAll('.new-arrival-item').forEach(item => {
                    item.style.display = 'none';
                });
                // Show products with matching category
                document.querySelectorAll(`.new-arrival-item[data-category="${filter}"]`).forEach(item => {
                    item.style.display = 'block';
                });
            }
        });
    });

    // Testimonial Slider
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    prevTestimonial.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    });

    nextTestimonial.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Newsletter Form Validation
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value && isValidEmail(emailInput.value)) {
            // Form is valid
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            // Form is invalid
            alert('Please enter a valid email address.');
        }
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Render Featured Products
    function renderFeaturedProducts() {
        const productsGrid = document.querySelector('.products-grid');
        
        featuredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <div class="product-btns">
                            <button class="btn btn-outline quick-view" data-id="${product.id}">Quick View</button>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-price">$${product.price.toLocaleString()}</span>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }

    // Render New Arrivals
    function renderNewArrivals() {
        const newArrivalsGrid = document.querySelector('.new-arrivals-grid');
        
        products.forEach(product => {
            const arrivalItem = document.createElement('div');
            arrivalItem.className = 'new-arrival-item';
            arrivalItem.setAttribute('data-category', product.category);
            arrivalItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="new-arrival-img" loading="lazy">
                <div class="new-arrival-overlay">
                    <h3 class="new-arrival-name">${product.name}</h3>
                    <span class="new-arrival-price">$${product.price.toLocaleString()}</span>
                    <div class="product-btns">
                        <button class="btn btn-outline quick-view" data-id="${product.id}">Quick View</button>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            newArrivalsGrid.appendChild(arrivalItem);
        });
    }

    // Quick View Modal
    function openProductModal(productId) {
        const product = products.find(p => p.id === productId);
        
        if (product) {
            const modalContent = document.querySelector('.modal-product-content');
            modalContent.innerHTML = `
                <div class="modal-product-img-container">
                    <img src="${product.image}" alt="${product.name}" class="modal-product-img">
                </div>
                <div class="modal-product-details">
                    <h2 class="modal-product-title">${product.name}</h2>
                    <span class="modal-product-price">$${product.price.toLocaleString()}</span>
                    <p class="modal-product-description">${product.description}</p>
                    
                    <div class="modal-product-details">
                        ${Object.entries(product.details).map(([key, value]) => `
                            <div class="detail-item">
                                <span class="detail-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                <span class="detail-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="quantity-selector">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" min="1" value="1">
                    </div>
                    
                    <div class="modal-product-actions">
                        <button class="btn btn-outline add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            `;
            
            productModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
            
            // Reattach event listeners to the new buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const quantity = parseInt(document.getElementById('quantity').value) || 1;
                    addToCart(productId, quantity);
                    closeProductModal();
                });
            });
        }
    }

    function closeProductModal() {
        productModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    closeModal.addEventListener('click', closeProductModal);
    modalOverlay.addEventListener('click', closeProductModal);

    // Quick View Button Event Delegation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-view')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            openProductModal(productId);
        }
    });

   // Add to Cart Functionality
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || 'https://i.pinimg.com/736x/c9/f1/38/c9f138f87475d46bdead1e6dec8257de.jpg',
                quantity: quantity
            });
        }
        
        updateCart();
        showAddToCartNotification(product.name);
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="#shop" class="btn btn-outline">Continue Shopping</a>
            </div>
        `;
        document.querySelector('.cart-footer').style.display = 'none';
        return;
    }
    
    document.querySelector('.cart-footer').style.display = 'block';
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image || 'https://i.pinimg.com/736x/c9/f1/38/c9f138f87475d46bdead1e6dec8257de.jpg'}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://i.pinimg.com/736x/c9/f1/38/c9f138f87475d46bdead1e6dec8257de.jpg'">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <span class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</span>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <span class="remove-item" data-id="${item.id}">Remove</span>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toLocaleString()}`;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const isPlus = this.classList.contains('plus');
                updateCartItemQuantity(productId, isPlus);
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }

    function updateCartItemQuantity(productId, isPlus) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (isPlus) {
                item.quantity++;
            } else {
                item.quantity = Math.max(1, item.quantity - 1);
            }
            
            updateCart();
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function showAddToCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>${productName} has been added to your cart</p>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Checkout Button
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Your cart is empty. Please add some items before checkout.');
        } else {
            alert('Checkout functionality would be implemented with a backend system.');
            // In a real implementation, this would redirect to a checkout page
        }
    });

    // Add to Cart Event Delegation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initialize the page
    renderFeaturedProducts();
    renderNewArrivals();
    renderCartItems();

    // Add some animations when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .service-item, .new-arrival-item');
        
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
});