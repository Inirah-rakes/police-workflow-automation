import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, CircularProgress, TextField, Grid, Button, Chip, Stepper, Step, StepLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchRequests } from '../api/CsrAPI';

const StatusTracker = () => {
    const [allRequests, setAllRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRequests = useMemo(() => {
        if (!searchTerm) return allRequests;
        return allRequests.filter(req => 
            (req.reference_id && req.reference_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (req.mobile_number && req.mobile_number.includes(searchTerm)) ||
            (req.police_station_name && req.police_station_name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [allRequests, searchTerm]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const loadRequests = async () => {
            try {
                const data = await fetchRequests();
                setAllRequests(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch data. Is the backend running?');
            } finally {
                setLoading(false);
            }
        };
        loadRequests();
    }, []);

    const getStatusChip = (status) => {
        let color = 'default';
        if (status === 'Request Received') color = 'info';
        if (status === 'Sent to Provider') color = 'warning';
        if (status === 'Response Received') color = 'primary';
        if (status === 'Completed') color = 'success';
        return <Chip label={status} color={color} size="small" />;
    };

    const getActiveStep = (request) => {
        if (request.status === 'Completed') return 4;
        if (request.status === 'Response Received') return 3;
        if (request.status === 'Sent to Provider') return 2;
        if (request.status === 'Request Received') return 1;
        return 0;
    };

    const steps = ['Initiated', 'Sent to Provider', 'Response Received', 'Completed'];

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Typography variant="h4" gutterBottom>Request Status Tracker</Typography>
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={9}>
                        <TextField 
                            fullWidth 
                            label="Search by Reference ID, Mobile Number, or Station Name" 
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button fullWidth variant="contained" onClick={() => setSearchTerm('')}>Clear Search</Button>
                    </Grid>
                </Grid>
            </Paper>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Reference ID</TableCell>
                                <TableCell>Mobile Number</TableCell>
                                <TableCell>Station</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell sx={{minWidth: 400}}>Timeline</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell>{req.reference_id}</TableCell>
                                    <TableCell>{req.mobile_number}</TableCell>
                                    <TableCell>{req.police_station_name}</TableCell>
                                    <TableCell>{getStatusChip(req.status)}</TableCell>
                                    <TableCell>
                                        <Stepper activeStep={getActiveStep(req)} alternativeLabel>
                                            {steps.map((label) => (
                                                <Step key={label}>
                                                    <StepLabel>{label}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    component="div"
                    count={filteredRequests.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </motion.div>
    );
};

export default StatusTracker;

