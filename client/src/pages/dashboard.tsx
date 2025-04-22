import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/main-layout';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { Task, NewTask, UpdateTask } from '@/types/user';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Calendar, 
  Check, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Edit, 
  MessageSquarePlus, 
  Plus, 
  Trash2, 
  Zap 
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';

export function DashboardPage() {
  const { user, profile, token, isLoading } = useAuth();
  const { toast } = useToast();
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    priority: 'medium',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [chatMessage, setChatMessage] = useState('');

  // Fetch tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['/api/tasks'],
    queryFn: async () => {
      if (!token) return [];
      
      const res = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      return res.json() as Promise<Task[]>;
    },
    enabled: !!token
  });

  // Fetch assistant settings
  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['/api/settings'],
    queryFn: async () => {
      if (!token) return null;
      
      const res = await fetch('/api/settings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch settings');
      }
      
      return res.json();
    },
    enabled: !!token
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: NewTask) => {
      const response = await apiRequest('POST', '/api/tasks', taskData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
      });
      setIsDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });
    },
    onError: (error) => {
      console.error('Error creating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive',
      });
    }
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateTask }) => {
      const response = await apiRequest('PATCH', `/api/tasks/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
    }
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
    }
  });

  // Handle task form submission
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast({
        title: 'Error',
        description: 'Task title is required',
        variant: 'destructive',
      });
      return;
    }
    createTaskMutation.mutate(newTask);
  };

  // Toggle task completion status
  const toggleTaskCompletion = (task: Task) => {
    updateTaskMutation.mutate({
      id: task.id,
      data: { completed: !task.completed }
    });
  };

  // Delete a task
  const handleDeleteTask = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(id);
    }
  };

  // Handle chat submission (mock functionality)
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    toast({
      title: 'Message sent',
      description: 'AI response feature will be available soon!',
    });
    setChatMessage('');
  };

  if (isLoading) {
    return (
      <MainLayout withFooter={false}>
        <div className="max-w-7xl mx-auto px-4 py-12 h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300">Loading your dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout withFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Welcome, {profile?.displayName || user?.displayName || 'Student'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Here's an overview of your study tasks and AI assistant.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your study plan. Fill out the details below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateTask}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Complete Math Assignment"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add details about your task..."
                      rows={3}
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value as 'low' | 'medium' | 'high' })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category (optional)</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Math, Science, English"
                      value={newTask.category || ''}
                      onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createTaskMutation.isPending}>
                    {createTaskMutation.isPending && (
                      <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></div>
                    )}
                    Create Task
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="tasks" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="tasks">Tasks & Study Plan</TabsTrigger>
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tasksLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ) : tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                  <Card key={task.id} className={`overflow-hidden transition-all duration-300 ${
                    task.completed ? 'opacity-70' : ''
                  }`}>
                    <CardHeader className={`pb-2 ${
                      task.priority === 'high' 
                        ? 'bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-900/30' 
                        : task.priority === 'medium'
                          ? 'bg-orange-50 dark:bg-orange-900/20 border-b border-orange-100 dark:border-orange-900/30'
                          : ''
                    }`}>
                      <div className="flex justify-between items-start">
                        <CardTitle className={`text-lg ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </CardTitle>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleTaskCompletion(task)}
                            className="h-8 w-8 p-0"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteTask(task.id)}
                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {task.category && (
                        <CardDescription>
                          Category: {task.category}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pt-4">
                      {task.description && (
                        <p className={`text-sm text-gray-600 dark:text-gray-300 mb-3 ${task.completed ? 'line-through' : ''}`}>
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>
                            {task.dueDate 
                              ? format(new Date(task.dueDate), 'MMM d, yyyy') 
                              : 'No due date'}
                          </span>
                        </div>
                        <div className="ml-auto flex items-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            task.priority === 'high' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                              : task.priority === 'medium' 
                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' 
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-4 mb-4">
                    <Calendar className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No tasks yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
                    Create your first task to start organizing your study plan
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      {/* Same content as the other dialog */}
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                        <Zap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">AI Study Assistant</CardTitle>
                        <CardDescription>
                          Ask questions, get explanations, or request help with your studies
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            Hello {profile?.displayName || 'there'}! I'm your AI study assistant. How can I help you today?
                          </p>
                        </div>
                      </div>
                      
                      {/* Example messages that would be part of state in a real implementation */}
                      <div className="flex justify-end">
                        <div className="bg-primary-100 dark:bg-primary-900 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-primary-800 dark:text-primary-200">
                            Can you help me understand photosynthesis better?
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            Photosynthesis is the process used by plants, algae and certain bacteria to convert light energy, usually from the sun, into chemical energy in the form of glucose (or sugar).
                          </p>
                          <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                            The basic equation is: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂
                          </p>
                          <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                            Would you like me to explain the specific stages of photosynthesis?
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <form onSubmit={handleChatSubmit} className="w-full">
                      <div className="flex w-full items-center space-x-2">
                        <Input
                          placeholder="Type your message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit">
                          <MessageSquarePlus className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </form>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Assistant Settings</CardTitle>
                    <CardDescription>
                      Customize your AI study assistant
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {settingsLoading ? (
                      <div className="animate-pulse space-y-4">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      </div>
                    ) : settings ? (
                      <>
                        <div>
                          <Label htmlFor="assistantName">Assistant Name</Label>
                          <Input
                            id="assistantName"
                            value={settings.assistantName}
                            className="mt-1"
                            readOnly
                          />
                        </div>
                        
                        <div>
                          <Label className="mb-2 block">Enabled Features</Label>
                          <div className="space-y-2">
                            {settings.enabledFeatures.map((feature, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                  {feature}
                                </span>
                                <Switch checked />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
                        Could not load settings. Please try again later.
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Settings
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                    <CardDescription>
                      Your progress overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tasks Completed
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {tasks ? tasks.filter(t => t.completed).length : 0}/{tasks ? tasks.length : 0}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full" 
                            style={{ 
                              width: tasks?.length 
                                ? `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` 
                                : '0%' 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            High Priority Tasks
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {tasks ? tasks.filter(t => t.priority === 'high' && !t.completed).length : 0}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-red-500 h-2.5 rounded-full" 
                            style={{ 
                              width: tasks?.length 
                                ? `${(tasks.filter(t => t.priority === 'high' && !t.completed).length / tasks.length) * 100}%` 
                                : '0%' 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            AI Queries Remaining
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Unlimited
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
