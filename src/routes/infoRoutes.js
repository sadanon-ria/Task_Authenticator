import express from 'express'
import pool from '../db.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()

// users ทั้งหมด
router.get('/getUser', authMiddleware, async (req, res) => {
    try {
        const getAllUser = await pool.query("SELECT * FROM information")
        res.status(200).json({data: getAllUser.rows})
    } catch (err){
        res.status(500).json({ error: "Cannot fetch users" });
    }
})
// user 1 คน (หาจาก id)
router.get('/getUser/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        const getById = await pool.query(`SELECT * FROM information i JOIN users u ON i.user_id = u.id WHERE i.user_id = $1`, [userId])
        const userData = getById.rows[0];
        // เอา field "password" ออก ส่วน "field" ที่เหลือเก็บไว้ใน safeData
        const { password, ...safeData } = userData;
        // res.status(200).json({data: safeData}, `User ID: ${idUser}`)
        res.status(200).json({message: `Successfully fetched User ID: ${userId}`,
            data: safeData});        
    }catch (err) {
        console.error("Database Query Failed:", err);
        res.status(500).json({ error: "Cannot fetch users" });
    }
})

export default router