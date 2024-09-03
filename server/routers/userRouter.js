import express from 'express';
import jwt from 'jsonwebtoken';


const router = express.Router();

//asan login
router.post('/asanLogin', (req, res) => {
    const { pin, password } = req.body;
    const secretKey = process.env.JWT_SECRET || 'your-secure-secret-key'; 

    const userData = {
        pin: 'pin123',
        password: '123456'
    };

    const user = {
        fullName: 'Sona Mehralizada',
        birthday: '10.01.1998',
        phone: '051-340-92-77',
        address: 'Lorem ipsum'
    };

    if (userData.pin === pin && userData.password === password) {
        const tokenPayload = {
            pin: user.pin,
            fullName: user.fullName
        };

        const tokenOptions = {
            expiresIn: '1m'  // 1 minute
        };

        const newSpecificToken = jwt.sign(tokenPayload, secretKey, tokenOptions);
        const decodedToken = jwt.decode(newSpecificToken);

        res.json({
            status: 200,
            message: "Login successful",
            token: newSpecificToken,
            issuedAt: new Date(decodedToken.iat * 1000).toISOString(),
            expiresAt: new Date(decodedToken.exp * 1000).toISOString(),
            user: user
        });
        
    } else {
        res.status(401).json({
            status: 401,
            message: "not authorized"
        });
    }
});


router.post('/logoutAsan', (req, res) => {
    res.cookie('authToken', '', { expires: new Date(0) });
    res.json({ message: 'Logged out successfully. Cookie cleared.' });
});

export default router