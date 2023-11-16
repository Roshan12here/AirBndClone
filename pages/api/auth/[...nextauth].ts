import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth,{ AuthOptions} from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProviders from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authoptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProviders({
      name: "crudentiasls",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(crudentiasls) {
        if (!crudentiasls?.email || !this.credentials?.password) {
          throw new Error("Invalid Crudentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: crudentiasls.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Crudentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          crudentiasls.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Crudentials");
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/",
  },
  debug :process.env.NODE_ENV ==='development',
  session: {
    strategy:"jwt"
  },

secret:process.env.NEXTAUTH_SECRET
};


export default NextAuth(authoptions)
