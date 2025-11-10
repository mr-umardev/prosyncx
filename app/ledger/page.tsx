"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2, Download, Copy, Check } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  highlights: string[]
  createdAt: Date
  updatedAt: Date
}

export default function LedgerPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [highlights, setHighlights] = useState<string[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("prosyncx-notes")
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }))
      setNotes(parsedNotes)
    }
  }, [])

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("prosyncx-notes", JSON.stringify(notes))
  }, [notes])

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      highlights,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setNotes([newNote, ...notes])
    setTitle("")
    setContent("")
    setHighlights([])
    setIsCreating(false)
    setSelectedNote(newNote)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
    }
  }

  const handleAddHighlight = (text: string) => {
    if (text.trim() && !highlights.includes(text)) {
      setHighlights([...highlights, text])
    }
  }

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  const handleCopyNote = (note: Note) => {
    const text = `${note.title}\n${note.content}`
    navigator.clipboard.writeText(text)
    setCopiedId(note.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownloadNote = (note: Note) => {
    const content = `${note.title}\n\n${note.content}\n\nHighlights:\n${note.highlights.join("\n")}`
    const element = document.createElement("a")
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`)
    element.setAttribute("download", `${note.title}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/p4-9JeppgAJ06W7YNmAPTQVLiIUwTachA.png"
              alt="ProSyncX Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-foreground">ProSyncX - Ledger</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notes List */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">My Notes</h2>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsCreating(true)
                    setTitle("")
                    setContent("")
                    setHighlights([])
                  }}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" /> New
                </Button>
              </div>

              <div className="space-y-2">
                {notes.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                      No notes yet. Create your first note!
                    </CardContent>
                  </Card>
                ) : (
                  notes.map((note) => (
                    <Card
                      key={note.id}
                      className={`cursor-pointer transition-all ${
                        selectedNote?.id === note.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedNote(note)}
                    >
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-sm line-clamp-2">{note.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Note Editor / Viewer */}
          <div className="lg:col-span-2">
            {isCreating ? (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Note</CardTitle>
                  <CardDescription>Write and organize your thoughts with highlights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Title</label>
                    <input
                      type="text"
                      placeholder="Note title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Content</label>
                    <textarea
                      placeholder="Write your note here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                      className="w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Highlights</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add important text..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddHighlight((e.target as HTMLInputElement).value)
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button
                        size="sm"
                        onClick={(e) => {
                          const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement
                          handleAddHighlight(input.value)
                          input.value = ""
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {highlight}
                          <button
                            onClick={() => handleRemoveHighlight(index)}
                            className="text-yellow-900 hover:text-yellow-950"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddNote} className="flex-1">
                      Save Note
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreating(false)
                        setTitle("")
                        setContent("")
                        setHighlights([])
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : selectedNote ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl mb-2">{selectedNote.title}</CardTitle>
                      <CardDescription>Updated {new Date(selectedNote.updatedAt).toLocaleString()}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyNote(selectedNote)}
                        className="gap-2"
                      >
                        {copiedId === selectedNote.id ? (
                          <>
                            <Check className="w-4 h-4" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadNote(selectedNote)}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" /> Download
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteNote(selectedNote.id)}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-lg leading-relaxed">{selectedNote.content}</p>
                  </div>

                  {selectedNote.highlights.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Highlights</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedNote.highlights.map((highlight, index) => (
                          <div key={index} className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded-lg text-sm">
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Select a note or create a new one to get started</p>
                  <Button
                    onClick={() => {
                      setIsCreating(true)
                      setTitle("")
                      setContent("")
                      setHighlights([])
                    }}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" /> Create First Note
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
