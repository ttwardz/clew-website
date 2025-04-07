document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const gallery = document.querySelector('.gallery-container');
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    let currentSlide = 0;
    let startX = 0;
    let isDragging = false;
    let touchStartTime = 0;
    
    // Only initialize mobile swipe functionality if we're on mobile
    if (window.innerWidth < 769) {
        initMobileGallery();
    }
    
    // Window resize event to handle switching between desktop and mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth < 769) {
            gallery.style.transform = `translateX(-${currentSlide * 100}%)`;
            initMobileGallery();
        } else {
            // Reset transform on desktop
            gallery.style.transform = 'translateX(0)';
        }
    });
    
    // Click events for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    function initMobileGallery() {
        // Touch events for swiping
        gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
        gallery.addEventListener('touchmove', handleTouchMove, { passive: false });
        gallery.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Mouse events for desktop testing
        gallery.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    
    function goToSlide(index) {
        // Update current slide
        currentSlide = index;
        
        // Update transform
        gallery.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        touchStartTime = Date.now();
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const touchX = e.touches[0].clientX;
        const diff = startX - touchX;
        const galleryWidth = gallery.offsetWidth;
        
        // Calculate percentage to move
        const translateX = -currentSlide * 100 - (diff / galleryWidth * 100);
        
        // Limit dragging to prevent excessive movement
        if (translateX < -(slides.length - 1) * 100 || translateX > 0) return;
        
        gallery.style.transform = `translateX(${translateX}%)`;
        
        // Prevent scrolling while swiping
        e.preventDefault();
    }
    
    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const touchX = e.changedTouches[0].clientX;
        const diff = startX - touchX;
        const timeElapsed = Date.now() - touchStartTime;
        
        // Determine if it was a swipe (based on speed and distance)
        if (Math.abs(diff) > 50 || (Math.abs(diff) > 20 && timeElapsed < 300)) {
            if (diff > 0 && currentSlide < slides.length - 1) {
                // Swipe left
                goToSlide(currentSlide + 1);
            } else if (diff < 0 && currentSlide > 0) {
                // Swipe right
                goToSlide(currentSlide - 1);
            } else {
                // Return to current slide
                goToSlide(currentSlide);
            }
        } else {
            // Return to current slide if not swiped enough
            goToSlide(currentSlide);
        }
    }
    
    function handleMouseDown(e) {
        startX = e.clientX;
        isDragging = true;
        touchStartTime = Date.now();
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const touchX = e.clientX;
        const diff = startX - touchX;
        const galleryWidth = gallery.offsetWidth;
        
        // Calculate percentage to move
        const translateX = -currentSlide * 100 - (diff / galleryWidth * 100);
        
        // Limit dragging to prevent excessive movement
        if (translateX < -(slides.length - 1) * 100 || translateX > 0) return;
        
        gallery.style.transform = `translateX(${translateX}%)`;
    }
    
    function handleMouseUp(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const touchX = e.clientX;
        const diff = startX - touchX;
        const timeElapsed = Date.now() - touchStartTime;
        
        // Determine if it was a swipe (based on speed and distance)
        if (Math.abs(diff) > 50 || (Math.abs(diff) > 20 && timeElapsed < 300)) {
            if (diff > 0 && currentSlide < slides.length - 1) {
                // Swipe left
                goToSlide(currentSlide + 1);
            } else if (diff < 0 && currentSlide > 0) {
                // Swipe right
                goToSlide(currentSlide - 1);
            } else {
                // Return to current slide
                goToSlide(currentSlide);
            }
        } else {
            // Return to current slide if not swiped enough
            goToSlide(currentSlide);
        }
    }
});