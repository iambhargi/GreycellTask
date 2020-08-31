import React, { Component } from 'react'

class GreycellTask extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputedString: '',
            resultantArray: '',
            wordsToSkip: ''
        }
    }

    handleStringChange = event => {
        this.setState({
            inputedString: event.target.value
        })

    }

    handleNumberChange = event => {
        this.setState({
            wordsToSkip: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        const NUMBER_TO_SKIP = this.state.wordsToSkip

        if (isNaN(NUMBER_TO_SKIP) || Number.parseInt(NUMBER_TO_SKIP) < 0) {
            alert("Invalid Number of Words")
            return false
        }

        const MULTI_SPACE_REMOVED = this.state.inputedString.replace(/\s\s+/g, ' ')

        const SPLITTED_STATEMENTS = MULTI_SPACE_REMOVED.split(".")
        let newStatement = []

        SPLITTED_STATEMENTS.forEach(SPLITTED_LINE => {
            const SPLITTED_WORDS = SPLITTED_LINE.split(" ")

            if (NUMBER_TO_SKIP < SPLITTED_WORDS.length) {

                const UPTO_INDEX = ((SPLITTED_WORDS.length) - NUMBER_TO_SKIP)
                const WORDS_TO_REVERSE = SPLITTED_WORDS.slice(0, UPTO_INDEX)
                const REVERSED_ARRAY = WORDS_TO_REVERSE.reverse();
                const END_OF_ARRAY = SPLITTED_WORDS.slice(UPTO_INDEX, SPLITTED_WORDS.length)
                const RESULT_ARRAY = REVERSED_ARRAY.join(" ") + " " + END_OF_ARRAY.join(" ")

                newStatement.push(RESULT_ARRAY)
            } else {
                newStatement.push(SPLITTED_LINE)
            }
        });

        this.setState({
            resultantArray: newStatement.join(". ")
        })
    }

    render() {

        return (
            <div className="card" style={{ marginTop: '60px' }}>
                <div className="card-header"><h4><b>Greycell Task</b></h4></div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label><b>Enter Your String:</b></label>
                            <textarea
                                required
                                placeholder="Please enter your string here..."
                                className="form-control"
                                value={this.state.inputedString}
                                onChange={this.handleStringChange}
                            />
                        </div>

                        <div className="form-group">
                            <label><b>Number of Words to Skip:</b></label>
                            <input
                                required
                                placeholder="Please enter the number you wish to skip..."
                                className="form-control"
                                value={this.state.wordsToSkip}
                                onChange={this.handleNumberChange}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>

                        <div className="form-group">
                            <h3>{this.state.resultantArray}</h3>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default GreycellTask