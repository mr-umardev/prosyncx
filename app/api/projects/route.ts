import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(projects || [])
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { data: project, error } = await supabase
      .from("projects")
      .insert([
        {
          name: body.name,
          team_name: body.teamName,
          coordinator: body.coordinator,
          description: body.description,
          progress: body.progress || 0,
          status: body.status || "On Track",
          github_repo: body.githubRepo || null,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(project)
  } catch (error) {
    console.error("[v0] Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
