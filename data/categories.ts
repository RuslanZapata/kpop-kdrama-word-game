import idols from './idols.json';
import groups from './groups.json';
import songs from './songs.json';
import dramas from './dramas.json';
import characters from './characters.json';
import phrases from './phrases.json';
import places from './places.json';

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  data: Array<{ id: string; value: string; difficulty?: 'easy' | 'medium' | 'hard' }>;
};

export const categories: Category[] = [
  {
    id: 'idols',
    name: 'K-Pop Idols',
    icon: '🎤',
    description: 'Famous K-Pop solo artists and group members',
    color: '#FF0099', // Neon Pink
    data: idols,
  },
  {
    id: 'groups',
    name: 'K-Pop Groups',
    icon: '👥',
    description: 'Popular K-Pop boy groups and girl groups',
    color: '#8A2BE2', // Bright Purple
    data: groups,
  },
  {
    id: 'songs',
    name: 'Hit Songs',
    icon: '🎵',
    description: 'Famous K-Pop songs that topped the charts',
    color: '#00BFFF', // Electric Blue
    data: songs,
  },
  {
    id: 'dramas',
    name: 'K-Dramas',
    icon: '📺',
    description: 'Popular Korean drama series',
    color: '#FF69B4', // Hot Pink
    data: dramas,
  },
  {
    id: 'characters',
    name: 'Drama Characters',
    icon: '🎭',
    description: 'Memorable characters from K-Dramas',
    color: '#00FA9A', // Mint Green
    data: characters,
  },
  {
    id: 'phrases',
    name: 'Famous Phrases',
    icon: '💬',
    description: 'Iconic lines from songs and dramas',
    color: '#FFCC00', // Warning Yellow
    data: phrases,
  },
  {
    id: 'places',
    name: 'Iconic Places',
    icon: '🗼',
    description: 'Famous locations in Korea and K-Culture',
    color: '#4CD964', // Success Green
    data: places,
  },
];

export const getAllCategories = () => categories;

export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};

export const getRandomWordsFromCategory = (categoryId: string, count: number = 10) => {
  const category = getCategoryById(categoryId);
  if (!category) return [];

  const shuffled = [...category.data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRandomWordsFromAllCategories = (count: number = 10) => {
  let allWords: any[] = [];
  categories.forEach(category => {
    allWords = [...allWords, ...category.data.map(item => ({
      ...item,
      category: category.id,
      categoryName: category.name,
      categoryColor: category.color,
    }))];
  });

  const shuffled = [...allWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};