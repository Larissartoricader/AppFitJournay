import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === "Paula Fernandez" &&
          credentials.password === "paula@gmail.com"
        ) {
          return {
            name: "Paula Fernandez",
            email: "paula@gmail.com",
          };
        }
        if (
          credentials.username === "test" &&
          credentials.password === "test@test.com"
        ) {
          return {
            name: "test",
            email: "test@test.com",
          };
        }
        if (
          credentials.username === "test2" &&
          credentials.password === "test2@test.com"
        ) {
          return {
            name: "test2",
            email: "test2@test.com",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    error: "/api/auth/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
