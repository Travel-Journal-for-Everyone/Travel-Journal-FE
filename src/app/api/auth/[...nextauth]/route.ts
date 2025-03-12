// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     AppleProvider({
//       clientId: process.env.APPLE_CLIENT_ID!,
//       clientSecret: process.env.APPLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token.id) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin", // 커스텀 로그인 페이지 설정 가능
//   },
//   secret: process.env.NEXTAUTH_SECRET, // 인증 보안 키 추가
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
