const axios = require('axios');

async function getGoogleUser(id_token, access_token) {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        });

        return res.data;
    } catch (error) {
        console.log('error fetch google user');
        throw new error(error)
    }
}

module.exports = getGoogleUser;
