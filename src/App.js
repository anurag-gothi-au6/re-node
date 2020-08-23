import React, { Component, Fragment } from "react";
import "./assests/css/App.css";
import LeftSidebar from "./components/left_sidebar";
import Search from "./components/search";
import RightSidebar from "./components/right_sidebar";
import {
  fetch_user_details,
  fetch_user_newsfeed,
  fetch_post,
  fetch_user_private_post
} from "./redux/actions/actions";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
let name = "";
let profilepic = "";
class App extends Component {

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = JSON.parse(localStorage.getItem("token"));
      this.props.fetch_user_details(token);
      this.props.fetch_user_newsfeed(token);
      this.props.fetch_post();
      this.props.fetch_user_private_post(token);
    } else {
      alert("please login/register first");
      this.props.history.push("/login");
    }
  }
  render() {
    if (this.props.userdata.data) {
      name = this.props.userdata.data.name;
      profilepic=this.props.userdata.data.defaultProfile
    } else {
      if (this.props.userdata.status === "failed") {
        alert(this.props.userdata.message);
        this.props.history.push("/login");
      }
    }
    // console.log(this.props.all_posts)
    // console.log(this.props.posts.status)

    let yahoo = this.props.all_posts.map(element=>(
    <div key={element._id}>
      
    </div>))
  
    return (
      <Fragment>
        <div className="main_container">
          <div>
            {this.props.userdata.data ? (
              <LeftSidebar namevalue={this.props.userdata.data.name} picvalue={this.props.userdata.data.defaultProfile}/>
            ) : (
              <LeftSidebar />
            )}
          </div>
          <div className="center_container">
            {/* search bar start */}
            <section>
              <div>
                <Search />
              </div>
            </section>
            {/* end */}
            {/* start of the post  */}
            <section>
              <div className="post_div">
                <div className="addpost">
                  {/* start of one section */}
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "1em",
                      marginTop: "1em",
                    }}
                  >
                    <div>
                      <img
                        src={profilepic}
                        alt="profile"
                        className="post_profilepic"
                      />
                    </div>
                    <div className="post_profilediv">
                      <p style={{ marginTop: "0.3em", marginLeft: "1em" }}>
                        What's on your mind, {name}?
                      </p>
                    </div>
                    <div>
                      <div className="post_icon">
                        <center>
                          <span
                            className="material-icons"
                            style={{ fontSize: "2em", marginTop: "0.2em" }}
                          >
                            post_add
                          </span>
                        </center>
                      </div>
                      <p className="tooltip1">Add Post</p>
                    </div>
                  </div>
                  {/* end */}
                </div>
              </div>
            </section>
            {/* end of add post */}
            <section>
              {/* <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }> */}
                    {/* here the code goes */}
                {/* {this.state.items.map((i, index) => (
                  <div style={style} key={index}>
                    div - #{index}
                  </div>
                ))} */}
                    {/* end */}
              {/* </InfiniteScroll> */}
            </section>
          </div>
          {/* end of center container */}

          <div style={{display:'flex',marginTop:'5em', flexWrap:'wrap'}}>
                    { this.props.all_posts.length===0?<div className="loader">Loading...</div>:this.props.posts.status==="success"?yahoo:<center><h1>failed to load data</h1></center> }
                </div>
          <div>
            <RightSidebar />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userdata: state.user_reducer.userData,
    user_newsfeed: state.user_reducer.userNewsfeed,
    posts:state.post_reducer.postData,
    privatePosts:state.post_reducer.privatePostData,
    all_posts:state.post_reducer.all_posts
  };
};

export default connect(mapStateToProps, {
  fetch_user_details,
  fetch_user_newsfeed,
  fetch_post,
  fetch_user_private_post
})(App);
