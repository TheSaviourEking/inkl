function getCSRFTokenCookie() {
    // CSRF Protection:
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    const csrfToken = cookies['XSRF-TOKEN'];
    return csrfToken;
}
window.onload = () => {
    const csrfTokenInput = document.querySelector('#_csrf');
    csrfTokenInput.value = getCSRFTokenCookie();
}
