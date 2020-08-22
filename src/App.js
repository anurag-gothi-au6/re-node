import React, { Component, Fragment } from 'react'
import './assests/css/App.css'
import LeftSidebar from './components/left_sidebar'
import Search from './components/search'
import RightSidebar from './components/right_sidebar'
import { fetch_user_details ,fetch_user_newsfeed } from './redux/actions/actions'
import { connect } from 'react-redux'
import profilepic from './assests/img/male.jpg'


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
        this.props.fetch_user_newsfeed(token)
        }
        else{
            alert("please login/register first")
            this.props.history.push('/login')
        }

    }

    render() {
        // console.log(this.props.userdata)
        console.log(this.props.user_newsfeed)
        return (
            <Fragment>
                <div className='main_container'>
                <div>
                {this.props.userdata.data?
                <LeftSidebar namevalue={this.props.userdata.data.name}/>
                :<LeftSidebar/>
                }
                </div>
                <div className='center_container'>
                {/* search bar start */}
                <section>
                <div><Search/></div>
                </section>
                {/* end */}
                {/* start of the post  */}
                <section>
                <div className='post_div'>
                    <div>
                        <img src={profilepic} alt='profile' className='post_profilepic'/>
                        </div>
                </div>
                </section>
                {/* end */}
                

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
        userdata:state.user_reducer.userData,
        user_newsfeed:state.user_reducer.userNewsfeed
    }
}


export default connect(mapStateToProps,{fetch_user_details,fetch_user_newsfeed})(App)