document.addEventListener('DOMContentLoaded', function () {
    const faders = document.querySelectorAll('.fade-in-section');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

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
});



document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-thumbnail video');
  
    videos.forEach(video => {
      video.addEventListener('mouseover', () => {
        video.play();
      });
  
      video.addEventListener('mouseout', () => {
        video.pause();
        video.currentTime = 0;
      });
  
      // Ensure video is muted to allow autoplay
      video.muted = true;
    });
  });

  
  



  document.addEventListener('DOMContentLoaded', () => {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = true;

    // Attempt to play music immediately
    let playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Autoplay started successfully
            console.log("Autoplay started");
            updateButtonState(true);
        }).catch(error => {
            // Autoplay was prevented
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

    // Update button state when audio ends
    backgroundMusic.addEventListener('ended', () => {
        updateButtonState(false);
        isPlaying = false;
    });

    // Update button state when audio is paused
    backgroundMusic.addEventListener('pause', () => {
        updateButtonState(false);
        isPlaying = false;
    });

    // Update button state when audio starts playing
    backgroundMusic.addEventListener('play', () => {
        updateButtonState(true);
        isPlaying = true;
    });
});