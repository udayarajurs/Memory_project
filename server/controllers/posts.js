import PostMessage from "../models/postMessage.js";

export const getPostes = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
   }catch(error) {
       res.status(404).json({ message: error.message });
   }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    res.status(201).json(newPost);
    try {
        await newPost.save();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

    PostMessage.findByIdAndUpdate(_id)
}