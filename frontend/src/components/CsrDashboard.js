import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, Paper, Grid, Card, CardContent, CardActions, List, ListItem, ListItemText, CircularProgress, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchRequests, sendToProvider } from '../api/CsrAPI';

const providerColors = {
    'Jio': '#00A9E0', 'Airtel': '#E40000', 'VI': '#EE3388', 'BSNL': '#003366', 'Unknown': '#808080'
};

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
        setSelected([]); // Clear selection after sending
    };

    return (
        <Card sx={{ minWidth: 275, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" sx={{ color: providerColors[provider], fontWeight: 'bold' }}>
                    {provider}
                    <Typography component="span" sx={{ ml: 1, color: 'text.secondary', fontSize: '1rem' }}>
                        {requests.length} pending
                    </Typography>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    CSR requests ready for dispatch
                </Typography>
                <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
                    <List dense>
                        {requests.length > 0 ? requests.map(req => (
                            <ListItem key={req.id} disablePadding>
                                <FormControlLabel
                                    sx={{ width: '100%', ml: 0 }}
                                    control={
                                        <Checkbox
                                            edge="start"
                                            onChange={handleToggle(req.id)}
                                            checked={selected.indexOf(req.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    }
                                    label={`${req.mobile_number} (${req.station_id})`}
                                />
                            </ListItem>
                        )) : (
                            <ListItem><ListItemText primary="No pending requests." /></ListItem>
                        )}
                    </List>
                </Paper>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                <Button 
                    fullWidth
                    variant="contained" 
                    sx={{ backgroundColor: providerColors[provider], '&:hover': {backgroundColor: providerColors[provider], opacity: 0.9} }}
                    onClick={handleSend}
                    disabled={selected.length === 0 || isSending}
                >
                    {isSending ? <CircularProgress size={24} color="inherit" /> : `Send to ${provider} (${selected.length})`}
                </Button>
            </CardActions>
        </Card>
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
            loadRequests(); // Refresh the data
        } catch (err) {
            setAlertInfo({ show: true, message: `Error sending to ${provider}.`, severity: 'error' });
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

    const providers = ['Jio', 'Airtel', 'VI', 'BSNL'];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Typography variant="h4" gutterBottom>CSR Dashboard</Typography>
            <Typography variant="body1" sx={{mb: 2}}>Manage Customer Service Requests</Typography>
            {alertInfo.show && <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ show: false, message: '' })} sx={{ mb: 2 }}>{alertInfo.message}</Alert>}
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
        </motion.div>
    );
};

export default CsrDashboard;

