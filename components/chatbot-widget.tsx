"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Volume2, VolumeX, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const prompts = [
  ["hi", "hey", "hello", "good morning", "good afternoon"],
  ["bye", "good bye", "goodbye", "see you later", "exit"],
  ["how are you", "how is life", "how are things"],
  ["thank you", "thanks", "ty"],
  ["what is prosyncx", "explain prosyncx", "prosyncx", "definition", "what is it"],
  ["what are my tasks", "show my tasks", "what to do", "tasks"],
  ["new task", "create story", "log a task", "create"],
  ["set reminder", "need alert", "schedule meeting", "reminder"],
  ["save note", "make a note", "daily note", "note"],
  ["team status", "sprint progress", "check progress", "status", "sprint"],
  ["help", "what can you do", "commands"],
  ["problem statement", "problem", "main problem"],
  ["test cases", "testcases", "tests needed"],
  ["issues", "blockers", "what are issues"],
  ["architecture", "tech stack", "backend"],
  ["yes", "ok", "okay", "nice"],
  ["no", "not sure", "maybe"],
  ["haha", "ha", "lol", "hehe"],
]

const replies = [
  ["Hello! Ready to work?", "Hi there!", "Hey, what's the plan?"],
  ["Bye! Remember to log your time.", "See you! Happy sprinting.", "Goodbye, tasks await!", "Exiting now!"],
  [
    "I'm fine, focused on project data. How about you?",
    "Pretty well, ready to help your team.",
    "Running smoothly, what can I help you manage?",
  ],
  ["You're welcome! Let me know if you need to tackle any tasks.", "Glad to help!", "No problem at all."],
  [
    "**ProSyncX** is a comprehensive platform for project collaboration with workspace management, real-time messaging, video meetings, and academic integration.",
  ],
  [
    "I can list your pending tasks. Please tell me which project you need the list for.",
    "You have active tasks! To show them, tell me the project name.",
    "Checking your assignments now... which project?",
  ],
  [
    "Got it. What's the name of the new task? I'll need a title and priority.",
    "New task initiated. Please provide the title and team member responsible.",
    "User story creation started. What feature does this task belong to?",
  ],
  [
    "Reminder set! Please specify the time and a brief description.",
    "Scheduling an alert now. What is the event and when should it go off?",
    "Please provide the date, time, and topic for the reminder.",
  ],
  [
    "Note saved! What's the topic you'd like to record?",
    "Note logged. You can retrieve it later by asking 'show notes'.",
    "Daily note recorded. What's the content?",
  ],
  [
    "Checking the board... The team is 70% through the current sprint.",
    "Sprint progress looks good. Anything blocking the team?",
    "Current status is On Track. Do you need details on specific progress?",
  ],
  [
    "I manage tasks, set reminders, and provide project status.",
    "I can help with project status, notes, assigning roles, and Agile questions.",
  ],
  [
    "ProSyncX solves bridging classroom learning with real-world Agile practices.",
    "The problem is connecting theoretical knowledge with practical software development.",
  ],
  [
    "Focus on Authentication, Task Creation, Real-Time Chat, and Reminder accuracy.",
    "Which module do you need test cases for?",
  ],
  [
    "The most common issues are permission management and real-time synchronization.",
    "I see 2 open blockers. Would you like me to list them?",
  ],
  [
    "Microservices with React/Vue frontend and WebSockets for real-time features.",
    "The core uses a three-tier design: Presentation, API, and Database.",
  ],
  ["Got it!", "Understood.", "Perfect. Proceeding now."],
  ["Understood. What should we focus on instead?", "No problem.", "I'll wait for your next command."],
  ["Haha, good one! Back to the project!", "That's hilarious. Don't forget to relax!"],
]

const alternative = [
  "I need a clear command like 'tasks', 'reminder', or 'status'.",
  "Please ask me about a task, project status, or diary entry.",
  "Try a simple command related to your sprint or notes.",
  "I don't understand that command. Try again.",
]

function normalizeInput(input: string): string {
  let text = input
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .trim()
  text = text.replace(/[\d]/gi, "")
  text = text
    .replace(/\b(a|an|the|is|me|i feel|please|can you|tell me|what is|how to|about)\b/g, " ")
    .replace(/\br u\b/g, "are you")
    .replace(/\bwhats\b/g, "what is")
    .trim()
  text = text.replace(/\s{2,}/g, " ")
  return text
}

function compare(
  promptsArray: string[][],
  repliesArray: string[][],
  input: string,
  threshold: number,
): { reply?: string; score: number } {
  let bestReply: string | undefined = undefined
  let maxScore = 0
  const inputWords = input.split(" ").filter((word) => word.length > 0)

  if (inputWords.length === 0) return { reply: undefined, score: 0 }

  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      const prompt = promptsArray[x][y]
      const cleanPrompt = normalizeInput(prompt)
      const promptWords = cleanPrompt.split(" ").filter((word) => word.length > 0)

      if (promptWords.length === 0) continue

      let matchCount = 0
      promptWords.forEach((pWord) => {
        if (inputWords.includes(pWord)) {
          matchCount++
        }
      })

      const score = matchCount / promptWords.length

      if (score > maxScore) {
        maxScore = score
        if (maxScore >= threshold) {
          const respReplies = repliesArray[x]
          bestReply = respReplies[Math.floor(Math.random() * respReplies.length)]
        }
      }
    }
  }

  if (maxScore >= threshold) {
    return { reply: bestReply, score: maxScore }
  } else {
    return { reply: undefined, score: maxScore }
  }
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm ProSyncX Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const textToSpeech = (text: string) => {
    if (!isSpeechEnabled || !synth) return

    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 1.0
    utterance.pitch = 1.0
    synth.speak(utterance)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    if (input.toLowerCase().trim() === "bye" || input.toLowerCase().trim() === "exit") {
      const byeMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, byeMessage])

      const exitMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Goodbye! Feel free to ask me anything anytime. Have a productive day!",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, exitMessage])

      setTimeout(() => {
        setIsOpen(false)
        setInput("")
        setMessages([
          {
            id: "1",
            text: "Hello! I'm ProSyncX Assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
      }, 1500)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const normalizedInput = normalizeInput(input)
      const MATCH_THRESHOLD = 0.5

      const bestMatch = compare(prompts, replies, normalizedInput, MATCH_THRESHOLD)
      const product = bestMatch.reply || alternative[Math.floor(Math.random() * alternative.length)]

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: product,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
      textToSpeech(product)
    }, 1000)
  }

  return (
    <>
      {/* Floating Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-glow"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Sidebar */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-background rounded-lg shadow-2xl border border-border flex flex-col animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold">ProSyncX Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
                aria-label={isSpeechEnabled ? "Disable speech" : "Enable speech"}
              >
                {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setInput("")
                  setMessages([
                    {
                      id: "1",
                      text: "Hello! I'm ProSyncX Assistant. How can I help you today?",
                      sender: "bot",
                      timestamp: new Date(),
                    },
                  ])
                }}
                className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
                aria-label="Close chat (or type 'bye')"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type 'bye' or 'exit' to close..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" size="sm" disabled={isLoading || !input.trim()} className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
