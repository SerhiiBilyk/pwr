
var PureJS=(function(self){
  function getData(){
  var book=document.getElementById('book').value;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8081/hello', false);
  var obj={name:'javascript',page:1}
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));


  console.log(JSON.parse(xhr.responseText))
  /*for(let prop in result.books.book){
    console.log(result.books.book[prop])
  }
  result.books.book.forEach(function(item,index){
    console.log(item+ ' index '+index)
  })
  }
  */

  }
  return{
    getData:getData
  }
})(PureJS)
