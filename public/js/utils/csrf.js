// function getCSRFTokenCookie() {
//     // CSRF Protection:
//     const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
//         const [name, value] = cookie.split('=');
//         acc[name] = value;
//         return acc;
//     }, {});
//     const csrfToken = cookies['XSRF-TOKEN'];
//     return csrfToken;
// }
function getToken(token) {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    return cookies[token];
}
window.onload = () => {
    const csrfTokenInput = document.querySelector('#_csrf');
    // console.log(csrfTokenInput)
    // csrfTokenInput.value = getToken('XSRF-TOKEN');
}
