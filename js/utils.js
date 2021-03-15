// 随机生成好友名字
export function initUser(count) {
 // let firstName  = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
 let userList = [];
 for (let i = 0; i < count; i++) {
  let user = {}
  let randAZ = Math.ceil(Math.random() * 25);
  // A-Z ASCII：65-90
  let firstName = String.fromCharCode(64 + randAZ)
  let lastName = Math.floor(Math.random() * 100);

  user.title = firstName
  user.name = firstName + lastName;
  user.img = 'userIcon' + Math.floor(Math.random() * 10);

  userList.push(user)
 }
 console.log(`------随机生成 ${count} 个好友-----`)
 console.log(userList)
 return sortUser(userList)
}

// 数组重新封装 按字母分类
function sortUser(arr) {
    let titelArr = [];
    let newArr = [];
    arr.forEach((item) => {
        if (titelArr.indexOf(item.title) === -1) {
            newArr.push({
                title: item.title,
                users: [
                    {
                        name: item.name,
                        img: item.img
                    }
                ]
            })
            titelArr.push(item.title);
        } else {
            newArr.forEach((newItem) => {
                if (newItem.title == item.title) {
                    newItem.users.push({
                        name: item.name,
                        img: item.img
                    });
                    return;
                }
            })
        }
    })
    
    console.log("------好友数据分类-----")
    console.log(newArr)
    // 按字母排序
    let propComparator = (propName) =>
    (a, b) => a[propName].toLowerCase() == b[propName].toLowerCase() ? 0 : a[propName].toLowerCase() < b[propName].toLowerCase() ? -1 : 1
    
    newArr.sort(propComparator('title'))
    return newArr
  }

export function throttling(fn, wait, maxTimelong) {
 let timeout = null,
  startTime = Date.parse(new Date);

 return function (e) {
  if (timeout !== null) clearTimeout(timeout);
  let curTime = Date.parse(new Date);
  if (curTime - startTime >= maxTimelong) {
   fn(e);
   startTime = curTime;
  } else {
   timeout = setTimeout(fn, wait);
  }
 }
}