import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CircularProgress, 
  Button,
  Chip,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Alert
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Refresh, 
  LocationOn, 
  Timeline, 
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Map as MapIcon,
  DateRange,
  Analytics as AnalyticsIcon,
  TrendingUp,
  Security,
  Assessment,
  FilterList
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import { policeRangesData, fetchAnalyticsFromDB } from '../data/policeData';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

// Professional KPI Card Component
const KPICard = ({ title, value, icon, color = '#1565C0', subtitle = '' }) => (
  <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
    <Card 
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box sx={{ opacity: 0.9 }}>
            {icon}
          </Box>
        </Box>
        <Typography 
          variant="h3" 
          sx={{ 
            fontFamily: '"TikTok Sans", sans-serif',
            fontWeight: 700,
            mb: 1,
            fontSize: '2.5rem'
          }}
        >
          {value}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"TikTok Sans", sans-serif',
            fontWeight: 500,
            opacity: 0.9,
            fontSize: '1rem'
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.8,
              fontSize: '0.8rem',
              mt: 0.5
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

// Range Filter Component
const RangeFilter = ({ selectedRanges, onRangeChange, onSelectAll, onClearAll }) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 3, 
      mb: 3,
      background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
      border: '1px solid #e2e8f0'
    }}
  >
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Box display="flex" alignItems="center">
        <FilterList sx={{ mr: 1, color: '#1565C0' }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"TikTok Sans", sans-serif',
            fontWeight: 700,
            color: '#1A202C'
          }}
        >
          Range Filter
        </Typography>
      </Box>
      <Box>
        <Button 
          size="small" 
          onClick={onSelectAll}
          sx={{ 
            mr: 1,
            fontFamily: '"TikTok Sans", sans-serif',
            fontWeight: 600
          }}
        >
          Select All
        </Button>
        <Button 
          size="small" 
          onClick={onClearAll}
          sx={{ 
            fontFamily: '"TikTok Sans", sans-serif',
            fontWeight: 600
          }}
        >
          Clear All
        </Button>
      </Box>
    </Box>
    
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {policeRangesData.ranges.map((range) => (
        <Chip
          key={range.id}
          label={range.name}
          onClick={() => onRangeChange(range.id)}
          variant={selectedRanges.includes(range.id) ? 'filled' : 'outlined'}
          sx={{
            fontFamily: '"TikTok Sans", sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            mb: 1,
            backgroundColor: selectedRanges.includes(range.id) ? range.color : 'transparent',
            borderColor: range.color,
            color: selectedRanges.includes(range.id) ? 'white' : range.color,
            '&:hover': {
              backgroundColor: range.color,
              color: 'white'
            }
          }}
        />
      ))}
    </Stack>
  </Paper>
);

// Police Stations Table Component
const StationsTable = ({ stations, title }) => (
  <TableContainer component={Paper} elevation={2}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#1565C0' }}>
          <TableCell sx={{ color: 'white', fontWeight: 700, fontFamily: '"TikTok Sans", sans-serif' }}>
            Station ID
          </TableCell>
          <TableCell sx={{ color: 'white', fontWeight: 700, fontFamily: '"TikTok Sans", sans-serif' }}>
            Station Name
          </TableCell>
          <TableCell sx={{ color: 'white', fontWeight: 700, fontFamily: '"TikTok Sans", sans-serif' }}>
            Range
          </TableCell>
          <TableCell sx={{ color: 'white', fontWeight: 700, fontFamily: '"TikTok Sans", sans-serif' }}>
            Requests
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stations.map((station) => (
          <TableRow 
            key={station.stationId}
            sx={{ 
              '&:hover': { backgroundColor: '#f8fafc' },
              transition: 'background-color 0.2s ease'
            }}
          >
            <TableCell sx={{ fontFamily: '"TikTok Sans", sans-serif', fontWeight: 600 }}>
              {station.stationId}
            </TableCell>
            <TableCell sx={{ fontFamily: '"TikTok Sans", sans-serif' }}>
              {station.station}
            </TableCell>
            <TableCell>
              <Chip 
                label={station.range}
                size="small"
                sx={{
                  backgroundColor: station.rangeColor,
                  color: 'white',
                  fontFamily: '"TikTok Sans", sans-serif',
                  fontWeight: 600
                }}
              />
            </TableCell>
            <TableCell sx={{ fontFamily: '"TikTok Sans", sans-serif', fontWeight: 600 }}>
              {station.requests}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// Chart Container Component
const ChartContainer = ({ title, icon, children }) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 3,
      height: '100%',
      background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
      border: '1px solid #e2e8f0'
    }}
  >
    <Box display="flex" alignItems="center" mb={3}>
      {icon}
      <Typography 
        variant="h6" 
        sx={{ 
          ml: 1,
          fontFamily: '"TikTok Sans", sans-serif',
          fontWeight: 700,
          color: '#1A202C'
        }}
      >
        {title}
      </Typography>
    </Box>
    {children}
  </Paper>
);

