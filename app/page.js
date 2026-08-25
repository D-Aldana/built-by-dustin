import { Home } from "@/components/home"
import { getAllPosts } from "@/util/blog"

const LATEST_POSTS = 3

export default function HomePage() {
  const posts = getAllPosts()

  return <Home posts={posts.slice(0, LATEST_POSTS)} totalPosts={posts.length} />
}
