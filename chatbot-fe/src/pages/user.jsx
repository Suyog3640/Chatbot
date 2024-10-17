import './user.css';
import React, { useEffect, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';
import robot from '../images/Robot.png';
import user from '../images/User.png';
import { ThemeProvider } from 'styled-components';
import { useLocation } from 'react-router-dom';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

export function User() {
  const[steps, setSteps] = useState([]);
  
  //const apiUrl = 'http://localhost:4000';
  const apiUrl = 'https://chatbot-backend-two.vercel.app';

  // const location = useLocation();

  // Access the chatbotId from the location's state
  // const chatbotId = location.state?.chatbotId;

  const userId = sessionStorage.getItem('userId');
  const chatbotId = sessionStorage.getItem('chatbotId');

  async function fetchChats() {
    const res = await axios.post('http://localhost:4000/chatbot/getQuestions', {chatbotId: chatbotId});
    setSteps(res.data.questions);
      // delete message field if empty
    // var filterSteps = res.data.filter(step => {
    //   // Check if 'message' exists and is not an empty string
    //   if (!step.message || step.message.trim() === '' || step.message === undefined) {
    //     // If empty, remove the 'message' field
    //     delete step.message;
    //   } 
    //   return step;  
    // });

    // const filterSteps = res.data.map((step) => ({
    //   id: step.id || 'unknown', // Ensure 'id' exists
    //   message: step.message?.trim() || 'No message', // Ensure 'message' is valid
    //   trigger: step.trigger || undefined, // Optional: Handle trigger field
    //   end: step.end || false, // Ensure 'end' flag is handled
    // }));
    // const filterdSteps = filterSteps.map(({ _id, ...rest}) => rest);

    // const filterData = res.data.map(({ _id, __v, ...rest }) => rest);

    // var filterSteps = filterData.filter(step => {
    //   // Check if 'message' exists and is not an empty string
    //   if (!step.message || step.message.trim() === '' || step.message === undefined) {
    //     // If empty, remove the 'message' field
    //     // delete step.message;
    //     step.message = 'No message';
    //   } 
    //   return step;  
    // });
    // console.log(filterSteps);
    // console.log(res.data);
    // setSteps(res.data);
  }

  const handleEnd = ({ steps }) => {
    // Convert steps into an array
    const chatData = Object.keys(steps).map((key) => {
      const step = steps[key]; // Access each step using the key
      return {
        stepId: step.id,
        message: step.user ? step.value : step.message, // Handle user and bot messages
      };
    });
    
    // Send the chat data along with user ID to the backend
    axios.post(apiUrl + '/chat/addChat', { chatData, userId })
      .then((response) =>
        console.log('Chat saved:', response.data))
      .catch((error) =>
        console.error('Error saving chat:', error)
      );
  };

  useEffect(() => {
    fetchChats();
    // Insert the chatbot script dynamically when the component mounts
    // const script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.async = true;
    // script.innerHTML = `
    //   window.__ow = window.__ow || {};
    //   window.__ow.organizationId = "626de74a-a673-4e3d-b0fa-9a4145510fa1";
    //   window.__ow.template_id = "75036330-43e4-4e8d-853f-0ebb7a731a4c";
    //   window.__ow.integration_name = "manual_settings";
    //   window.__ow.product_name = "chatbot";   
    //   (function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
    //   var e={_q:[],_h:null,_v:"2.0",
    //   on:function(){i(["on",c.call(arguments)])},
    //   once:function(){i(["once",c.call(arguments)])},
    //   off:function(){i(["off",c.call(arguments)])},
    //   get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");
    //   return i(["get",c.call(arguments)])},
    //   call:function(){i(["call",c.call(arguments)])},
    //   init:function(){var n=t.createElement("script");
    //   n.async=!0,n.type="text/javascript",
    //   n.src="https://cdn.openwidget.com/openwidget.js",
    //   t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),
    //   n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
    //   `;
    //     document.body.appendChild(script);

    // // Cleanup: Remove the script when the component unmounts
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);
  // const steps = [
  //   {
  //     id: 'Greet',
  //     message: 'Hello, Welcome To Our Website!',
  //     trigger: 'Ask Name'
  //   },
  //   {
  //     id: 'Ask Name',
  //     message: 'Please Enter Your Name',
  //     trigger: 'waiting1'
  //   },
  //   {
  //     id: 'waiting1',
  //     user: true,
  //     trigger: 'Name'
  //   },
  //   {
  //     id: 'Name',
  //     message: 'Hi {previousValue}, Please select your issue',
  //     trigger: 'issues'
  //   },
  //   {
  //     id: 'issues',
  //     options: [
  //       { value: 'React', label: 'React', trigger: 'React' },
  //       { value: 'Angular', label: 'Angular', trigger: 'Angular' }
  //     ]
  //   },
  //   {
  //     id: 'React',
  //     message: 'Thanks for telling your react issue',
  //     end: true
  //   },
  //   {
  //     id: 'Angular',
  //     message: 'Thanks for telling your angular issue',
  //     end: true
  //   }
  // ]
  return (
    <div className='user-container'>
      <h2>Welcome User</h2>

      {/* <noscript>You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" 
        rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by 
        <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a>
      </noscript> */}

      {/* Chatbot section */}
      {
        steps.length > 0 && (
          <ChatBot
            steps={steps}
            floating={true}
            botDelay={2000}
            botAvatar={robot}
            userAvatar={user}
            handleEnd={handleEnd}
          />
        )
      }

      {/* Custom style */}
      {/* <ThemeProvider theme={theme}>
      {
        steps.length > 0 && (
          <ChatBot
            steps={steps}
            floating={true}
            botDelay={2000}
            botAvatar={robot}
            userAvatar={user}
            handleEnd={handleEnd}
          />
        )
      }
      </ThemeProvider> */}

    </div>
  )
}
