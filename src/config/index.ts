import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    jwt_salt: process.env.JWT_SALT as string,
    cloudinary: {
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_API_CLOUD,
    },
    openRouterApiKey: process.env.OPEN_AI_API_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY
}