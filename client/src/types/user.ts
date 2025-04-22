// User type definitions for the client-side application

// Firebase user type
export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
  emailVerified: boolean;
}

// User profile from our database
export interface UserProfile {
  id: number;
  email: string;
  displayName: string | null;
  photoUrl: string | null;
  provider: string;
  createdAt: string;
  lastLogin: string;
}

// Assistant settings type
export interface AssistantSettings {
  id: number;
  userId: number;
  assistantName: string;
  enabledFeatures: string[];
  theme: 'light' | 'dark' | 'system';
  createdAt: string;
  updatedAt: string;
}

// Task/Study item type
export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

// New task input type
export interface NewTask {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}

// Update task input type
export type UpdateTask = Partial<NewTask> & {
  completed?: boolean;
};
