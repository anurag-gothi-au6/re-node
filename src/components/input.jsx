import React, { Component, Fragment } from 'react'


export default class Input1 extends Component {
    render() {
        return (
            <Fragment>
                <input type={this.props.typevalue} placeholder={this.props.placeholdervalue} value={this.props.inputvalue} className={this.props.classvalue} name={this.props.namevalue} onChange={this.props.onchangevalue}/>
            </Fragment>
        )
    }
}
