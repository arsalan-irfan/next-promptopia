import NextAuth from "next-auth/next";
import { Profile, User as SessionUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User, { IUser } from "@/models/user";

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID ?? "",
         clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
   ],
   callbacks: {
      async session({ session }) {
         const sessionUser: IUser | null = await User.findOne({
            email: session.user?.email,
         });
         if (sessionUser) {
            const newSessionUser = {
               id: sessionUser._id.toString(),
               email: sessionUser.email,
               image: session.user?.image,
            };
            session.user = newSessionUser;
         }
         console.log("sessionUser->", session.user);

         return session;
      },
      async signIn({ account, profile, user, credentials }) {
         try {
            await connectToDB();

            const userExist = await User.findOne({
               email: profile?.email,
            });
            if (!userExist) {
               const newProfile: any = profile;
               await User.create({
                  email: profile?.email,
                  username: profile?.name?.replace(" ", "").toLowerCase(),
                  image: newProfile?.picture,
               });
            }

            return true;
         } catch (error) {
            return false;
         }
      },
   },
});
export { handler as GET, handler as POST };
