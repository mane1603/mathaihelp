import React, { useEffect, useState } from "react";
import "./AttempsLeft.css";

const AttempsLeft: React.FC = () => {
    const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

    useEffect(() => {
        // Function to fetch the initial attempts left when component mounts
        const fetchAttemptsLeft = async () => {
            try {
                chrome.storage.local.get(["token"], async (result) => {
                    if (result.token) {
                        const response = await fetch(`http://localhost:5555/users/${result.token}/attempts`);
                        if (response.ok) {
                            const data = await response.json();
                            setAttemptsLeft(data.attemptsLeft);
                        } else {
                            console.error("Failed to fetch attempts:", response.statusText);
                            setAttemptsLeft(null);
                        }
                    } else {
                        console.error("No token found");
                        setAttemptsLeft(null);
                    }
                });
            } catch (error) {
                console.error("Error fetching attempts left:", error);
                setAttemptsLeft(null);
            }
        };

        fetchAttemptsLeft();

        // Listen for changes to `attemptsLeft` in Chrome storage
        const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
            if (changes.lastScreenShot) {
                fetchAttemptsLeft();
            }
        };

        // Add listener for storage changes
        chrome.storage.onChanged.addListener(handleStorageChange);

        // Clean up listener on component unmount
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);

    return (
        <div className="math-help-ai-attemps-left">
            <svg
                width="25"
                height="25"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.3333 7.91669C10.3418 7.91669 7.91663 10.3418 7.91663 13.3334V16.6667C7.91663 17.357 7.35698 17.9167 6.66663 17.9167C5.97627 17.9167 5.41663 17.357 5.41663 16.6667V13.3334C5.41663 8.9611 8.96104 5.41669 13.3333 5.41669H16.6666C17.357 5.41669 17.9166 5.97633 17.9166 6.66669C17.9166 7.35704 17.357 7.91669 16.6666 7.91669H13.3333Z"
                    fill="white"
                />
                <path
                    d="M6.66663 22.0834C7.35698 22.0834 7.91663 22.643 7.91663 23.3334V26.6667C7.91663 29.6582 10.3418 32.0834 13.3333 32.0834H16.6666C17.357 32.0834 17.9166 32.643 17.9166 33.3334C17.9166 34.0237 17.357 34.5834 16.6666 34.5834H13.3333C8.96104 34.5834 5.41663 31.0389 5.41663 26.6667V23.3334C5.41663 22.643 5.97627 22.0834 6.66663 22.0834Z"
                    fill="white"
                />
                <path
                    d="M33.3333 22.0834C34.0236 22.0834 34.5833 22.643 34.5833 23.3334V26.6667C34.5833 31.0389 31.0389 34.5834 26.6666 34.5834H23.3333C22.6429 34.5834 22.0833 34.0237 22.0833 33.3334C22.0833 32.643 22.6429 32.0834 23.3333 32.0834H26.6666C29.6582 32.0834 32.0833 29.6582 32.0833 26.6667V23.3334C32.0833 22.643 32.6429 22.0834 33.3333 22.0834Z"
                    fill="white"
                />
                <path
                    d="M23.3333 5.41669C22.6429 5.41669 22.0833 5.97633 22.0833 6.66669C22.0833 7.35704 22.6429 7.91669 23.3333 7.91669H26.6666C29.6582 7.91669 32.0833 10.3418 32.0833 13.3334V16.6667C32.0833 17.357 32.6429 17.9167 33.3333 17.9167C34.0236 17.9167 34.5833 17.357 34.5833 16.6667V13.3334C34.5833 8.9611 31.0389 5.41669 26.6666 5.41669H23.3333Z"
                    fill="white"
                />
            </svg>
            <p>
                Free <span>{attemptsLeft !== null ? attemptsLeft : "-"}</span>
            </p>
        </div>
    );
};

export default AttempsLeft;
