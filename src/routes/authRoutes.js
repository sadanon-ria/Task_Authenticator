import express from 'express'
import bcrypt from 'bcryptjs'
import pool from '../db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {    
    const client = await pool.connect();

    const { username , password, user_id, user_type, fullname, address_no,
        address_moo , address_village, address_soi, address_road, 
        subdistrict, district, province,postal_code, contact_title, 
        contact_firstname, contact_lastname,contact_phone, contact_email, 
        ref_code } = req.body

    // check pattern ของ password ก่อน
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/
    if ( !passwordPattern.test(password)){
        return res.status(400).json({ message: 'รหัสผ่านต้องมีความยาว 8–20 ตัวอักษร และต้องมีทั้งตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข'})
    }
    // password ตรงตามเงื่อนไข ค่อย hash
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        // เริ่ม
        await client.query("BEGIN");

        const insertUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
            [username, hashedPassword])
        const userId = insertUser.rows[0].id;
        // console.log(userId)

        const insertInfoUser = await pool.query("INSERT INTO information ( user_id ,user_type, fullname, address_no, address_moo, address_village, address_soi, address_road,subdistrict, district, province, postal_code,contact_title, contact_firstname, contact_lastname,contact_phone, contact_email, ref_code) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13, $14, $15, $16, $17, $18 )",
      [ userId, user_type, fullname, address_no,
        address_moo , address_village, address_soi, address_road,
        subdistrict, district, province, postal_code, contact_title,
        contact_firstname, contact_lastname, contact_phone, contact_email, ref_code,
      ] )
        //   console.log(insertInfoUser)
      //   ยืนยัน
        await client.query("COMMIT");
        res.status(201).json({ message: "Registered successfully" });

    }catch ( err ) {
        // ถ้าเจอ error ให้ ยกเลิกทั้งหมด
        await client.query("ROLLBACK");
        console.log(err.message)
        res.status(500).json({ error: "Registration failed" });
    } finally {
        client.release();
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try{
        const getUserId = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        const dataUser = getUserId.rows[0]
        console.log("output from authRoutes 63: ", dataUser.username)
        console.log("output from authRoutes 64: ", dataUser)
        const passwordIsValid = bcrypt.compareSync(password,dataUser.password)

        if (!dataUser) {x
            return res.status(404).send({message: "Username not found"})
        }
        if (!passwordIsValid) {
            return res.status(401).send({message: "Invalid password"})
        }
        
        console.log("Login JWT Secret:", process.env.JWT_SECRET);
        const token = jwt.sign({id:dataUser.id, username:dataUser.username}, process.env.JWT_SECRET, { expiresIn: '24h' })
        const id = dataUser.id
        console.log(id)
        return res.status(200).send({message: "Username found", userID:id , token: token})

    }catch ( err ) {
        console.log(err.message)
        res.sendStatus(500)
    }
})

export default router