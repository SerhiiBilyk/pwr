function getData(){
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8081/hello', false);
xhr.send();
//var result=JSON.parse(xhr.responseText);

console.dir(xhr.responseText)
}
