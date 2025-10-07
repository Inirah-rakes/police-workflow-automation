// Corrected Coimbatore Police Data Structure (Based on Actual Image)
export const policeRangesData = {
  ranges: [
    {
      id: 'north',
      name: 'North Range',
      color: '#1565C0',
      description: 'Northern areas of Coimbatore'
    },
    {
      id: 'south',
      name: 'South Range',
      color: '#2E7D32',
      description: 'Southern areas of Coimbatore'
    }
  ],
  
  stations: [
    // North Range Stations
    { id: 'E1', name: 'Singanallore Police Station', range: 'north', requests: 67, coordinates: [11.0168, 76.9558] },
    { id: 'E2', name: 'Peelamedu Police Station', range: 'north', requests: 45, coordinates: [11.0400, 76.9700] },
    { id: 'E3', name: 'Saravanampatti Police Station', range: 'north', requests: 58, coordinates: [11.0700, 77.0200] },
    { id: 'C1', name: 'Kattoor Police Station', range: 'north', requests: 42, coordinates: [11.0300, 76.9600] },
    { id: 'C2', name: 'Race Course Police Station', range: 'north', requests: 71, coordinates: [11.0041, 76.9794] },
    { id: 'C4', name: 'Rathinapuri Police Station', range: 'north', requests: 35, coordinates: [11.0200, 76.9800] },
    { id: 'C3', name: 'Saibaba Colony Police Station', range: 'north', requests: 48, coordinates: [11.0100, 76.9750] },
    { id: 'C5', name: 'Kavundampalayam Police Station', range: 'north', requests: 29, coordinates: [11.0250, 76.9650] },
    { id: 'C6', name: 'Thudiyalur Police Station', range: 'north', requests: 31, coordinates: [10.9700, 76.9300] },
    { id: 'B2', name: 'R.S Puram Police Station', range: 'north', requests: 54, coordinates: [11.0000, 76.9600] },
    { id: 'B5', name: 'Vadavalli Police Station', range: 'north', requests: 38, coordinates: [10.9600, 76.9400] },
    { id: 'D1', name: 'Ramanathapuram Police Station', range: 'north', requests: 33, coordinates: [11.0150, 76.9900] },
    { id: 'D3', name: 'Pothanur Police Station', range: 'north', requests: 27, coordinates: [11.0050, 76.9850] },
    { id: 'D5', name: 'Sundarapuram Police Station', range: 'north', requests: 24, coordinates: [11.0080, 76.9750] },
    { id: 'D2', name: 'Selvapuram Police Station', range: 'north', requests: 36, coordinates: [11.0400, 77.0300] },
    { id: 'D4', name: 'Kuniyamuthur Police Station', range: 'north', requests: 41, coordinates: [10.9700, 76.9200] },
    { id: 'D6', name: 'Karumbukaddai Police Station', range: 'north', requests: 19, coordinates: [10.9800, 76.9100] },
    
    // South Range Stations
    { id: 'B1', name: 'Bazaar Police Station', range: 'south', requests: 89, coordinates: [11.0000, 76.9800] },
    { id: 'B3', name: 'V.H Road Police Station', range: 'south', requests: 64, coordinates: [10.9950, 76.9750] },
    { id: 'B4', name: 'Ukkadam Police Station', range: 'south', requests: 52, coordinates: [10.9900, 76.9850] },
    
    // Additional South Range Stations (based on typical police station distribution)
    { id: 'S1', name: 'Gandhipuram Police Station', range: 'south', requests: 78, coordinates: [11.0168, 76.9558] },
    { id: 'S2', name: 'Railway Station Police Station', range: 'south', requests: 65, coordinates: [11.0100, 76.9900] },
    { id: 'S3', name: 'Coimbatore South Police Station', range: 'south', requests: 43, coordinates: [10.9900, 76.9700] },
    { id: 'S4', name: 'Hopes College Police Station', range: 'south', requests: 37, coordinates: [10.9800, 76.9700] },
    { id: 'S5', name: 'Singanallur South Police Station', range: 'south', requests: 41, coordinates: [10.9900, 76.9600] },
    { id: 'S6', name: 'Coimbatore Medical College Police Station', range: 'south', requests: 28, coordinates: [11.0500, 76.9650] },
    { id: 'S7', name: 'Variety Hall Police Station', range: 'south', requests: 22, coordinates: [11.0200, 76.9500] },
    { id: 'S8', name: 'Red Fields Police Station', range: 'south', requests: 26, coordinates: [11.0300, 76.9600] },
    { id: 'S9', name: 'Sulur Police Station', range: 'south', requests: 18, coordinates: [11.0200, 76.9100] },
    { id: 'S10', name: 'Madukkarai Police Station', range: 'south', requests: 15, coordinates: [10.9500, 76.9000] },
    { id: 'S11', name: 'Kinathukadavu Police Station', range: 'south', requests: 13, coordinates: [10.8800, 76.9300] },
    { id: 'S12', name: 'Pollachi Police Station', range: 'south', requests: 47, coordinates: [10.6581, 77.0088] },
    { id: 'S13', name: 'Kalapatti Police Station', range: 'south', requests: 34, coordinates: [11.0500, 77.0100] },
    { id: 'S14', name: 'Ganapathy Police Station', range: 'south', requests: 39, coordinates: [11.0600, 77.0000] },
    { id: 'S15', name: 'Neelambur Police Station', range: 'south', requests: 21, coordinates: [11.0300, 77.0400] }
  ]
};

// Updated mock analytics generation function
export const generateAnalyticsData = (selectedRanges, dateRange) => {
  const { stations, ranges } = policeRangesData;
  
  const filteredStations = selectedRanges.length === 0 
    ? stations 
    : stations.filter(station => selectedRanges.includes(station.range));
  
  const totalRequests = filteredStations.reduce((sum, station) => sum + station.requests, 0);
  const completedRequests = Math.floor(totalRequests * 0.74);
  const pendingRequests = totalRequests - completedRequests;
  
  // Generate daily trends
  const dailyTrends = [];
  const days = Math.floor((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i <= days; i++) {
    const date = new Date(dateRange.start);
    date.setDate(date.getDate() + i);
    dailyTrends.push({
      date: date.toISOString().split('T')[0],
      requests: Math.floor(Math.random() * 25) + 10,
      completed: Math.floor(Math.random() * 18) + 8
    });
  }
  
  // Range-wise distribution (only North and South)
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
    .slice(0, 15)
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
    averageResponseTime: '2.1 hrs',
    completionRate: Math.floor((completedRequests / totalRequests) * 100)
  };
};

// Database integration ready function
export const fetchAnalyticsFromDB = async (selectedRanges, dateRange) => {
  try {
    // Future database integration point
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
