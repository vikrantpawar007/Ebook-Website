// ========== HAMBURGER MENU ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);
    
    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        if (hamburger) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a nav link
    const navLinksItems = navLinks?.querySelectorAll('a');
    navLinksItems?.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });
    
    // Close menu on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks?.classList.contains('active')) {
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });


   // Get references to the arrow buttons and books grid
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const booksGrid = document.querySelector('.books-grid');

// Function to scroll one item
function scrollBooks(direction) {
    const bookItems = document.querySelectorAll('.book-item');
    
    if (bookItems.length === 0) return;
    
    // Get the width of one book item plus gap
    const bookItem = bookItems[0];
    const bookWidth = bookItem.offsetWidth;
    const gridStyles = window.getComputedStyle(booksGrid);
    const gap = parseInt(gridStyles.gap) || 25;
    
    // Calculate scroll distance (one item width + gap)
    const scrollDistance = bookWidth + gap;
    
    // Scroll left or right
    if (direction === 'left') {
        booksGrid.scrollBy({
            left: -scrollDistance,
            behavior: 'smooth'
        });
    } else if (direction === 'right') {
        booksGrid.scrollBy({
            left: scrollDistance,
            behavior: 'smooth'
        });
    }
}

// Add event listeners to arrow buttons
leftArrow.addEventListener('click', () => scrollBooks('left'));
rightArrow.addEventListener('click', () => scrollBooks('right'));



    // ========== ADD TO CART FUNCTIONALITY ==========
    const addToCartButtons = document.querySelectorAll('.btn-2');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Check if already added
            if (this.classList.contains('added')) {
                return; // Don't do anything if already added
            }

            // Add 'added' class
            this.classList.add('added');

            // Change text
            const textNode = Array.from(this.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE
            );
            if (textNode) {
                textNode.textContent = 'Added to Cart';
            }

            // Change icon from plus to checkmark
            const iconSpan = this.querySelector('.icon-plus');
            if (iconSpan) {
                iconSpan.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                iconSpan.className = 'icon-check';
            }

            // Optional: Add a bounce animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Optional: Reset after 3 seconds (remove this if you want it permanent)
            /*
            setTimeout(() => {
                this.classList.remove('added');
                if (textNode) {
                    textNode.textContent = 'Add to Cart';
                }
                if (iconSpan) {
                    iconSpan.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    `;
                    iconSpan.className = 'icon-plus';
                }
            }, 3000);
            */
        });
    });
});

        // Filter Tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        const bookItems = document.querySelectorAll('.book-item');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                // Add active to clicked tab
                tab.classList.add('active');

                const filter = tab.dataset.filter;

                bookItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.dataset.category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });

        // Favorite Toggle
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.classList.toggle('liked');
            });
        });

        // Add to Cart
        const cartButtons = document.querySelectorAll('.add-to-cart-btn');
        cartButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('added')) return;

                btn.classList.add('added');
                btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Added to Cart
                `;

                // Animation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
            });
        });

        document.querySelectorAll('.book-item').forEach(card => {
  card.addEventListener('click', () => {
    window.location.href = card.dataset.link;
  });
});

// Prevent buttons from triggering card click
document.querySelectorAll('.favorite-btn, .add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', e => e.stopPropagation());
});


/*/checkout.html/*/

        var formData = {
            fullName: '',
            email: '',
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            saveCard: false,
            selectedPayment: 'credit'
        };

        var fullNameInput = document.getElementById('fullName');
        var emailInput = document.getElementById('email');
        var cardNumberInput = document.getElementById('cardNumber');
        var expirationDateInput = document.getElementById('expirationDate');
        var cvvInput = document.getElementById('cvv');
        var saveCardCheckbox = document.getElementById('saveCard');
        var submitBtn = document.getElementById('submitBtn');
        var proceedBtn = document.getElementById('proceedBtn');
        var paymentBtns = document.querySelectorAll('.payment-btn');
        var creditCardSection = document.getElementById('creditCardSection');

        fullNameInput.addEventListener('input', function(e) {
            formData.fullName = e.target.value;
        });

        emailInput.addEventListener('input', function(e) {
            formData.email = e.target.value;
        });

        cardNumberInput.addEventListener('input', function(e) {
            formData.cardNumber = e.target.value;
        });

        expirationDateInput.addEventListener('input', function(e) {
            formData.expirationDate = e.target.value;
        });

        cvvInput.addEventListener('input', function(e) {
            formData.cvv = e.target.value;
        });

        saveCardCheckbox.addEventListener('change', function(e) {
            formData.saveCard = e.target.checked;
        });

        paymentBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                paymentBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                
                btn.classList.add('active');
                
                var paymentType = btn.getAttribute('data-payment');
                formData.selectedPayment = paymentType;
                
                if (paymentType === 'credit') {
                    creditCardSection.style.display = 'block';
                } else {
                    creditCardSection.style.display = 'none';
                }
            });
        });

        submitBtn.addEventListener('click', function() {
            if (!formData.fullName || !formData.email) {
                alert('Please fill in all required fields');
                return;
            }
            if (formData.selectedPayment === 'credit' && (!formData.cardNumber || !formData.expirationDate || !formData.cvv)) {
                alert('Please fill in all credit card details');
                return;
            }
            alert('Payment processed successfully!');
        });

        proceedBtn.addEventListener('click', function() {
            if (!formData.fullName || !formData.email) {
                alert('Please fill in your information first');
                return;
            }
            if (formData.selectedPayment === 'credit' && (!formData.cardNumber || !formData.expirationDate || !formData.cvv)) {
                alert('Please complete credit card details');
                return;
            }
            alert('Processing payment...');
        });

        /*/login.html/*/
                var togglePasswordBtn = document.getElementById('togglePassword');
        var passwordInput = document.getElementById('password');
        var eyeIcon = document.getElementById('eyeIcon');
        var loginBtn = document.getElementById('loginBtn');
        var emailInput = document.getElementById('email');

        togglePasswordBtn.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.textContent = '👁️‍🗨️';
            } else {
                passwordInput.type = 'password';
                eyeIcon.textContent = '👁️';
            }
        });

        loginBtn.addEventListener('click', function() {
            var email = emailInput.value;
            var password = passwordInput.value;

            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            alert('Login successful!');
        });

        function isValidEmail(email) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });

        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });