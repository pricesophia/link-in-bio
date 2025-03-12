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
    
//  Blog data
const blogs = [
    {
        title: 'Waves & Wanderlust',
        description: 'A dreamy beachside escape, where the waves kiss the shore, the wind whispers through the air, and adventure awaits with every step.',
        video: 'https://www.youtube.com/watch?v=m4LmMc1dbww',
        thumbnail: 'images/sophia-price1.jpg'
    },
    {
        title: 'Cozy Vibes at Home',
        description: 'A serene and inviting shot taken inside the house, perfect for highlighting the warmth and comfort of home life.',
        video: 'https://www.youtube.com/watch?v=4SX6zvAoLdc',
        thumbnail: 'images/sophia-price2.jpg'
    },
    {
        title: 'Beachside Bliss',
        description: 'A breathtaking moment captured at the beach, with the sun setting in the distance, embodying the calm and beauty of ocean life.',
        video: 'https://www.youtube.com/watch?v=P3HuVEx_gvk?si',
        thumbnail: 'images/sophia-price3.jpg'
    },
    {
        title: 'Reflections in the Mirror',
        description: 'A candid shot captured in front of the mirror, showcasing the beauty of self-reflection and the elegance of simple moments.',
        video: 'https://www.youtube.com/watch?v=F3uXazxoR-o',
        thumbnail: 'images/sophia-price4.jpg'
    },
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
