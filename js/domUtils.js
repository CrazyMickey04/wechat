class docUtils {
 // 创建DOM
 static createDom(templateStr,className) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(templateStr, "text/html");
  let dom = doc.querySelector(className);
  return dom;
 }
 
 // 获取子元素中最后一个DOM
 static queryLastChild(parent){
   return parent.lastElementChild;
 }
 
 // 查询DOM
 static query(id) {
   return document.getElementById(id) || false;
 }
 static quertClass(e){
    return document.getElementsByClassName(e) || false;
  }
 // 删除DOM
 static delete(domStr,template) {
   if (!template) return;
   var parent = document.getElementById(domStr);
   setTimeout(() => {
     if (template != null) parent.removeChild(template);
   }, 700);
 }

 // 添加DOM
 static appendChild(domStr,template) {
   let DOM = this.query(domStr);
   if (DOM) DOM.appendChild(template);
 }
}

export default docUtils;