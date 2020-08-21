import React, { Component, Fragment } from 'react'
// import './assests/css/App.css'
import LeftSidebar from './components/left_sidebar'
import Search from './components/search'
import RightSidebar from './components/right_sidebar'
import { fetch_user_details } from './redux/actions/actions'
import { connect } from 'react-redux'

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        if(localStorage.getItem("token")){
        let token = JSON.parse(localStorage.getItem("token"));
        this.props.fetch_user_details(token)
        }
        else{
            alert("please login/register first")
            this.props.history.push('/login')
        }

    }

    render() {
        console.log(this.props.userdata)
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

const mapStateToProps=(state)=>{
    return {
        userdata:state.user_reducer.userData
    }
}


export default connect(mapStateToProps,{fetch_user_details})(App)