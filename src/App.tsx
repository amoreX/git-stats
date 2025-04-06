import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ProfileDisplay from "@/components/profile-display"

export default function App() {
  const [username, setUsername] = useState("")
  const [searchedUsername, setSearchedUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault() 
    if (username.trim()) {
      setIsLoading(true)
      setSearchedUsername(username.trim())
    }
  }

  return (
    <main className=" h-screen w-screen flex flex-col items-center  py-10 px-4  overflow-hidden ">
      <h1 className="text-3xl font-bold text-center mb-8">GitHub Profile Analyzer</h1>

      <Card className="p-6 mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={!username.trim() || isLoading}>
            Analyze
          </Button>
        </form>
      </Card>

      {searchedUsername && (
        <div className="flex-1 justify-center w-full overflow-auto scrollbar-hide">
          <ProfileDisplay username={searchedUsername} onLoadingChange={setIsLoading} />
        </div>
      )}
    </main>
  )
}

