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
    }

    // Background music toggle
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (musicToggle && backgroundMusic) {
        let isPlaying = true;

        // Attempt to play music immediately
        let playPromise = backgroundMusic.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("Autoplay started");
                    updateButtonState(true);
                })
                .catch(error => {
                    console.log("Autoplay prevented:", error);
                    isPlaying = false;
                    updateButtonState(false);
                });
        }

        musicToggle.addEventListener('click', toggleMusic);

        function toggleMusic() {
            if (isPlaying) {
                backgroundMusic.pause();
                updateButtonState(false);
            } else {
                backgroundMusic.play().then(() => {
                    updateButtonState(true);
                }).catch(error => {
                    console.log("Play failed:", error);
                    updateButtonState(false);
                });
            }
            isPlaying = !isPlaying;
        }

        function updateButtonState(playing) {
            if (playing) {
                musicToggle.classList.add('playing');
                musicToggle.querySelector('.text-music-button').textContent = 'pause';
            } else {
                musicToggle.classList.remove('playing');
                musicToggle.querySelector('.text-music-button').textContent = 'play';
            }
        }

        // Update button state based on audio events
        backgroundMusic.addEventListener('ended', () => {
            updateButtonState(false);
            isPlaying = false;
        });

        backgroundMusic.addEventListener('pause', () => {
            updateButtonState(false);
            isPlaying = false;
        });

        backgroundMusic.addEventListener('play', () => {
            updateButtonState(true);
            isPlaying = true;
        });
    }
});
