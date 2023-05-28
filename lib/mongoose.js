import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readystate === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGO_URI;
    return mongoose.connect(uri);
  }
}
