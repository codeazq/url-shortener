import NextAuth from "next-auth/next";
import GooglePrivider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GooglePrivider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],

  callbacks: {
    async signIn({ profile, account }) {
      return true;
    },

    async jwt({ account, token }) {
      // if account is passed it is a sign in else useSession is being called
      if (account) {
        let tokenToVerifyOnBackend = account?.id_token;

        // sign in on the backend
        const axiosAuthresp = await axios.post(
          `${process.env.BACKEND_URL}/auth/login`,
          {
            token: tokenToVerifyOnBackend,
          }
        );
        token = axiosAuthresp.data;
      }
      return token;
    },

    async session({ session, token }) {
      // the token here would be the token returned from jwt callback
      // add it to the session
      session.user = token.user;
      session.accessToken = token.token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
