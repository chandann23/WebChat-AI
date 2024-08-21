"use client"

import { Button, Textarea } from "@nextui-org/react"
import { Send } from "lucide-react"
import { type useChat } from "ai/react"

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"]
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"]
type SetInput = ReturnType<typeof useChat>["setInput"]

interface ChatInputProps {
  input: string
  handleInputChange: HandleInputChange
  handleSubmit: HandleSubmit
  setInput: SetInput

}

export const ChatInput = ({ handleInputChange, handleSubmit, setInput, input }: ChatInputProps) => {
  return (
    <div className="z-10 bg-zinc-900 absolute bottom-0 left-0 w-full">

      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">

          <div className="relative flex flex-col w-full flex-grow p-4">
            <form
              className="relative"
              onSubmit={handleSubmit}
            >

              <Textarea
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit()
                    setInput("")


                  }
                }}
                minRows={4}
                autoFocus
                placeholder="Type your message here..."
                className="resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base" />

              <Button
                className="absolute z-10 border-border border right-2 bottom-2"
                size="sm"
                type="submit">
                <Send className="size-5 text-white" />

              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
