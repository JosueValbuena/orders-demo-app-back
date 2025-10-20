import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO_URL as string);
        console.log('Conexion a mongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1);
    };
};

export default connectDB;