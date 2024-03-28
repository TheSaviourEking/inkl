// const form = document.getElementsByTagName('form')[0];
// // console.log(form)
// // console.log(getCSRFTokenCookie())
// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     FormData = new FormData(form);
//     const body = {
//         username: FormData.get('username'),
//         password: FormData.get('password')
//     };
//     console.log(getCSRFTokenCookie())
//     const res = await fetch('/login', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//             'XSRF-TOKEN': getCSRFTokenCookie()
//         },
//         body: JSON.stringify(body)
//     })
//  if (res.ok) {
//   window.location.href = window.location.origin;
//   return;
// }
//     try {
//         const err = await res.json();
//         const errorMessage = document.createTextNode(err.message);
//         // formError.replaceChildren(errorMessage);
//     } catch {
//         throw res
//     }
//     // console.log(form)
// })

// window.onload = () => {
//     const csrfTokenInput = document.querySelector('#_csrf');
//     // console.log(csrfTokenInput)
//     csrfTokenInput.value = getCSRFTokenCookie();
// }
