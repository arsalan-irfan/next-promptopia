import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
   mongoose.set("strictQuery", true);

   if (isConnected) {
      console.log("Mongodb is already connected");
      return;
   }
   try {
      await mongoose.connect(process.env.MONGODB_URI as string, {
         dbName: "share_prompt",
      });
      isConnected = true;
   } catch (error) {
      console.log(error);
   }
};
