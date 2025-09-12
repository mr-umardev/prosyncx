"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import {
  Users,
  MessageSquare,
  Video,
  CalendarIcon,
  Clock,
  Plus,
  Search,
  Settings,
  Bell,
  Home,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  PhoneOff,
  Monitor,
  MoreVertical,
  Copy,
  ExternalLink,
} from "lucide-react"

interface Meeting {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  attendees: string[]
  host: string
  status: "upcoming" | "live" | "ended"
  meetingId: string
}

export default function MeetingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  const meetings: Meeting[] = [
    {
      id: "1",
      title: "Sprint Planning Meeting",
      description: "Plan the upcoming sprint and assign tasks to team members",
      date: "Nov 25, 2024",
      time: "10:00 AM",
      duration: "1 hour",
      attendees: ["Sarah Chen", "Mike Johnson", "Emily Davis", "Alex Rodriguez"],
      host: "Sarah Chen",
      status: "upcoming",
      meetingId: "123-456-789",
    },
    {
      id: "2",
      title: "Design Review Session",
      description: "Review the latest UI/UX designs and provide feedback",
      date: "Nov 25, 2024",
      time: "2:00 PM",
      duration: "45 minutes",
      attendees: ["Emily Davis", "Sarah Chen", "Lisa Wang"],
      host: "Emily Davis",
      status: "upcoming",
      meetingId: "987-654-321",
    },
    {
      id: "3",
      title: "Client Presentation",
      description: "Present project progress to the client stakeholders",
      date: "Nov 26, 2024",
      time: "11:00 AM",
      duration: "30 minutes",
      attendees: ["Sarah Chen", "Mike Johnson", "Client Team"],
      host: "Sarah Chen",
      status: "upcoming",
      meetingId: "456-789-123",
    },
    {
      id: "4",
      title: "Team Standup",
      description: "Daily standup meeting to sync on progress",
      date: "Nov 24, 2024",
      time: "9:00 AM",
      duration: "15 minutes",
      attendees: ["Sarah Chen", "Mike Johnson", "Emily Davis", "Alex Rodriguez", "Lisa Wang"],
      host: "Sarah Chen",
      status: "ended",
      meetingId: "789-123-456",
    },
  ]

  const upcomingMeetings = meetings.filter((m) => m.status === "upcoming")
  const pastMeetings = meetings.filter((m) => m.status === "ended")

  const handleJoinMeeting = (meetingId: string) => {
    setIsInMeeting(true)
  }

  const handleLeaveMeeting = () => {
    setIsInMeeting(false)
    setIsMuted(false)
    setIsVideoOff(false)
  }

  if (isInMeeting) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Meeting Header */}
        <div className="bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Sprint Planning Meeting</h1>
            <Badge variant="secondary" className="bg-green-600 text-white">
              Live
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Meeting ID: 123-456-789</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Main Video */}
          <div className="lg:col-span-2 bg-gray-900 rounded-lg relative overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center text-white">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="/professional-woman.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium">Sarah Chen (Host)</p>
                <p className="text-sm text-gray-300">Speaking...</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">Sarah Chen</div>
          </div>

          {/* Participant Videos */}
          <div className="space-y-4">
            {[
              { name: "Mike Johnson", avatar: "/professional-man.png", muted: false },
              { name: "Emily Davis", avatar: "/woman-developer.png", muted: true },
              { name: "Alex Rodriguez", avatar: "/diverse-user-avatars.png", muted: false },
              { name: "You", avatar: "/diverse-user-avatars.png", muted: isMuted },
            ].map((participant, index) => (
              <div key={index} className="bg-gray-900 rounded-lg relative overflow-hidden aspect-video">
                <div className="h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Avatar className="h-12 w-12 mx-auto mb-2">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">{participant.name}</p>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-1.5 py-0.5 rounded text-xs">
                  {participant.name}
                </div>
                {participant.muted && (
                  <div className="absolute top-2 right-2 bg-red-600 rounded-full p-1">
                    <MicOff className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Controls */}
        <div className="bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12 p-0"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            variant={isVideoOff ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12 p-0"
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          <Button variant="secondary" size="lg" className="rounded-full w-12 h-12 p-0">
            <Monitor className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="lg" className="rounded-full w-12 h-12 p-0">
            <MoreVertical className="h-5 w-5" />
          </Button>
          <Button variant="destructive" size="lg" className="rounded-full w-12 h-12 p-0" onClick={handleLeaveMeeting}>
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

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
              <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">
                <Video className="h-4 w-4 mr-2" />
                Meetings
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
            <h1 className="text-3xl font-bold mb-2">Meetings & Video Calls</h1>
            <p className="text-muted-foreground">Schedule, join, and manage your team meetings</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="schedule">Schedule New</TabsTrigger>
                <TabsTrigger value="past">Past Meetings</TabsTrigger>
              </TabsList>

              {/* Upcoming Meetings */}
              <TabsContent value="upcoming" className="space-y-6">
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{meeting.title}</h3>
                              <Badge variant="secondary">Upcoming</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{meeting.description}</p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>{meeting.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {meeting.time} ({meeting.duration})
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{meeting.attendees.length} attendees</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Host:</span>
                                <span>{meeting.host}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                              <span className="text-sm text-muted-foreground">Meeting ID:</span>
                              <code className="bg-muted px-2 py-1 rounded text-sm">{meeting.meetingId}</code>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Button onClick={() => handleJoinMeeting(meeting.id)}>
                              <Video className="h-4 w-4 mr-2" />
                              Join Meeting
                            </Button>
                            <Button variant="outline" className="bg-transparent">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Schedule New Meeting */}
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule New Meeting</CardTitle>
                    <CardDescription>Create a new meeting and invite team members</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Meeting Title</label>
                          <Input placeholder="Enter meeting title" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Description</label>
                          <Textarea placeholder="Meeting description (optional)" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Start Time</label>
                            <Input type="time" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Duration</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                                <SelectItem value="90">1.5 hours</SelectItem>
                                <SelectItem value="120">2 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Attendees</label>
                          <Input placeholder="Enter email addresses separated by commas" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Date</label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button>
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Save as Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Past Meetings */}
              <TabsContent value="past" className="space-y-6">
                <div className="space-y-4">
                  {pastMeetings.map((meeting) => (
                    <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{meeting.title}</h3>
                              <Badge variant="outline">Ended</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{meeting.description}</p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>{meeting.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {meeting.time} ({meeting.duration})
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{meeting.attendees.length} attendees</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Host:</span>
                                <span>{meeting.host}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Button variant="outline" className="bg-transparent">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Recording
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={() => handleJoinMeeting("instant")}>
                  <Video className="h-4 w-4 mr-2" />
                  Start Instant Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule for Later
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Join by Phone
                </Button>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingMeetings.slice(0, 3).map((meeting) => (
                  <div key={meeting.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{meeting.title}</p>
                      <p className="text-xs text-muted-foreground">{meeting.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Meeting Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Meetings Attended</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Meeting Time</span>
                  <span className="text-sm font-medium">8h 30m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Meetings Hosted</span>
                  <span className="text-sm font-medium">3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
