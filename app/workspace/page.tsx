"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Users,
  MessageSquare,
  Video,
  Calendar,
  Plus,
  Search,
  Filter,
  FileText,
  Folder,
  Download,
  Upload,
  CheckCircle,
  Circle,
  AlertCircle,
  Home,
  Settings,
  Bell,
} from "lucide-react"

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState("projects")
  const [selectedProject, setSelectedProject] = useState("mobile-app")
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    teamName: "",
    coordinator: "",
    description: "",
    progress: 0,
  })

  const router = useRouter()

  const projects = [
    {
      id: "mobile-app",
      name: "Mobile App Redesign",
      description: "Complete redesign of the mobile application with new UI/UX",
      progress: 75,
      team: 5,
      deadline: "Dec 15, 2024",
      status: "on-track",
      tasks: 24,
      completedTasks: 18,
      teamName: "Design Squad",
      coordinator: "Sarah Chen",
      image: "/mobile-app-design-mockup.jpg",
    },
    {
      id: "website-migration",
      name: "Website Migration",
      description: "Migrate existing website to new hosting platform",
      progress: 45,
      team: 3,
      deadline: "Jan 10, 2025",
      status: "at-risk",
      tasks: 16,
      completedTasks: 7,
      teamName: "DevOps Team",
      coordinator: "Mike Johnson",
      image: "/website-migration-dashboard.jpg",
    },
    {
      id: "ai-integration",
      name: "AI Integration",
      description: "Integrate AI capabilities into existing platform",
      progress: 90,
      team: 7,
      deadline: "Nov 30, 2024",
      status: "ahead",
      tasks: 20,
      completedTasks: 18,
      teamName: "AI Innovation Lab",
      coordinator: "Dr. Emily Davis",
      image: "/ai-integration-interface.jpg",
    },
  ]

  const tasks = [
    {
      id: 1,
      title: "Design user authentication flow",
      description: "Create wireframes and mockups for the login/signup process",
      assignee: "Sarah Chen",
      priority: "high",
      status: "completed",
      dueDate: "Nov 20, 2024",
    },
    {
      id: 2,
      title: "Implement API endpoints",
      description: "Build REST API endpoints for user management",
      assignee: "Mike Johnson",
      priority: "high",
      status: "in-progress",
      dueDate: "Nov 25, 2024",
    },
    {
      id: 3,
      title: "Create responsive layouts",
      description: "Ensure all pages work properly on mobile devices",
      assignee: "Emily Davis",
      priority: "medium",
      status: "todo",
      dueDate: "Dec 1, 2024",
    },
    {
      id: 4,
      title: "Write unit tests",
      description: "Add comprehensive test coverage for new features",
      assignee: "Alex Rodriguez",
      priority: "medium",
      status: "todo",
      dueDate: "Dec 5, 2024",
    },
  ]

  const files = [
    {
      id: 1,
      name: "Project Requirements.pdf",
      type: "document",
      size: "2.4 MB",
      modified: "2 hours ago",
      author: "Sarah Chen",
    },
    {
      id: 2,
      name: "UI Mockups",
      type: "folder",
      size: "15 files",
      modified: "1 day ago",
      author: "Design Team",
    },
    {
      id: 3,
      name: "API Documentation.md",
      type: "document",
      size: "156 KB",
      modified: "3 days ago",
      author: "Mike Johnson",
    },
    {
      id: 4,
      name: "Test Results.xlsx",
      type: "spreadsheet",
      size: "890 KB",
      modified: "1 week ago",
      author: "QA Team",
    },
  ]

  const handleCreateProject = () => {
    if (newProject.name && newProject.teamName && newProject.coordinator) {
      console.log("Creating new project:", newProject)
      alert("Project created successfully!")
      setIsNewProjectOpen(false)
      setNewProject({
        name: "",
        teamName: "",
        coordinator: "",
        description: "",
        progress: 0,
      })
    } else {
      alert("Please fill in all required fields (Project Name, Team Name, and Coordinator)")
    }
  }

  const handleProjectClick = (projectId: string) => {
    router.push(`/workspace/project/${projectId}`)
  }

  const currentProject = projects.find((p) => p.id === selectedProject) || projects[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">ProSyncX</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">
                <Users className="h-4 w-4 mr-2" />
                Workspace
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/messaging">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/meetings">
                  <Video className="h-4 w-4 mr-2" />
                  Meetings
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Centralized Workspace</h1>
            <p className="text-muted-foreground">Manage all your project activities from one unified interface</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Set up a new project with your team details and initial configuration.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-name">Project Name *</Label>
                    <Input
                      id="project-name"
                      placeholder="Enter project name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="team-name">Team Name *</Label>
                    <Input
                      id="team-name"
                      placeholder="Enter team name"
                      value={newProject.teamName}
                      onChange={(e) => setNewProject({ ...newProject, teamName: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="coordinator">Project Coordinator *</Label>
                    <Input
                      id="coordinator"
                      placeholder="Enter coordinator name"
                      value={newProject.coordinator}
                      onChange={(e) => setNewProject({ ...newProject, coordinator: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="progress">Initial Progress (%)</Label>
                    <Input
                      id="progress"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={newProject.progress}
                      onChange={(e) => setNewProject({ ...newProject, progress: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProject}>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Project Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{currentProject.name}</CardTitle>
                <CardDescription className="mt-2">{currentProject.description}</CardDescription>
              </div>
              <Badge
                variant={
                  currentProject.status === "on-track"
                    ? "default"
                    : currentProject.status === "ahead"
                      ? "secondary"
                      : "destructive"
                }
                className="text-sm px-3 py-1"
              >
                {currentProject.status === "on-track"
                  ? "On Track"
                  : currentProject.status === "ahead"
                    ? "Ahead of Schedule"
                    : "At Risk"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={currentProject.progress} className="flex-1" />
                  <span className="text-sm font-medium">{currentProject.progress}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Team Size</p>
                <p className="text-2xl font-bold">{currentProject.team}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tasks</p>
                <p className="text-2xl font-bold">
                  {currentProject.completedTasks}/{currentProject.tasks}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="text-lg font-medium">{currentProject.deadline}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Projects</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge
                        variant={
                          project.status === "on-track"
                            ? "default"
                            : project.status === "ahead"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {project.status === "on-track" ? "On Track" : project.status === "ahead" ? "Ahead" : "At Risk"}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.team} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {project.deadline}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project Tasks</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {task.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : task.status === "in-progress" ? (
                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{task.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-xs">
                                  {task.assignee
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {task.assignee}
                            </span>
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {task.priority}
                            </Badge>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project Files</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {files.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {file.type === "folder" ? (
                            <Folder className="h-5 w-5 text-primary" />
                          ) : (
                            <FileText className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{file.size}</span>
                            <span>Modified {file.modified}</span>
                            <span>by {file.author}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Chen", role: "Project Manager", avatar: "/professional-woman.png", status: "online" },
                { name: "Mike Johnson", role: "Lead Developer", avatar: "/professional-man.png", status: "online" },
                { name: "Emily Davis", role: "UI/UX Designer", avatar: "/woman-developer.png", status: "away" },
                { name: "Alex Rodriguez", role: "QA Engineer", avatar: "/diverse-user-avatars.png", status: "offline" },
                { name: "Lisa Wang", role: "Backend Developer", avatar: "/professional-woman.png", status: "online" },
              ].map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <h3 className="font-medium mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Video className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
