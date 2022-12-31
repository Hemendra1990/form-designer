import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';

function IntroPage() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/form-designer")
    }
    return (
        <div className="intro-page">
            <div className="intro-content">
                <img src="logo.png" alt="Logo"/>
                <h1>Welcome to Low Code Designer App</h1>
                <p>This is an awesome app that does amazing things.</p>
                <button onClick={handleClick}>Get Started</button>
            </div>
        </div>
    );
}

export default IntroPage;
