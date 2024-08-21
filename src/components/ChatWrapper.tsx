"use client"

import { Message, useChat } from "ai/react"
import { Messages } from "./Messages"
import { ChatInput } from "./ChatInput"




export const ChatWrapper = ({ sessionId, initialMessages }: { sessionId: string, initialMessages: Message[] }) => {
  {/*usechat here is same as using useState hook to store the messages and handleInputChange to update the state*/ }

  // const [messages, setMessages] = useState<Message[]>([])
  const { messages, handleInputChange, input, handleSubmit, setInput } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  })
  console.log(messages)

  return (
    <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">

      <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        {/* sedning all the messages that the usechat hook returns here ai messages and the user messages */}
        <Messages messages={messages} />
      </div>
      <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} setInput={setInput} />
    </div>
  )

}
