import mongoose, { Connection } from "mongoose";

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Use a global variable to cache the connection in development
// This prevents multiple connections from being created during hot-reloads
let cached: MongooseCache = global.mongoose as MongooseCache;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Uses connection caching to prevent multiple connections during development.
 *
 * @returns {Promise<Connection>} The MongoDB connection
 */
async function connectDB(): Promise<Connection> {
  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if one doesn't exist
  // This ensures multiple simultaneous calls reuse the same connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering for immediate errors
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    // Wait for the connection promise to resolve and cache the connection
    cached.conn = (await cached.promise).connection;
  } catch (e) {
    // Reset the promise on error to allow retry on next call
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
