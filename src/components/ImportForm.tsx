import React, { useState } from 'react';
import { addKeyword, parseKeywordInput } from '../lib/db';

interface Props {
  onSuccess: () => void;
}

const ImportForm: React.FC<Props> = ({ onSuccess }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const keywords = parseKeywordInput(input);
      for (const keyword of keywords) {
        await addKeyword(keyword);
      }
      setInput('');
      onSuccess();
    } catch (err) {
      setError('Failed to import keywords. Please check your input format.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Import Keywords</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-2 border rounded-md mb-4"
          placeholder="Enter keywords (one per line) in format:&#10;keyword&#9;#rank&#9;volume&#9;price&#9;conversion&#9;competition"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Importing...' : 'Import Keywords'}
        </button>
      </form>
    </div>
  );
};

export default ImportForm;