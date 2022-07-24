// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  country: string;
  region: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const country = (
    (req.headers['x-vercel-ip-country'] as string) || 'gb'
  ).toLowerCase();

  const region = (
    (req.headers['x-vercel-ip-country-region'] as string) || ''
  ).toLowerCase();

  res.status(200).json({
    country: country,
    region: region.length ? `${country}-${region}` : country,
  });
}
