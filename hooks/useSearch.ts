import { useState, useMemo } from 'react';

interface UseSearchProps<T> {
  items: T[];
  searchFields: (keyof T)[];
  filters?: Record<string, (item: T) => boolean>;
}

interface UseSearchReturn<T> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredItems: T[];
  clearSearch: () => void;
}

export function useSearch<T>({
  items,
  searchFields,
  filters = {}
}: UseSearchProps<T>): UseSearchReturn<T> {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let result = items;

    // Apply search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowerQuery);
          }
          return String(value).toLowerCase().includes(lowerQuery);
        })
      );
    }

    // Apply additional filters
    Object.values(filters).forEach(filterFn => {
      result = result.filter(filterFn);
    });

    return result;
  }, [items, searchQuery, searchFields, filters]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    clearSearch
  };
}