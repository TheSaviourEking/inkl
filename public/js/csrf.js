function getCSRFTokenCookie() {
    // CSRF Protection:
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    const csrfToken = cookies['XSRF-TOKEN'];
    console.log(csrfToken)
    return csrfToken;
}
window.onload = () => {
    const csrfTokenInput = document.querySelector('#_csrf');
    // console.log(csrfTokenInput)
    csrfTokenInput.value = getCSRFTokenCookie();
}
