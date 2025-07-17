// import React, { useState, useEffect, useMemo } from 'react';
// import { Box, Typography, Button, Paper, Grid, Card, CardContent, CardActions, List, ListItem, ListItemText, CircularProgress, Alert, Checkbox, FormControlLabel } from '@mui/material';
// import { motion } from 'framer-motion';
// import { fetchRequests, sendToProvider } from '../api/CsrAPI';

// const providerColors = {
//     'Jio': '#00A9E0', 'Airtel': '#E40000', 'VI': '#EE3388', 'BSNL': '#003366', 'Unknown': '#808080'
// };

// const ProviderCard = ({ provider, requests, onSend }) => {
//     const [selected, setSelected] = useState([]);
//     const [isSending, setIsSending] = useState(false);

//     const handleToggle = (value) => () => {
//         const currentIndex = selected.indexOf(value);
//         const newSelected = [...selected];

//         if (currentIndex === -1) {
//             newSelected.push(value);
//         } else {
//             newSelected.splice(currentIndex, 1);
//         }
//         setSelected(newSelected);
//     };

//     const handleSend = async () => {
//         setIsSending(true);
//         await onSend(provider, selected);
//         setIsSending(false);
//         setSelected([]); // Clear selection after sending
//     };

//     return (
//         <Card sx={{ minWidth: 275, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
//             <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography variant="h5" component="div" sx={{ color: providerColors[provider], fontWeight: 'bold' }}>
//                     {provider}
//                     <Typography component="span" sx={{ ml: 1, color: 'text.secondary', fontSize: '1rem' }}>
//                         {requests.length} pending
//                     </Typography>
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     CSR requests ready for dispatch
//                 </Typography>
//                 <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
//                     <List dense>
//                         {requests.length > 0 ? requests.map(req => (
//                             <ListItem key={req.id} disablePadding>
//                                 <FormControlLabel
//                                     sx={{ width: '100%', ml: 0 }}
//                                     control={
//                                         <Checkbox
//                                             edge="start"
//                                             onChange={handleToggle(req.id)}
//                                             checked={selected.indexOf(req.id) !== -1}
//                                             tabIndex={-1}
//                                             disableRipple
//                                         />
//                                     }
//                                     label={`${req.mobile_number} (${req.station_id})`}
//                                 />
//                             </ListItem>
//                         )) : (
//                             <ListItem><ListItemText primary="No pending requests." /></ListItem>
//                         )}
//                     </List>
//                 </Paper>
//             </CardContent>
//             <CardActions sx={{ justifyContent: 'center', p: 2 }}>
//                 <Button 
//                     fullWidth
//                     variant="contained" 
//                     sx={{ backgroundColor: providerColors[provider], '&:hover': {backgroundColor: providerColors[provider], opacity: 0.9} }}
//                     onClick={handleSend}
//                     disabled={selected.length === 0 || isSending}
//                 >
//                     {isSending ? <CircularProgress size={24} color="inherit" /> : `Send to ${provider} (${selected.length})`}
//                 </Button>
//             </CardActions>
//         </Card>
//     );
// };

// const CsrDashboard = () => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'success' });

//     const groupedRequests = useMemo(() => {
//         const pending = requests.filter(r => r.status === 'Request Received');
//         return pending.reduce((acc, req) => {
//             (acc[req.provider] = acc[req.provider] || []).push(req);
//             return acc;
//         }, {});
//     }, [requests]);

//     const loadRequests = async () => {
//         try {
//             const data = await fetchRequests();
//             setRequests(data);
//             setError(null);
//         } catch (err) {
//             setError('Failed to fetch data. Is the backend running?');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadRequests();
//         const interval = setInterval(loadRequests, 20000);
//         return () => clearInterval(interval);
//     }, []);

//     const handleSendToProvider = async (provider, requestIds) => {
//         setAlertInfo({ show: false, message: '' });
//         try {
//             const response = await sendToProvider(requestIds);
//             setAlertInfo({ show: true, message: response.message, severity: 'success' });
//             loadRequests(); // Refresh the data
//         } catch (err) {
//             setAlertInfo({ show: true, message: `Error sending to ${provider}.`, severity: 'error' });
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//     if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

//     const providers = ['Jio', 'Airtel', 'VI', 'BSNL'];

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             <Typography variant="h4" gutterBottom>CSR Dashboard</Typography>
//             <Typography variant="body1" sx={{mb: 2}}>Manage Customer Service Requests</Typography>
//             {alertInfo.show && <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ show: false, message: '' })} sx={{ mb: 2 }}>{alertInfo.message}</Alert>}
//             <Grid container spacing={3}>
//                 {providers.map(provider => (
//                     <Grid item xs={12} md={6} lg={3} key={provider}>
//                         <ProviderCard 
//                             provider={provider} 
//                             requests={groupedRequests[provider] || []} 
//                             onSend={handleSendToProvider}
//                         />
//                     </Grid>
//                 ))}
//             </Grid>
//         </motion.div>
//     );
// };

