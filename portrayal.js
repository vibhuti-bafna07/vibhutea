document.addEventListener('DOMContentLoaded', function() {
    // Video thumbnails
    const videos = document.querySelectorAll('.video-thumbnail video');
    if (videos.length) {
        videos.forEach(video => {
            video.muted = true; // Ensure video is muted to allow autoplay
            video.pause(); // Ensure video is paused initially
            
            const videoOptions = {
                threshold: 0.75 // Adjust the threshold as needed
            };

            const playOnScroll = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            }, videoOptions);
            
            // Start observing after the initial load
            setTimeout(() => {
                playOnScroll.observe(video);
            }, 500); // Delay the observer start by 500ms
        });
    }

    console.log('Script loaded successfully.');
});