// Main Analytics Component
const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await fetchAnalyticsFromDB(selectedRanges, dateRange);
      setAnalyticsData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [selectedRanges, dateRange]);

  const handleRangeChange = (rangeId) => {
    setSelectedRanges(prev => 
      prev.includes(rangeId)
        ? prev.filter(id => id !== rangeId)
        : [...prev, rangeId]
    );
  };

  const handleSelectAll = () => {
    setSelectedRanges(policeRangesData.ranges.map(r => r.id));
  };

  const handleClearAll = () => {
    setSelectedRanges([]);
  };

  const formatTrendData = useMemo(() => {
    if (!analyticsData?.dailyTrends) return [];
    return analyticsData.dailyTrends.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      }),
      requests: item.requests,
      completed: item.completed
    }));
  }, [analyticsData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Box sx={{ p: 3 }}>
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
            Police Analytics Dashboard
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: '"TikTok Sans", sans-serif',
              color: '#4A5568',
              mb: 3
            }}
          >
            Comprehensive overview of CSR requests across Coimbatore police stations
          </Typography>

          {/* Date Range Controls */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              label="Start Date"
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              InputLabelProps={{ shrink: true }}
              size="small"
              sx={{
                '& .MuiInputBase-root': {
                  fontFamily: '"TikTok Sans", sans-serif'
                }
              }}
            />
            <TextField
              label="End Date"
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              InputLabelProps={{ shrink: true }}
              size="small"
              sx={{
                '& .MuiInputBase-root': {
                  fontFamily: '"TikTok Sans", sans-serif'
                }
              }}
            />
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={loadAnalytics}
              sx={{
                fontFamily: '"TikTok Sans", sans-serif',
                fontWeight: 700
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Range Filter */}
        <RangeFilter
          selectedRanges={selectedRanges}
          onRangeChange={handleRangeChange}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
        />

        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Total Requests"
              value={analyticsData?.totalRequests || 0}
              icon={<AnalyticsIcon fontSize="large" />}
              color="#1565C0"
              subtitle="All time requests"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Completed"
              value={analyticsData?.completedRequests || 0}
              icon={<TrendingUp fontSize="large" />}
              color="#2E7D32"
              subtitle={`${analyticsData?.completionRate || 0}% completion rate`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Pending"
              value={analyticsData?.pendingRequests || 0}
              icon={<Assessment fontSize="large" />}
              color="#F57C00"
              subtitle="Awaiting response"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              title="Active Ranges"
              value={analyticsData?.activeRanges || 0}
              icon={<Security fontSize="large" />}
              color="#7B1FA2"
              subtitle="Out of 7 total ranges"
            />
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Daily Trends Chart */}
          <Grid item xs={12} lg={8}>
            <ChartContainer
              title="Daily Request Trends"
              icon={<Timeline sx={{ color: '#1565C0' }} />}
            >
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={formatTrendData}>
                  <defs>
                    <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1565C0" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1565C0" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#4A5568', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#4A5568', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#1565C0" 
                    fill="url(#requestsGradient)"
                    name="Requests"
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#2E7D32" 
                    fill="url(#completedGradient)"
                    name="Completed"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Grid>

          {/* Provider Distribution */}
          <Grid item xs={12} lg={4}>
            <ChartContainer
              title="Provider Distribution"
              icon={<PieChartIcon sx={{ color: '#1565C0' }} />}
            >
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={analyticsData?.providerDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="requests"
                  >
                    {(analyticsData?.providerDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Grid>
        </Grid>

        {/* Range Distribution Chart */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <ChartContainer
              title="Range-wise Request Distribution"
              icon={<BarChartIcon sx={{ color: '#1565C0' }} />}
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData?.rangeDistribution || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="range" 
                    tick={{ fill: '#4A5568', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#4A5568', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="requests" 
                    fill="#1565C0"
                    name="Requests"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Grid>
        </Grid>

        {/* Top Performing Stations Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: '"TikTok Sans", sans-serif',
                  fontWeight: 700,
                  color: '#1A202C',
                  mb: 3
                }}
              >
                Top Performing Police Stations
              </Typography>
              <StationsTable stations={analyticsData?.topStations || []} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Analytics;
