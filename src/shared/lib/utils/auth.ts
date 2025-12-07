import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/shared/lib/db";
import * as schema from "@/shared/lib/db/schema";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  emailVerification: {
    sendOnSignUp: false,
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
    autoSignIn: true,
    //update someday for
    // sendResetPassword: async ({ user, url, token }) => {
    //   // Send reset password email
    // },
  },
  // logger: {
  //   disabled: false,
  //   level: "info",
  //   log: (level, message, ...args) => {
  //     // Custom logging implementation
  //     console.log(`[${level}] ${message}`, ...args);
  //   },
  // },
  plugins: [nextCookies()],
});
