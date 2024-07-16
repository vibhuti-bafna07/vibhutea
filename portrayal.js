document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    // Fade-in sections
    const faders = document.querySelectorAll('.fade-in-section');
    console.log('Fade-in sections:', faders);
    
    if (faders.length) {
        const appearOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Element is intersecting:', entry.target);
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
    console.log('Video thumbnails:', videos);

    if (videos.length) {
        videos.forEach(video => {
            video.muted = true; // Ensure video is muted to allow autoplay
            video.addEventListener('mouseover', () => {
                console.log('Mouse over video:', video);
                video.play();
            });
            video.addEventListener('mouseout', () => {
                console.log('Mouse out video:', video);
                video.pause();
                video.currentTime = 0;
            });
        })
    }
});
