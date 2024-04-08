module.exports = {
    environment: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    port: process.env.PORT ? process.env.PORT : 8080,
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        refreshToken: process.env.REFRESH_TOKEN,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    dev_db: process.env.DB_DEV
}
