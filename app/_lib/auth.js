import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { redirect } from "next/navigation";
import { createGuest, getGuest } from "./data-service";
const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_AUTH_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const userHasAccount = await getGuest(user.email);
        console.log(userHasAccount);
        if (!userHasAccount) {
          await createGuest({
            fullname: user.name,
            email: user.email,
          });
        }
        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session?.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
