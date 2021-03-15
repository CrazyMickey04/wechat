// 发布订阅者模式
class Observer {
  constructor() {
    this.messageMap = {};
  }

  addListener(message, subscribe) {
    if (!subscribe || !message) return false;
    if (!this.messageMap[message]) this.messageMap[message] = [];
    this.messageMap[message].push(subscribe);
  }

  removeListener(message) {
    if (!message) return false;
    delete this.messageMap[message];
  }

  publish(message, info) {
    const subscribes = this.messageMap[message];
    if (subscribes) {
      subscribes.forEach((subscribe) => subscribe(info));
    }
  }
}
export default new Observer();