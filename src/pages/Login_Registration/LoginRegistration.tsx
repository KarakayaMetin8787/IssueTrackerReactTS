import { useNavigate } from "react-router-dom";
import "./LoginRegistration.scss"
import React, { useState, ChangeEvent, useEffect } from "react";
import { REACT_APP_BACKEND_URL } from "../../api/api.tsx";
import { useLoginContext } from "../../context/LoginContext.tsx";
import Modal from "../../components/Modal/Modal.tsx";
import { useModalContext } from "../../context/ModalContext.tsx";

const LoginRegistration = () => {

    const { changeClass, setChangeClass } = useModalContext();
    const [errorState, setErrorState] = useState<string>("")
    const backanedURL = REACT_APP_BACKEND_URL;
    const navigate = useNavigate()
    
    // ================================ useStates für Login ===================
    
    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const { fetchLoginData, setFetchLoginData } = useLoginContext();
    const [loginEmailInput, setLoginEmailInput] = useState<string | null>("");
    const [loginPasswortInput, setLoginPasswortInput] = useState<string | null>("");
    
// =================== useStates für Registrierung =========================
    
    const [registerVorname, setRegisterVorname] = useState<string | null>("");
    const [registerNachname, setRegisterNachname] = useState<string | null>("");
    const [registerEmail, setRegisterEmail] = useState<string | null>("");
    const [registerEmailWdh, setRegisterEmailWdh] = useState<string | null>("");
    const [registerPasswort, setRegisterPasswort] = useState<string | null>("");
    const [registerPasswortWdh, setRegisterPasswortWdh] = useState<string | null>("");
    const [registerFrage, setRegisterFrage] = useState<string | null>("");
    const [registerAntwort, setRegisterAntwort] = useState<string | null>("");
    
    //========================== useStates für Passwort vergessen =================
    
    const [hideStateForgotPwModal, setHideStateForgotPwModal] = useState("hide")
    const [hideStateChangePwModal, setHideStateChangePwModal] = useState("hide")
    const [passwortVergessenPasswort, setPasswortVergessenPasswort] = useState<string | null>("");
    const [passwortVergessenPasswortWdh, setPasswortVergessenPasswortWdh] = useState<string | null>("");
    const [passwortVergessenFrage, setPasswortVergessenFrage] = useState<string | null>("");
    const [passwortVergessenAntwort, setPasswortVergessenAntwort] = useState<string | null>("");

// ================================ Login ============================

    const handleLoginSubmit = (event: React.FormEvent) => {
        event.preventDefault(); 
        const sendLoginData = async () => {
            try {
                const lowerCasedEmail = loginEmailInput?.toLowerCase()
                const response = await fetch(`${backanedURL}/api/v1/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: lowerCasedEmail, passwort: loginPasswortInput })
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const responseData = await response.json()
                    navigate("/usertypeselect")
                    setFetchLoginData(responseData.data.user)
                    return
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorState("Email oder Passwort sind falsch");
                setChangeClass("ModalVisibility");
            }
        };
        sendLoginData();
    };

// ============================== Registration ==============================

const handleRegistrationSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Check for empty fields
    if (
        registerVorname?.length === 0 ||
        registerNachname?.length === 0 ||
        registerEmail?.length === 0 ||
        registerEmailWdh?.length === 0 ||
        registerPasswort?.length === 0 ||
        registerPasswortWdh?.length === 0 ||
        registerFrage?.length === 0 ||
        registerAntwort?.length === 0
    ) {
        setErrorState("Bitte alle Felder ausfüllen");
        setChangeClass("ModalVisibility");
        return;
    }
    // Check for matching email and password
    if (registerEmail === registerEmailWdh && registerPasswort === registerPasswortWdh) {
        const lowerCasedEmail = registerEmail?.toLowerCase()
        try {
            const response = await fetch(`${backanedURL}/api/v1/users/register`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    register: {
                        vorname: registerVorname,
                        nachname: registerNachname,
                        email: lowerCasedEmail,
                        passwort: registerPasswort,
                        frage: registerFrage,
                        antwort: registerAntwort,
                    },
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                setErrorState("Registrierung erfolgeich");
                setChangeClass("ModalVisibility");
                switchLoginRegister()
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorState("Email existiert bereits");
            setChangeClass("ModalVisibility");
        }
    } else {
        setErrorState("Email oder Passwort sind nicht identisch");
        setChangeClass("ModalVisibility");
        return
    }
};

// ============================== handle input field values ==============
    
    const showPassword = (id: string) => {
        const passwordInput = document.getElementById(id) as HTMLInputElement;
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }

    const trimAllWhitespace = (str: string) => str.replace(/^\s+|\s+$/g, ''); // Regular expression to trim all 

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginPasswortInput(trimAllWhitespace(event.target.value));
    };
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginEmailInput(trimAllWhitespace(event.target.value));
    };
    const handleEmailChangeRegister = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterEmail(trimAllWhitespace(event.target.value));
    };
    const handleEmailChangeRegisterWdh = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterEmailWdh(trimAllWhitespace(event.target.value));
    };
    const handleVornameChangeRegsiter = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterVorname(trimAllWhitespace(event.target.value));
    };
    const handleNachnameChangeRegister = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterNachname(trimAllWhitespace(event.target.value));
    };
    const handlePasswortChangeRegister = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterPasswort(trimAllWhitespace(event.target.value));
    };
    const handlePasswortChangeRegisterWdh = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterPasswortWdh(trimAllWhitespace(event.target.value));
    };
    const handleFrageChangeRegister = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterFrage(trimAllWhitespace(event.target.value));
    };
    const handleAntwortChangeRegister = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterAntwort(trimAllWhitespace(event.target.value));
    };

//============================ handling classchange for animation ==========

useEffect(() => {
    // You can perform any side effects here when isLoginVisible changes
    const loginContainer = document.querySelector(".loginContainer");
    const registrationContainer = document.querySelector(".registrationContainer");

    if (loginContainer && registrationContainer) {
        if (isLoginVisible) {
            loginContainer.classList.remove("hide");
            registrationContainer.classList.add("hide");
        } else {
            loginContainer.classList.add("hide");
            registrationContainer.classList.remove("hide");
        }
    }
}, [isLoginVisible]);

const switchLoginRegister = () => {
    setIsLoginVisible((prevValue) => !prevValue);
};

//========================= forgot password logic ===============================

const showPasswordForgotModal = () => {
    setHideStateForgotPwModal("")
}

const showPasswordChangeModal = () => {
    setHideStateChangePwModal("")
}

    return (
    <div className="loginRegistrationContainer">
        <div className="floatMessage">
            <h1>Projektverwaltungssystem</h1>
            <h2>ease up your taskflow</h2>
        </div>
        <div className={`loginContainer ${isLoginVisible ? "" : "hide"}`}>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <input 
                    onChange={handleEmailChange}
                    type="text" 
                    placeholder="Email" />
                <label className="passwordInputField">
                    <input
                        onChange={handlePasswordChange}
                        type="password"
                        placeholder="Passwort"
                        id="loginPasswordInput"/>
                    <input
                        type="checkbox"
                        onChange={() => showPassword("loginPasswordInput")}
                        className="passwordCheckbox"/>
                </label>
                <input 
                    type="submit" 
                    value="Login"/>
            </form>
            <p className="forgotPW" onClick={() => showPasswordForgotModal()}>Passwort vergessen?</p>
        </div>
        <div className="switchChangeVisibility" onClick={switchLoginRegister}>
        {isLoginVisible ? "Registrieren" : "Login"}
        </div>
        <div className="triangle"></div>
        <div className={`registrationContainer ${isLoginVisible ? "hide" : ""}`}>
            <h2>Registrieren</h2>
            <form onSubmit={handleRegistrationSubmit}>
                <input
                    onChange={handleVornameChangeRegsiter}
                    type="text" 
                    placeholder="Vorname"/>
                <input
                    onChange={handleNachnameChangeRegister}
                    type="text" 
                    placeholder="Nachname"/>
                <input
                    onChange={handleEmailChangeRegister}
                    type="email" 
                    placeholder="gültige Email-Adresse"/>
                <input
                    onChange={handleEmailChangeRegisterWdh}
                    type="email" 
                    placeholder="Email wiederholen"/>
                <label className="registrationPassword">
                    <input
                        onChange={handlePasswortChangeRegister}
                        type="password" 
                        placeholder="Wähle ein Passwort"
                        id="registrationPassword"/>
                    <input
                        type="checkbox"
                        onChange={() => showPassword("registrationPassword")}
                        className="passwordCheckbox"/>
                </label>
                <label className="registrationPasswordRepeat">
                    <input 
                        onChange={handlePasswortChangeRegisterWdh}
                        type="password" 
                        placeholder="Passwort wiederholen"
                        id="registrationPasswordRepeat"/>
                    <input
                        type="checkbox"
                        onChange={() => showPassword("registrationPasswordRepeat")}
                        className="passwordCheckbox"/>
                </label>
                <p>Sollten Sie Ihr Passwort jemals vergessen, kann mit folgender Frage und Antwort ein neues Passwort gesetzt werden.</p>
                <input
                    onChange={handleFrageChangeRegister}
                    type="text" 
                    placeholder="Frage"/>
                <label className="answerToQuestion">
                    <input
                        onChange={handleAntwortChangeRegister}
                        type="password" 
                        placeholder="Antwort"
                        id="answerToQuestion"/>
                    <input
                        type="checkbox"
                        onChange={() => showPassword("answerToQuestion")}
                        className="passwordCheckbox"/>
                </label>
                <input 
                    type="submit" 
                    value="Registrieren"/>
            </form>
        </div>
        <Modal Infotext={errorState}/>
        <div className={`forgotPwModal ${hideStateForgotPwModal}`}>
            <p>Bitte Email und die dazugehörige Sicherheitsfrage + Antwort eingeben (Groß/Kleinschreibung beachten!):</p>
            <input type="email" placeholder="Email" name="" id="" />
            <input type="text" placeholder="Frage" name="" id="" />
            <input type="text" placeholder="Antwort" name="" id="" />
            <button onClick={() => showPasswordChangeModal()}>OK</button>
        </div>
        <div className={`modalChangePassword ${hideStateChangePwModal}`}>
            <p>Passwort ändern:</p>
            <input type="password" placeholder="Neues Passwort" name="" id="" />
            <input type="password" placeholder="Neues Passwort wiederholen" name="" id="" />
            <button>OK</button>
        </div>
    </div>
    );
};

export default LoginRegistration;
