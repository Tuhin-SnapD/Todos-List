import React from "react";
import Picture from '../tuhin.png';

export const About = () => {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-8">
                    <section className="aboutus">
                        <h2 className="aboutus-title">About</h2>
                        <p className="aboutus-text">
                            Hello, I am Tuhin Chakrabarty, an aspiring web developer from VIT Vellore. This is a todo-list web application built using React.js and Bootstrap 5.
                        </p>
                        <p className="aboutus-text">
                            What is a todo list? It's a simple way to organize tasks you need to complete or things you want to do. You can use this app for personal tasks or work-related activities. Keeping all your tasks in one place helps ensure you never forget anything important.
                        </p>
                        <p>
                            <a className="aboutus-more" href="https://www.youtube.com/c/CodeWithHarry" target="_blank" rel="noopener noreferrer">
                                Inspired By CodeWithHarry
                            </a>
                        </p>
                        <p>
                            <a className="aboutus-more" href="https://github.com/Tuhin-SnapD" target="_blank" rel="noopener noreferrer">
                                View Other Projects
                            </a>
                        </p>
                    </section>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <div className="aboutus-banner">
                        <img src={Picture} width="320" alt="Tuhin Chakrabarty" className="img-fluid rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}