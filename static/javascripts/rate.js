window.onload = () => {
    const parent = document.querySelector('.movie__rating');
    if (parent) {
        parent.addEventListener('click', async e => {
            if (e.target != e.currentTarget) {
                const btn = e.target.closest('.movie__btn');

                try {
                    await fetch('', {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ rating: btn.dataset.rating })
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
};
