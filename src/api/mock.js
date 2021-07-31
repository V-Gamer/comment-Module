var Mock = require('mockjs');

const Random = Mock.Random;

function getCommentData() {
  let commentArr = [];
  for(var i = 0;i<1000;i++) {
    let commentData = {
      headImg:Random.dataImage('28x28'),
      username:Random.cword(1)+'*****',
      commentContent:Random.cword(3)+','+Random.cword(6)+','+Random.cword(5)+','+Random.cword(8)+','+Random.cword(10),
      commentImg:Random.dataImage('72x72'),
      num:Random.natural(10,100),
      id:i,
      flag:true,
    }
    commentArr.push(commentData);
  }
  return commentArr;
}

const commentData = Mock.mock('/getCommentData',getCommentData)

export default {commentData} //此处return的是一个对象
