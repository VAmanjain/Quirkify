import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECERTS,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // Check if user already exists
        let userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          // If not, create a new document and save user in MongoDB
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });

          // Re-fetch the user to get the _id
          userExists = await User.findOne({ email: profile.email });
        }

        // Store the MongoDB _id in the session
        user.id = userExists._id.toString();

        return true;
      } catch (error) {
        console.log("Error signing in user: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
