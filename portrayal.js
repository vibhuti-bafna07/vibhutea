document.addEventListener('DOMContentLoaded', () => {
    // Fade-in sections
    const faders = document.querySelectorAll('.fade-in-section');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    if ('IntersectionObserver' in window) {
        const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('is-visible');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);
        
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        faders.forEach(fader => {
            fader.classList.add('is-visible');
        });
    }

    // Video thumbnails
    const videos = document.querySelectorAll('.video-thumbnail video');
    if (videos.length) {
        videos.forEach(video => {
            video.muted = true; // Ensure video is muted to allow autoplay
            video.addEventListener('mouseover', () => video.play());
            video.addEventListener('mouseout', () => {
                video.pause();
                video.currentTime = 0;
            });
        });
    }
});
