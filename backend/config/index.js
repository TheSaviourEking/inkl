module.exports = {
    environment: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    port: process.env.PORT ? process.env.PORT : 8080,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
        secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : undefined,
        expiresIn: process.env.JWT_EXPIRES_IN ? process.env.JWT_EXPIRES_IN : undefined
    }
}
