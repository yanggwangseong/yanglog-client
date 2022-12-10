import data from '../data';
import type { NextApiRequest, NextApiResponse } from 'next'
//api/trending

const handler = (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const { Posts } = data;
    if(Posts) return res.status(200).json(Posts);
    return res.status(404).json({error:"Data not found"});
}
export default handler;