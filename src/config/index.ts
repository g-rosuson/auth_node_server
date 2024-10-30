import dotenv from 'dotenv';
dotenv.config();

const config = {
    clientUrl: process.env.CLIENT_URL!,
    baseDomain: process.env.BASE_DOMAIN!,
    isProduction: false,

    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,

    mongoURL: process.env.MONGODB_URL!,
    mongoUser: process.env.MONGODB_USER!,
    mongoPassword: process.env.MONGODB_PASSWORD!,
    mongoDatabase: process.env.MONGODB_DATABASE!,
}

export default config;
