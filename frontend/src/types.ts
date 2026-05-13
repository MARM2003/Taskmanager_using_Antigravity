/**
 * Core Task Interface
 */
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Utility Type: Used for creating a new task (excludes id and completed)
 */
export type CreateTaskInput = Omit<Task, 'id' | 'completed'>;

/**
 * Utility Type: Used for updating a task (all fields optional except id)
 */
export type UpdateTaskInput = Partial<Omit<Task, 'id'>> & Pick<Task, 'id'>;

/**
 * Generic Interface: Demonstrating Generics for a standard response wrapper
 */
export interface DataResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

/**
 * Type Guard: Checks if an object is a valid Task
 */
export const isTask = (obj: any): obj is Task => {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.completed === 'boolean'
  );
};

/**
 * Generic Utility: To fetch data from localStorage with type safety
 */
export const getStorageData = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored) as T;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};
