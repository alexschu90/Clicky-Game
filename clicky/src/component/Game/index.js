import React, { Component } from 'react';
import Click from '../Click';
import Section from '../Section';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Jumbotron from '../Jumbotron';
import data from  '../../Data.json';

class Game extends Component{
    state = {
        data,
        score: 0,
        totalScore: 0
    }
    componentDidMount() {
        this.setState({data: this.shuffleData(this.state.data)}) 
    }
    handleCorrectGuess = newData => {
        const {totalScore, score} = this.state;
        const newScore = score + 1;
        const newTotalScore = Math.max(newScore, totalScore);
        this.setState({
            data: this.shuffleData(newData),
            score: newScore,
            totalScore: newTotalScore
        })
    }
    handleIncorrectGuess = data => {
        this.setState({
            data: this.resetData(data),
            score: 0
        })
    }
    shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
            const j = Math.floor(Math.random() * (i+1))
            const temp = data[i]
            data[i] = data[j]
            data[j] = temp
            i--
        }
        return data
    }
    resetData = data => {
        const resetData = data.map(item => ({ ...item, clicked: false}))
        return this.shuffleData(resetData)
    }
    handleClick = id => {
        let guessCorrectly = false;
        const newData = this.state.data.map(item => {
            const newItem = { ...item }
                if (newItem.id === id) {
                    if(!newItem.clicked) {
                        newItem.clicked = true; 
                        guessCorrectly = true; 
                    }
                }
                return newItem; 
        });
        guessCorrectly
            ? this.handleCorrectGuess(newData) 
            : this.handleIncorrectGuess(newData)
    }
    render(){
        return (
            <div>
                <Navbar />
                <Section>
          {this.state.data.map(item => (
            <Click
              key={item.id}
              id={item.id}
              shake={!this.state.score && this.state.topScore}
              handleClick={this.handleItemClick}
              image={item.image}
            />
          ))}
        </Section>
                <Footer />
            </div>
        )
    }
}




export default Game;