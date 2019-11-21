import React, { useState, useEffect } from 'react';

function TopUpButton() {

    const [isVisible, setIsVisible] = useState(true);
    let timer = 3;

    const resetTimer = function() {
        timer = 3;
        setIsVisible(true);
    }

    useEffect(() => {
        const tick = setInterval(() => {
            if(timer < 0) {
                setIsVisible(false);
            }
            else {
                timer--;
            }
        }, 1000)
        window.addEventListener('scroll', resetTimer, true)
    
        return function(){
            clearInterval(tick)
            window.removeEventListener('scroll', resetTimer, true)
        }
    }, [])

    let btnClass = isVisible ? "enif-visible" : "enif-unvisible";

    return (
        <a href="#aaa-top" className={`btn-top-up-link btn-top-up-mobile enif-hide-desktop ${btnClass}`}>
            <div className="btn-top-up">
                <i className="ri-arrow-up-s-line enif-pointer enif-f-1x"></i>
                <p>TOP</p>
            </div>
        </a>
    )
}

export default TopUpButton;