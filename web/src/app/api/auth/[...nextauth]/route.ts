import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 自动检测 NEXTAUTH_URL
const getAuthUrl = () => {
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Vercel 环境
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // 其他环境
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // 默认值
  return 'http://localhost:3000';
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (credentials?.password === process.env.ADMIN_PASSWORD) {
            return {
              id: "1",
              name: "Admin",
              email: "admin@example.com",
              role: "admin",
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("认证过程出错");
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
