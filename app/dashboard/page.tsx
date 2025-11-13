"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Users,
  MessageSquare,
  GitBranch,
  Lightbulb,
  GraduationCap,
  BarChart3,
  TrendingUp,
  Plus,
  Bell,
  Search,
  Settings,
  Home,
} from "lucide-react"

export default function DashboardPage() {
  const [activeProjects, setActiveProjects] = useState([])
  const [projectsCount, setProjectsCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [commitHistory, setCommitHistory] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        setActiveProjects(data || [])
        setProjectsCount(data?.length || 0)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchCommitHistory = async () => {
      try {
        const response = await fetch("/api/github?action=commits")
        const data = await response.json()
        setCommitHistory(data?.commits || [])
      } catch (error) {
        console.error("Failed to fetch commits:", error)
      }
    }

    fetchProjects()
    fetchCommitHistory()
  }, [])

  const teamMembers = [
    { id: 1, name: "Sarah Chen", role: "Project Manager", avatar: "/professional-woman.png" },
    { id: 2, name: "Mike Johnson", role: "Lead Developer", avatar: "/professional-man.png" },
    { id: 3, name: "Emily Davis", role: "UI/UX Designer", avatar: "/woman-developer.png" },
    { id: 4, name: "Alex Rodriguez", role: "QA Engineer", avatar: "/diverse-user-avatars.png" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/p4.png" alt="ProSyncX" className="h-10 w-10" />
              <span className="text-xl font-bold">ProSyncX</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/workspace">
                  <Users className="h-4 w-4 mr-2" />
                  Workspace
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/ledger">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ledger
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectsCount}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{projectsCount}</span> projects in workspace
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{teamMembers.length}</span> active members
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Commits</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commitHistory.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">+{commitHistory.length}</span> this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Track progress across your current projects</CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link href="/workspace">
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <p className="text-muted-foreground">Loading projects...</p>
                ) : activeProjects.length > 0 ? (
                  activeProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{project.name}</h4>
                          <Badge
                            variant={
                              project.status === "on-track"
                                ? "default"
                                : project.status === "ahead"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {project.status === "on-track"
                              ? "On Track"
                              : project.status === "ahead"
                                ? "Ahead"
                                : "At Risk"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Team: {project.team_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="flex-1" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No projects yet. Create one in the Workspace!</p>
                )}
              </CardContent>
            </Card>

            {/* Feature Access Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Centralized Workspace</CardTitle>
                  <CardDescription>Manage all project activities from a unified interface</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/workspace">Access Workspace</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Ledger & Notes</CardTitle>
                  <CardDescription>Create and manage your notes with highlighting capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="secondary">
                    <Link href="/ledger">Open Ledger</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Lightbulb className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Ideas Platform</CardTitle>
                  <CardDescription>Submit and collaborate on innovative ideas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="secondary">
                    <Link href="/ideas">Browse Ideas</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Commit History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {commitHistory.length > 0 ? (
                  commitHistory.slice(0, 5).map((commit, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-b-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{commit.message}</p>
                        <p className="text-xs text-muted-foreground">{commit.author}</p>
                        <p className="text-xs text-muted-foreground">{commit.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No commits yet</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link href="/ideas">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Submit Idea
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/academic">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Academic Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Project Completion</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Team Collaboration</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Innovation Score</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
