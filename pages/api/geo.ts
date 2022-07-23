// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import cc from 'country-codes.json';

type Data = {
  country: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const country =
    cc.find((c) => c.code === (req.headers['x-vercel-ip-country'] as string))
      ?.name || 'United States';

  res.status(200).json({
    country,
  });
}
