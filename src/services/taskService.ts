// src/services/taskService.ts
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Task, createNewTask } from '../types/task';

const COLLECTION_NAME = 'tasks';

export const fetchTasks = async (userId: string): Promise<Task[]> => {
  const q = query(collection(db, COLLECTION_NAME), where("createdBy", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Task);
};

export const addTask = async (userId: string, userName: string, userPhotoURL: string, taskData: Partial<Task>): Promise<Task> => {
  const newTask = createNewTask(userId, userName, userPhotoURL);
  const updatedTask = { ...newTask, ...taskData };
  const docRef = await addDoc(collection(db, COLLECTION_NAME), updatedTask);
  return { ...updatedTask, id: docRef.id };
};

// Additional methods for update, delete, etc.