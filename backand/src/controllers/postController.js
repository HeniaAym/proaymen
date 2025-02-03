const { poolPromise } = require('../config/db');

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`INSERT INTO Posts (UserID, Title, Content, CreatedAt, UpdatedAt) VALUES ('${userID}', '${title}', '${content}', GETDATE(), GETDATE())`);
        res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.query(`SELECT * FROM Posts`);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPostById = async (req, res) => {
    const postID = req.params.id;

    try {
        const pool = await poolPromise;
        const result = await pool.query(`SELECT * FROM Posts WHERE PostID = '${postID}'`);
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    const postID = req.params.id;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`DELETE FROM Posts WHERE PostID = '${postID}' AND UserID = '${userID}'`);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};