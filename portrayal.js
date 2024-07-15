document.addEventListener('DOMContentLoaded', () => {
    // Fade-in sections
    const faders = document.querySelectorAll('.fade-in-section');
    if (faders.length) {
        const appearOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
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
    };
   }
);
