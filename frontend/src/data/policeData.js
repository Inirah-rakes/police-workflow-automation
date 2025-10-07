// Coimbatore Police Data (Exact Names from Uploaded Image)
export const policeStationsData = [
  // North Range
  { id: 'E1', name: 'Singanallur', requests: 67, coordinates: [11.0168, 76.9558] },
  { id: 'E2', name: 'Peelamedu', requests: 45, coordinates: [11.0400, 76.9700] },
  { id: 'E3', name: 'Saravanampatti', requests: 58, coordinates: [11.0700, 77.0200] },
  { id: 'C1', name: 'Kattor', requests: 42, coordinates: [11.0300, 76.9600] },
  { id: 'C2', name: 'Race Course', requests: 71, coordinates: [11.0041, 76.9794] },
  { id: 'C3', name: 'Saibaba Colony', requests: 48, coordinates: [11.0100, 76.9750] },
  { id: 'C5', name: 'Thudiyalur', requests: 29, coordinates: [10.9700, 76.9300] },
  { id: 'C6', name: 'Kavundampalayam', requests: 31, coordinates: [11.0250, 76.9650] },
  { id: 'B2', name: 'R S Puram', requests: 54, coordinates: [11.0000, 76.9600] },
  { id: 'B5', name: 'Vadavalli', requests: 38, coordinates: [10.9600, 76.9400] },
  
  // South Range
  { id: 'D1', name: 'Ramanathapuram', requests: 33, coordinates: [11.0150, 76.9900] },
  { id: 'D3', name: 'Pothanur', requests: 27, coordinates: [11.0050, 76.9850] },
  { id: 'D5', name: 'Sundarapuram', requests: 24, coordinates: [11.0080, 76.9750] },
  { id: 'D2', name: 'Selvapuram', requests: 36, coordinates: [11.0400, 77.0300] },
  { id: 'D4', name: 'Kuniyamuthur', requests: 41, coordinates: [10.9700, 76.9200] },
  { id: 'D6', name: 'Karumbukadai', requests: 19, coordinates: [10.9800, 76.9100] },
  { id: 'B1', name: 'Bazaar', requests: 89, coordinates: [11.0000, 76.9800] },
  { id: 'B3', name: 'V H Road', requests: 64, coordinates: [10.9950, 76.9750] },
  { id: 'B4', name: 'Ukkadam', requests: 52, coordinates: [10.9900, 76.9850] }
];

// Generates analytics data. Real implementation should replace this.
export function generateAnalyticsData(selectedStations, dateRange) {
  const filtered = selectedStations.length === 0
    ? policeStationsData
    : policeStationsData.filter(st => selectedStations.includes(st.name));
  const total = filtered.reduce((sum, st) => sum + st.requests, 0);
  const completed = Math.floor(total * 0.72);
  const pending = total - completed;

  // Dummy daily trend data
  const days = Math.floor((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24));
  const dailyTrends = [];
  for (let i = 0; i <= days; i++) {
    const date = new Date(dateRange.start);
    date.setDate(date.getDate() + i);
    dailyTrends.push({
      date: date.toISOString().split('T')[0],
      requests: Math.floor(Math.random() * 25) + 10,
      completed: Math.floor(Math.random() * 18) + 8
    });
  }

  // Provider distribution (real names)
  const providerDistribution = [
    { provider: 'Jio', requests: Math.floor(total * 0.35), color: '#1565C0' },
    { provider: 'Airtel', requests: Math.floor(total * 0.28), color: '#2E7D32' },
    { provider: 'VI', requests: Math.floor(total * 0.22), color: '#F57C00' },
    { provider: 'BSNL', requests: Math.floor(total * 0.15), color: '#7B1FA2' }
  ];

  // Top performing stations (names only)
  const topStations = filtered
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 10)
    .map(station => ({
      station: station.name,
      requests: station.requests
    }));

  return {
    totalRequests: total,
    completedRequests: completed,
    pendingRequests: pending,
    activeStations: filtered.length,
    dailyTrends,
    providerDistribution,
    topStations,
    averageResponseTime: '2.1 hrs',
    completionRate: Math.floor((completed / total) * 100)
  };
};

// Database integration ready function
export const fetchAnalyticsFromDB = async (selectedStations, dateRange) => {
  try {
    // Future database integration point
    // const response = await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ stations: selectedStations, dateRange })
    // });
    // return await response.json();
    
    // For now, return mock data
    return generateAnalyticsData(selectedStations, dateRange);
  } catch (error) {
    console.error('Database fetch error:', error);
    return generateAnalyticsData(selectedStations, dateRange);
  }
};
