import "./AskedQuestionsComponent.css";
import questionsLogo from '/Ask-question-icon.png';
import { useState } from "react";

export function AskedQuestionsComponent() {

    const [visible, setVisibility] = useState([
        { name: "AI", visible: true },
        { name: "Podcasts", visible: false },
        { name: "Free", visible: false },
        { name: "Release", visible: false },
        { name: "Download", visible: false },
    ]);

    function handleClick(e) {
        const { name } = e.target;

        setVisibility(prev => prev.map(item => item.name === name ? { ...item, visible: !item.visible } : item));
    }

    function isItemVisible(name) {
        const item = visible.find(item => item.name === name);
        return item ? item.visible : false;
    }

    return (
        <div className="asked-questions-container">
            <div className="add-question-container">
                <img src={questionsLogo} />
                <h1>Asked questions</h1>
                <p>If the question is not available on our FAQ section, Feel free to contact us personally, we will resolve your respective doubts. </p>
                <button className="ask-question-button">Ask Question</button>
            </div>
            <div className="asked-questions">
                <div className="foldable-info">
                    <div className="header-info">
                        <h1>What is AI?</h1>

                        {isItemVisible("AI") ? (
                            <button
                                className="header-info-expand"
                                onClick={handleClick}
                                name="AI"
                            >-</button>
                        ) : (
                            <button
                                className="header-info-fold"
                                onClick={handleClick}
                                name="AI"
                            >+</button>
                        )}

                    </div>
                    {isItemVisible("AI") ? (
                        <p className="info">AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making.</p>
                    ) : <></>}
                </div>
                <div className="foldable-info">
                    <div className="header-info">
                        <h1>How can I listen to your podcasts?</h1>

                        {isItemVisible("Podcasts") ? (
                            <button
                                className="header-info-expand"
                                onClick={handleClick}
                                name="Podcasts"
                            >-</button>
                        ) : (
                            <button
                                className="header-info-fold"
                                onClick={handleClick}
                                name="Podcasts"
                            >+</button>
                        )}

                    </div>
                    {isItemVisible("Podcasts") ? (
                        <p className="info">AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making.</p>
                    ) : <></>}
                </div>
                <div className="foldable-info">
                    <div className="header-info">
                        <h1>Are your podcasts free to listen to?</h1>

                        {isItemVisible("Free") ? (
                            <button
                                className="header-info-expand"
                                onClick={handleClick}
                                name="Free"
                            >-</button>
                        ) : (
                            <button
                                className="header-info-fold"
                                onClick={handleClick}
                                name="Free"
                            >+</button>
                        )}

                    </div>
                    {isItemVisible("Free") ? (
                        <p className="info">AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making.</p>
                    ) : <></>}
                </div>
                <div className="foldable-info">
                    <div className="header-info">
                        <h1>How often do you release new episodes?</h1>

                        {isItemVisible("Release") ? (
                            <button
                                className="header-info-expand"
                                onClick={handleClick}
                                name="Release"
                            >-</button>
                        ) : (
                            <button
                                className="header-info-fold"
                                onClick={handleClick}
                                name="Release"
                            >+</button>
                        )}

                    </div>
                    {isItemVisible("Release") ? (
                        <p className="info">AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making.</p>
                    ) : <></>}
                </div>
                <div className="foldable-info">
                    <div className="header-info">
                        <h1>Can I download episodes to listen offline?</h1>

                        {isItemVisible("Download") ? (
                            <button
                                className="header-info-expand"
                                onClick={handleClick}
                                name="Download"
                            >-</button>
                        ) : (
                            <button
                                className="header-info-fold"
                                onClick={handleClick}
                                name="Download"
                            >+</button>
                        )}

                    </div>
                    {isItemVisible("Download") ? (
                        <p className="info">AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making.</p>
                    ) : <></>}
                </div>
            </div>
        </div>
    );
}