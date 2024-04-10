document.addEventListener('DOMContentLoaded', () => {
    const google = document.getElementById('google');
    google.setAttribute('href', getGoogleOauthUrl());
    const microsoft = document.getElementById('microsoft');
    // microsoft.setAttribute('href', getMicrosoftUrl());
})
function getGoogleOauthUrl() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        // redirect_uri: process.env.GOOGLE_CLIENT_REDIRECT_URL,
        // client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: 'http:localhost:8080/auth/google/oauth2/redirect',
        client_id: '666314631245-eb6ihmjf0sp7lesh3dj7aedghmkcaqmd.apps.googleusercontent.com',
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    }

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
}

function getMicrosoftUrl() {
    const rootUrl = 'https://<tenant-name>.b2clogin.com/<tenant-name>.onmicrosoft.com/<policy>/oauth2/v2.0/token'
}
