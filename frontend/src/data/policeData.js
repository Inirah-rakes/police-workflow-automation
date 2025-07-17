// Coimbatore Police Data Structure (7 Ranges, 35 Stations)
export const policeRangesData = {
  ranges: [
    {
      id: 'north',
      name: 'North Range',
      color: '#1565C0',
      description: 'Covers northern areas of Coimbatore'
    },
    {
      id: 'south',
      name: 'South Range',
      color: '#2E7D32',
      description: 'Covers southern areas of Coimbatore'
    },
    {
      id: 'central',
      name: 'Central Range',
      color: '#F57C00',
      description: 'Covers central business district'
    },
    {
      id: 'west',
      name: 'West Range',
      color: '#7B1FA2',
      description: 'Covers western suburbs'
    },
    {
      id: 'east',
      name: 'East Range',
      color: '#C62828',
      description: 'Covers eastern industrial areas'
    },
    {
      id: 'traffic',
      name: 'Traffic Range',
      color: '#FF6B35',
      description: 'Traffic management across city'
    },
    {
      id: 'special',
      name: 'Special Range',
      color: '#37474F',
      description: 'Specialized crime units'
    }
  ],
  
  stations: [
    // North Range Stations (5 stations)
    { id: 'N1', name: 'Peelamedu Police Station', range: 'north', requests: 45, coordinates: [11.0400, 76.9700] },
    { id: 'N2', name: 'Gandhipuram Police Station', range: 'north', requests: 67, coordinates: [11.0168, 76.9558] },
    { id: 'N3', name: 'Red Fields Police Station', range: 'north', requests: 32, coordinates: [11.0300, 76.9600] },
    { id: 'N4', name: 'Coimbatore Medical College Police Station', range: 'north', requests: 28, coordinates: [11.0500, 76.9650] },
    { id: 'N5', name: 'Variety Hall Police Station', range: 'north', requests: 19, coordinates: [11.0200, 76.9500] },
    
    // South Range Stations (5 stations)
    { id: 'S1', name: 'Singanallur Police Station', range: 'south', requests: 52, coordinates: [10.9926, 76.9616] },
    { id: 'S2', name: 'Hopes College Police Station', range: 'south', requests: 41, coordinates: [10.9800, 76.9700] },
    { id: 'S3', name: 'Vadavalli Police Station', range: 'south', requests: 38, coordinates: [10.9600, 76.9400] },
    { id: 'S4', name: 'Thudiyalur Police Station', range: 'south', requests: 29, coordinates: [10.9700, 76.9300] },
    { id: 'S5', name: 'Saravanampatty Police Station', range: 'south', requests: 33, coordinates: [10.9900, 76.9500] },
    
    // Central Range Stations (5 stations)
    { id: 'C1', name: 'Race Course Police Station', range: 'central', requests: 71, coordinates: [11.0041, 76.9794] },
    { id: 'C2', name: 'Coimbatore Town Police Station', range: 'central', requests: 89, coordinates: [11.0000, 76.9800] },
    { id: 'C3', name: 'Bazaar Street Police Station', range: 'central', requests: 64, coordinates: [10.9950, 76.9750] },
    { id: 'C4', name: 'Railway Station Police Station', range: 'central', requests: 55, coordinates: [11.0100, 76.9900] },
    { id: 'C5', name: 'Ukkadam Police Station', range: 'central', requests: 42, coordinates: [10.9900, 76.9850] },
    
    // West Range Stations (5 stations)
    { id: 'W1', name: 'Kuniyamuthur Police Station', range: 'west', requests: 36, coordinates: [10.9700, 76.9200] },
    { id: 'W2', name: 'Sulur Police Station', range: 'west', requests: 24, coordinates: [11.0200, 76.9100] },
    { id: 'W3', name: 'Madukkarai Police Station', range: 'west', requests: 18, coordinates: [10.9500, 76.9000] },
    { id: 'W4', name: 'Kinathukadavu Police Station', range: 'west', requests: 15, coordinates: [10.8800, 76.9300] },
    { id: 'W5', name: 'Pollachi Police Station', range: 'west', requests: 47, coordinates: [10.6581, 77.0088] },
    
    // East Range Stations (5 stations)
    { id: 'E1', name: 'Saravanampatti Police Station', range: 'east', requests: 58, coordinates: [11.0700, 77.0200] },
    { id: 'E2', name: 'Kalapatti Police Station', range: 'east', requests: 34, coordinates: [11.0500, 77.0100] },
    { id: 'E3', name: 'Ganapathy Police Station', range: 'east', requests: 41, coordinates: [11.0600, 77.0000] },
    { id: 'E4', name: 'Selvapuram Police Station', range: 'east', requests: 27, coordinates: [11.0400, 77.0300] },
    { id: 'E5', name: 'Neelambur Police Station', range: 'east', requests: 22, coordinates: [11.0300, 77.0400] },
    
    // Traffic Range Stations (5 stations)
    { id: 'T1', name: 'Gandhipuram Traffic Police Station', range: 'traffic', requests: 95, coordinates: [11.0168, 76.9558] },
    { id: 'T2', name: 'Avinashi Road Traffic Police Station', range: 'traffic', requests: 78, coordinates: [11.0300, 76.9400] },
    { id: 'T3', name: 'Sathy Road Traffic Police Station', range: 'traffic', requests: 63, coordinates: [11.0100, 76.9600] },
    { id: 'T4', name: 'Mettupalayam Road Traffic Police Station', range: 'traffic', requests: 56, coordinates: [11.0400, 76.9800] },
    { id: 'T5', name: 'Trichy Road Traffic Police Station', range: 'traffic', requests: 72, coordinates: [10.9800, 76.9900] },
    
    // Special Range Stations (5 stations)
    { id: 'SP1', name: 'All Women Police Station', range: 'special', requests: 31, coordinates: [11.0041, 76.9794] },
    { id: 'SP2', name: 'Cyber Crime Police Station', range: 'special', requests: 19, coordinates: [11.0100, 76.9750] },
    { id: 'SP3', name: 'Economic Offences Police Station', range: 'special', requests: 14, coordinates: [11.0000, 76.9850] },
    { id: 'SP4', name: 'CB-CID Police Station', range: 'special', requests: 8, coordinates: [11.0150, 76.9700] },
    { id: 'SP5', name: 'Prohibition Enforcement Police Station', range: 'special', requests: 12, coordinates: [10.9950, 76.9800] }
  ]
};

