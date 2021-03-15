import domUtils from "./domUtils.js"
import observer from "./observer.js"
export default class Component {
  constructor(container, wechatInfo) {
    //title userlist 
    this.title = wechatInfo.title;
    this.list = wechatInfo.users;
    this.offsetTop = false;
    this.offsetEnd = false;
    this.container = container;
    //存当前dom 对象
    this.currentTitleDom = ''
    this.init();
    // 获取每个 .title元素
    this.titles = domUtils.quertClass('title')
    this.currentTitle = ''
  }

  // 初始化 
  init = () => {
    this.createChatList(); // 联系人列表
    this.createBar(); // 右侧bar
    this.bindScrollEvent();
  }
  // 生成ul列表
  createChatList = () => {
    let chats = this.createChat(this.list);
    let template =
      `<ul class="chat_list ${this.title}">
        <li class="title">
        ${this.title}
        </li>
        ${chats}
      </ul>`;
    let dom = domUtils.createDom(template, `.${this.title}`);
    this.container.appendChild(dom)
    this.currentTitleDom = dom.childNodes[1]
  }
  // 遍历list 生成users li
  createChat = (parentDom) => {
    let doms = ''
    this.list.forEach(item => {
      let child = this.tempalteTransf(item);
      doms += child;
    })
    return doms;
  }
  // users temp
  tempalteTransf = (chat) => {
    let template =
      `
      <li> 
        <div class="img" style="background:url(./images/${chat.img}.jpg);background-size: cover"></div>
        <div>
            <span>${chat.name}</span>
        </div>
      </li>
      `
    return template
  }
  // rightBar list
  createBar = () => {
    let template =
      `<li class="bar_item">
        ${this.title}
        </li>`;
    let dom = domUtils.createDom(template, `.bar_item`);
    domUtils.query('bar_wrap').appendChild(dom)
    this.scrollTitle(dom)
  }

  // 绑定scroll事件
  bindScrollEvent = () => {
    observer.addListener('scorll', (e) => {
      const flag = this.watchTitleDom(this.currentTitleDom);
      if (flag) {
        this.activeBar('bar_item', 'bar_item active')
      }
    })
  }
  watchTitleDom = (titleEle) => {
    let offTop = titleEle.getBoundingClientRect().top
    let topHeight = domUtils.query('headCon').offsetHeight
    let selfHeght = titleEle.offsetHeight
    titleEle.className = 'title'
    if (offTop >= topHeight && offTop <= (topHeight + selfHeght)) {
      titleEle.className = 'title active'
      this.currentTitle = titleEle.innerText
      return true;
    }
    return false;
  }
  // 监听fixed title
  watchTitle = (ele) => {
    for (let i = 0; i < ele.length; i++) {
      let offTop = ele[i].getBoundingClientRect().top
      let topHeight = domUtils.query('headCon').offsetHeight
      let selfHeght = ele[i].offsetHeight
      ele[i].className = 'title'
      if (offTop >= topHeight && offTop <= (topHeight + selfHeght)) {
        ele[i].className = 'title active'
        this.currentTitle = ele[i].innerText
      }
    }
  }
  // right bar
  activeBar(defaultClass, activeClass) {
    let barDom = domUtils.quertClass(defaultClass);
    Array.from(barDom).forEach(item => {
      item.className = defaultClass
      if (item.innerText == this.currentTitle) {
        item.className = activeClass
      }
    })
  }
  //scrollTitle bar联动
  scrollTitle = (ele) => {
    ele.onclick = (e) => {
      let clickText = e.target.innerText;
      Array.from(domUtils.quertClass('title')).forEach(item => {
        if (item.innerText == clickText) {
          window.scrollTo({
            top: item.offsetTop - item.offsetHeight,
            behavior: "smooth"
          });
        }
      })
    }
  }
}