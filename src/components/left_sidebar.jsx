import React, { Component, Fragment } from "react";
import profilepic from '../assests/img/male.jpg'
// import profilepic from '../assests/img/female.png'
import '../assests/css/left_sidebar.css'

export default class LeftSidebar extends Component {
  render() {
    return (
      <Fragment>
        <aside className='left_sidebar'>
        <div className='custom_container_left_sidebar'>
          {/* this should be changed doing this for temperary */}
          <div className='left_sidebar_profile'>
            <div className='left_sidebar_profile_pic_div'>     
            <img src={profilepic} alt='profile' className='left_sidebar_profile_pic'/>
            </div>
            <span className='left_sidebar_profile_name'>Rahul Ghimire</span>
            </div>
            {/* end */}
            {/* ----------------------------menus-----------------------------------*/}
            <div className='left_sidebar_menu_div'>
            <span className='left_sidebar_menu'>MENUS</span>
            <div className='home_icon_div'>
            <i className="material-icons-outlined home_icon">home</i>
            <span className='icon_value'>Newsfeed</span>
              </div>          
            <div className='home_icon_div'>
            <i className="material-icons-outlined home_icon">message</i>
            <span className='icon_value'>Messages</span>
              </div>          
            <div className='home_icon_div'>
            <i className="material-icons-outlined home_icon">notifications_active</i>
            <span className='icon_value'>Notifications</span>
              </div>                  
            <div className='home_icon_div'>
            <i className="material-icons-outlined home_icon">edit</i>
            <span className='icon_value'>Privacy</span>
              </div>          
            <div className='home_icon_div'>
            <i className="material-icons-outlined home_icon">settings</i>
            <span className='icon_value'>Settings</span>
              </div>          
            </div>
            {/* end */}
          </div>  
        </aside>
      </Fragment>
    );
  }
}
