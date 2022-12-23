import data from '../data';
import type { NextApiRequest, NextApiResponse } from 'next'
//api/trending

const handler = (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    
    const { email,password } = req.body;
    res.status(200).json({email,password});
}
export default handler;