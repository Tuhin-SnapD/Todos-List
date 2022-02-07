import React from "react";
import Picture from '../tuhin.png';

export const About = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-24 col-md-8 mt-5">
                    <div className="aboutus">
                        <h2 className="aboutus-title">About</h2>
                        <p className="aboutus-text">Hello, I am Tuhin Chakrabarty, I am a inexperienced Web developer from VIT Vellore, This is a todo-list web application made using React.JS and bootstrap5</p>
                        <p className="aboutus-text"> What is it, you may ask? It's a list of tasks made by you, Tasks(Todos) you need to complete or things that you want to do. You can use this to do list in your home and personal life, or in the workplace. Having a list of everything you need to do written down in one place means you shouldn't forget anything important.</p>
                        <a className="aboutus-more" href="https://www.youtube.com/c/CodeWithHarry">Inspired From</a>
                        <span>{<br/>}
                        <a className="aboutus-more" href="https://github.com/Tuhin-SnapD">Other Projects</a>
                        </span>
                    </div>
                </div>
                <div className="col-sm-24 col-md-3  mt-5">
                    <div className="aboutus-banner">
                        <img src={Picture} width="320vh" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}