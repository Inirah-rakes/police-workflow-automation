import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchRequests, forwardToStation } from '../api/CsrAPI';

const ResponseHandler = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendingState, setSendingState] = useState({});
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'success' });

    const loadRequests = async () => {
        try {
            const data = await fetchRequests();
            setRequests(data.filter(r => r.status === 'Response Received'));
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

    const handleForward = async (requestId) => {
        setSendingState(prev => ({ ...prev, [requestId]: true }));
        setAlertInfo({ show: false, message: '' });
        try {
            const response = await forwardToStation(requestId);
            setAlertInfo({ show: true, message: response.message, severity: 'success' });
            loadRequests();
        } catch (err) {
            setAlertInfo({ show: true, message: `Error forwarding request ${requestId}.`, severity: 'error' });
        } finally {
            setSendingState(prev => ({ ...prev, [requestId]: false }));
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Typography variant="h4" gutterBottom>Response Handler</Typography>
            <Typography variant="body1" sx={{mb: 2}}>Review provider responses and forward them to the originating police station.</Typography>
            {alertInfo.show && <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ show: false, message: '' })} sx={{ mb: 2 }}>{alertInfo.message}</Alert>}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Reference ID</TableCell>
                                <TableCell>Mobile Number</TableCell>
                                <TableCell>Provider</TableCell>
                                <TableCell>Police Station</TableCell>
                                <TableCell>Received</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.length > 0 ? requests.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.reference_id}</TableCell>
                                    <TableCell>{row.mobile_number}</TableCell>
                                    <TableCell>{row.provider}</TableCell>
                                    <TableCell>{row.police_station_name} ({row.station_id})</TableCell>
                                    <TableCell>{new Date(row.response_received_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            size="small"
                                            onClick={() => handleForward(row.id)}
                                            disabled={sendingState[row.id]}
                                        >
                                            {sendingState[row.id] ? <CircularProgress size={24} /> : 'Forward'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">No responses pending review.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </motion.div>
    );
};

export default ResponseHandler;


