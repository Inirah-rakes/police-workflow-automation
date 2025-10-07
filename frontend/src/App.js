// import React, { useState, useEffect } from 'react';
// import { createTheme, ThemeProvider, CssBaseline, Box, Typography, Button, Paper, AppBar, Toolbar } from '@mui/material';
// import { Dashboard, TrackChanges, Mail, ShowChart } from '@mui/icons-material';
// import { motion, AnimatePresence } from 'framer-motion';

// // Import the page components
// import LoginPage from './components/LoginPage';
// import CsrDashboard from './components/CsrDashboard';
// import StatusTracker from './components/StatusTracker';
// import ResponseHandler from './components/ResponseHandler';
// import Analytics from './components/Analytics';

// const theme = createTheme({
//     palette: {
//         primary: { main: '#003366' },
//         secondary: { main: '#FFC107' },
//         background: { default: '#f4f6f8', paper: '#ffffff' },
//     },
//     typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', h4: { fontWeight: 600 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 } },
//     components: { MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } } }, MuiCard: { styleOverrides: { root: { borderRadius: 12, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' } } }, MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } }, MuiTableCell: { styleOverrides: { head: { backgroundColor: '#003366', color: '#ffffff', fontWeight: 'bold' } } } },
// });

// const TNPoliceLogo = () => (
//     <img src="https://seeklogo.com/images/T/tamilnadu-police-logo-A7B0493857-seeklogo.com.png" alt="Tamil Nadu Police Logo" style={{ height: 60, marginRight: 16 }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/FFFFFF/000000?text=Logo'; }} />
// );

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [currentPage, setCurrentPage] = useState('dashboard');
//     const [currentTime, setCurrentTime] = useState(new Date());

//     useEffect(() => {
//         const token = localStorage.getItem('authToken');
//         if (token) setIsLoggedIn(true);
//         const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//         return () => clearInterval(timer);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('authToken');
//         setIsLoggedIn(false);
//     };

//     const renderPage = () => {
//         switch (currentPage) {
//             case 'dashboard': return <CsrDashboard />;
//             case 'tracker': return <StatusTracker />;
//             case 'handler': return <ResponseHandler />;
//             case 'analytics': return <Analytics />;
//             default: return <CsrDashboard />;
//         }
//     };

//     if (!isLoggedIn) {
//         return (<ThemeProvider theme={theme}><CssBaseline /><LoginPage onLogin={setIsLoggedIn} /></ThemeProvider>);
//     }
    
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Box sx={{ display: 'flex' }}>
//                 <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//                     <Toolbar>
//                         <TNPoliceLogo />
//                         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>Police Cyber  Dashboard</Typography>
//                         <Typography variant="body1" sx={{ mr: 2 }}>{currentTime.toLocaleString()}</Typography>
//                         <Button color="inherit" onClick={handleLogout}>Logout</Button>
//                     </Toolbar>
//                 </AppBar>
//                  <nav>
//                     <Paper elevation={4} sx={{ width: 240, height: '100vh', position: 'fixed', top: 0, left: 0, pt: '80px', backgroundColor: '#fff' }}>
//                         <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                             <Button startIcon={<Dashboard />} sx={{ justifyContent: 'flex-start', p: 2, color: currentPage === 'dashboard' ? 'primary.main' : 'inherit' }} onClick={() => setCurrentPage('dashboard')}>Dashboard</Button>
//                             <Button startIcon={<TrackChanges />} sx={{ justifyContent: 'flex-start', p: 2, color: currentPage === 'tracker' ? 'primary.main' : 'inherit' }} onClick={() => setCurrentPage('tracker')}>Status Tracker</Button>
//                             <Button startIcon={<Mail />} sx={{ justifyContent: 'flex-start', p: 2, color: currentPage === 'handler' ? 'primary.main' : 'inherit' }} onClick={() => setCurrentPage('handler')}>Response Handler</Button>
//                             <Button startIcon={<ShowChart />} sx={{ justifyContent: 'flex-start', p: 2, color: currentPage === 'analytics' ? 'primary.main' : 'inherit' }} onClick={() => setCurrentPage('analytics')}>Analytics</Button>
//                         </Box>
//                     </Paper>
//                 </nav>
//                 <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: '240px', mt: '64px' }}>
//                     <AnimatePresence mode="wait">
//                         <motion.div key={currentPage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
//                             {renderPage()}
//                         </motion.div>
//                     </AnimatePresence>
//                 </Box>
//             </Box>
//         </ThemeProvider>
//     );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, Typography, Button, Paper, AppBar, Toolbar } from '@mui/material';
import { Dashboard, TrackChanges, Mail, ShowChart, ExitToApp, Schedule } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Import the page components
import LoginPage from './components/LoginPage';
import CsrDashboard from './components/CsrDashboard';
import StatusTracker from './components/StatusTracker';
import ResponseHandler from './components/ResponseHandler';
import Analytics from './components/Analytics';

const theme = createTheme({
    palette: {
        primary: { main: '#1565C0' },
        secondary: { main: '#FFC107' },
        background: { default: '#F8FAFC', paper: '#ffffff' },
    },
    typography: { 
        fontFamily: '"TikTok Sans", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700 }, 
        h5: { fontWeight: 700 }, 
        h6: { fontWeight: 700 }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontFamily: '"TikTok Sans", sans-serif',
                    fontWeight: 700,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#1565C0',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontFamily: '"TikTok Sans", sans-serif',
                },
            },
        },
    },
});

