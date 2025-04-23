import { 
  users, assistantSettings, tasks, chats, chatMessages,
  type User, type InsertUser,
  type AssistantSettings, type InsertAssistantSettings,
  type Task, type InsertTask,
  type Chat, type InsertChat,
  type ChatMessage, type InsertChatMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

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
  
  // Chat related
  getChats(userId: number): Promise<Chat[]>;
  getChat(id: number): Promise<Chat | undefined>;
  createChat(chat: InsertChat): Promise<Chat>;
  updateChat(id: number, chat: Partial<InsertChat>): Promise<Chat | undefined>;
  deleteChat(id: number): Promise<boolean>;
  
  // Chat messages related
  getChatMessages(chatId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Anonymous chat functionality
  createAnonymousChat(): Promise<Chat>;
  getAnonymousChatMessages(chatId: number): Promise<ChatMessage[]>;
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

  // Chat methods
  async getChats(userId: number): Promise<Chat[]> {
    return await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId))
      .orderBy(desc(chats.updatedAt));
  }

  async getChat(id: number): Promise<Chat | undefined> {
    const [chat] = await db
      .select()
      .from(chats)
      .where(eq(chats.id, id));
    return chat || undefined;
  }

  async createChat(chat: InsertChat): Promise<Chat> {
    const [createdChat] = await db
      .insert(chats)
      .values(chat)
      .returning();
    return createdChat;
  }

  async updateChat(id: number, chat: Partial<InsertChat>): Promise<Chat | undefined> {
    const [updatedChat] = await db
      .update(chats)
      .set({ ...chat, updatedAt: new Date() })
      .where(eq(chats.id, id))
      .returning();
    return updatedChat || undefined;
  }

  async deleteChat(id: number): Promise<boolean> {
    // First delete all messages for this chat
    await db.delete(chatMessages).where(eq(chatMessages.chatId, id));
    
    // Then delete the chat itself
    const result = await db
      .delete(chats)
      .where(eq(chats.id, id))
      .returning({ id: chats.id });
    
    return result.length > 0;
  }

  // Chat messages methods
  async getChatMessages(chatId: number): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.chatId, chatId))
      .orderBy(chatMessages.createdAt);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [createdMessage] = await db
      .insert(chatMessages)
      .values(message)
      .returning();
    
    // Update the last updated timestamp on the chat
    if (message.chatId) {
      await db
        .update(chats)
        .set({ updatedAt: new Date() })
        .where(eq(chats.id, message.chatId));
    }
    
    return createdMessage;
  }

  // Anonymous chat functionality
  async createAnonymousChat(): Promise<Chat> {
    const [anonymousChat] = await db
      .insert(chats)
      .values({
        title: "Anonymous Chat",
        userId: null
      })
      .returning();
    
    return anonymousChat;
  }

  async getAnonymousChatMessages(chatId: number): Promise<ChatMessage[]> {
    // Get chat to verify it's anonymous (userId is null)
    const chat = await this.getChat(chatId);
    
    if (!chat || chat.userId !== null) {
      throw new Error("Chat not found or not anonymous");
    }
    
    return this.getChatMessages(chatId);
  }
}

export const storage = new DatabaseStorage();
