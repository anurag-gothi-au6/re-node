import React, { Component, Fragment } from 'react'
import MessageList from './components/Message/MessageList'
import { Grid, Divider } from "@material-ui/core";
export default class Messages extends Component {
    constructor(props){
        super(props)
        this.state={
            chats:[
                {_id:1234,
                sender:'Rahul',
                reciever:'Anurag',
                text:'test'
                },
                {_id:1235,
                    sender:'Test',
                    reciever:'Anurag',
                    text:'test 2'
                }
            ]
        }
    }

    componentDidMount(){

    }

    handleChange=(e)=>{
        if(e.target.name==='text'){
            this.setState({chatmessage:e.target.value})
        }
    }

    render() {

        return (
          <>
            {/* <Sidebar profileImage={this.state.user.profile_image_url} /> */}
            <div
              style={{
                width: "90%",
                margin: "auto",
                height: "100%",
              }}
            >
              {/* <Header
                logout={this.logout}
                enterprise={this.props.helpdeskUser.enterprise}
                Name={this.props.helpdeskUser.name}
                Admin={this.props.helpdeskUser.isAdmin}
              /> */}
    
              <Grid container spacing={0} height="100%">
                <Grid item xs={3}>
                  <MessageList
                   chats={this.state.chats}
                  ></MessageList>
                </Grid>
    
                <Grid item xs={6}>
                  {/* <div
                    style={{
                      height: "82vh",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 0,
                      border: "1px solid #B0B0B0",
                      borderRadius: "5px",
                    }}
                    boxShadow={0}
                  >
                    <Grid item xs={12}>
                      {selectedTweet ? (
                        <div className="chatHeader">
                          <img
                            src={selectedTweet.user.profile_image_url}
                            className="chatImage"
                            alt="user profile"
                          ></img>
                          <p>{selectedTweet.user.name}</p>
                          <span
                            style={{
                              backgroundColor: "#50d950",
                              height: "7px",
                              width: "7px",
                              display: "inline-block",
                              borderRadius: "50%",
                              marginLeft: "5px",
                              marginRight: "40px",
                            }}
                          ></span>
                          <span className="gray1" style={{ marginRight: "40px" }}>
                            followers :{selectedTweet.user.followers_count}
                          </span>
                          <span className="gray1">
                            username :{selectedTweet.user.screen_name}
                          </span>
                          <span style={{marginLeft:'140px'}}>
                            <button
                              style={{
                                padding: "3px",
                                paddingLeft: "3px",
                                borderRadius: "20px",
                                backgroundColor: "#ebebeb",
                                border: "0",
                                width: "110px",
                              }}
                            >
                              <b
                                style={{ marginLeft: "5px", fontWeight: "normal" }}
                              >
                                Create task
                              </b>
                            </button>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      <Divider />
                      <ChatList
                        isLoading={isLoading}
                        selectedTweet={selectedTweet}
                        replies={replies}
                      ></ChatList>
                      {selectedTweet ? (
                        <ReplyBox
                          profileImage={this.state.user.profile_image_url}
                          reply={reply}
                          replyButtonDisabled={replyButtonDisabled}
                          handleInputChange={this.handleInputChange}
                          postReplies={() => {
                            this.postReplies({ reply, selectedTweet, replies });
                          }}
                        ></ReplyBox>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </div> */}
                </Grid>
    
                <Grid
                  item
                  xs={3}
                  style={{
                    borderRadius: "5pxpx",
                    border: "1px solid #B0B0B0",
                  }}
                >
                  {/* <InfoColumn selectedTweet={selectedTweet} /> */}
                </Grid>
              </Grid>
            </div>
          </>
        );
      }
    }
