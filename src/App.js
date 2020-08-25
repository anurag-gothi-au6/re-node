import React, { Component, Fragment } from "react";
import "./assests/css/App.css";
import LeftSidebar from "./components/left_sidebar";
import Search from "./components/search";
import RightSidebar from "./components/right_sidebar";
import {
  fetch_user_details,
  fetch_user_newsfeed,
  fetch_post,
  fetch_user_private_post,
} from "./redux/actions/actions";
import { connect } from "react-redux";
import ImageGallery from "react-image-gallery";

let name = "";
let profilepic = "";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullscreenButton: true,
      showBullets: true,
      showNav: true,
      videoregex: /.mp4$|.ogg$|.webm$/g,
      errorimg:"https://res.cloudinary.com/renode/image/upload/v1598360271/image-not-found_u5hwb9.jpg",
      errorvideo:"https://res.cloudinary.com/renode/image/upload/v1598378342/Media-file-error-in-online-video_joe4gh.png"
    };
  }

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
  play123 = () => {
    this.setState({
      showFullscreenButton: false,
      showBullets: false,
      showNav: false,
    });
  };
  pause123 = () => {
    this.setState({
      showFullscreenButton: true,
      showBullets: true,
      showNav: true,
    });
  };
  objectgenerator=(media)=>{
    let a=[]
    for(let i=0;i<media.length;i++){
      this.state.videoregex.test(media[i]) ? 
      a.push({renderItem: () => {
        return (
          <video
            name="video"
            // onPlay={this.play159}
            // onPause={this.pause159}
            width="450"
            height="320"
            src={media[i]}
            controls
          ></video>
        );
      },}) :
      a.push({ original: media[i] })
    }
    return a
  }

  render() {
    if (this.props.userdata.data) {
      name = this.props.userdata.data.name;
      profilepic = this.props.userdata.data.defaultProfile;
    } else {
      if (this.props.userdata.status === "failed") {
        alert(this.props.userdata.message);
        this.props.history.push("/login");
      }
    }

    let yahoo = this.props.all_posts.map((element) =>
      element.media.length === 1 ? (
        <div key={element._id}>
          {this.state.videoregex.test(element.media[0]) ? (
            // new code
            <div>
            <div className="postcontainer">
              <div
                style={{
                  display: "flex",
                  marginLeft: "1em",
                  marginTop: "0.5em",
                }}
              >
                <img
                  src={element.creator.defaultProfile}
                  alt={'profile'}
                  style={{ borderRadius: "50%", height: "3em" }}
                />
                <h6 style={{ marginTop: "1em", marginLeft: "0.5em" }}>
                  {element.creator.name}
                </h6>
              </div>
              <center>
              <div className="video_container1">
              <ImageGallery
                showNav={this.state.showNav}
                showFullscreenButton={false}
                showThumbnails={false}              
                items={[
                  {
                    renderItem: () => {
                      return (
                        <video
                          name="video"
                          onPlay={this.play123}
                          onPause={this.pause123}
                          width="700"
                          height="400"
                          src={element.media[0]}
                          controls
                        ></video>
                      );
                    },
                  },
                ]}
                lazyLoad={true}
                infinite={false}
                showPlayButton={false}
                onErrorImageURL={this.state.errorvideo}
              />;
              </div>
              </center>
              {/* for like button and many more */}
              <div style={{ marginTop: "17em" }}>
                <div style={{ borderTop:"1px solid #d3d3d3",marginLeft:'1.5em',marginRight:'1.5em' }}></div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div className="like_div123">
                    <span className="material-icons-outlined">thumb_up</span>
                    <p style={{marginLeft:'0.5em'}}>Like</p>
                  </div>
                  <div className="comment_div123">
                    <span className="material-icons">chat_bubble_outline</span>
                    <p style={{marginLeft:'0.5em'}}>Comment</p>
                  </div>
                </div>
                <div style={{ borderBottom: "1px solid #d3d3d3",marginLeft:'1.5em',marginRight:'1.5em' }}></div>
              </div>
              {/* end */}
            </div>
            </div>  
            // end
          ) : (
            <div>
            <div className="postcontainer">
              <div
                style={{
                  display: "flex",
                  marginLeft: "1em",
                  marginTop: "0.5em",
                }}
              >
                <img
                  src={element.creator.defaultProfile}
                  alt={'profile'}
                  style={{ borderRadius: "50%", height: "3em" }}
                />
                <h6 style={{ marginTop: "1em", marginLeft: "0.5em" }}>
                  {element.creator.name}
                </h6>
              </div>
              <center>
              <div className="container1">
                <ImageGallery
                  showNav={this.state.showNav}
                  showFullscreenButton={this.state.showFullscreenButton}
                  showThumbnails={false}
                  items={[{ original: element.media[0] }]}
                  lazyLoad={true}
                  infinite={false}
                  showPlayButton={false}
                  onErrorImageURL={this.state.errorimg}
                />
              </div>
              </center>
              {/* for like button and many more */}
              <div style={{ marginTop: "16em" }}>
                <div style={{ borderTop:"1px solid #d3d3d3",marginLeft:'1.5em',marginRight:'1.5em' }}></div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div className="like_div123">
                    <span className="material-icons-outlined">thumb_up</span>
                    <p style={{marginLeft:'0.5em'}}>Like</p>
                  </div>
                  <div className="comment_div123">
                    <span className="material-icons">chat_bubble_outline</span>
                    <p style={{marginLeft:'0.5em'}}>Comment</p>
                  </div>
                </div>
                <div style={{ borderBottom: "1px solid #d3d3d3",marginLeft:'1.5em',marginRight:'1.5em' }}></div>
              </div>
              {/* end */}
            </div>
            </div>
          )}
        </div>
      ) : (
        <div key={element._id}>
            <div className="postcontainer">
              <div
                style={{
                  display: "flex",
                  marginLeft: "1em",
                  marginTop: "0.5em",
                }}
              >
                <img
                  src={element.creator.defaultProfile}
                  alt={'profile'}
                  style={{ borderRadius: "50%", height: "3em" }}
                />
                <h6 style={{ marginTop: "1em", marginLeft: "0.5em" }}>
                  {element.creator.name}
                </h6>
              </div>
              <center>
              <div className="container1">
                <ImageGallery
                  showNav={this.state.showNav}
                  showFullscreenButton={this.state.showFullscreenButton}
                  showThumbnails={false}
                  items={this.objectgenerator(element.media)} //need to call a function
                  lazyLoad={true}
                  infinite={false}
                  showPlayButton={false}
                  onErrorImageURL={this.state.errorimg}
                />
              </div>
              </center>
              {/* for like button and many more */}
              <div style={{ marginTop: "16em" }}>
                <div style={{ borderTop:"1px solid #d3d3d3",marginLeft:'1.5em',marginRight:'1.5em' }}></div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div className="like_div123">
                    <span className="material-icons-outlined">thumb_up</span>
                    <p style={{marginLeft:'0.5em'}}>Like</p>
                  </div>
                  <div className="comment_div123">
                    <span className="material-icons">chat_bubble_outline</span>
                    <p style={{marginLeft:'0.5em'}}>Comment</p>
                  </div>
                </div>
                <div style={{ borderBottom: "1px solid #d3d3d3",marginLeft:'1.5em',marginRight:'1.5em' }}></div>
              </div>
              {/* end */}
            </div>
            </div>
            
              
      )
    );

    return (
      <Fragment>
        <div className="main_container">
          {/* start */}
          <div>  
            {this.props.userdata.data ? (
              <LeftSidebar
                namevalue={this.props.userdata.data.name}
                picvalue={this.props.userdata.data.defaultProfile}
              />
            ) : (
              <LeftSidebar />
            )}
          </div>
          {/* end */}
          <div>
            <RightSidebar />
          </div>
          <center><div className="center_container">
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
                  <div
                  style={{
                    // display: "flex",
                    // marginTop: "5em",
                    // flexWrap: "wrap",
                  }}
                >
                  {this.props.all_posts.length === 0 ? (
                    <div className="loader">Loading...</div>
                  ) : this.props.posts.status === "success" ? (
                    yahoo
                  ) : (
                    <center>
                      <h1>failed to load data</h1>
                    </center>
                  )}
                </div>

                  
                </div>
                {/* post container */}
                
              </div>
            </section>
            {/* end of add post */}
          </div></center>
          {/* end of center container */}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userdata: state.user_reducer.userData,
    user_newsfeed: state.user_reducer.userNewsfeed,
    posts: state.post_reducer.postData,
    privatePosts: state.post_reducer.privatePostData,
    all_posts: state.post_reducer.all_posts,
  };
};

export default connect(mapStateToProps, {
  fetch_user_details,
  fetch_user_newsfeed,
  fetch_post,
  fetch_user_private_post,
})(App);
