import { ChatWrapper } from "@/components/ChatWrapper"
import { ragChat } from "@/lib/rag-chat"
import { redis } from "@/lib/redis"

interface PageProps {
  params: {
    url: string | string[] | undefined
  }
}


function reconstructUrl({ url }: { url: string[] }) {
  const decodedCompponents = url.map((component) => decodeURIComponent(component))

  return decodedCompponents.join("/")
}



{/*Way to get the url params in next js default from nextjs  */ }
const page = async ({ params }: PageProps) => {
  {/*reconstruct the url from the url params */ }
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] })
  {/*using redis tp check if the url is already indexed */ }
  const isAlreadyIndexed = await redis.sismember("indexed_urls", reconstructedUrl)
  
  const sessionId = "mock-session"

  if (!isAlreadyIndexed) {

    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },

    })

    await redis.sadd("indexed_urls", reconstructedUrl)

  }


  return (
  <ChatWrapper sessionId={sessionId} />
  )
}

export default page
