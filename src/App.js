import { GoogleGenerativeAI } from "@google/generative-ai";

import './App.css';
import chatlogo from './assets/chatgpt.svg';
import add from './assets/add-30.png';
import msg from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg'
import send from './assets/send.svg';
import user from './assets/user-icon.png';
import chatimg from './assets/chatgptLogo.svg';
import { useState } from "react";
function App() {

  const API_KEY = process.env.REACT_APP_API_KEY;

  const [promptInput, setPromptInput] = useState('')
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([])

  const fetchAPI = async () => {

    setLoading(true);

    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(promptInput);
    const response = await result.response;
    const text = response.text();

    setChats((prev) => prev.concat({ promptInput, response: text }))

    setPromptInput("")
    setLoading(false)
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className="Upper">
          <div className="upperTop"><img src={chatlogo} alt="logo " className="logo" /><span className="Brand">Chat App</span> </div>
          <br></br>
          <button className="Midbutton"><img src={add} alt="" className="addBtn" />New Chat</button>
          <div className="upperbottom">
            <button className="query"><img src={msg} alt="" />What is programming?</button>
            <button className="query"><img src={msg} alt="" />What is API?</button>
          </div>
        </div>
        <div className="Lower">
          <div className="listitems"><img src={home} alt="" className="listitemimg" />Home</div>
          <div className="listitems"><img src={saved} alt="" className="listitemimg" />Saved</div>


        </div>

      </div>
      <div className="main">
        {
          chats.map((chat, id) => (

            <div key={id} className='chats'>
              <div className='chat'>
                <img src={user} alt=" " className='chatimage' />
                <p className='txt'>{chat.promptInput}</p>
              </div>
              <div className='chat bot'>
                <img src={chatimg} alt=" " className='chatimage' />
                <p className='txt'> {chat.response} </p>
              </div>

            </div>
          ))
        }
        <div className='chatfooter'>
          <div className="inp">
            <input onChange={e => setPromptInput(e.target.value)} value={promptInput} type="text" placeholder="Send a message" />
            <button onClick={fetchAPI} className='send'><img src={send} alt="send" className="send" /></button>
          </div>
          <p>
            {
              loading ? "Loading..." :
                "It may produce false results."
            }
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;
