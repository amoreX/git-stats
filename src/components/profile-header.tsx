import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface ProfileHeaderProps {
  userData: {
    login: string
    name: string
    avatar_url: string
    html_url: string
    bio: string
    public_repos: number
    followers: number
    following: number
  }
}

export default function ProfileHeader({ userData }: ProfileHeaderProps) {
  return (
    <div className="flex flex-row">
      <Card className="w-1/2">
        <CardContent className="pt-6 ">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar_url} alt={userData.login} />
              <AvatarFallback>{userData.login.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{userData.name || userData.login}</h2>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground flex items-center justify-center md:justify-start gap-1 hover:underline"
              >
                @{userData.login} <ExternalLink className="h-3 w-3" />
              </a>
              {userData.bio && <p className="mt-2">{userData.bio}</p>}
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <div>
                  <span className="font-semibold">{userData.public_repos}</span> repositories
                </div>
                <div>
                  <span className="font-semibold">{userData.followers}</span> followers
                </div>
                <div>
                  <span className="font-semibold">{userData.following}</span> following
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-1/2">
        
        p
      </div>
    </div>
  )
}
