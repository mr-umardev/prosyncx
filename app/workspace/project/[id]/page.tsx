"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Users,
  MessageSquare,
  Video,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Bug,
  Target,
  Clock,
  Settings,
  Edit,
  Share,
} from "lucide-react"

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock project data - in real app, fetch based on params.id
  const project = {
    id: params.id,
    name: "Mobile App Redesign",
    description:
      "Complete redesign of the mobile application with new UI/UX focusing on user experience and modern design patterns",
    image: "/placeholder-eq3ht.png",
    teamName: "Design Squad",
    coordinator: "Sarah Chen",
    progress: 75,
    status: "on-track",
    deadline: "Dec 15, 2024",
    startDate: "Oct 1, 2024",
    budget: "$45,000",
    totalTasks: 24,
    completedTasks: 18,
    teamMembers: [
      { name: "Sarah Chen", role: "Project Manager", avatar: "/professional-woman.png", status: "online" },
      { name: "Mike Johnson", role: "Lead Developer", avatar: "/professional-man.png", status: "online" },
      { name: "Emily Davis", role: "UI/UX Designer", avatar: "/woman-developer.png", status: "away" },
      { name: "Alex Rodriguez", role: "QA Engineer", avatar: "/diverse-user-avatars.png", status: "offline" },
      { name: "Lisa Wang", role: "Backend Developer", avatar: "/professional-woman.png", status: "online" },
    ],
    currentWork: [
      { task: "User Authentication Flow", assignee: "Mike Johnson", progress: 90, status: "in-progress" },
      { task: "Dashboard Redesign", assignee: "Emily Davis", progress: 100, status: "completed" },
      { task: "API Integration", assignee: "Lisa Wang", progress: 60, status: "in-progress" },
      { task: "Mobile Responsiveness", assignee: "Alex Rodriguez", progress: 30, status: "in-progress" },
    ],
    bugs: [
      {
        id: 1,
        title: "Login button not responsive on mobile",
        severity: "high",
        status: "open",
        assignee: "Mike Johnson",
      },
      { id: 2, title: "Dashboard loading slow", severity: "medium", status: "in-progress", assignee: "Lisa Wang" },
      { id: 3, title: "Color contrast issues", severity: "low", status: "resolved", assignee: "Emily Davis" },
    ],
    requirementsMet: [
      "User authentication system",
      "Responsive design implementation",
      "Dark mode support",
      "Performance optimization",
      "Accessibility compliance",
    ],
    requirementsNotMet: [
      "Push notification system",
      "Offline functionality",
      "Advanced analytics dashboard",
      "Multi-language support",
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/workspace"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Workspace</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">ProSyncX</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{project.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <Badge
                  variant={
                    project.status === "on-track" ? "default" : project.status === "ahead" ? "secondary" : "destructive"
                  }
                  className="text-sm px-3 py-1"
                >
                  {project.status === "on-track"
                    ? "On Track"
                    : project.status === "ahead"
                      ? "Ahead of Schedule"
                      : "At Risk"}
                </Badge>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Team: {project.teamName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Coordinator: {project.coordinator}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{project.progress}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>

          {/* Project Image */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">Project Preview</h3>
                  <p className="text-sm opacity-90">Current design implementation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold">{project.progress}%</p>
                  </div>
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <Progress value={project.progress} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks</p>
                    <p className="text-2xl font-bold">
                      {project.completedTasks}/{project.totalTasks}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Team Size</p>
                    <p className="text-2xl font-bold">{project.teamMembers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="text-lg font-semibold">{project.deadline}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="work">Current Work</TabsTrigger>
            <TabsTrigger value="issues">Issues & Bugs</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium">{project.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date:</span>
                    <span className="font-medium">{project.deadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">{project.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Lead:</span>
                    <span className="font-medium">{project.coordinator}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Dashboard redesign completed by Emily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">API integration 60% complete</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm">Bug reported: Login button issue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm">Team meeting scheduled for tomorrow</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.teamMembers.map((member, index) => (
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

          {/* Current Work Tab */}
          <TabsContent value="work" className="space-y-6">
            <div className="space-y-4">
              {project.currentWork.map((work, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium mb-1">{work.task}</h3>
                        <p className="text-sm text-muted-foreground">Assigned to {work.assignee}</p>
                      </div>
                      <Badge variant={work.status === "completed" ? "secondary" : "default"}>
                        {work.status === "completed" ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{work.progress}%</span>
                      </div>
                      <Progress value={work.progress} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Issues & Bugs Tab */}
          <TabsContent value="issues" className="space-y-6">
            <div className="space-y-4">
              {project.bugs.map((bug) => (
                <Card key={bug.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Bug className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium mb-1">{bug.title}</h3>
                          <p className="text-sm text-muted-foreground">Assigned to {bug.assignee}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            bug.severity === "high"
                              ? "destructive"
                              : bug.severity === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {bug.severity}
                        </Badge>
                        <Badge
                          variant={
                            bug.status === "resolved"
                              ? "secondary"
                              : bug.status === "in-progress"
                                ? "default"
                                : "outline"
                          }
                        >
                          {bug.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Requirements Met
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.requirementsMet.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="h-5 w-5" />
                    Requirements Not Met
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.requirementsNotMet.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
