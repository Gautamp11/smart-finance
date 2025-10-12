import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { connectDB } from "@/app/_lib/connectDB";
// import User from "@/models/User";
import { createUser, getUser } from "./dataService";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.email);
        if (!existingUser) {
          await createUser({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      const loggedUser = await getUser(session.user.email);
      session.user.id = loggedUser.id;
      return session;
    },
  },
});
