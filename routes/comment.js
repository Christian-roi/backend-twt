const express = require("express");
const Joi = require("joi");
const Comments = require('../models/comments')
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get('/comments/:postId', authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params
        // const userId = res.locals.user.userId
        const comments = await Comments.find({ postId }).sort({ createdAt: -1 })
        res.status(200).json({ data: comments })
    } catch (e) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            errorMessage: 'Comment lookup failed.',
        });
    }
})

router.post('/comments/:postId', authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params
        const { comment } = req.body
        const userId = res.locals.user.userId

        if (comment.length > 0) {
            // const existComment = await Comments.findOne({ userId, comment });
            // if (existComment) {
            //     return res.status(412).send({
            //         errorMessages: "Email already exists",
            //     });
            // }
            await Comments.create({
                commentId: 0,
                postId,
                userId,
                comment,
            })
        } else {
            return res.status(412).send({
                errorMessages: "Please enter the comment",
            })
        }
        res.status(200).json({ message: 'You wrote a comment.' })
    } catch (e) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            errorMessage: 'Failed to write the comment.',
        });
    }
})

router.put('/comments/:commentId', authMiddleware, async (req, res) => {
    try {
        const { commentId } = req.params
        const { comment } = req.body

        if (comment.length > 0) {
            await Comments.updateOne(
                { commentId },
                { $set: { comment } },
            )
            return res.status(200).json({ message: 'The comment is edited successfully' })
        } else {
            return res.status(412).send({
                errorMessages: "Please enter the comment",
            })
        }
    } catch (e) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            errorMessage: 'Failed to edit the comment.',
        });
    }
})

router.delete('/comments/:commentId', authMiddleware, async (req, res) => {
    try {
        const { commentId } = req.params
        await Comments.deleteOne({ commentId })
        return res.status(200).json({ message: 'The comment is deleted successfully' })
    } catch (e) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            errorMessage: 'Failed to delete the comment.',
        });
    }
})

module.exports = router;