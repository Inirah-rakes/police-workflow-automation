import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { fetchAnalyticsData } from '../api/CsrAPI';

const providerColors = {
    'Jio': '#00A9E0', 'Airtel': '#E40000', 'VI': '#EE3388', 'BSNL': '#003366', 'Unknown': '#808080'
};

const KPICard = ({ title, value, loading }) => (
    <Card sx={{ textAlign: 'center' }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{title}</Typography>
            <Typography variant="h4" component="div">
                {loading ? <CircularProgress size={24} /> : value}
            </Typography>
        </CardContent>
    </Card>
);

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const analyticsData = await fetchAnalyticsData();
                setData(analyticsData);
                setError(null);
            } catch (err) {
                setError('Failed to load analytics data.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

    const dailyTrendsFormatted = data.daily_trends.map(d => ({
        date: new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        count: d.count
    }));

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Typography variant="h4" gutterBottom>Analytics Dashboard</Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}><KPICard title="Total Requests" value={data.kpi.total_requests} loading={loading} /></Grid>
                <Grid item xs={12} sm={6} md={3}><KPICard title="Sent to Provider" value={data.kpi.sent_to_provider} loading={loading} /></Grid>
                <Grid item xs={12} sm={6} md={3}><KPICard title="Response Received" value={data.kpi.response_received} loading={loading} /></Grid>
                <Grid item xs={12} sm={6} md={3}><KPICard title="Completed" value={data.kpi.completed} loading={loading} /></Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <Card><CardContent>
                        <Typography variant="h6">Daily Request Trends</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={dailyTrendsFormatted}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" name="Requests" stroke="#003366" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent></Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card><CardContent>
                        <Typography variant="h6">Provider Distribution</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={data.provider_distribution} dataKey="count" nameKey="provider" cx="50%" cy="50%" outerRadius={100} label>
                                    {data.provider_distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={providerColors[entry.provider]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent></Card>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Card><CardContent>
                        <Typography variant="h6">Top 5 Requesting Stations</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.top_stations}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="police_station_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" name="No. of Requests" fill="#003366" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent></Card>
                </Grid>
            </Grid>
        </motion.div>
    );
};

export default Analytics;
