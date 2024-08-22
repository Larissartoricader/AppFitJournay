import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === "test" &&
          credentials.password === "test"
        ) {
          return {
            name: "Neuer Fisch",
            email: "test@example.com",
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
