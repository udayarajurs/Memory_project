import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

export const getPostes = async (req, res) => {
    const {page} = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the staring index of the page 
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
   }catch(error) {
       res.status(404).json({ message: error.message });
   }
}

// QUery = /posts/page=1 : page = 1
// PARAMS = /posts/123 : id = 123

export const getPostBySearch = async (req, res) => {
    const {searchQuery , tags} = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({$or: [{ title } , {tags:{$in: tags.split(',')}}]});

        res.json({ data: posts});
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.body.userID, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatePost);
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}



export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userID) return res.json({message: 'Unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex(id => id === String(req.userID));

    if(index === -1) {
        // like this post
        post.likes.push(req.userID);
    }else{
        // unlike this post
        post.likes = post.likes.filter(id => id !== String(req.userID)); 
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}