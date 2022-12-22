
export const getPostById = () => {
    const getPost =  async (postId:string | string[] | number) =>  (await (fetch(`http://localhost:3000/api/posts/${postId}`))).json();
    console.log(getPost);
}