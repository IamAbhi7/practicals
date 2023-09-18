import React, { Component } from 'react'
import Button from './Button'
import '../Styles/Card.css'
import jsons from '../JsonObj/quotes.json'

// Card component 
class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: "",
      col: "",
      visibility: "block"
    }
  }

  getQuote() {
    const quotesFile = jsons
    const quote = JSON.stringify(quotesFile)
    const q = JSON.parse(quote)

    var wordNum = Math.floor(Math.random() * q.length - 1)
    var word = q[wordNum].quote
    return word
  }

  //getting quote for display
  getAuthor() {
    // parsing the json file 
    const quotesFile = jsons
    const quote = JSON.stringify(quotesFile)
    const q = JSON.parse(quote)

    //selecting random quote
    var wordNum = Math.floor(Math.random() * q.length - 1)
    var author = q[wordNum].author
    return author
  }

  //getting color
  getColor() {
    var clrs = ['burlywood', 'palegoldenrod', 'gray', 'powderblue', '#A6E3E0']
    var randomClr = Math.floor(Math.random() * clrs.length - 1)
    var clr = clrs[randomClr]
    return clr
  }

  //display quote (display button)
  display = () => {
    this.setState({
      msg: `${this.getQuote()}`,
      visibility: 'block',
      writer: `- ${this.getAuthor()}`
    })
  }

  //display changecolor (changeColor button)
  changeColor = () => {
    this.setState({
      col: `${this.getColor()}`
    })
  }

  //hide parent's data (reset button)
  block = () => {
    this.setState({
      text: '',
      visibility: 'none',
      col: 'white',
    })
  }

  render() {
    return (
      <div>
        <h2>Quotes Generator</h2>
        <div className="card" style={{
          backgroundColor: `${this.state.col}`
        }}>
          <h2 style={{
            display: `${this.state.visibility}`
          }}>&#x201C;{this.state.msg}&#x201D;
          </h2>
          <h2 style={{
            display: `${this.state.visibility}`
          }}>{this.state.writer}
          </h2>
          <div className='btns'>
            <Button Show={this.display} value="Show" color="green" />
            <Button Show={this.changeColor} value="change Color" />
            <Button Show={this.block} value='Reset' color='gray' />
          </div>
        </div>
      </div>
    )
  }
}

export default Card