import React, { useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import { Keyword } from '../types/keyword';
import { getDb } from '../lib/db';

type Props = {
  onImport: (keywords: Keyword[]) => void;
};

export default function ImportKeywords({ onImport }: Props) {
  const [bulkInput, setBulkInput] = useState('');
  const [error, setError] = useState('');

  const parseKeywords = (input: string): Keyword[] => {
    const lines = input.trim().split('\n');
    const keywords: Keyword[] = [];

    for (const line of lines) {
      try {
        const [keyword, ...rest] = line.split('\t');
        if (rest.length >= 4) {
          const [rank, volume, price, conversion, competition] = rest;
          keywords.push({
            id: crypto.randomUUID(),
            keyword: keyword.trim(),
            overallRank: rank.trim(),
            searchVolume: volume.trim() as 'High' | 'Medium' | 'Low',
            avgOrderPrice: price.trim() || '-',
            conversionRate: conversion.trim() || '-',
            competition: (competition || conversion).trim() as 'High' | 'Medium' | 'Low'
          });
        }
      } catch (err) {
        console.error('Error parsing line:', line, err);
      }
    }
    return keywords;
  };

  const handleImport = async () => {
    try {
      const keywords = parseKeywords(bulkInput);
      if (keywords.length === 0) {
        setError('No valid keywords found');
        return;
      }

      const db = await getDb();
      const values = keywords.map(k => 
        `('${k.id}', '${k.keyword}', '${k.overallRank}', '${k.searchVolume}', '${k.avgOrderPrice}', '${k.conversionRate}', '${k.competition}')`
      ).join(',');

      await db.exec(`
        INSERT OR IGNORE INTO keywords 
        (id, keyword, overall_rank, search_volume, avg_order_price, conversion_rate, competition)
        VALUES ${values}
      `);

      onImport(keywords);
      setBulkInput('');
      setError('');
    } catch (err) {
      setError('Error importing keywords');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Upload size={24} />
        Import Keywords
      </h2>
      <div className="space-y-4">
        <textarea
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          placeholder="Enter keywords (one per line) in format:&#10;keyword  #rank  volume  price  conversion  competition"
          className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleImport}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Import Keywords
        </button>
      </div>
    </div>
  );
}