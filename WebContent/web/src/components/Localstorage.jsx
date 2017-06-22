import React from "react"
import update from "immutability-helper"

class GeneralInputComponent extends React.Component {
    constructor(props) {
        super(props)
        const savedData = localStorage.getItem(props.s保存名)
        this.state = savedData ? JSON.parse(savedData) : {}
    }
    saveState(newState) {
        this.setState(newState)
        localStorage.setItem(this.props.s保存名, JSON.stringify(update(this.state, { $merge: newState })))
    }
}

export default GeneralInputComponent
