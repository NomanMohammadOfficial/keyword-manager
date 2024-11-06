import initSqlJs from 'sql.js';
import { v4 as uuidv4 } from 'uuid';
import { Keyword, KeywordInput } from '../types/keyword';

let SQL: any;
let db: any;

export const initDb = async () => {
  try {
    if (!SQL) {
      SQL = await initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
      });
    }
    
    if (!db) {
      db = new SQL.Database();
      db.run(`
        CREATE TABLE IF NOT EXISTS keywords (
          id TEXT PRIMARY KEY,
          keyword TEXT NOT NULL,
          overall_rank TEXT NOT NULL,
          search_volume TEXT NOT NULL,
          avg_order_price TEXT NOT NULL,
          conversion_rate TEXT NOT NULL,
          competition TEXT NOT NULL
        )
      `);
    }
    
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

export const addKeyword = async (keywordData: KeywordInput): Promise<void> => {
  try {
    const database = await initDb();
    const id = uuidv4();
    
    const stmt = database.prepare(`
      INSERT INTO keywords (id, keyword, overall_rank, search_volume, avg_order_price, conversion_rate, competition)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run([
      id,
      keywordData.keyword,
      keywordData.overallRank,
      keywordData.searchVolume,
      keywordData.avgOrderPrice,
      keywordData.conversionRate,
      keywordData.competition
    ]);
    
    stmt.free();
  } catch (error) {
    console.error('Error adding keyword:', error);
    throw error;
  }
};

export const getKeywords = async (): Promise<Keyword[]> => {
  try {
    const database = await initDb();
    const result = database.exec('SELECT * FROM keywords');
    
    if (result.length === 0) return [];
    
    return result[0].values.map((row: any[]) => ({
      id: row[0],
      keyword: row[1],
      overallRank: row[2],
      searchVolume: row[3],
      avgOrderPrice: row[4],
      conversionRate: row[5],
      competition: row[6]
    }));
  } catch (error) {
    console.error('Error loading keywords:', error);
    throw error;
  }
};

export const deleteKeyword = async (id: string): Promise<void> => {
  try {
    const database = await initDb();
    const stmt = database.prepare('DELETE FROM keywords WHERE id = ?');
    stmt.run([id]);
    stmt.free();
  } catch (error) {
    console.error('Error deleting keyword:', error);
    throw error;
  }
};

export const parseKeywordInput = (input: string): KeywordInput[] => {
  return input.trim().split('\n').map(line => {
    const [keyword, rank, volume, price, conversion, competition] = line.split('\t');
    return {
      keyword: keyword.trim(),
      overallRank: rank.trim(),
      searchVolume: volume.trim() as 'High' | 'Medium' | 'Low' | '-',
      avgOrderPrice: price.trim(),
      conversionRate: conversion.trim() as 'High' | 'Medium' | 'Low' | '-',
      competition: competition.trim() as 'High' | 'Medium' | 'Low' | '-'
    };
  });
};