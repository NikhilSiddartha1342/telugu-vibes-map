import { useState } from 'react';

export interface Memory {
  id: string;
  lat: number;
  lng: number;
  title: string;
  location: string;
  category: string;
  year: number;
  story: string;
  image?: string;
  createdAt: Date;
}

// Sample memories data
const initialMemories: Memory[] = [
  {
    id: '1',
    lat: 17.3850,
    lng: 78.4867,
    title: "Our First Sankranti at Tank Bund",
    location: "Hyderabad, Telangana",
    category: "Festival",
    year: 2023,
    story: "It was 2023, and the air was filled with the smell of sweet pongal. Watching the kites fly over Hussain Sagar was magical, connecting us to generations of celebration...",
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    lat: 16.5062,
    lng: 80.6480,
    title: "Watching 'NTR' First Day First Show",
    location: "Vijayawada, Andhra Pradesh", 
    category: "Cinema",
    year: 1982,
    story: "Back in 1982, we saved up for weeks to see the premiere. The energy of the crowd was something I'll never forget, the way everyone cheered in unison...",
    createdAt: new Date('1982-08-28')
  },
  {
    id: '3',
    lat: 40.7128,
    lng: -74.0060,
    title: "Telugu Association Ugadi in NYC",
    location: "New York, USA",
    category: "Festival", 
    year: 2019,
    story: "Celebrating Ugadi thousands of miles from home, but feeling the warmth of our community in a small community center in Queens. The pachadi tasted like home...",
    createdAt: new Date('2019-04-06')
  },
  {
    id: '4',
    lat: 51.5074,
    lng: -0.1278,
    title: "Teaching Telugu to My Daughter",
    location: "London, UK",
    category: "Language",
    year: 2020,
    story: "In our small London apartment, passing on the beauty of our mother tongue. Every Telugu word she learns feels like planting seeds of our culture...",
    createdAt: new Date('2020-03-15')
  }
];

export const useMemories = () => {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);

  const addMemory = (memoryData: Omit<Memory, 'id' | 'createdAt'>) => {
    const newMemory: Memory = {
      ...memoryData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setMemories(prev => [...prev, newMemory]);
    return newMemory;
  };

  const getMemoryById = (id: string) => {
    return memories.find(memory => memory.id === id);
  };

  const filterMemories = (filters: {
    category?: string;
    yearRange?: [number, number];
    searchTerm?: string;
  }) => {
    return memories.filter(memory => {
      if (filters.category && memory.category !== filters.category) return false;
      if (filters.yearRange) {
        const [startYear, endYear] = filters.yearRange;
        if (memory.year < startYear || memory.year > endYear) return false;
      }
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        return memory.title.toLowerCase().includes(term) || 
               memory.story.toLowerCase().includes(term) ||
               memory.location.toLowerCase().includes(term);
      }
      return true;
    });
  };

  return {
    memories,
    addMemory,
    getMemoryById,
    filterMemories,
    totalMemories: memories.length
  };
};