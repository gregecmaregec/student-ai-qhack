import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTaskSchema, insertAssistantSettingsSchema } from "@shared/schema";
import { z } from "zod";
import { getAIResponse, PerplexityRequest } from "./perplexity";
import axios from "axios";

// Firebase Admin initialization for verifying tokens
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin if we have the credentials
let firebaseAdmin = false;
try {
  if (process.env.FIREBASE_PROJECT_ID) {
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    firebaseAdmin = true;
  }
} catch (error) {
  console.error("Firebase admin initialization error:", error);
}

// Auth middleware to verify Firebase token
const authMiddleware = async (req: Request, res: Response, next: Function) => {
  try {
    if (!firebaseAdmin) {
      return res.status(500).json({ message: "Firebase admin not initialized" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await getAuth().verifyIdToken(token);
    
    // Find or create user
    let user = await storage.getUserByFirebaseUid(decodedToken.uid);
    
    if (!user) {
      try {
        // Check if a user with the same email already exists
        const existingUserWithEmail = decodedToken.email ? 
          await storage.getUserByEmail(decodedToken.email) : null;
        
        if (existingUserWithEmail) {
          // User exists with this email but different firebase ID - update the Firebase UID
          await storage.updateFirebaseUid(existingUserWithEmail.id, decodedToken.uid);
          user = existingUserWithEmail;
          // Update last login
          await storage.updateUserLastLogin(existingUserWithEmail.id);
        } else {
          // Truly new user, create in our database
          const userData = {
            firebaseUid: decodedToken.uid,
            email: decodedToken.email || "",
            displayName: decodedToken.name,
            photoUrl: decodedToken.picture,
            provider: decodedToken.firebase.sign_in_provider.replace("firebase.com", "")
          };

          user = await storage.createUser(userData);
          
          // Create default assistant settings for new user
          await storage.createAssistantSettings({
            userId: user.id,
            assistantName: "Study Buddy",
            enabledFeatures: ["research", "planning", "writing"],
            theme: "system"
          });
        }
      } catch (error) {
        console.error("Error creating/finding user:", error);
        throw error;
      }
    } else {
      // Existing user, update last login
      await storage.updateUserLastLogin(user.id);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

// Extend Request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {

  // API routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // User routes
  app.get("/api/me", authMiddleware, async (req, res) => {
    try {
      // Return the user profile (the middleware already attached the user)
      res.json({
        id: req.user.id,
        email: req.user.email,
        displayName: req.user.displayName,
        photoUrl: req.user.photoUrl
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });

  // Assistant settings routes
  app.get("/api/settings", authMiddleware, async (req, res) => {
    try {
      const settings = await storage.getAssistantSettings(req.user.id);
      
      if (!settings) {
        return res.status(404).json({ message: "Settings not found" });
      }
      
      res.json(settings);
    } catch (error) {
      console.error("Get settings error:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.patch("/api/settings/:id", authMiddleware, async (req, res) => {
    try {
      const settingsId = parseInt(req.params.id);
      
      // Validate input
      const updateSchema = insertAssistantSettingsSchema.partial();
      const validated = updateSchema.parse(req.body);
      
      // Update settings
      const settings = await storage.updateAssistantSettings(settingsId, validated);
      
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      
      console.error("Update settings error:", error);
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  // Task routes
  app.get("/api/tasks", authMiddleware, async (req, res) => {
    try {
      const tasks = await storage.getTasks(req.user.id);
      res.json(tasks);
    } catch (error) {
      console.error("Get tasks error:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.get("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId, req.user.id);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json(task);
    } catch (error) {
      console.error("Get task error:", error);
      res.status(500).json({ message: "Failed to fetch task" });
    }
  });

  app.post("/api/tasks", authMiddleware, async (req, res) => {
    try {
      // Validate input
      const validated = insertTaskSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      // Create task
      const task = await storage.createTask(validated);
      
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      
      console.error("Create task error:", error);
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.patch("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      
      // Validate input
      const updateSchema = insertTaskSchema.omit({ userId: true }).partial();
      const validated = updateSchema.parse(req.body);
      
      // Update task
      const task = await storage.updateTask(taskId, req.user.id, validated);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      
      console.error("Update task error:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const deleted = await storage.deleteTask(taskId, req.user.id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Delete task error:", error);
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // API Search endpoint - public endpoint for the chat on landing page
  app.post("/api/search", async (req, res) => {
    try {
      // Validate the request
      const requestSchema = z.object({
        query: z.string().min(2).max(500)
      });
      
      const validatedRequest = requestSchema.parse(req.body);
      
      // Forward to the students-ai API
      const response = await axios.post("https://api.students-ai.com/api/search", {
        query: validatedRequest.query
      });
      
      // Return the response
      res.json(response.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: error.errors 
        });
      }
      
      console.error("Search API error:", error);
      res.status(500).json({ message: "Failed to search" });
    }
  });

  // AI Help endpoint - available both for authenticated and non-authenticated users
  app.post("/api/ai-help", async (req, res) => {
    try {
      // Validate the request
      const requestSchema = z.object({
        query: z.string().min(2).max(500),
        context: z.string().optional(),
        page: z.string().optional()
      });
      
      const validatedRequest = requestSchema.parse(req.body);
      
      // Construct a context-aware request
      const perplexityRequest: PerplexityRequest = {
        query: validatedRequest.query,
        context: validatedRequest.page 
          ? `User is on page: ${validatedRequest.page}. ${validatedRequest.context || ''}`
          : validatedRequest.context
      };
      
      // Get AI response
      const response = await getAIResponse(perplexityRequest);
      
      res.json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: error.errors 
        });
      }
      
      console.error("AI help error:", error);
      res.status(500).json({ message: "Failed to get AI help" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
