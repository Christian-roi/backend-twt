const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Posts = require('../models/posts');
const Likes = require('../models/likes');
const authMiddleware = require('../middlewares/authMiddleware');

router.put("/posts/:postId/like", authMiddleware, async(req, res) => {
    try {
        const { userId } = res.locals.user;
        const { postId } = req.params;
        const post = await Posts.findOne({postId:postId})
        
        if (post) {
            const existsLike = await Likes.findOne({
                postId: postId,
                userId: userId
            });

            if (existsLike) {
                await Likes.deleteOne(
                    {likeId: existsLike.likeId}
                );
                res.status(200).send({
                    message: "You have unliked this post."
                })
            } else {
                await Likes.create({
                    postId,
                    userId
                });
                console.log(postId, userId)
                res.status(201).send({
                    message: "You have liked this post."
                })
            }
        } else {
            return res.status(404).json({
                message: "Post not found",
            });
        }
    } catch (error) {
        console.error(error);
    }
});

router.get("/posts-like", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;

    const like = await Likes.find({userId: userId}).exec();

    const getPostId = like.map(p => ({
        postId: p.postId
    }))

    res.status(200).json({
        data: getPostId
    })
});

module.exports = router;