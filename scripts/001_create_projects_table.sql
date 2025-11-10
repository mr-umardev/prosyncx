-- Create projects table to store project information
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  team_name TEXT NOT NULL,
  coordinator TEXT NOT NULL,
  description TEXT,
  progress NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'On Track',
  github_repo TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view projects
CREATE POLICY "Allow public access to projects"
  ON public.projects FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert projects
CREATE POLICY "Allow public to insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (true);

-- Create policy to allow anyone to update projects
CREATE POLICY "Allow public to update projects"
  ON public.projects FOR UPDATE
  USING (true);

-- Create policy to allow anyone to delete projects
CREATE POLICY "Allow public to delete projects"
  ON public.projects FOR DELETE
  USING (true);
