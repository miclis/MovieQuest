(function() {
    window.onload = () => {
        const parent = document.querySelector('.movie__rating');
        if (parent) {
            parent.addEventListener('click', async e => {
                if (e.target != e.currentTarget) {
                    const btn = e.target.closest('.movie__btn');

                    try {
                        rsaWrapper
                            .publicEncrypt(window.rsaWrapper.publicKey, JSON.stringify({ rating: btn.dataset.rating }))
                            .then(async encrypted => {
                                await fetch('', {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ content: encrypted })
                                });
                            });
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        }
    };
})();
