
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
interface CommitsChartProps {
  username: string
}

interface CommitData {
  date: string
  count: number
}

export default function CommitsChart({ username }: CommitsChartProps) {
  const [commitData, setCommitData] = useState<CommitData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommitActivity = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate more realistic sample data for the last 90 days
        const today = new Date()
        const data: CommitData[] = []

        // Create a pattern that resembles real GitHub activity
        // More commits on weekdays, fewer on weekends, occasional spikes
        for (let i = 89; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)

          // Day of week (0 = Sunday, 6 = Saturday)
          const dayOfWeek = date.getDay()

          // Base count - weekdays have more activity
          let baseCount =
            dayOfWeek === 0 || dayOfWeek === 6
              ? Math.floor(Math.random() * 4) // Weekend: 0-3
              : Math.floor(Math.random() * 8) + 1 // Weekday: 1-8

          // Add occasional spikes (10% chance of a high activity day)
          if (Math.random() < 0.1) {
            baseCount += Math.floor(Math.random() * 15) + 5 // Add 5-19 more commits
          }

          // Add occasional zero days (15% chance)
          if (Math.random() < 0.15) {
            baseCount = 0
          }

          data.push({
            date: date.toISOString().split("T")[0],
            count: baseCount,
          })
        }

        setCommitData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch commit data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommitActivity()
  }, [username])

  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Skeleton className="h-[250px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>Error loading commit data: {error}</p>
      </div>
    )
  }

  // Format dates for display
  // const formattedData = commitData.map((item) => ({
  //   ...item,
  //   formattedDate: new Date(item.date).toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //   }),
  // }))

  return (
    <div className="w-full h-[400px]">
      {/* <ResponsiveContainer width="100%" height="100%"> */}
        {/* <ChartContainer >
          <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis
              dataKey="formattedDate"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
              tickFormatter={(value, index) => {
                // Show every 7th label (weekly)
                return index % 7 === 0 ? value : ""
              }}
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent>
                      <div className="font-medium">{payload[0].payload.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {payload[0].value} {payload[0].value === 1 ? "commit" : "commits"}
                      </div>
                    </ChartTooltipContent>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ChartContainer> */}
      {/* </ResponsiveContainer> */}
    </div>
  )
}

