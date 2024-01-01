import express from 'express'
import { body, validationResult } from 'express-validator'
import { Admin } from '../../models/adminModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JWT_SECRET = "admin"
import fetchAdmin from '../../middleware/fetchAdmin.js'

const router = express.Router();

//Route for creating a new admin
router.post('/register', [
    body('username', 'enter a valid Username').isLength({ min: 5 }),
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must atleast 5 characters').isLength({ min: 5 }),
    body('email', 'enter a valid email').isEmail(),
    body('phone', 'enter a valid mobile number').isLength({ min: 10, max: 10 }),
    body('role', 'role cannot be changed').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors, return Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    try {
        let success = false;
        //check whether the admin with same email is already exists
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            return res.status(400).json({ success, error: "sorry a admin with same email exist" })
        }
        admin = await Admin.findOne({ username: req.body.username });
        if (admin) {
            return res.status(400).json({ success, error: "sorry a admin with same username exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create a new admin
        const newAdmin = {
            username: req.body.username,
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role
        }
        admin = await Admin.create(newAdmin);

        const data = {
            admin: {
                id: admin.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        return res.status(201).send({ success, authtoken });
    } catch (error) {
        console.log(error.messge);
        return res.status(500).send({ message: error.message })
    }
})

//Route for login an admin
router.post('/login', [
    body('username', 'enter a valid username').isLength({ min: 5 }),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
        let admin = await Admin.findOne({ username });
        if (!admin) {
            success = false;
            return res.status(404).json({ success, message: 'Admin not found' });
        }

        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
            success = false;
            return res.status(401).json({ success, message: 'Wrong Password!' })
        }
        const data = {
            admin: {
                id: admin.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        return res.status(200).send({ success, authtoken });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
})

// Route for updating an admin
router.put('/update/:adminId', async (req, res) => {
    const { adminId } = req.params;

    try {
        let admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Update the admin with the new data
        admin.username = req.body.username;
        admin.name = req.body.name;
        admin.email = req.body.email;
        admin.phone = req.body.phone;

        // Save the updated admin
        admin = await admin.save();

        return res.status(200).json({ success: true, admin });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Route for deleting an admin
router.delete('/delete/:adminId', async (req, res) => {
    const { adminId } = req.params;

    try {
        let admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Delete the admin
        await admin.remove();

        return res.status(200).json({ success: true, message: 'Admin deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// ROUTE:3 :- Get logged in Admin details 
router.post('/getAdmin', fetchAdmin, async (req, res) => {
  
    try {
      let adminId = req.admin.id;
       const admin = await Admin.findById(adminId).select("-password");
       res.send(admin);
    }  catch (error) {
       console.error(error.message);
       res.status(500).send("Internal server Error" );
    }
    });



export default router;