/* eslint-disable no-undef */
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import reactLogo from './assets/react.svg'
import './App.css'
import '@chatscope/chat-ui-kit-react';	
// eslint-disable-next-line no-unused-vars
import {MainContainer, ChatContainer, MessageList, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'	


const API_KEY = "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";


function App() {
  
  const [typing, setTyping] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState([

    {
      message: "Hello",	
      sender: "ChatGPT"
    }
  ])

  // eslint-disable-next-line no-unused-vars
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    // store old messages / new messages

    const newMessages = [...messages, newMessage];

    // Update our messages state

    setMessages (newMessages)

    // set a typing indicator

    setTyping(true)

    // process message to chatGPT (send it over and see the response)
     
    await processMessageToChatGPT(newMessages)

  }

  async function processMessageToChatGPT() {

    let apiMessages = chatMessages.map((messageObject) => {
      let role ='';

      if (messageObject.sender === "ChatGPT") {
         role = "assistant"
      } else {
          role = "user"
      }

      return {
        role: role,
        content: messageObject.message
      }


  });

  // role: "user" -> a message from the user, "assistant" -> a message from ChatGPT
  // "system" -> generally one initial message from ChatGPT

  // eslint-disable-next-line no-unused-vars
  const systemMessage = {
    role: "system",
    content: "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible."
  }

  const apiRequestBody = {
    "model":"gpt-3.5-turbo",
    "messages" :[...apiMessages] // [message1,message2]
  }

  await fetch ('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
       "Authorization": "Bearer" + API_KEY,
       "Content-Type": "application/json"
    },

    body: JSON.stringify(apiRequestBody)


  }).then((data)=> {
    return data.json();

  }).then((data) => {
      console.log(data)
      console.log(data.choices[0].message.content);
      setMessages(
        [...chatMessages, { 
          message: data.choices[0].message.content,
          sender: "ChatGPT"
         }]  
      );
      setTyping(false);
  })

  return (
    
      <div className='App'>

        <div style={{ position: 'relative', height: '800px', width: '700px' }}>
           <MainContainer>
              <ChatContainer>
                <MessageList typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}>
                 
                 {messages.map((message, i) => {
                   // eslint-disable-next-line react/jsx-no-undef
                   return <Message key={i} model={message} />
                 })}

                </MessageList>


              </ChatContainer>

           </MainContainer>

        </div>
    
      </div>
  )
}

}

export default App
