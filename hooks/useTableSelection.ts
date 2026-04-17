import { useState, useCallback } from 'react';

interface UseTableSelectionReturn<T> {
  selectedIds: string[];
  isSelected: (id: string) => boolean;
  isAllSelected: (items: T[]) => boolean;
  toggleSelection: (id: string) => void;
  toggleAll: (items: T[]) => void;
  clearSelection: () => void;
  selectMultiple: (ids: string[]) => void;
}

export function useTableSelection<T extends { id: string }>(): UseTableSelectionReturn<T> {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isSelected = useCallback((id: string) => {
    return selectedIds.includes(id);
  }, [selectedIds]);

  const isAllSelected = useCallback((items: T[]) => {
    if (items.length === 0) return false;
    return items.every(item => selectedIds.includes(item.id));
  }, [selectedIds]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => 
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  }, []);

  const toggleAll = useCallback((items: T[]) => {
    if (isAllSelected(items)) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map(item => item.id));
    }
  }, [isAllSelected]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const selectMultiple = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  return {
    selectedIds,
    isSelected,
    isAllSelected,
    toggleSelection,
    toggleAll,
    clearSelection,
    selectMultiple
  };
}