import React, { Component, Fragment } from 'react'
// import './assests/css/App.css'
import LeftSidebar from './components/left_sidebar'
import Search from './components/search'
import RightSidebar from './components/right_sidebar'

export default class App extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    // componentDidMount(){
    //     const url = "http://localhost:1234/api/user/getPost_Public";
    //     fetch(url)
    //     .then(res=>res.json())
    //     .then(data1=>{
    //         console.log(data1)
    //         this.setState({data:data1.message})
    //     })
    //     .catch(err=>console.log(err))

    // }

    render() {
        return (
            <Fragment>
                <div className='main_container'>
                <div>
                <LeftSidebar/>
                </div>
                <div className='center_container'>
                <div><Search/></div>
                </div>

                {/* <div style={{display:'flex',marginTop:'5em', flexWrap:'wrap'}}>
                    { {this.state.data.length===0?<div className="loader">Loading...</div>:yahoo} }
                </div> */}
                <div>
                <RightSidebar/>
                </div>
                </div>
            </Fragment>
        )
    }
}
