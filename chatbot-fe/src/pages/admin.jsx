import './admin.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Admin() {
    const [chats, setChats] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        message: '',
        trigger: '',
        user: false,
        end: false,
        options: []
    });

    const apiUrl = process.env.REACT_APP_API_URL;

    // async function fetchChats() {
    //     const res = await axios.get(apiUrl + '/chatbot/getQuestions');
    //     setChats(res.data);
    // }

    const [showUsers, setUsers] = useState([]);

    async function getAllUsers() {
        const res = await axios.get(`${apiUrl}/user/getUsers`);
        setUsers(res.data);
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // Create a new object with only the fields that have values
            // const filteredFormData = {
            //   ...formData,
            //   options: formData.options.filter(option => option.value || option.label || option.trigger) // Keep only options with at least one non-empty field
            // };

            // // Remove empty fields from formData
            // Object.keys(filteredFormData).forEach(key => {
            //   if (filteredFormData[key] === '' || (Array.isArray(filteredFormData[key]) && filteredFormData[key].length === 0)) {
            //     delete filteredFormData[key];
            //   }
            // });

            const data = {
                chatbotId: chatBotId,
                question: formData
            }

            await axios.post(`${apiUrl}/chatbot/addQuestion`, data);
            alert('Chat step added successfully!');
            setFormData({ id: '', message: '', trigger: '', user: false, end: false, options: [] });
        } catch (error) {
            console.error('Error adding chat step:', error);
            alert('Failed to add chat step.');
        }
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle changes to options
    const handleOptionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedOptions = [...formData.options];
        updatedOptions[index] = { ...updatedOptions[index], [name]: value };
        setFormData((prev) => ({
            ...prev,
            options: updatedOptions
        }));
    };

    // Add a new option
    const addOption = () => {
        setFormData((prev) => ({
            ...prev,
            options: [...prev.options, { value: '', label: '', trigger: '' }]
        }));
    };

    // Remove an option
    const removeOption = (index) => {
        const updatedOptions = formData.options.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            options: updatedOptions
        }));
    };

    useEffect(() => {
        // fetchChats();
        getAllUsers();
        getAllChatbots();
    }, []);

    const [showChatbotFormModel, setChatbotFormModel] = useState(false);
    const [showButton, setButton] = useState(true);

    const addChatBot = () => {
        setChatbotFormModel(true);
        setButton(false);
    }

    const [botName, setBotName] = useState('');
    const [userName, setUserName] = useState('');

    const onSubmitAddChatBot = async () => {   
        const data = {
            name: botName,
            userId: userName
        }
        try {
            const res = await axios.post(`${apiUrl}/chatbot/addChatbot`, data);
            console.log(res);
            console.log('Chatbot created');
            getAllChatbots();
            setChatbotFormModel(false);
            setButton(true);
        } catch (error) {
            console.log('Error');
        }
    }

    const [chatBots, setChatBots] = useState([]);
    const getAllChatbots = async () => {
        const res = await axios.get(`${apiUrl}/chatbot/getChatbots`);
        setChatBots(res.data);
    }


    const [showQuestionsFormModel, setQuestionsFormModel] = useState(false);
    const [chatBotId, setChatBotId] = useState();

    const showQuestionsForm = (id) => {
        setChatbotFormModel(false);
        setButton(false);
        setQuestionsFormModel(!showQuestionsFormModel)
        setChatBotId(id);
    }

    const handleCloseForm = () => {
        setQuestionsFormModel(false);
        setButton(true);
        setChatbotFormModel(false);
    }

    return (
        // <div className='admin-container'>
        //     <h2>Admin</h2>
        //     <div style={{ display: 'flex' }}>
        //         {showQuestionsFormModel && (
        //             <form className='styled-form' onSubmit={handleSubmit}>
        //                 <div>
        //                     <dl>
        //                         <dd><input type='text' name='id' placeholder='Name' value={formData.id} onChange={handleChange} /></dd>
        //                         <dd><input type='text' name='message' placeholder='Message' value={formData.message} onChange={handleChange} /></dd>
        //                         <dd><input type='text' name='trigger' placeholder='Trigger' value={formData.trigger} onChange={handleChange} /></dd>
        //                         <dd>
        //                             <label>User Input?</label>
        //                             <input className='chechbox-input' type='checkbox' name='user' checked={formData.user} onChange={handleChange} />
        //                         </dd>
        //                         <dd>
        //                             <label>End Step?</label>
        //                             <input className='chechbox-input' type='checkbox' name='end' checked={formData.end} onChange={handleChange} />
        //                         </dd>

        //                         <div className='mb-2'>
        //                             <dd>Options:</dd>
        //                             {formData.options.map((option, index) => (
        //                                 <div key={index} className='option-container'>
        //                                     <input
        //                                         type='text'
        //                                         name='value'
        //                                         placeholder='Value'
        //                                         value={option.value}
        //                                         onChange={(e) => handleOptionChange(index, e)}
        //                                         required
        //                                     />
        //                                     <input
        //                                         type='text'
        //                                         name='label'
        //                                         placeholder='Label'
        //                                         value={option.label}
        //                                         onChange={(e) => handleOptionChange(index, e)}
        //                                         required
        //                                     />
        //                                     <input
        //                                         type='text'
        //                                         name='trigger'
        //                                         placeholder='Trigger'
        //                                         value={option.trigger}
        //                                         onChange={(e) => handleOptionChange(index, e)}
        //                                         required
        //                                     />
        //                                     <button type='button' onClick={() => removeOption(index)}>Remove</button>
        //                                 </div>
        //                             ))}
        //                             <button type='button' onClick={addOption}>Add Option</button>
        //                         </div>
        //                         <button onClick={handleSubmit}>Add Question</button>
        //                     </dl>
        //                 </div>
        //             </form>
        //         )}
        //         {/* <form className='styled-form' onSubmit={handleSubmit}>
        //             <div>
        //                 <dl>
        //                     <dd><input type='text' name='id' placeholder='Name' value={formData.id} onChange={handleChange} /></dd>
        //                     <dd><input type='text' name='message' placeholder='Message' value={formData.message} onChange={handleChange} /></dd>
        //                     <dd><input type='text' name='trigger' placeholder='Trigger' value={formData.trigger} onChange={handleChange} /></dd>
        //                     <dd>
        //                         <label>User Input?</label>
        //                         <input className='chechbox-input' type='checkbox' name='user' checked={formData.user} onChange={handleChange} />
        //                     </dd>
        //                     <dd>
        //                         <label>End Step?</label>
        //                         <input className='chechbox-input' type='checkbox' name='end' checked={formData.end} onChange={handleChange} />
        //                     </dd>

        //                     <div className='mb-2'>
        //                         <dd>Options:</dd>
        //                         {formData.options.map((option, index) => (
        //                             <div key={index} className='option-container'>
        //                                 <input
        //                                     type='text'
        //                                     name='value'
        //                                     placeholder='Value'
        //                                     value={option.value}
        //                                     onChange={(e) => handleOptionChange(index, e)}
        //                                     required
        //                                 />
        //                                 <input
        //                                     type='text'
        //                                     name='label'
        //                                     placeholder='Label'
        //                                     value={option.label}
        //                                     onChange={(e) => handleOptionChange(index, e)}
        //                                     required
        //                                 />
        //                                 <input
        //                                     type='text'
        //                                     name='trigger'
        //                                     placeholder='Trigger'
        //                                     value={option.trigger}
        //                                     onChange={(e) => handleOptionChange(index, e)}
        //                                     required
        //                                 />
        //                                 <button type='button' onClick={() => removeOption(index)}>Remove</button>
        //                             </div>
        //                         ))}
        //                         <button type='button' onClick={addOption}>Add Option</button>
        //                     </div>
        //                     <button onClick={handleSubmit}>Add Question</button>
        //                 </dl>
        //             </div>
        //         </form> */}

        //         {/* Add Chat Bot */}
        //         <span style={{ padding: '5px', background: 'red', height: '40px', cursor: 'pointer' }} onClick={addChatBot}>Add chatbot</span>

        //         {showChatbotFormModel && (
        //             <div>
        //                 <div>
        //                     <input type="text" name="name" onChange={(e) => setBotName(e.target.value)} placeholder='Enter a chatbot' required />
        //                     {/* <div class="dropdown">
        //                     <span>Select User</span>
        //                     <div class="dropdown-content" >
        //                         {showUsers.map((user) => (
        //                             <p style={{ cursor: 'pointer' }} onClick={(e) => setUserName(user._id)} required>{user.name}</p>
        //                         ))}
        //                     </div>
        //                 </div> */}

        //                     <select className='dropdown'>
        //                         {showUsers.map((user) => (
        //                             <option value={user._id}>{user.name}</option>
        //                         ))
        //                         }
        //                     </select>
        //                 </div>
        //                 <button onClick={onSubmitAddChatBot}>Submit</button>
        //             </div>
        //         )

        //         }

        //         <div style={{ display: 'flex', flexDirection: 'column' }}>
        //             {
        //                 chatBots.map((bot) => (
        //                     <span onClick={(e) => showQuestionsForm(bot._id)}>{bot.name}</span>
        //                 ))
        //             }
        //         </div>

        //     </div>

        //     <div className='chat-list-container'>
        //         <h3>Existing Questions</h3>
        //         <ul>
        //             {
        //                 chats.map(chat =>
        //                     <li key={chat._id}>
        //                         <strong>Name: </strong>{chat.id}
        //                         <strong>Message: </strong>{chat.message}
        //                         <strong>Next Message:</strong> {chat.trigger}
        //                         <strong>User Input:</strong>{chat.user ? 'True' : 'False'}
        //                         <strong>End Step:</strong>{chat.end ? 'True' : 'False'}
        //                         <strong>Options:</strong>{chat.options.map(option => (
        //                             <div key={option.label}>
        //                                 <strong>Label:</strong>{option.label}
        //                                 <strong>Value:</strong>{option.value}
        //                                 <strong>Trigger:</strong>{option.trigger}
        //                             </div>
        //                         ))}
        //                     </li>
        //                 )
        //             }
        //         </ul>
        //     </div>
        // </div>
        <div className='admin-container'>
            <h2>Admin</h2>
            <div className='content-wrapper'>
                {showQuestionsFormModel && (
                    <form className='styled-form' onSubmit={handleSubmit}>
                        <div>
                            <div className='form-header'>
                                <h3>Add Question</h3>
                                <button type='submit' className="close-button" onClick={handleCloseForm}>✕</button>
                            </div>
                            <dl>
                                <dd><input type='text' name='id' placeholder='Name' value={formData.id} onChange={handleChange} /></dd>
                                <dd><input type='text' name='message' placeholder='Message' value={formData.message} onChange={handleChange} /></dd>
                                <dd><input type='text' name='trigger' placeholder='Trigger' value={formData.trigger} onChange={handleChange} /></dd>
                                <dd>
                                    <label>User Input?</label>
                                    <input className='chechbox-input' type='checkbox' name='user' checked={formData.user} onChange={handleChange} />
                                </dd>
                                <dd>
                                    <label>End Step?</label>
                                    <input className='chechbox-input' type='checkbox' name='end' checked={formData.end} onChange={handleChange} />
                                </dd>

                                <div className='mb-2'>
                                    <dd>Options:</dd>
                                    {formData.options.map((option, index) => (
                                        <div key={index} className='option-container'>
                                            <input
                                                type='text'
                                                name='value'
                                                placeholder='Value'
                                                value={option.value}
                                                onChange={(e) => handleOptionChange(index, e)}
                                                required
                                            />
                                            <input
                                                type='text'
                                                name='label'
                                                placeholder='Label'
                                                value={option.label}
                                                onChange={(e) => handleOptionChange(index, e)}
                                                required
                                            />
                                            <input
                                                type='text'
                                                name='trigger'
                                                placeholder='Trigger'
                                                value={option.trigger}
                                                onChange={(e) => handleOptionChange(index, e)}
                                                required
                                            />
                                            <button type='button' className='styled-form-button' onClick={() => removeOption(index)}>Remove</button>
                                        </div>
                                    ))}
                                    <button type='button' className='styled-form-button' onClick={addOption}>Add Option</button>
                                </div>
                                <button className='styled-form-button' onClick={handleSubmit}>Add Question</button>
                            </dl>
                        </div>
                    </form>
                )}
                {/* <span style={{ padding: '5px', background: 'red', height: '40px', cursor: 'pointer' }} onClick={addChatBot}>Add chatbot</span> */}
                {showButton && (
                    <span className='addbot' onClick={addChatBot}>Add Chatbot</span>
                )}
                {/* Chatbot Form */}
                {showChatbotFormModel && (
                    <div className='chatbot-form'>
                        <div className='form-header'>
                                <h3>Add Chatbot</h3>
                                <button type='submit' className="close-button" onClick={handleCloseForm}>✕</button>
                        </div>
                        <input type="text" name="name" onChange={(e) => setBotName(e.target.value)} placeholder='Enter chatbot name' required
                        />
                        <select className='user-select-dropdown' onChange={(e) => setUserName(e.target.value)}>
                            <option value="">Select User</option>
                            {showUsers.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <button className='submit-button' onClick={onSubmitAddChatBot}>Submit</button>
                    </div>
                )}

                {/* Chatbot List */}
                <div className='chatbot-list'>
                    <h3>Chatbots</h3>
                    {chatBots.map((bot) => (
                        <span key={bot._id} onClick={() => showQuestionsForm(bot._id)}>
                            {bot.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Existing Questions Section */}
            {/* <div className='chat-list-container'>
        <h3>Existing Questions</h3>
        <ul>
            {chats.map(chat => (
                <li key={chat._id}>
                    <strong>Name:</strong> {chat.id} <br />
                    <strong>Message:</strong> {chat.message} <br />
                    <strong>Next Message:</strong> {chat.trigger} <br />
                    <strong>User Input:</strong> {chat.user ? 'True' : 'False'} <br />
                    <strong>End Step:</strong> {chat.end ? 'True' : 'False'} <br />
                    <strong>Options:</strong>
                    {chat.options.map(option => (
                        <div key={option.label}>
                            <strong>Label:</strong> {option.label} <br />
                            <strong>Value:</strong> {option.value} <br />
                            <strong>Trigger:</strong> {option.trigger} <br />
                        </div>
                    ))}
                </li>
            ))}
        </ul>
    </div> */}
        </div>

    );
};
