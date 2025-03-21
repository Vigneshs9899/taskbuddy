// src/contexts/TaskContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types/task';
import { fetchTasks, addTask } from '../services/taskService';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (taskData: Partial<Task>) => Promise<void>;
  // Other actions
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      if (user) {
        try {
          const fetchedTasks = await fetchTasks(user.uid);
          setTasks(fetchedTasks);
        } catch (err) {
          setError('Failed to load tasks');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadTasks();
  }, [user]);

  // Create task
  const createTask = async (taskData: Partial<Task>) => {
    if (!user) return;
    
    try {
      const newTask = await addTask(
        user.uid,
        user.displayName || 'Unknown User',
        user.photoURL || '',
        taskData
      );
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};