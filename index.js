document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const blogCarousel = document.querySelector('.blog-carousel');
    const modal = document.getElementById('blogModal');
    const closeModal = modal.querySelector('.close');
    const dotsContainer = document.querySelector('.carousel-dots');

    const autoplayInterval = 5000; // 5 seconds
    let currentSlide = 0;
    let autoplay;

    // Initialize blog data
    const blogs = [
        {
            title: 'Create a Stunning Animated Navigation Magic Menu',
            description: 'Welcome to our step-by-step tutorial on creating a stunning animated navigation magic menu using HTML, CSS, and JavaScript!',
            video: 'https://www.youtube.com/embed/SRShOP9iKRc',
            thumbnail: 'images/blog1.png'
        },
        {
            title: 'Build a Stylish Password Strength Checker',
            description: 'Welcome to our step-by-step tutorial on building a sleek and functional Password Strength Checker using HTML, CSS, and JavaScript.',
            video: 'https://www.youtube.com/embed/gbfoGJLlXgI',
            thumbnail: 'images/blog2.png'
        },
        {
            title: 'Build a Stunning Creative Portfolio in Just 10 Minutes',
            description: 'In this video, I will show you how to create a beautiful and modern portfolio website in just 10 minutes!',
            video: 'https://www.youtube.com/embed/p2_FN9djQNc',
            thumbnail: 'images/blog3.png'
        }
    ];

    // Populate blog carousel
    blogs.forEach((blog, index) => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
            <img src="${blog.thumbnail}" alt="${blog.title}">
            <h3>${blog.title}</h3>
            <p>${blog.description.substring(0, 50)}...</p>
        `;
        blogItem.addEventListener('click', () => openModal(blog));
        blogCarousel.appendChild(blogItem);

        // Create dots
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    // Update the carousel and dots
    function updateCarousel() {
        blogCarousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Autoplay
    function startAutoplay() {
        autoplay = setInterval(() => {
            currentSlide = (currentSlide + 1) % blogs.length;
            updateCarousel();
        }, autoplayInterval);
    }

    function stopAutoplay() {
        clearInterval(autoplay);
    }

    // Start autoplay on load
    startAutoplay();

    // Pause autoplay on hover and resume on leave
    blogCarousel.addEventListener('mouseover', stopAutoplay);
    blogCarousel.addEventListener('mouseout', startAutoplay);

    // Dark Mode Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    // Open modal with blog details
    function openModal(blog) {
        modal.style.display = 'block';
        document.getElementById('blogTitle').innerText = blog.title;
        document.getElementById('blogDescription').innerText = blog.description;
        document.getElementById('blogVideo').innerHTML = `<iframe width="100%" height="315" src="${blog.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.getElementById('blogVideo').innerHTML = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.getElementById('blogVideo').innerHTML = '';
        }
    });
});
