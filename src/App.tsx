import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KeywordTable from './components/KeywordTable';
import FilterBar from './components/FilterBar';
import ImportForm from './components/ImportForm';
import { Keyword, Filter } from './types/keyword';
import { getKeywords, deleteKeyword } from './lib/db';

function App() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [filter, setFilter] = useState<Filter>({
    overallRank: '',
    searchVolume: '',
    competition: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    try {
      setLoading(true);
      const data = await getKeywords();
      setKeywords(data);
      setError(null);
    } catch (err) {
      setError('Failed to load keywords. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteKeyword(id);
      setKeywords(keywords.filter(k => k.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete keyword. Please try again.');
    }
  };

  const handleImportSuccess = () => {
    loadKeywords();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <ImportForm onSuccess={handleImportSuccess} />
        <FilterBar filter={filter} onFilterChange={setFilter} />
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : (
          <KeywordTable
            keywords={keywords}
            onDelete={handleDelete}
            filter={filter}
          />
        )}
      </main>
    </div>
  );
}

export default App;