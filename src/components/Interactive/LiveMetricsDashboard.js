import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  padding: 30px;
  margin: 40px 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.background1};
  border-radius: 15px;
  padding: 20px;
  border: 2px solid ${({ theme, status }) => {
    switch(status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return theme.colors.accent1 + '33';
    }
  }};
  transition: all 0.3s ease;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme, status }) => {
    switch(status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return theme.colors.accent1;
    }
  }};
  margin-bottom: 5px;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text}aa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ status }) => {
    switch(status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  }};
  animation: ${({ status }) => status === 'healthy' ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ChartContainer = styled.div`
  height: 200px;
  background: ${({ theme }) => theme.colors.background1};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: end;
  gap: 3px;
  overflow: hidden;
`;

const ChartBar = styled.div`
  width: 8px;
  background: linear-gradient(to top, ${({ theme }) => theme.colors.accent1}, ${({ theme }) => theme.colors.button});
  border-radius: 2px;
  height: ${({ height }) => height}%;
  transition: height 0.5s ease;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const LiveMetricsDashboard = () => {
  const [metrics, setMetrics] = useState({
    uptime: { value: '99.9%', status: 'healthy' },
    requests: { value: '1.2M', status: 'healthy' },
    responseTime: { value: '45ms', status: 'healthy' },
    errorRate: { value: '0.01%', status: 'healthy' },
    cpuUsage: { value: '34%', status: 'healthy' },
    memoryUsage: { value: '67%', status: 'warning' }
  });

  const [chartData, setChartData] = useState(
    Array.from({ length: 50 }, () => Math.random() * 100)
  );

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with slight variations
      setMetrics(prev => ({
        uptime: { 
          value: '99.9%', 
          status: 'healthy' 
        },
        requests: { 
          value: (1.2 + Math.random() * 0.3).toFixed(1) + 'M', 
          status: 'healthy' 
        },
        responseTime: { 
          value: Math.floor(40 + Math.random() * 20) + 'ms', 
          status: 'healthy' 
        },
        errorRate: { 
          value: (Math.random() * 0.05).toFixed(3) + '%', 
          status: 'healthy' 
        },
        cpuUsage: { 
          value: Math.floor(30 + Math.random() * 20) + '%', 
          status: 'healthy' 
        },
        memoryUsage: { 
          value: Math.floor(60 + Math.random() * 15) + '%', 
          status: Math.random() > 0.7 ? 'warning' : 'healthy' 
        }
      }));

      // Update chart data
      setChartData(prev => [
        ...prev.slice(1),
        20 + Math.random() * 60
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContainer>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Live Infrastructure Metrics</h3>
        <StatusIndicator status="healthy" style={{ marginLeft: '15px' }} />
        <span style={{ marginLeft: '8px', fontSize: '0.9rem', color: '#10B981' }}>
          All Systems Operational
        </span>
      </div>

      <MetricsGrid>
        {Object.entries(metrics).map(([key, metric]) => (
          <MetricCard key={key} status={metric.status}>
            <MetricValue status={metric.status}>
              {metric.value}
            </MetricValue>
            <MetricLabel>
              {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </MetricLabel>
          </MetricCard>
        ))}
      </MetricsGrid>

      <div>
        <h4 style={{ marginBottom: '15px' }}>Response Time Trend (Last 50 requests)</h4>
        <ChartContainer>
          {chartData.map((height, index) => (
            <ChartBar key={index} height={height} />
          ))}
        </ChartContainer>
      </div>
    </DashboardContainer>
  );
};

export default LiveMetricsDashboard;
