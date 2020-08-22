import React from "react";
import { ListItem, Avatar, Divider } from "@material-ui/core";

export default function ChatItem(props) {
  let { chat } = props;
  return (
    <>
    <div style={{ margin:'1rem', marginLeft:0,  backgroundColor:'white',marginTop:0}}>
      <ListItem
        key={chat._id.toString()}
        // selected={props.selectedIndex !== chat._id}
        style={{ backgroundColor:'white',border:'1px gray solid',borderRadius:'3%',height:'100px'}}
        // onClick={() => {
        //   handleReply("@" + chat.user.screen_name + " ");
        //   handleSelected(chat._id, chat);
        // }}
      >
        <Avatar
          alt="user"
          src="https://www.w3schools.com/howto/img_avatar.png"
        ></Avatar>
        <div style={{ marginLeft: "10px", maxWidth: "80%" }}>
          {/* <b style={{ fontSize: "1em" }}>
            {chat.user.name}{" "}
            <span
              style={{
                fontWeight: "normal",
                fontSize: "0.8em"
              }}
            >
              {moment(chat.created_at).fromNow()}
            </span>
          </b> */}
           <b style={{ fontSize: "1em" }}>
            Anurag Gothi
            <span
              style={{
                fontWeight: "normal",
                fontSize: "0.8em"
              }}
            >
              {/* {moment(chat.created_at).fromNow()} */}
            </span>
          </b>
          <p>
            {/* <span style={{ fontSize: "0.8em" }}>{chat.text}</span> */}
          </p>
        </div>
      </ListItem>
      <Divider />
      </div>
    </>
  );
}
