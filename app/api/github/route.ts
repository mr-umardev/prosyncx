import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 })
    }

    if (action === "getRepositories") {
      const response = await fetch("https://api.github.com/user/repos", {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch repositories")
      }

      const repos = await response.json()
      return NextResponse.json(repos)
    }

    if (action === "getCommits") {
      const { repoFullName } = data
      const response = await fetch(`https://api.github.com/repos/${repoFullName}/commits?per_page=30`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch commits")
      }

      const commits = await response.json()
      return NextResponse.json(commits)
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json({ error: "GitHub API error" }, { status: 500 })
  }
}
