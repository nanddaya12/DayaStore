// Mock EasyPaisa verification data (in production, this would be handled by EasyPaisa API)
const activeVerifications = new Map();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Payment API endpoints
app.post('/api/payment/easypaisa/initiate', (req, res) => {
    const { mobileNumber, amount } = req.body;

    // Validate mobile number format
    if (!/^03\d{9}$/.test(mobileNumber)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid mobile number format'
        });
    }

    // Generate verification ID and PIN (mock implementation)
    const verificationId = Math.random().toString(36).substr(2, 9);
    const verificationPin = Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit PIN

    // Store verification data (in production, this would be in a database)
    activeVerifications.set(verificationId, {
        mobileNumber,
        amount,
        pin: verificationPin,
        timestamp: Date.now(),
        attempts: 0
    });

    // In production, this would send actual notification to EasyPaisa
    console.log(`EasyPaisa notification sent to ${mobileNumber}. PIN: ${verificationPin}`);

    res.json({
        success: true,
        verificationId,
        message: 'Verification code sent to your EasyPaisa app'
    });
});

app.post('/api/payment/easypaisa/verify', (req, res) => {
    const { verificationId, pin } = req.body;

    const verification = activeVerifications.get(verificationId);

    if (!verification) {
        return res.status(400).json({
            success: false,
            message: 'Verification session expired or invalid'
        });
    }

    // Check if verification is expired (5 minutes)
    if (Date.now() - verification.timestamp > 5 * 60 * 1000) {
        activeVerifications.delete(verificationId);
        return res.status(400).json({
            success: false,
            message: 'Verification code expired'
        });
    }

    // Check attempts limit
    if (verification.attempts >= 3) {
        activeVerifications.delete(verificationId);
        return res.status(400).json({
            success: false,
            message: 'Too many failed attempts. Please try again.'
        });
    }

    // Validate PIN
    if (verification.pin !== pin) {
        verification.attempts++;
        return res.status(400).json({
            success: false,
            message: 'Invalid PIN. Please try again.',
            attemptsLeft: 3 - verification.attempts
        });
    }

    // Payment successful
    activeVerifications.delete(verificationId);

    // In production, this would process the actual payment
    console.log(`Payment successful: ${verification.amount} PKR to ${verification.mobileNumber}`);

    res.json({
        success: true,
        message: 'Payment processed successfully',
        transactionId: Math.random().toString(36).substr(2, 9).toUpperCase()
    });
});

app.post('/api/payment/easypaisa/resend', (req, res) => {
    const { verificationId } = req.body;

    const verification = activeVerifications.get(verificationId);

    if (!verification) {
        return res.status(400).json({
            success: false,
            message: 'Verification session expired or invalid'
        });
    }

    // Generate new PIN
    const newPin = Math.floor(10000 + Math.random() * 90000).toString();
    verification.pin = newPin;
    verification.timestamp = Date.now(); // Reset timer
    verification.attempts = 0; // Reset attempts

    // In production, this would send actual notification to EasyPaisa
    console.log(`EasyPaisa notification resent to ${verification.mobileNumber}. New PIN: ${newPin}`);

    res.json({
        success: true,
        message: 'Verification code resent to your EasyPaisa app'
    });
});

// Handle all routes by serving index.html (for SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
    console.log('Access the site at: http://localhost:3000');
});
