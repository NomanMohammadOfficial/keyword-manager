import React from 'react';
import { Filter } from '../types/keyword';
import { SlidersHorizontal } from 'lucide-react';

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

const FilterBar: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center gap-4">
        <SlidersHorizontal className="text-gray-500" size={24} />
        <h2 className="text-lg font-semibold">Filters:</h2>
        <select
          value={filter.overallRank}
          onChange={(e) => onFilterChange({ ...filter, overallRank: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Ranks</option>
          <option value="#1">#1</option>
          <option value="#2">#2</option>
          <option value="#3">#3</option>
        </select>
        <select
          value={filter.searchVolume}
          onChange={(e) => onFilterChange({ ...filter, searchVolume: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Volumes</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={filter.competition}
          onChange={(e) => onFilterChange({ ...filter, competition: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Competition</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;