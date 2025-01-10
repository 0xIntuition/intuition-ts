import { useState } from 'react'

import { Button, Input, ScrollArea } from '@0xintuition/1ui'

export function PreferenceChat({ preferenceName }: { preferenceName: string }) {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'Hey, loving this preference!' },
    {
      id: 2,
      user: 'Bob',
      text: 'Same here! Any tips on customizing it further?',
    },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, user: 'You', text: newMessage },
      ])
      setNewMessage('')
    }
  }

  return (
    <div className="h-[300px] flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{preferenceName} Chat</h3>
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-md">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <span className="font-bold">{message.user}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button variant="secondary" size="md" type="submit">
          Send
        </Button>
      </form>
    </div>
  )
}
