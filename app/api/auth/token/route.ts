import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextRequest) => {
  const token = await getToken({ req, secret, raw: true });

  return new Response(JSON.stringify({ token }), { status: 200 });
};

export { handler as GET };
