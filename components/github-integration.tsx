"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Github, Loader2 } from "lucide-react"

interface Repository {
  id: number
  name: string
  full_name: string
  url: string
}

interface Commit {
  sha: string
  commit: {
    author: {
      name: string
      date: string
    }
    message: string
  }
  author: {
    avatar_url: string
  }
}

interface CommitChartData {
  date: string
  commits: number
}

export function GitHubIntegration() {
  const [open, setOpen] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState("")
  const [commits, setCommits] = useState<Commit[]>([])
  const [commitChart, setCommitChart] = useState<CommitChartData[]>([])
  const [loading, setLoading] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  const handleAuthorize = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "getRepositories" }),
      })

      if (!response.ok) {
        throw new Error("Failed to authorize GitHub access")
      }

      const data = await response.json()
      setRepositories(data)
      setAuthorized(true)
    } catch (error) {
      console.error("GitHub authorization error:", error)
      alert("Failed to authorize GitHub access. Please check your configuration.")
    } finally {
      setLoading(false)
    }
  }

  const handleRepositorySelect = async (repoFullName: string) => {
    setSelectedRepo(repoFullName)
    setLoading(true)
    try {
      const response = await fetch("/api/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "getCommits", data: { repoFullName } }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch commits")
      }

      const data = await response.json()
      setCommits(data)

      // Process commits into chart data (group by date)
      const commitsByDate: Record<string, number> = {}
      data.forEach((commit: Commit) => {
        const date = new Date(commit.commit.author.date).toLocaleDateString()
        commitsByDate[date] = (commitsByDate[date] || 0) + 1
      })

      const chartData = Object.entries(commitsByDate)
        .map(([date, count]) => ({
          date,
          commits: count,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      setCommitChart(chartData)
    } catch (error) {
      console.error("Failed to fetch commits:", error)
      alert("Failed to fetch commit history")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
      >
        <Github className="h-4 w-4" />
        Connect GitHub Repository
      </Button>

      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>GitHub Repository Integration</DialogTitle>
          <DialogDescription>Authorize access to your GitHub repositories and view commit history</DialogDescription>
        </DialogHeader>

        {!authorized ? (
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-300">
                Click below to authorize access to your GitHub repositories. This will allow you to view commit history
                and project information.
              </p>
            </div>
            <Button onClick={handleAuthorize} disabled={loading} className="w-full" size="lg">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? "Authorizing..." : "Authorize GitHub Access"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Repository Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Select Repository</label>
              <Select value={selectedRepo} onValueChange={handleRepositorySelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a repository..." />
                </SelectTrigger>
                <SelectContent>
                  {repositories.map((repo) => (
                    <SelectItem key={repo.id} value={repo.full_name}>
                      {repo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Commit History Chart */}
            {selectedRepo && commitChart.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Commit History</CardTitle>
                  <CardDescription>Number of commits per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={commitChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="commits" fill="#10b981" name="Commits" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Recent Commits */}
            {selectedRepo && commits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Commits</CardTitle>
                  <CardDescription>Latest commits from the selected repository</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {commits.slice(0, 10).map((commit) => (
                      <div key={commit.sha} className="border-b pb-3 last:border-b-0">
                        <div className="flex items-start gap-3">
                          {commit.author?.avatar_url && (
                            <img
                              src={commit.author.avatar_url || "/placeholder.svg"}
                              alt="Author"
                              className="h-8 w-8 rounded-full"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{commit.commit.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {commit.commit.author.name} • {new Date(commit.commit.author.date).toLocaleString()}
                            </p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {commit.sha.slice(0, 7)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
