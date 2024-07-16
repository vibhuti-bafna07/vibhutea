    // Video thumbnails
    const videos = document.querySelectorAll('.video-thumbnail video');
    if (videos.length) {
        videos.forEach(video => {
            video.muted = true; // Ensure video is muted to allow autoplay
            const videoOptions = {
                threshold: 0.5
            };
            const playOnScroll = new IntersectionObserver(function (entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            }, videoOptions);
            playOnScroll.observe(video);
        });
    }

    console.log('Script loaded successfully.');
