import data from '../data';
import type { NextApiRequest, NextApiResponse } from 'next'

// api/posts/1
const handler = (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { postId } = req.query;
    const { Posts } = data;
    const postIdNo = Number(postId);
    if(postIdNo){
        const post = Posts.find( value => value.id === postIdNo );
        return res.status(200).json(post)
    }
    return res.status(404).json({error:"Data not found"});
}
export default handler;