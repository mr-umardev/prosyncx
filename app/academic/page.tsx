"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import Link from "next/link"
import {
  Users,
  MessageSquare,
  Video,
  GraduationCap,
  BookOpen,
  CalendarIcon,
  TrendingUp,
  Award,
  FileText,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Home,
  Settings,
  Bell,
  Download,
  Filter,
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  avatar: string
  course: string
  progress: number
  grade: string
  lastActive: string
  assignments: {
    completed: number
    total: number
  }
  attendance: number
}

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  submissions: number
  totalStudents: number
  status: "active" | "closed" | "draft"
}

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const students: Student[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      avatar: "/professional-woman.png",
      course: "Computer Science",
      progress: 85,
      grade: "A",
      lastActive: "2 hours ago",
      assignments: { completed: 8, total: 10 },
      attendance: 92,
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      avatar: "/professional-man.png",
      course: "Computer Science",
      progress: 72,
      grade: "B+",
      lastActive: "1 day ago",
      assignments: { completed: 7, total: 10 },
      attendance: 88,
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol.davis@university.edu",
      avatar: "/woman-developer.png",
      course: "Data Science",
      progress: 91,
      grade: "A+",
      lastActive: "30 minutes ago",
      assignments: { completed: 9, total: 10 },
      attendance: 96,
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@university.edu",
      avatar: "/diverse-user-avatars.png",
      course: "Software Engineering",
      progress: 68,
      grade: "B",
      lastActive: "3 hours ago",
      assignments: { completed: 6, total: 10 },
      attendance: 84,
    },
  ]

  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Database Design Project",
      course: "Computer Science",
      dueDate: "Nov 30, 2024",
      submissions: 18,
      totalStudents: 25,
      status: "active",
    },
    {
      id: "2",
      title: "Machine Learning Algorithm Implementation",
      course: "Data Science",
      dueDate: "Dec 5, 2024",
      submissions: 12,
      totalStudents: 20,
      status: "active",
    },
    {
      id: "3",
      title: "Software Architecture Analysis",
      course: "Software Engineering",
      dueDate: "Dec 1, 2024",
      submissions: 8,
      totalStudents: 15,
      status: "active",
    },
  ]

  const progressData = [
    { month: "Sep", avgProgress: 65, attendance: 88 },
    { month: "Oct", avgProgress: 72, attendance: 91 },
    { month: "Nov", avgProgress: 78, attendance: 89 },
    { month: "Dec", avgProgress: 82, attendance: 93 },
  ]

  const gradeDistribution = [
    { grade: "A+", count: 8 },
    { grade: "A", count: 12 },
    { grade: "B+", count: 15 },
    { grade: "B", count: 10 },
    { grade: "C+", count: 5 },
    { grade: "C", count: 3 },
  ]

  const courses = ["all", "Computer Science", "Data Science", "Software Engineering"]

  const filteredStudents = students.filter((student) => selectedCourse === "all" || student.course === selectedCourse)

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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/workspace">
                  <Users className="h-4 w-4 mr-2" />
                  Workspace
                </Link>
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
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              Academic Integration Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor student progress, manage assignments, and track academic performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course === "all" ? "All Courses" : course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Assignment
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredStudents.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> new this semester
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  filteredStudents.reduce((acc, student) => acc + student.progress, 0) / filteredStudents.length,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">2</span> due this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  filteredStudents.reduce((acc, student) => acc + student.attendance, 0) / filteredStudents.length,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Trends</CardTitle>
                      <CardDescription>Student progress and attendance over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="avgProgress" stroke="hsl(var(--primary))" strokeWidth={2} />
                          <Line type="monotone" dataKey="attendance" stroke="hsl(var(--secondary))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Grade Distribution</CardTitle>
                      <CardDescription>Current grade distribution across all courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={gradeDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="grade" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest student submissions and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          student: "Alice Johnson",
                          action: "submitted assignment",
                          target: "Database Design Project",
                          time: "2 hours ago",
                        },
                        {
                          student: "Carol Davis",
                          action: "completed quiz",
                          target: "Machine Learning Fundamentals",
                          time: "4 hours ago",
                        },
                        {
                          student: "Bob Smith",
                          action: "joined meeting",
                          target: "Office Hours Session",
                          time: "1 day ago",
                        },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {activity.student
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.student}</span>{" "}
                              <span className="text-muted-foreground">{activity.action}</span>{" "}
                              <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Students Tab */}
              <TabsContent value="students" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Student Management</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <Card key={student.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{student.name}</h3>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <Badge variant="outline">{student.course}</Badge>
                                <Badge variant={student.grade.startsWith("A") ? "default" : "secondary"}>
                                  Grade: {student.grade}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Progress:</span>
                              <span className="text-sm font-medium">{student.progress}%</span>
                            </div>
                            <Progress value={student.progress} className="w-32" />
                            <div className="text-xs text-muted-foreground">
                              Assignments: {student.assignments.completed}/{student.assignments.total}
                            </div>
                            <div className="text-xs text-muted-foreground">Attendance: {student.attendance}%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Assignments Tab */}
              <TabsContent value="assignments" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Assignment Management</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>

                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{assignment.title}</h3>
                              <Badge
                                variant={
                                  assignment.status === "active"
                                    ? "default"
                                    : assignment.status === "closed"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {assignment.status}
                              </Badge>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>{assignment.course}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Due: {assignment.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {assignment.submissions}/{assignment.totalStudents} submitted
                                </span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-muted-foreground">Submission Progress:</span>
                                <span className="text-sm font-medium">
                                  {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                                </span>
                              </div>
                              <Progress value={(assignment.submissions / assignment.totalStudents) * 100} />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              View Submissions
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Grade
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Key performance indicators for your courses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Grade</span>
                        <span className="text-sm font-medium">B+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Completion Rate</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Engagement Score</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">On-time Submissions</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Comparison</CardTitle>
                      <CardDescription>Performance across different courses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {courses.slice(1).map((course) => {
                        const courseStudents = students.filter((s) => s.course === course)
                        const avgProgress = Math.round(
                          courseStudents.reduce((acc, s) => acc + s.progress, 0) / courseStudents.length,
                        )
                        return (
                          <div key={course} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{course}</span>
                              <span className="text-sm">{avgProgress}%</span>
                            </div>
                            <Progress value={avgProgress} />
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Award className="h-4 w-4 mr-2" />
                  Grade Submissions
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule Office Hours
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Assignment Due Soon</p>
                  <p className="text-xs text-yellow-600">Database Design Project due in 2 days</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800">Low Attendance</p>
                  <p className="text-xs text-red-600">3 students below 80% attendance</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Pending Grades</p>
                  <p className="text-xs text-blue-600">12 submissions awaiting review</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
