import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import prisma from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { generateUniqueName } from "@/app/actions";

export const NextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const userId = profile.sub;
        const name = profile.name ?? "user";
        // return profile and update name by using generateUniqueName function

        return {
          id: userId,
          name: await generateUniqueName(name),
          email: profile.email,
          image: profile.picture,
        };
        
        
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email & Password are required fields!");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          throw new Error(
            "User not present in the database! Please sign-up first."
          );
        }
        if (!user.hashedPassword) {
          throw new Error(
            "User's hashedPassword not present in the data base."
          );
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect credentials!");
        } else {
          return user;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
