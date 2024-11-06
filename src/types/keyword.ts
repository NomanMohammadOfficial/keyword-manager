export interface Keyword {
  id: string;
  keyword: string;
  overallRank: string;
  searchVolume: 'High' | 'Medium' | 'Low' | '-';
  avgOrderPrice: string;
  conversionRate: 'High' | 'Medium' | 'Low' | '-';
  competition: 'High' | 'Medium' | 'Low' | '-';
}

export interface Filter {
  overallRank: string;
  searchVolume: string;
  competition: string;
}

export interface KeywordInput {
  keyword: string;
  overallRank: string;
  searchVolume: 'High' | 'Medium' | 'Low' | '-';
  avgOrderPrice: string;
  conversionRate: 'High' | 'Medium' | 'Low' | '-';
  competition: 'High' | 'Medium' | 'Low' | '-';
}