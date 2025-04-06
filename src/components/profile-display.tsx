import { useEffect, useState } from "react"
import { ExternalLink, GitFork, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import LoadingSkeleton from "@/components/loading-skeleton"
import ProfileHeader from "@/components/profile-header" // Import the new component

interface ProfileDisplayProps {
  username: string
  onLoadingChange: (isLoading: boolean) => void
}

interface UserData {
  login: string
  name: string
  avatar_url: string
  html_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
}

interface Repository {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

export default function ProfileDisplay({ username, onLoadingChange }: ProfileDisplayProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      setError(null)
      onLoadingChange(true)

      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!userResponse.ok) {
          throw new Error(`User not found: ${userResponse.status}`)
        }
        const userData = await userResponse.json()
        console.log("User data:")
        console.log(userData);
        setUserData(userData)

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        if (!reposResponse.ok) {
          throw new Error(`Failed to fetch repositories: ${reposResponse.status}`)
        }

        const reposData = await reposResponse.json()
        console.log("User Repo data:")
        console.log(reposData);
        setRepos(reposData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
        onLoadingChange(false)
      }
    }

    fetchUserData()
  }, [username, onLoadingChange])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
            <p className="mt-2">Please try again with a different username.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!userData) return null

  return (
    <div className="space-y-8">
      <ProfileHeader userData={userData} /> 

      <div className="grid gap-4">
        {repos.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No public repositories found.</p>
            </CardContent>
          </Card>
        ) : (
          repos.map((repo) => (
            <Card key={repo.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        {repo.name} <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {repo.description || "No description provided"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" /> {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" /> {repo.forks_count}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
                  <span className="text-xs text-muted-foreground">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}



