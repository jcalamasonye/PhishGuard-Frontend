import { useState, useCallback, ChangeEvent } from 'react';

interface UseFormStateReturn<T> {
  formData: T;
  setFormData: (data: T | ((prev: T) => T)) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFieldChange: <K extends keyof T>(field: K, value: T[K]) => void;
  resetForm: () => void;
  errors: Partial<Record<keyof T, string>>;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  clearErrors: () => void;
}

export function useFormState<T extends Record<string, unknown>>(
  initialState: T
): UseFormStateReturn<T> {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    
    if (errors[name as keyof T]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof T];
        return newErrors;
      });
    }
  }, [errors]);

  const handleFieldChange = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
  }, [initialState]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    handleFieldChange,
    resetForm,
    errors,
    setErrors,
    clearErrors
  };
}