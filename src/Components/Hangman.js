import React, { Component } from "react";
import './Hangman.css';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

var programming_languages = ["python", "javascript", "java", "html", "css", "c", "php", "sql",];

const randomWord = () => programming_languages[Math.floor(Math.random() * programming_languages.length)];

class Hangman_Game extends Component {
    static defaultProps = {
        maxWrong: 6,
        images: [step0, step1, step2, step3, step4, step5, step6]
    };

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            guessed: new Set(),
            answer: randomWord(),
        };
    }

    guessedWord = () => this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));

    handleGuess(value) {
        let letter = value;
        this.setState(update => ({
            guessed: update.guessed.add(letter),
            mistake: update.mistake + (update.answer.includes(letter) ? 0 : 1)
        }));
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button class="button" key={letter} value={letter} onClick={(e) => this.handleGuess(e.target.value)} disabled={this.state.guessed.has(letter)}>
                {letter}
            </button>
        ));
    }

    resetButton = () => {
        this.setState({
            mistake: 0,
            guessed: new Set(),
            answer: randomWord()
        });
    };

    render() {
        const gameOver = this.state.mistake >= this.props.maxWrong;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        let gameStart = this.generateButtons();

        if (isWinner) {
            gameStart = "You Won @@@@@@@@@";
        }
        if (gameOver) {
            gameStart = "You Lost *****************";
        }

        return (
            <div className="container">
                <div className="hangman">
                    <h3> @ Hangman Game @ </h3>
                    <div className="guess">Guessed wrong: {this.state.mistake}</div>

                    <p className='text-center'>
                        <img src={this.props.images[this.state.mistake]} alt="" />
                    </p>
                    <p className='text'>Guess the Programming Language ?</p>

                    <p>{!gameOver ? this.guessedWord() : this.state.answer}{" "}</p>

                    <p>{gameStart}</p>

                    <button className='reset_button' onClick={this.resetButton}>Reset</button>
                </div>
            </div>
        );
    }
}

export default Hangman_Game;