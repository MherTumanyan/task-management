import mongoose from 'mongoose';

const validateEnv = () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }
};

const connectDB = async () => {
  try {
    validateEnv(); // Ensure environment variables are validated
    const dbUri =
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI;

    if (!dbUri) {
      throw new Error('Database URI is not defined in environment variables');
    }

    await mongoose.connect(dbUri, {});
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
