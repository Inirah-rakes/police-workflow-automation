import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, Typography, Button, Paper, AppBar, Toolbar } from '@mui/material';
import { Dashboard, TrackChanges, Mail, ShowChart } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Import the page components
import LoginPage from './components/LoginPage';
import CsrDashboard from './components/CsrDashboard';
import StatusTracker from './components/StatusTracker';
import ResponseHandler from './components/ResponseHandler';
import Analytics from './components/Analytics';

const theme = createTheme({
    palette: {
        primary: { main: '#003366' },
        secondary: { main: '#FFC107' },
        background: { default: '#f4f6f8', paper: '#ffffff' },
    },
    typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', h4: { fontWeight: 600 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 } },
    components: { MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } } }, MuiCard: { styleOverrides: { root: { borderRadius: 12, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' } } }, MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } }, MuiTableCell: { styleOverrides: { head: { backgroundColor: '#003366', color: '#ffffff', fontWeight: 'bold' } } } },
});

const TNPoliceLogo = () => (
    <img src="https://seeklogo.com/images/T/tamilnadu-police-logo-A7B0493857-seeklogo.com.png" alt="Tamil Nadu Police Logo" style={{ height: 60, marginRight: 16 }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/FFFFFF/000000?text=Logo'; }} />
);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) setIsLoggedIn(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <CsrDashboard />;
            case 'tracker': return <StatusTracker />;
            case 'handler': return <ResponseHandler />;
            case 'analytics': return <Analytics />;
            default: return <CsrDashboard />;
        }
    };

    if (!isLoggedIn) {
        return (<ThemeProvider theme={theme}><CssBaseline /><LoginPage onLogin={setIsLoggedIn} /></ThemeProvider>);
    }
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <TNPoliceLogo />
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>CSR Service Dashboard</Typography>
                        <Typography variant="body1" sx={{ mr: 2 }}>{currentTime.toLocaleString()}</Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                 <nav>
                    <Paper elevation={4} sx={{ width: 240, height: '100vh', position: 'fixed', top: 0, left: 0, pt: '80px', backgroundColor: '#fff' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Button startIcon={<Dashboard />} sx={{ justifyContent: 'flex-start', p: 2, color: currentPage === 'dashboard' ? 'primary.main' : 'inherit' }} onClick={() => setCurrentPage('dashboard')}>Dashboard</Button>
                            <Button startIcon={<TrackChanges />} sx={{ justifyContent: 'flex-start', p: 2, color: currentPage === 'tracker' ? 'primary.main' : 'inherit' }} onClick={() => setCurrentPage('tracker')}>Status Tracker</Button>
                            <Button startIcon={<Mail />} sx={{ justifyContent: 'flex-start', p: 2, color: currentPage === 'handler' ? 'primary.main' : 'inherit' }} onClick={() => setCurrentPage('handler')}>Response Handler</Button>
                            <Button startIcon={<ShowChart />} sx={{ justifyContent: 'flex-start', p: 2, color: currentPage === 'analytics' ? 'primary.main' : 'inherit' }} onClick={() => setCurrentPage('analytics')}>Analytics</Button>
                        </Box>
                    </Paper>
                </nav>
                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: '240px', mt: '64px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={currentPage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                            {renderPage()}
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
