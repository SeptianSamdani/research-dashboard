import { useState } from 'react';
import SearchBar from './components/SearchBar';
import TrendChart from './components/TrendChart';
import KeywordChart from './components/KeywordChart';
import ArticleTable from './components/ArticleTable';
import ExportButton from './components/ExportButton'; // ← ADD THIS
import { searchTopic, getDashboardData } from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(''); // ← ADD THIS

  const handleSearch = async (topic) => {
    setLoading(true);
    setError(null);
    setDashboardData(null);
    setCurrentTopic(topic); // ← ADD THIS

    try {
      await searchTopic(topic);
      const data = await getDashboardData(topic);
      setDashboardData(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Research Intelligence Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* ← ADD EXPORT BUTTON HERE */}
        {dashboardData && (
          <div className="mt-4 flex justify-end">
            <ExportButton 
              topic={currentTopic} 
              disabled={loading || !dashboardData} 
            />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Fetching data...</p>
          </div>
        )}

        {dashboardData && (
          <div className="mt-8 space-y-8">
            <TrendChart data={dashboardData.trendData} />
            <KeywordChart data={dashboardData.keywords} />
            <ArticleTable data={dashboardData.articles} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;