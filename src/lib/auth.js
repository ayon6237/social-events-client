import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb"; // এটি যুক্ত করা হলো
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

// MONGODB_URI না থাকলে যাতে অ্যাপ ক্র্যাশ না করে, তার জন্য একটি ফলব্যাক দেওয়া হলো
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db = client.db("social_events_db");

export const auth = betterAuth({
    database: mongodbAdapter(db), // এখানে অ্যাডাপ্টার ব্যবহার করা হয়েছে
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        jwt() // JWT প্লাগিনের সিম্পল কনফিগারেশন
    ]
});