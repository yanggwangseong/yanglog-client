import data from './data';
import type { NextApiRequest, NextApiResponse } from 'next'
//api/trending

const handler = (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const { Popular } = data;
    if(Popular) return res.status(200).json(Popular);
    return res.status(404).json({error:"Data not found"});
}
export default handler;