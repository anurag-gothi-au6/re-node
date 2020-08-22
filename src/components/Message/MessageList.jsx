import React from "react";
import { List } from "@material-ui/core";
import { MentionsPlaceHolder } from "../PlaceHolders/PlaceHolders";
import ChatItem from "./TweetItem";

export default function TweetList(props) {
  // let { isLoading, chats, selectedIndex, handleReply, handleSelected } = props;
  let { isLoading=false, chats } = props;

  return (
    <div style={{ height: "100%", overflow: "scroll",boxShadow:'0px' }}>
      <List
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 0
        }}
      >
        {isLoading ? (
          Array(10)
            .fill(0, 0)
            .map((e, i) => <MentionsPlaceHolder key={i.toString()} />)
        ) : chats.length > 0 ? (
          chats.map((o, i) => (
            <ChatItem
              key={i.toString()}
              chat={o}
              // selectedIndex={selectedIndex}
              // handleReply={s => handleReply(s)}
              // handleSelected={(_id, o) => handleSelected(_id, o)}
            ></ChatItem>
          ))
        ) : (
          <span>No chat Found</span>
        )}
      </List>
    </div>
  );
}