// Mock API function to generate analytics data
export const generateAnalyticsData = (selectedRanges, dateRange) => {
  const { stations, ranges } = policeRangesData;
  
  const filteredStations = selectedRanges.length === 0 
    ? stations 
    : stations.filter(station => selectedRanges.includes(station.range));
  
  const totalRequests = filteredStations.reduce((sum, station) => sum + station.requests, 0);
  const completedRequests = Math.floor(totalRequests * 0.72);
  const pendingRequests = totalRequests - completedRequests;
  
  // Generate daily trends
  const dailyTrends = [];
  const days = Math.floor((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i <= days; i++) {
    const date = new Date(dateRange.start);
    date.setDate(date.getDate() + i);
    dailyTrends.push({
      date: date.toISOString().split('T')[0],
      requests: Math.floor(Math.random() * 15) + 5,
      completed: Math.floor(Math.random() * 12) + 3
    });
  }
  
  // Range-wise distribution
  const rangeDistribution = selectedRanges.length === 0 
    ? ranges.map(range => {
        const rangeStations = stations.filter(s => s.range === range.id);
        return {
          range: range.name,
          requests: rangeStations.reduce((sum, s) => sum + s.requests, 0),
          stations: rangeStations.length,
          color: range.color
        };
      })
    : selectedRanges.map(rangeId => {
        const range = ranges.find(r => r.id === rangeId);
        const rangeStations = stations.filter(s => s.range === rangeId);
        return {
          range: range.name,
          requests: rangeStations.reduce((sum, s) => sum + s.requests, 0),
          stations: rangeStations.length,
          color: range.color
        };
      });
  
  // Top performing stations
  const topStations = filteredStations
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 10)
    .map(station => ({
      station: station.name,
      stationId: station.id,
      requests: station.requests,
      range: ranges.find(r => r.id === station.range)?.name,
      rangeColor: ranges.find(r => r.id === station.range)?.color
    }));
  
  // Provider distribution (mock data)
  const providerDistribution = [
    { provider: 'Jio', requests: Math.floor(totalRequests * 0.35), color: '#1565C0' },
    { provider: 'Airtel', requests: Math.floor(totalRequests * 0.28), color: '#2E7D32' },
    { provider: 'VI', requests: Math.floor(totalRequests * 0.22), color: '#F57C00' },
    { provider: 'BSNL', requests: Math.floor(totalRequests * 0.15), color: '#7B1FA2' }
  ];
  
  return {
    totalRequests,
    completedRequests,
    pendingRequests,
    activeRanges: selectedRanges.length || ranges.length,
    dailyTrends,
    rangeDistribution,
    topStations,
    providerDistribution,
    averageResponseTime: '2.3 hrs',
    completionRate: Math.floor((completedRequests / totalRequests) * 100)
  };
};

// Database integration ready function
export const fetchAnalyticsFromDB = async (selectedRanges, dateRange) => {
  // This function is ready for database integration
  // Replace the mock data generation with actual API calls
  
  try {
    // Future API call structure:
    // const response = await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ranges: selectedRanges, dateRange })
    // });
    // return await response.json();
    
    // For now, return mock data
    return generateAnalyticsData(selectedRanges, dateRange);
  } catch (error) {
    console.error('Database fetch error:', error);
    return generateAnalyticsData(selectedRanges, dateRange);
  }
};