const TNPoliceLogo = () => (
    <img 
        src="https://seeklogo.com/images/T/tamilnadu-police-logo-A7B0493857-seeklogo.com.png" 
        alt="Tamil Nadu Police Logo" 
        style={{ height: 60, marginRight: 16 }} 
        onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/60x60/FFFFFF/000000?text=Logo'; 
        }} 
    />
);

// Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
};

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LoginPage onLogin={setIsLoggedIn} />
            </ThemeProvider>
        );
    }
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                {/* Enhanced App Bar */}
                <AppBar 
                    position="fixed" 
                    sx={{ 
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
                        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Toolbar sx={{ padding: '16px 24px', minHeight: '80px' }}>
                        <TNPoliceLogo />
                        <Typography 
                            variant="h6" 
                            noWrap 
                            component="div" 
                            sx={{ 
                                flexGrow: 1, 
                                fontFamily: '"TikTok Sans", sans-serif',
                                fontWeight: 700,
                                fontSize: '1.5rem'
                            }}
                        >
                            Police CyberCrime Request Dashboard
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Schedule sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    mr: 2, 
                                    fontFamily: '"TikTok Sans", sans-serif',
                                    fontWeight: 500 
                                }}
                            >
                                {currentTime.toLocaleString()}
                            </Typography>
                            <Button 
                                color="inherit" 
                                onClick={handleLogout}
                                startIcon={<ExitToApp />}
                                sx={{ 
                                    fontFamily: '"TikTok Sans", sans-serif',
                                    fontWeight: 700,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Enhanced Navigation Sidebar */}
                <Paper 
                    elevation={4} 
                    className="navigation-sidebar"
                    sx={{ 
                        width: 280, 
                        height: '100vh', 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        pt: '80px', 
                        backgroundColor: '#fff',
                        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
                        zIndex: 1200,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
                        {/* Navigation Menu */}
                        <Box sx={{ mt: 2 }}>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button 
                                    startIcon={<Dashboard className="nav-icon" />}
                                    className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
                                    onClick={() => handlePageChange('dashboard')}
                                    sx={{ 
                                        width: '100%',
                                        justifyContent: 'flex-start', 
                                        p: 2, 
                                        mb: 1,
                                        borderRadius: 2,
                                        fontFamily: '"TikTok Sans", sans-serif',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        color: currentPage === 'dashboard' ? '#1565C0' : '#4A5568',
                                        backgroundColor: currentPage === 'dashboard' ? 'rgba(21, 101, 192, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(21, 101, 192, 0.08)',
                                            transform: 'translateX(8px)',
                                        },
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    Dashboard
                                </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button 
                                    startIcon={<TrackChanges className="nav-icon" />}
                                    className={`nav-button ${currentPage === 'tracker' ? 'active' : ''}`}
                                    onClick={() => handlePageChange('tracker')}
                                    sx={{ 
                                        width: '100%',
                                        justifyContent: 'flex-start', 
                                        p: 2, 
                                        mb: 1,
                                        borderRadius: 2,
                                        fontFamily: '"TikTok Sans", sans-serif',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        color: currentPage === 'tracker' ? '#1565C0' : '#4A5568',
                                        backgroundColor: currentPage === 'tracker' ? 'rgba(21, 101, 192, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(21, 101, 192, 0.08)',
                                            transform: 'translateX(8px)',
                                        },
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    Status Tracker
                                </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button 
                                    startIcon={<Mail className="nav-icon" />}
                                    className={`nav-button ${currentPage === 'handler' ? 'active' : ''}`}
                                    onClick={() => handlePageChange('handler')}
                                    sx={{ 
                                        width: '100%',
                                        justifyContent: 'flex-start', 
                                        p: 2, 
                                        mb: 1,
                                        borderRadius: 2,
                                        fontFamily: '"TikTok Sans", sans-serif',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        color: currentPage === 'handler' ? '#1565C0' : '#4A5568',
                                        backgroundColor: currentPage === 'handler' ? 'rgba(21, 101, 192, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(21, 101, 192, 0.08)',
                                            transform: 'translateX(8px)',
                                        },
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    Response Handler
                                </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button 
                                    startIcon={<ShowChart className="nav-icon" />}
                                    className={`nav-button ${currentPage === 'analytics' ? 'active' : ''}`}
                                    onClick={() => handlePageChange('analytics')}
                                    sx={{ 
                                        width: '100%',
                                        justifyContent: 'flex-start', 
                                        p: 2, 
                                        mb: 1,
                                        borderRadius: 2,
                                        fontFamily: '"TikTok Sans", sans-serif',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        color: currentPage === 'analytics' ? '#1565C0' : '#4A5568',
                                        backgroundColor: currentPage === 'analytics' ? 'rgba(21, 101, 192, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(21, 101, 192, 0.08)',
                                            transform: 'translateX(8px)',
                                        },
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    Analytics
                                </Button>
                            </motion.div>
                        </Box>
                    </Box>
                </Paper>

                {/* Main Content Area with Smooth Transitions */}
                <Box 
                    component="main" 
                    className="main-content"
                    sx={{ 
                        flexGrow: 1, 
                        bgcolor: 'background.default', 
                        p: 3, 
                        ml: '280px', 
                        mt: '80px',
                        minHeight: '100vh',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={pageTransition}
                            style={{ width: '100%' }}
                        >
                            {renderPage()}
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
