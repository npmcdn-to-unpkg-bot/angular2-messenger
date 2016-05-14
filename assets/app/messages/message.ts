export class Message {
  content: String;
  username: String;
  messageId: String;
  userId: String;

  constructor(content:String, messageId?: String, username?: String, userId?: String) {
    this.content = content;
    this.messageId = messageId;
    this.username = username;
    this.userId = userId;
  }
}
