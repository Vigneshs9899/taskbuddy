// src/types/task.ts
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'inProgress' | 'review' | 'done';
export type TaskCategory = 'work' | 'personal' | 'study' | 'health' | 'other';

export interface TaskTag {
  id: string;
  name: string;
  color: string;
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: Date;
}

export interface TaskComment {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  userName: string;
  userPhotoURL: string;
}

export interface TaskActivity {
  id: string;
  type: 'created' | 'updated' | 'statusChanged' | 'deleted' | 'commentAdded' | 'fileAttached';
  timestamp: Date;
  userId: string;
  userName: string;
  userPhotoURL: string;
  details?: string;
  previousValue?: string;
  newValue?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  
  // Assignment
  assignedTo: string | null; // userId
  assignedToName: string | null;
  assignedToPhotoURL: string | null;
  
  // Creator
  createdBy: string; // userId
  createdByName: string;
  createdByPhotoURL: string;
  
  // Related items
  tags: TaskTag[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  activities: TaskActivity[];
  
  // Progress tracking
  estimatedHours: number | null;
  loggedHours: number | null;
  completionPercentage: number;
}

// Helper function to create a new task with default values
export const createNewTask = (userId: string, userName: string, userPhotoURL: string): Task => {
  const now = new Date();
  const id = `task_${now.getTime()}_${Math.random().toString(36).substring(2, 9)}`;
  
  return {
    id,
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    category: 'work',
    dueDate: null,
    createdAt: now,
    updatedAt: now,
    
    assignedTo: null,
    assignedToName: null,
    assignedToPhotoURL: null,
    
    createdBy: userId,
    createdByName: userName,
    createdByPhotoURL: userPhotoURL,
    
    tags: [],
    attachments: [],
    comments: [],
    activities: [{
      id: `activity_${now.getTime()}`,
      type: 'created',
      timestamp: now,
      userId,
      userName,
      userPhotoURL,
      details: 'Task created'
    }],
    
    estimatedHours: null,
    loggedHours: null,
    completionPercentage: 0
  };
};