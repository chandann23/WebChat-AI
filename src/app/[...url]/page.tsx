import { ChatWrapper } from "@/components/ChatWrapper"
import { ragChat } from "@/lib/rag-chat"
import { redis } from "@/lib/redis"
import { cookies } from "next/headers"

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
  const sessionCookie = cookies().get("sessionId")?.value
  {/*reconstruct the url from the url params */ }
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] })

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replaceAll(/\//g, "")

  {/*using redis tp check if the url is already indexed */ }
  const isAlreadyIndexed = await redis.sismember("indexed_urls", reconstructedUrl)


  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId })


  if (!isAlreadyIndexed) {

    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },

    })

    await redis.sadd("indexed_urls", reconstructedUrl)

  }


  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  )
}

export default page
