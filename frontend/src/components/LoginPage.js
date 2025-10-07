import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, Paper, IconButton } from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';

const TNPoliceLogo = () => (
    <img src="https://images.seeklogo.com/logo-png/47/1/tamilnadu-police-logo-png_seeklogo-475368.png" alt="Tamil Nadu Police Logo" style={{ height: 60, marginRight: 16 }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/FFFFFF/000000?text=Logo'; }} />
);

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [error, setError] = useState('');
    const canvasRef = useRef(null);

    const generateCaptcha = () => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let newCaptcha = '';
        for (let i = 0; i < 6; i++) {
            newCaptcha += chars[Math.floor(Math.random() * chars.length)];
        }
        setCaptcha(newCaptcha);
        return newCaptcha;
    };
    
    const drawCaptcha = (text) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < text.length; i++) {
            ctx.save();
            const x = (i * (width / text.length)) + (width / (text.length * 2));
            const y = height / 2;
            ctx.translate(x, y);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 30%)`;
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }
        
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgba(0, 51, 102, ${Math.random() * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }
    };

    useEffect(() => { drawCaptcha(generateCaptcha()) }, []);
    
    const handleRefreshCaptcha = () => drawCaptcha(generateCaptcha());

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        if (captchaInput.toLowerCase() !== captcha.toLowerCase()) {
            setError('Invalid CAPTCHA');
            handleRefreshCaptcha();
            setCaptchaInput('');
            return;
        }
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('authToken', 'mock-jwt-token');
            onLogin(true);
        } else {
            setError('Invalid username or password');
            handleRefreshCaptcha();
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockOutlined /></Avatar>
                    <Typography component="h1" variant="h5">Admin Login</Typography>
                    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><TNPoliceLogo /></Box>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField margin="normal" required fullWidth name="password" label="Password" type={showPassword ? 'text' : 'password'} id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                            InputProps={{ endAdornment: (<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>), }} />
                        <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={8}><TextField required fullWidth name="captcha" label="Enter CAPTCHA" id="captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} /></Grid>
                            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}><canvas ref={canvasRef} width="150" height="50" onClick={handleRefreshCaptcha} style={{ cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}></canvas></Grid>
                        </Grid>
                        {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>Sign In</Button>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default LoginPage;
