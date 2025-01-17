import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./Header.css";
import axios from "axios";

interface ICompProps {
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<ICompProps> = (props) => {
  return (
      <div className="math-help-ai-header">
        <img
            src="../../../public/header_logo.png"
            alt=""
            className="math-help-ai-header_logo"
        />
        <LogIn auth={props.auth} setAuth={props.setAuth} />
      </div>
  );
};

const LogIn: React.FC<ICompProps> = (props) => {
  const [localToken, setLocalToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["token"], function (result) {
      if (result.token) {
        setLocalToken(result.token);
        setIsLoggedIn(true);
      }
    });
  }, []);

  let hasSent = false;
  const handleAuth = () => {
    let retryCount = 0;
    const maxRetries = 3;
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function send(tabs) {
        if (tabs[0].id && !hasSent && retryCount < maxRetries) {
          const response = await chrome.tabs.sendMessage(tabs[0].id, {
            type: "startAuth",
          });

          retryCount++;
          alert(response.redirectUrl)
          if (response && response.success) {
            hasSent = true;
            console.log("Authenticated:", response.redirectUrl);
          } else if (chrome.runtime.lastError && !hasSent) {
            setTimeout(() => send(tabs), 400);
            console.log("Message sent successfully: ", "startAuth ");
          }
        } else {
          console.log("No response No errors Header:58:12");
        }
      }
    );
  };

  function handleLogOut() {
    chrome.runtime.sendMessage({ type: "logout" }, (response) => {
      if (response?.success) {
        console.log("Logout handled in background script");
        setIsLoggedIn(false);
        props.setAuth(false); // Update the authentication state
      } else {
        console.error("Failed to log out.");
      }
    });
  }

  return (
    <>
      {props.auth || isLoggedIn ? (
        <button className="math-help-ai-login_button" onClick={handleLogOut}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 2.25C4.37665 2.25 2.25 4.37665 2.25 7V17C2.25 19.6234 4.37665 21.75 7 21.75H9C11.0711 21.75 12.75 20.0711 12.75 18C12.75 17.5858 12.4142 17.25 12 17.25C11.5858 17.25 11.25 17.5858 11.25 18C11.25 19.2426 10.2426 20.25 9 20.25H7C5.20507 20.25 3.75 18.7949 3.75 17V7C3.75 5.20507 5.20507 3.75 7 3.75H9C10.2426 3.75 11.25 4.75736 11.25 6C11.25 6.41421 11.5858 6.75 12 6.75C12.4142 6.75 12.75 6.41421 12.75 6C12.75 3.92893 11.0711 2.25 9 2.25H7Z"
              fill="white"
            />
            <path
              d="M19.5303 9.46967C19.2374 9.17678 18.7626 9.17678 18.4697 9.46967C18.1768 9.76256 18.1768 10.2374 18.4697 10.5303L19.1893 11.25H11C10.5858 11.25 10.25 11.5858 10.25 12C10.25 12.4142 10.5858 12.75 11 12.75H19.1893L18.4697 13.4697C18.1768 13.7626 18.1768 14.2374 18.4697 14.5303C18.7626 14.8232 19.2374 14.8232 19.5303 14.5303L21.5303 12.5303C21.671 12.3897 21.75 12.1989 21.75 12C21.75 11.8011 21.671 11.6103 21.5303 11.4697L19.5303 9.46967Z"
              fill="white"
            />
          </svg>
        </button>
      ) : (
        <button className="math-help-ai-login_button" onClick={handleAuth}>
          Sign in
        </button>
      )}
    </>
  );
};

export default Header;
