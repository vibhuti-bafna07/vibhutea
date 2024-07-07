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






document.getElementById('submit-playlist').addEventListener('click', function() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const link = document.getElementById('playlist-link').value;

    if (name && email && link) {
        fetch('/submit-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, link: link })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Playlist submitted successfully!');
                document.getElementById('user-name').value = '';
                document.getElementById('user-email').value = '';
                document.getElementById('playlist-link').value = '';
            } else {
                alert('There was an error submitting your playlist. Please try again.');
            }
        });
    } else {
        alert('Please fill out all fields.');
    }
});