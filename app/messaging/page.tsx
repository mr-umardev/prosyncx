"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  Users,
  MessageSquare,
  Video,
  Send,
  Paperclip,
  Smile,
  Phone,
  MoreVertical,
  Hash,
  Plus,
  Search,
  Home,
  Settings,
  Bell,
} from "lucide-react"

interface Message {
  id: number
  user: string
  avatar: string
  content: string
  timestamp: string
  type: "text" | "file" | "system"
}

interface Channel {
  id: string
  name: string
  type: "channel" | "dm"
  unread: number
  lastMessage?: string
  isOnline?: boolean
}

export default function MessagingPage() {
  const [activeChannel, setActiveChannel] = useState("general")
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const channels: Channel[] = [
    { id: "general", name: "general", type: "channel", unread: 0, lastMessage: "Great work on the project!" },
    { id: "development", name: "development", type: "channel", unread: 3, lastMessage: "API endpoints are ready" },
    { id: "design", name: "design", type: "channel", unread: 1, lastMessage: "New mockups uploaded" },
    { id: "random", name: "random", type: "channel", unread: 0, lastMessage: "Anyone up for lunch?" },
  ]

  const directMessages: Channel[] = [
    {
      id: "sarah",
      name: "Sarah Chen",
      type: "dm",
      unread: 2,
      lastMessage: "Can we discuss the timeline?",
      isOnline: true,
    },
    {
      id: "mike",
      name: "Mike Johnson",
      type: "dm",
      unread: 0,
      lastMessage: "Thanks for the code review",
      isOnline: true,
    },
    {
      id: "emily",
      name: "Emily Davis",
      type: "dm",
      unread: 1,
      lastMessage: "Design files are ready",
      isOnline: false,
    },
    {
      id: "alex",
      name: "Alex Rodriguez",
      type: "dm",
      unread: 0,
      lastMessage: "Test results look good",
      isOnline: true,
    },
  ]

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "/professional-woman.png",
      content: "Good morning everyone! Ready for today's sprint review?",
      timestamp: "9:00 AM",
      type: "text",
    },
    {
      id: 2,
      user: "Mike Johnson",
      avatar: "/professional-man.png",
      content: "I've finished the API integration we discussed yesterday.",
      timestamp: "9:05 AM",
      type: "text",
    },
    {
      id: 3,
      user: "Emily Davis",
      avatar: "/woman-developer.png",
      content: "The new UI components are looking great. I'll share the updated designs after the meeting.",
      timestamp: "9:10 AM",
      type: "text",
    },
    {
      id: 4,
      user: "System",
      avatar: "",
      content: "Alex Rodriguez joined the channel",
      timestamp: "9:15 AM",
      type: "system",
    },
    {
      id: 5,
      user: "Alex Rodriguez",
      avatar: "/diverse-user-avatars.png",
      content: "Hey team! Just ran the latest tests - everything is passing. Great work!",
      timestamp: "9:16 AM",
      type: "text",
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        user: "John Doe",
        avatar: "/diverse-user-avatars.png",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const currentChannel = [...channels, ...directMessages].find((c) => c.id === activeChannel)

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
              <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
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

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 border-r bg-card/30 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              <Button size="sm" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Channels */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                  <Hash className="h-3 w-3 mr-1" />
                  Channels
                </h3>
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        activeChannel === channel.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted/50 text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Hash className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{channel.name}</span>
                      </div>
                      {channel.unread > 0 && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                          {channel.unread}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Direct Messages */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Direct Messages</h3>
                <div className="space-y-1">
                  {directMessages.map((dm) => (
                    <button
                      key={dm.id}
                      onClick={() => setActiveChannel(dm.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        activeChannel === dm.id ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="relative">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="text-xs">
                              {dm.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {dm.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <span className="truncate">{dm.name}</span>
                      </div>
                      {dm.unread > 0 && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                          {dm.unread}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-card/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentChannel?.type === "channel" ? (
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Hash className="h-4 w-4 text-primary" />
                </div>
              ) : (
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {currentChannel?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <h2 className="font-semibold">
                  {currentChannel?.type === "channel" ? "#" : ""}
                  {currentChannel?.name}
                </h2>
                {currentChannel?.type === "channel" && (
                  <p className="text-sm text-muted-foreground">
                    {channels.find((c) => c.id === activeChannel)?.name === "general"
                      ? "General team discussions"
                      : channels.find((c) => c.id === activeChannel)?.name === "development"
                        ? "Development team coordination"
                        : channels.find((c) => c.id === activeChannel)?.name === "design"
                          ? "Design team collaboration"
                          : "Random conversations"}
                  </p>
                )}
                {currentChannel?.type === "dm" && (
                  <p className="text-sm text-muted-foreground">
                    {directMessages.find((dm) => dm.id === activeChannel)?.isOnline ? "Online" : "Offline"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentChannel?.type === "dm" && (
                <>
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  {message.type === "system" ? (
                    <div className="flex items-center justify-center w-full">
                      <div className="bg-muted/50 text-muted-foreground text-sm px-3 py-1 rounded-full">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <>
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {message.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-medium text-sm">{message.user}</span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <div className="text-sm leading-relaxed">{message.content}</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t bg-card/30">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${currentChannel?.type === "channel" ? "#" : ""}${currentChannel?.name}`}
                  className="pr-20 resize-none"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Paperclip className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Smile className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="px-3">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Channel/User Info */}
        <div className="w-80 border-l bg-card/30 p-4">
          <div className="space-y-6">
            {currentChannel?.type === "channel" ? (
              <>
                <div>
                  <h3 className="font-semibold mb-3">Channel Info</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      {currentChannel.name === "general"
                        ? "This is the general channel for team-wide discussions and announcements."
                        : currentChannel.name === "development"
                          ? "Development team coordination and technical discussions."
                          : currentChannel.name === "design"
                            ? "Design team collaboration and creative discussions."
                            : "Random conversations and casual team chat."}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">Members (5)</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Sarah Chen", role: "Project Manager", online: true },
                      { name: "Mike Johnson", role: "Lead Developer", online: true },
                      { name: "Emily Davis", role: "UI/UX Designer", online: false },
                      { name: "Alex Rodriguez", role: "QA Engineer", online: true },
                      { name: "You", role: "Team Member", online: true },
                    ].map((member, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {member.online && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarFallback>
                      {currentChannel?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{currentChannel?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {directMessages.find((dm) => dm.id === activeChannel)?.isOnline ? "Online" : "Last seen 2h ago"}
                  </p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/meetings">
                      <Video className="h-4 w-4 mr-2" />
                      Start Video Call
                    </Link>
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Start Voice Call
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
