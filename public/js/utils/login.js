const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    FormData = new FormData(form);
    const body = {
        username: FormData.get('username'),
        password: FormData.get('password')
    };
    const res = await fetch('/api/session', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'XSRF-TOKEN': getCSRFTokenCookie(),
            'access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMzcwODcxNmYtMmFhNy00M2EwLTk0M2MtMDRkMDk2ZjNiN2UwIiwidXNlck5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIn0sImlhdCI6MTcxMjcwNzM4NywiZXhwIjoxNzEyNzA3NDQ3fQ.ym4o6jnEh4v7SgkcmHVOPn_nUT2S1qk-VUC8cqPbCf0"
        },
        body: JSON.stringify(body)
    })
    if (res.ok) {
        window.location.href = window.location.origin;
        return;
    }
    try {
        const err = await res.json();
        const errorMessage = document.createTextNode(err.message);
        // formError.replaceChildren(errorMessage);
    } catch {
        throw res
    }
    // console.log(form)
})
