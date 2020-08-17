import React, { Component, Fragment } from 'react'

export default class Messages extends Component {
    constructor(props){
        this.state={
            chatmessage:''
        }
    }

    componentDidMount(){

    }

    handleChange=(e)=>{
        if(e.target.name='text'){
            this.setState({chatmessage:e.target.value})
        }
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handlesubmit}>
                    <input type='text' name='text' value={this.state.chatmessage} onChange={this.handlechange}/>
                    <input type='submit' value='submit'/>
                    </form>                        
            </Fragment>
        )
    }
}