// export default CsrDashboard;


import React, { useState, useEffect, useMemo } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    CardActions, 
    List, 
    ListItem, 
    ListItemText, 
    CircularProgress, 
    Alert, 
    Checkbox, 
    FormControlLabel,
    Chip
} from '@mui/material';
import { Send, Phone, Refresh, TrendingUp } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRequests, sendToProvider } from '../api/CsrAPI';

const providerColors = {
    'Jio': '#00A9E0', 
    'Airtel': '#E40000', 
    'VI': '#EE3388', 
    'BSNL': '#003366', 
    'Unknown': '#808080'
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

const StatsCard = ({ title, value, icon, color = 'primary' }) => (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Card 
            className={`stats-card ${color} animate-fade-in`}
            sx={{
                background: `linear-gradient(135deg, ${
                    color === 'primary' ? '#1565C0, #42A5F5' : 
                    color === 'success' ? '#388E3C, #66BB6A' :
                    color === 'warning' ? '#F57C00, #FFB74D' :
                    '#37474F, #62727B'
                })`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography 
                            variant="h4" 
                            className="stats-value"
                            sx={{ 
                                fontFamily: '"TikTok Sans", sans-serif',
                                fontWeight: 700,
                                fontSize: '2.5rem',
                                mb: 1 
                            }}
                        >
                            {value}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            className="stats-label"
                            sx={{ 
                                fontFamily: '"TikTok Sans", sans-serif',
                                fontWeight: 400,
                                opacity: 0.9,
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.025em'
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Box sx={{ opacity: 0.8 }}>
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </motion.div>
);

const ProviderCard = ({ provider, requests, onSend }) => {
    const [selected, setSelected] = useState([]);
    const [isSending, setIsSending] = useState(false);

    const handleToggle = (value) => () => {
        const currentIndex = selected.indexOf(value);
        const newSelected = [...selected];
        if (currentIndex === -1) {
            newSelected.push(value);
        } else {
            newSelected.splice(currentIndex, 1);
        }
        setSelected(newSelected);
    };

    const handleSend = async () => {
        setIsSending(true);
        await onSend(provider, selected);
        setIsSending(false);
        setSelected([]);
    };

    const getProviderColor = (provider) => {
        return providerColors[provider] || '#4A5568';
    };

    return (
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
            <Card 
                className={`provider-card ${provider.toLowerCase()} animate-fade-in`}
                sx={{
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: getProviderColor(provider),
                        borderRadius: '16px 16px 0 0',
                    },
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontFamily: '"TikTok Sans", sans-serif',
                                fontWeight: 700,
                                color: '#1A202C'
                            }}
                        >
                            {provider}
                        </Typography>
                        <Chip
                            label={`${requests.length} requests`}
                            size="small"
                            sx={{
                                backgroundColor: getProviderColor(provider),
                                color: 'white',
                                fontFamily: '"TikTok Sans", sans-serif',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                            }}
                        />
                    </Box>

                    <Typography 
                        variant="body2" 
                        sx={{ 
                            mb: 2,
                            color: '#4A5568',
                            fontFamily: '"TikTok Sans", sans-serif'
                        }}
                    >
                        CSR requests ready for dispatch
                    </Typography>

                    <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {requests.length > 0 ? requests.map(req => (
                            <motion.div
                                key={req.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ListItem 
                                    sx={{ 
                                        p: 1, 
                                        borderRadius: 2,
                                        mb: 1,
                                        backgroundColor: selected.includes(req.id) 
                                            ? `${getProviderColor(provider)}15` 
                                            : 'transparent',
                                        border: `1px solid ${selected.includes(req.id) 
                                            ? getProviderColor(provider) 
                                            : 'transparent'}`,
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selected.indexOf(req.id) !== -1}
                                                onChange={handleToggle(req.id)}
                                                sx={{ color: getProviderColor(provider) }}
                                            />
                                        }
                                        label={
                                            <Box>
                                                <Typography 
                                                    variant="body2" 
                                                    sx={{ 
                                                        fontFamily: '"TikTok Sans", sans-serif',
                                                        fontWeight: 500 
                                                    }}
                                                >
                                                    {req.mobile_number}
                                                </Typography>
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: '#4A5568',
                                                        fontFamily: '"TikTok Sans", sans-serif'
                                                    }}
                                                >
                                                    {req.station_id}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            </motion.div>
                        )) : (
                            <ListItem>
                                <ListItemText 
                                    primary="No pending requests" 
                                    sx={{ 
                                        textAlign: 'center',
                                        color: '#A0AEC0',
                                        fontFamily: '"TikTok Sans", sans-serif'
                                    }}
                                />
                            </ListItem>
                        )}
                    </List>
                </CardContent>

                <CardActions>
                    <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        style={{ width: '100%' }}
                    >
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<Send />}
                            onClick={handleSend}
                            disabled={selected.length === 0 || isSending}
                            sx={{
                                backgroundColor: getProviderColor(provider),
                                fontFamily: '"TikTok Sans", sans-serif',
                                fontWeight: 700,
                                textTransform: 'none',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: getProviderColor(provider),
                                    filter: 'brightness(0.9)',
                                },
                                '&:disabled': {
                                    backgroundColor: '#E2E8F0',
                                    color: '#A0AEC0',
                                },
                            }}
                        >
                            {isSending ? (
                                <>
                                    <CircularProgress size={20} sx={{ mr: 1 }} />
                                    Sending...
                                </>
                            ) : (
                                `Send to ${provider} (${selected.length})`
                            )}
                        </Button>
                    </motion.div>
                </CardActions>
            </Card>
        </motion.div>
    );
};

const CsrDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'success' });

    const groupedRequests = useMemo(() => {
        const pending = requests.filter(r => r.status === 'Request Received');
        return pending.reduce((acc, req) => {
            (acc[req.provider] = acc[req.provider] || []).push(req);
            return acc;
        }, {});
    }, [requests]);

    const stats = useMemo(() => {
        const total = requests.length;
        const pending = requests.filter(r => r.status === 'Request Received').length;
        const completed = requests.filter(r => r.status === 'Completed').length;
        const inProgress = requests.filter(r => r.status === 'Sent to Provider').length;
        
        return { total, pending, completed, inProgress };
    }, [requests]);

    const loadRequests = async () => {
        try {
            const data = await fetchRequests();
            setRequests(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch data. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
        const interval = setInterval(loadRequests, 20000);
        return () => clearInterval(interval);
    }, []);

    const handleSendToProvider = async (provider, requestIds) => {
        setAlertInfo({ show: false, message: '' });
        try {
            const response = await sendToProvider(requestIds);
            setAlertInfo({ show: true, message: response.message, severity: 'success' });
            loadRequests();
        } catch (err) {
            setAlertInfo({ show: true, message: `Error sending to ${provider}.`, severity: 'error' });
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        );
    }

    const providers = ['Jio', 'Airtel', 'VI', 'BSNL'];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <Box sx={{ width: '100%' }}>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            fontFamily: '"TikTok Sans", sans-serif',
                            fontWeight: 700,
                            color: '#1A202C',
                            mb: 1
                        }}
                    >
                        CSR Dashboard
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontFamily: '"TikTok Sans", sans-serif',
                            color: '#4A5568',
                            mb: 2
                        }}
                    >
                        Manage Customer Service Requests
                    </Typography>
                    
                    <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={loadRequests}
                        sx={{
                            fontFamily: '"TikTok Sans", sans-serif',
                            fontWeight: 700,
                            borderRadius: 2,
                        }}
                    >
                        Refresh Data
                    </Button>
                </Box>

                {/* Alert */}
                <AnimatePresence>
                    {alertInfo.show && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Alert 
                                severity={alertInfo.severity} 
                                onClose={() => setAlertInfo({ show: false, message: '' })} 
                                sx={{ mb: 2 }}
                            >
                                {alertInfo.message}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard 
                            title="Total Requests"
                            value={stats.total}
                            icon={<TrendingUp fontSize="large" />}
                            color="primary"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard 
                            title="Pending"
                            value={stats.pending}
                            icon={<Phone fontSize="large" />}
                            color="warning"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard 
                            title="In Progress"
                            value={stats.inProgress}
                            icon={<Send fontSize="large" />}
                            color="info"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard 
                            title="Completed"
                            value={stats.completed}
                            icon={<TrendingUp fontSize="large" />}
                            color="success"
                        />
                    </Grid>
                </Grid>

                {/* Provider Cards */}
                <Grid container spacing={3}>
                    {providers.map(provider => (
                        <Grid item xs={12} md={6} lg={3} key={provider}>
                            <ProviderCard
                                provider={provider}
                                requests={groupedRequests[provider] || []}
                                onSend={handleSendToProvider}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </motion.div>
    );
};

export default CsrDashboard;
