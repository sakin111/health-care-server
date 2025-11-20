import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    jwt_salt: process.env.JWT_SALT as string,
    jwt_access_expire: process.env.JWT_ACCESS_EXPIRE,
    jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE,
    jwt_reset_expire_in : process.env.JWT_RESET_EXPIRE_IN,
    reset_pass_link: process.env.RESET_PASS_LINK,
    emailSender:{
        email: process.env.EMAIL_SENDER_EMAIL,
        app_pass: process.env.EMAIL_SENDER_APP_PASS,
    },

    cloudinary: {
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_API_CLOUD,
    },
    openRouterApiKey: process.env.OPEN_AI_API_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY
}