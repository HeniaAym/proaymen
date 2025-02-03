const { poolPromise } = require('../config/db');

exports.createComment = async (req, res) => {
    const { postId, content } = req.body;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`INSERT INTO Comments (PostID, UserID, Content, CreatedAt, UpdatedAt) VALUES ('${postId}', '${userID}', '${content}', GETDATE(), GETDATE())`);
        res.status(201).json({ message: 'Comment created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.query(`SELECT * FROM Comments`);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCommentById = async (req, res) => {
    const commentID = req.params.id;

    try {
        const pool = await poolPromise;
        const result = await pool.query(`SELECT * FROM Comments WHERE CommentID = '${commentID}'`);
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    const commentID = req.params.id;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`DELETE FROM Comments WHERE CommentID = '${commentID}' AND UserID = '${userID}'`);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};