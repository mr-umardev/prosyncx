"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import {
  Users,
  MessageSquare,
  Video,
  Lightbulb,
  Plus,
  Search,
  Filter,
  MessageCircle,
  Star,
  TrendingUp,
  Tag,
  Home,
  Settings,
  Bell,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

interface Idea {
  id: string
  title: string
  description: string
  author: string
  authorAvatar: string
  category: string
  status: "submitted" | "under-review" | "approved" | "implemented" | "rejected"
  votes: number
  comments: number
  createdAt: string
  tags: string[]
  hasVoted?: boolean
  voteType?: "up" | "down"
}

export default function IdeasPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)

  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: "1",
      title: "AI-Powered Code Review Assistant",
      description:
        "Implement an AI assistant that can automatically review code changes, suggest improvements, and identify potential bugs before they reach production. This would significantly speed up our development process and improve code quality.",
      author: "Sarah Chen",
      authorAvatar: "/professional-woman.png",
      category: "Development",
      status: "under-review",
      votes: 24,
      comments: 8,
      createdAt: "2 days ago",
      tags: ["AI", "Development", "Automation"],
      hasVoted: true,
      voteType: "up",
    },
    {
      id: "2",
      title: "Real-time Collaboration Whiteboard",
      description:
        "Add a digital whiteboard feature where team members can brainstorm, sketch ideas, and collaborate visually in real-time during meetings. This would enhance our creative sessions and make remote collaboration more engaging.",
      author: "Mike Johnson",
      authorAvatar: "/professional-man.png",
      category: "Features",
      status: "approved",
      votes: 18,
      comments: 12,
      createdAt: "5 days ago",
      tags: ["Collaboration", "Design", "Real-time"],
    },
    {
      id: "3",
      title: "Automated Meeting Summaries",
      description:
        "Use AI to automatically generate meeting summaries, action items, and follow-up tasks from recorded meetings. This would save time and ensure nothing important is missed.",
      author: "Emily Davis",
      authorAvatar: "/woman-developer.png",
      category: "Productivity",
      status: "submitted",
      votes: 15,
      comments: 6,
      createdAt: "1 week ago",
      tags: ["AI", "Meetings", "Automation"],
    },
    {
      id: "4",
      title: "Mobile App for Quick Updates",
      description:
        "Develop a mobile companion app that allows team members to quickly post updates, check notifications, and participate in discussions while on the go.",
      author: "Alex Rodriguez",
      authorAvatar: "/diverse-user-avatars.png",
      category: "Mobile",
      status: "implemented",
      votes: 32,
      comments: 15,
      createdAt: "2 weeks ago",
      tags: ["Mobile", "Notifications", "Updates"],
    },
    {
      id: "5",
      title: "Gamification System",
      description:
        "Introduce a points and badges system to gamify project contributions, meeting participation, and idea submissions. This could boost team engagement and motivation.",
      author: "Lisa Wang",
      authorAvatar: "/professional-woman.png",
      category: "Engagement",
      status: "submitted",
      votes: 9,
      comments: 4,
      createdAt: "3 days ago",
      tags: ["Gamification", "Engagement", "Motivation"],
    },
  ])

  const categories = ["all", "Development", "Features", "Productivity", "Mobile", "Engagement"]
  const statuses = ["all", "submitted", "under-review", "approved", "implemented", "rejected"]

  const filteredIdeas = ideas.filter((idea) => {
    const matchesCategory = selectedCategory === "all" || idea.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesTab = activeTab === "all" || idea.status === activeTab
    return matchesCategory && matchesSearch && matchesTab
  })

  const handleVote = (ideaId: string, voteType: "up" | "down") => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) => {
        if (idea.id === ideaId) {
          let newVotes = idea.votes
          let newVoteType: "up" | "down" | undefined = voteType

          if (idea.hasVoted) {
            // Remove previous vote
            if (idea.voteType === "up") {
              newVotes -= 1
            } else {
              newVotes += 1
            }

            // If clicking the same vote type, remove the vote
            if (idea.voteType === voteType) {
              newVoteType = undefined
              return { ...idea, votes: newVotes, hasVoted: false, voteType: undefined }
            }
          }

          // Add new vote
          if (voteType === "up") {
            newVotes += 1
          } else {
            newVotes -= 1
          }

          return { ...idea, votes: newVotes, hasVoted: true, voteType: newVoteType }
        }
        return idea
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "default"
      case "under-review":
        return "secondary"
      case "approved":
        return "default"
      case "implemented":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "submitted":
        return "Submitted"
      case "under-review":
        return "Under Review"
      case "approved":
        return "Approved"
      case "implemented":
        return "Implemented"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
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
              <Lightbulb className="h-8 w-8 text-primary" />
              Ideas Platform
            </h1>
            <p className="text-muted-foreground">Submit, vote on, and collaborate on innovative ideas</p>
          </div>
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Submit Idea
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit New Idea</DialogTitle>
                <DialogDescription>Share your innovative idea with the team</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Idea Title</label>
                  <Input placeholder="Enter a compelling title for your idea" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="features">Features</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe your idea in detail. What problem does it solve? How would it benefit the team?"
                    rows={6}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags</label>
                  <Input placeholder="Enter tags separated by commas (e.g., AI, Automation, Mobile)" />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button onClick={() => setIsSubmitDialogOpen(false)}>Submit Idea</Button>
                  <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ideas, descriptions, or tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All Ideas</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="under-review">Under Review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="implemented">Implemented</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                <div className="space-y-6">
                  {filteredIdeas.map((idea) => (
                    <Card key={idea.id} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          {/* Voting Section */}
                          <div className="flex flex-col items-center gap-1 min-w-[60px]">
                            <Button
                              variant={idea.hasVoted && idea.voteType === "up" ? "default" : "ghost"}
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleVote(idea.id, "up")}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <span className="text-lg font-bold text-center">{idea.votes}</span>
                            <Button
                              variant={idea.hasVoted && idea.voteType === "down" ? "destructive" : "ghost"}
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleVote(idea.id, "down")}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Content Section */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
                                <div className="flex items-center gap-3 mb-3">
                                  <Badge variant={getStatusColor(idea.status)}>{getStatusText(idea.status)}</Badge>
                                  <Badge variant="outline">{idea.category}</Badge>
                                </div>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-4 leading-relaxed">{idea.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {idea.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Author and Meta Info */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={idea.authorAvatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {idea.author
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{idea.author}</p>
                                  <p className="text-xs text-muted-foreground">{idea.createdAt}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  {idea.comments}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Star className="h-4 w-4 mr-1" />
                                  Save
                                </Button>
                              </div>
                            </div>
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
            {/* Top Ideas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Ideas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ideas
                  .sort((a, b) => b.votes - a.votes)
                  .slice(0, 3)
                  .map((idea) => (
                    <div key={idea.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <div className="text-center min-w-[40px]">
                        <div className="text-sm font-bold text-primary">{idea.votes}</div>
                        <div className="text-xs text-muted-foreground">votes</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{idea.title}</p>
                        <p className="text-xs text-muted-foreground">{idea.author}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.slice(1).map((category) => {
                  const count = ideas.filter((idea) => idea.category === category).length
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
                      }`}
                    >
                      <span className="text-sm">{category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {count}
                      </Badge>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Ideas</span>
                  <span className="text-sm font-medium">{ideas.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Implemented</span>
                  <span className="text-sm font-medium">{ideas.filter((i) => i.status === "implemented").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Under Review</span>
                  <span className="text-sm font-medium">{ideas.filter((i) => i.status === "under-review").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Your Ideas</span>
                  <span className="text-sm font-medium">2</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
