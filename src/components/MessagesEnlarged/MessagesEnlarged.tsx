import { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { REACT_APP_BACKEND_URL } from "../../api/api";
import closingIcon from "../../assets/images/close.svg";
// import io from "socket.io-client";
import "./MessagesEnlarged.scss"


const MessagesEnlarged = ({ Condition }) => {
    
    const { fetchLoginData } = useLoginContext();    
    
    // if (!fetchLoginData) {
        //     return null; // evtl ladebildschirm hier hinzufügen?
        // }
        const backanedURL = REACT_APP_BACKEND_URL;
        const [fetchMessageFromData, setFetchMessageFromData] = useState()
        const [fetchMessageToData, setFetchMessageToData] = useState()
        const [fetchUserData, setFetchUserData] = useState()
        const [selectEmailValue, setSelectEmailValue] = useState("---")
        const [textareaValue, setTextareaValue] = useState("")
        const [triggerSubmit, setTriggerSubmit] = useState(1)
        const [changeClass, setChangeClass] = useState("")
        // const socket = io(backanedURL)
    
    useEffect(() => {
        if (changeClass === "") {
            setChangeClass("hide")
        }
    }, [Condition])

    //==================== socket.io for realtime server update ================
    // useEffect(() => {
    //     // Listen for 'newMessage' event
    //     socket.on('newMessage', (data) => {
    //         console.log('New message received:', data);
    //         // Handle the new message data as needed, e.g., update state
    //         // Example: setFetchMessageFromData((prevData) => [...prevData, data]);
    //     });

    //     // Clean up the socket connection when the component unmounts
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [socket]);

    useEffect(() => {
        setChangeClass("")
    },[])

    const hideWindow = () => {
        setChangeClass("")
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch(`${backanedURL}/api/v1/users/get`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: fetchLoginData?.email })
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const responseData = await response.json()
                    setFetchUserData(responseData.data)
                    return
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getUserData()
    },[])

    useEffect(() => {
        if (selectEmailValue !== "---" && fetchLoginData !== null ) {
            const getMessagesData = async () => {
                try {
                    const response = await fetch(`${backanedURL}/api/v1/messages/get`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ from: fetchLoginData?.email, to: selectEmailValue })
                    })
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    } else {
                        const responseData = await response.json()
                        setFetchMessageFromData(responseData.data)
                        try {
                            const response = await fetch(`${backanedURL}/api/v1/messages/get`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ from: selectEmailValue, to: fetchLoginData?.email })
                            })
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            } else {
                                const responseData = await response.json()
                                setFetchMessageToData(responseData.data)
                            }
                        } catch (error) {
                            console.error('Error fetching data:', error);
                        }
                        return
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            getMessagesData()
            const updateInterval = setInterval(() => {
                getMessagesData();
            }, 1000);
            // Clean up the interval when the component is unmounted
            return () => clearInterval(updateInterval);
        }
    },[selectEmailValue])

    useEffect(() => {
        if (selectEmailValue !== "---" && fetchLoginData !== null ) {
        const submitNewMessage = async () => {
            try {
                const response = await fetch(`${backanedURL}/api/v1/messages/post`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ from: fetchLoginData?.email, to: selectEmailValue, message:[{content: textareaValue, timestamps: new Date().getTime()}] })
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const responseData = await response.json()
                    console.log(responseData);
                    return
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        submitNewMessage()
    }
    },[triggerSubmit])

    const settingFetchValue = (value) => {
        setSelectEmailValue(value)
        setFetchMessageFromData("");
        setFetchMessageToData("")
    }

    const gettingTextareaValue = (value) => {
        setTextareaValue(value)
    }

    const triggerUseEffect = () => {
        if (triggerSubmit === 1) {
            setTriggerSubmit(0)
        } else {
            setTriggerSubmit(1)
        }
    }

    return ( 
        <div className={`MessagesEnlargedContainer ${changeClass}`}>
            <img src={closingIcon} alt="icon" onClick={() => hideWindow()} />
            <label>Chat mit: <select onChange={(event) => settingFetchValue(event.target.value)} name="" id="">
                <option value="---">---</option>
                {fetchUserData?.map((userData) => (
                    <option key={userData.email} value={userData.email}>{userData.email}</option>
                ))}
            </select></label>
            <div className="MessagesGridContainer">
                <div className="pAndDivContainer">
                    <p>Sie haben geschrieben:</p>
                    <div className="TextboxDivs" ref={(el) => { el && (el.scrollTop = el.scrollHeight); }}>
                        {fetchMessageFromData?.message?.map((contents) => (
                            <p><span style={{ color: 'grey', fontStyle: 'italic' }}>{new Date(contents.timestamp).toLocaleString('de-DE', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            })}: </span>{contents.content}</p>
                        ))}
                    </div>
                </div>
                <div className="pAndDivContainer">
                    <p>{selectEmailValue} schreibt:</p>
                    <div className="TextboxDivs" ref={(el) => { el && (el.scrollTop = el.scrollHeight); }}>
                    {fetchMessageToData?.message?.map((contents) => (
                            <p><span style={{ color: 'grey', fontStyle: 'italic' }}>{new Date(contents.timestamp).toLocaleString('de-DE', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            })}: </span>{contents.content}</p>
                        ))}
                    </div>
                </div>
                <div className="textAndSubmitContainer">
                    <textarea className="textareMessages" cols="30" rows="4" value={textareaValue} onChange={(event) => gettingTextareaValue(event.target.value)}></textarea>
                    <input className="submitButtonMessages" type="submit" value="Send" onClick={() => triggerUseEffect()} />
                </div>
            </div>
        </div>
    );
}
 
export default MessagesEnlarged;