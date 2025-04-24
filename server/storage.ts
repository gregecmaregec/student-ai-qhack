import { users, assistantSettings, tasks, type User, type InsertUser, type AssistantSettings, type InsertAssistantSettings, type Task, type InsertTask } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User related
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLastLogin(id: number): Promise<void>;
  updateFirebaseUid(id: number, firebaseUid: string): Promise<void>;
  
  // Assistant settings related
  getAssistantSettings(userId: number): Promise<AssistantSettings | undefined>;
  createAssistantSettings(settings: InsertAssistantSettings): Promise<AssistantSettings>;
  updateAssistantSettings(id: number, settings: Partial<InsertAssistantSettings>): Promise<AssistantSettings>;
  
  // Tasks related
  getTasks(userId: number): Promise<Task[]>;
  getTask(id: number, userId: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, userId: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number, userId: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid));
    return user || undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async updateFirebaseUid(id: number, firebaseUid: string): Promise<void> {
    await db
      .update(users)
      .set({ 
        firebaseUid
      })
      .where(eq(users.id, id));
  }

  async updateUserLastLogin(id: number): Promise<void> {
    await db
      .update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, id));
  }

  // Assistant settings methods
  async getAssistantSettings(userId: number): Promise<AssistantSettings | undefined> {
    const [settings] = await db
      .select()
      .from(assistantSettings)
      .where(eq(assistantSettings.userId, userId));
    return settings || undefined;
  }

  async createAssistantSettings(settings: InsertAssistantSettings): Promise<AssistantSettings> {
    const [createdSettings] = await db
      .insert(assistantSettings)
      .values(settings)
      .returning();
    return createdSettings;
  }

  async updateAssistantSettings(id: number, settings: Partial<InsertAssistantSettings>): Promise<AssistantSettings> {
    const [updatedSettings] = await db
      .update(assistantSettings)
      .set(settings)
      .where(eq(assistantSettings.id, id))
      .returning();
    return updatedSettings;
  }

  // Task methods
  async getTasks(userId: number): Promise<Task[]> {
    return await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(tasks.dueDate);
  }

  async getTask(id: number, userId: number): Promise<Task | undefined> {
    const [task] = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)));
    return task || undefined;
  }

  async createTask(task: InsertTask): Promise<Task> {
    const [createdTask] = await db
      .insert(tasks)
      .values(task)
      .returning();
    return createdTask;
  }

  async updateTask(id: number, userId: number, task: Partial<InsertTask>): Promise<Task | undefined> {
    const [updatedTask] = await db
      .update(tasks)
      .set(task)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
      .returning();
    return updatedTask || undefined;
  }

  async deleteTask(id: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
      .returning({ id: tasks.id });
    
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
