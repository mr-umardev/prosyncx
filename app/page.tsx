import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Users, MessageSquare, Video, Lightbulb, GraduationCap, BarChart3, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-foreground">ProSyncX</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/workspace" className="text-muted-foreground hover:text-foreground transition-colors">
              Workspace
            </Link>
            <Link href="/messaging" className="text-muted-foreground hover:text-foreground transition-colors">
              Messaging
            </Link>
            <Link href="/meetings" className="text-muted-foreground hover:text-foreground transition-colors">
              Meetings
            </Link>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 animate-pulse-glow">
            Next-Generation Collaboration Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
            Welcome to ProSyncX
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            Streamline your team collaboration with our comprehensive platform designed for project management,
            real-time communication, and seamless academic integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="animate-pulse-glow">
              <Link href="/dashboard">
                Start Collaborating <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          {/* Floating Animation Elements */}
          <div className="relative">
            <div
              className="absolute -top-10 left-1/4 w-20 h-20 bg-primary/20 rounded-full animate-float"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute -top-5 right-1/3 w-16 h-16 bg-secondary/20 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-5 left-1/3 w-12 h-12 bg-accent/20 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">Powerful Features for Modern Teams</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Everything you need to manage projects, communicate effectively, and drive innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Centralized Workspace</CardTitle>
              <CardDescription>
                All project activities and communications managed from a single, intuitive dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/workspace">
                  Explore Workspace <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Real-time Messaging</CardTitle>
              <CardDescription>
                Instant communication and collaboration tools that keep your team connected and productive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/messaging">
                  Start Messaging <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Video className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Video Meetings</CardTitle>
              <CardDescription>
                Seamless video conferencing and screen sharing for enhanced team collaboration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/meetings">
                  Join Meeting <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Ideas Platform</CardTitle>
              <CardDescription>
                Dedicated space for idea submission, review, and collaborative innovation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/ideas">
                  Share Ideas <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Academic Integration</CardTitle>
              <CardDescription>
                Faculty monitoring, student progress tracking, and seamless educational workflows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/academic">
                  View Analytics <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Comprehensive insights and reporting to optimize team performance and project outcomes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/dashboard">
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Why Choose ProSyncX?</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Experience the benefits of streamlined collaboration and enhanced productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Improved Productivity</h3>
              <p className="text-muted-foreground text-pretty">
                Reduced context-switching leads to better time management and efficiency.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Collaboration</h3>
              <p className="text-muted-foreground text-pretty">
                Real-time messaging and meetings foster teamwork and faster decision-making.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Lightbulb className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Increased Innovation</h3>
              <p className="text-muted-foreground text-pretty">
                Dedicated space for idea submission and review encourages creative thinking.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Academic Integration</h3>
              <p className="text-muted-foreground text-pretty">
                Faculty can monitor progress, provide feedback, and schedule evaluations easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Transform Your Team Collaboration?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Join thousands of teams already using ProSyncX to streamline their projects and boost productivity.
          </p>
          <Button size="lg" asChild className="animate-pulse-glow">
            <Link href="/dashboard">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold">ProSyncX</span>
              </div>
              <p className="text-muted-foreground text-pretty">
                The ultimate platform for project collaboration and team communication.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/workspace" className="hover:text-foreground transition-colors">
                    Workspace
                  </Link>
                </li>
                <li>
                  <Link href="/messaging" className="hover:text-foreground transition-colors">
                    Messaging
                  </Link>
                </li>
                <li>
                  <Link href="/meetings" className="hover:text-foreground transition-colors">
                    Meetings
                  </Link>
                </li>
                <li>
                  <Link href="/ideas" className="hover:text-foreground transition-colors">
                    Ideas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/academic" className="hover:text-foreground transition-colors">
                    Academic
                  </Link>
                </li>
                <li>Analytics</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ProSyncX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
