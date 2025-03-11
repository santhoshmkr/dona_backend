import Patient from "../models/authondication.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// API For Registering User
export const register = async (req, res) => {
    const { email, name, password, role } = req.body;

    // Basic input validation
    if (!email || !name || !password || !role) {
        return res.status(400).json({ message: "Please fill out all fields" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength validation
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    try {
        // Check for existing user
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newPatient = new Patient({ 
            email, 
            name, 
            password: hashPassword, 
            role 
        });
        await newPatient.save();

        // Log successful registration
        console.log(`New user registered: ${email}`);

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await Patient.findOne({ email });
        
        // Handle case where user doesn't exist
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        // Handle invalid password
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        console.log(`User ${user._id} logged in successfully`);

        return res.status(200).json({
            message: "Login successful",
            token,
            role: user.role
        });
    } catch (error) {
        console.error("Login error:", error);
        
        return res.status(500).json({
            message: "Server error"
        });
    }
};