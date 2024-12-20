document.addEventListener('DOMContentLoaded', () => {
    const banners = document.querySelectorAll('.banner');
    let bannerBottomPosition = 10;

    banners.forEach(banner => {
        const bannerId = banner.id;
        if (localStorage.getItem(bannerId) === 'dismissed') {
            banner.style.display = 'none';
        } else {
            banner.classList.add('show');
            banner.style.bottom = `${bannerBottomPosition}px`;
            bannerBottomPosition += banner.offsetHeight + 10;
        }
    });
});

function dismissBanner(bannerId) {
    const banner = document.getElementById(bannerId);
    const banners = document.querySelectorAll('.banner');
    banner.classList.remove('show');
    banner.classList.add('hide');
    banner.addEventListener(
        'animationend',
        () => {
            banner.style.display = 'none';
            localStorage.setItem(bannerId, 'dismissed');
            adjustBannerPositions();
        },
        { once: true }
    );
}

function adjustBannerPositions() {
    const banners = document.querySelectorAll('.banner');
    let bannerBottomPosition = 10;
    
    banners.forEach(banner => {
        if (banner.style.display !== 'none') {
            banner.classList.remove('slide-down');
            banner.classList.add('slide-down');
            banner.style.bottom = `${bannerBottomPosition}px`;
            bannerBottomPosition += banner.offsetHeight + 10;
        }
    });
}

function restoreBanners() {
    const banners = document.querySelectorAll('.banner');
    let bannerBottomPosition = 10;

    banners.forEach(banner => {
        banner.style.display = 'block';
        banner.classList.remove('hide');
        banner.classList.add('show');
        banner.style.bottom = `${bannerBottomPosition}px`;
        bannerBottomPosition += banner.offsetHeight + 10;
        localStorage.removeItem(banner.id);
    });
}