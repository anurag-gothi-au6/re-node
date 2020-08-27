
# ReNode -Social Network

A MERN stack social network application with MVP features implemented: user authentication, profile viewing, posting, commenting, following/unfollowing, message and videocall other users.

## Live Link

[Renode -Social Network](https://re-node.herokuapp.com/)



## Implementations

- [x] As a user, I want to be able to create an account so that I can log in.
- [x] As a user, I want to be able to log in so that I can view my home feed.
- [x] As a user, I want to be able to view posts so that I know what people I’m following are up to.
- [x] As a user, I want to be able to create a post so that I can share my current status.
- [x] As a user, I want to be able to delete my posts so that people can no longer see them.
- [x] As a user, I want to be able to like/unlike a post so that I can approve posts I am fond of.
- [x] As a user, I want to be able to comment on a post so that I can share additional thoughts.
- [x] As a user, I want to be able to view other users' profiles so that I can learn more about them.
- [x] As a user, I want to be able to edit my own profile (i.e. change name, avatar color, or bio) so that I can add more style to my page.
- [x] -  As a user, I want to be able to chat or videocall with other users that too in realtime view.
- [x] As a user, i want to be able to get notified about new messages, new followers and likes & comments on my posts in realtime.
- [x] As a user, i want to be able to search other user as to find out any known connection on the platform.


### Potential improvements:
- Making the user account private which will also enable the follow request feature.

## Installing

1. Install dependencies

```
npm i && cd client && npm i && cd ..
```

2. Create variables.env file and replace values with yours

```
NODE_ENV=development
DATABASE="Mongodb Connection String"
JWT_KEY="secretkey"
EMAILUSER="example@gmail.com"
EMAILPASS="example"
HOST="localhost:port // deployedURL"
ENABLE_SEND_EMAIL="true or false" // false if you don't want to set it up
```

3. Go into `client/src/_services/socketService.js` and replace

```
window.location.hostname
```

with your local IP address on port 5000 eg.

```
192.168.0.1:5000
```

4. Run project

```
npm run dev
```

## Major Library And Framework

- [Express.js](https://expressjs.com/) - Backend web framework
- [JSON Web Token](https://jwt.io/) - A standard to securely authenticate HTTP requests
- [Semantic-UI](https://react.semantic-ui.com/) - UI library for React
- [MongoDB](https://www.mongodb.com/) - Database to store document-based data
- [Mongoose](https://mongoosejs.com/) - Object-modeling tool for Node.js
- [Node.js](https://nodejs.org/en/) - Runtime environment to help build fast server applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - JavaScript library to help better manage application state
- [Socet.io](http://socket.io/) - Websocket for realtime update
- [Cloudinary](http://cloudinary.com/) - Platform to store media files
- [Nodemailer](https://nodemailer.com/) - Library used for sending email

## Developed By:
Anurag & Rahul
