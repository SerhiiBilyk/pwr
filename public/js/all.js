
var PureJS=(function(self){
  function getData(){
  var book=document.getElementById('book').value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8081/home/test', false);
  //var obj={name:book}
//  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //xhr.send(JSON.stringify(obj));
  xhr.send();

  console.log(xhr.responseText)
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


var PureJS=(function(self){
  function getData(){
  var book=document.getElementById('book').value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8081/home/test', false);
  //var obj={name:book}
//  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //xhr.send(JSON.stringify(obj));
  xhr.send();

  console.log(xhr.responseText)
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

'use strict';
var app = angular.module('app',[]).filter('htmlToText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

'use strict';
app.controller('ctrl', function ctrl($scope, $http, $log,AppData) {
    $scope.test = 'Hello!';
  $scope.myService=AppData.settings;
$scope.switch=false;
$scope.wait=false;
$scope.myValue="HEllo World";
    $scope.getData = function() {
      $http.post("http://localhost:8081/hello",{name:$scope.myValue}).then(function(response){
        $scope.myWelcome=angular.fromJson(response.data);


        $log.log(response)
      })

 /*getBooksByAuthor
        $http.get("http://localhost:8081/hello")
            .then(function(response) {
                $scope.myWelcome = angular.fromJson(response.data);


            });
            */

    }


})

app.factory('AppData',function(){
  return {
    settings :[
        {one: 'one'},
        {two: 'two'},
        {three: 'three'}
    ]
  }
})

'use strict';
var app = angular.module('app',[]).filter('htmlToText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

'use strict';
app.controller('ctrl', function ctrl($scope, $http, $log,AppData) {
    $scope.test = 'Hello!';
  $scope.myService=AppData.settings;
$scope.switch=false;
$scope.wait=false;
$scope.myValue="HEllo World";
    $scope.getData = function() {
      $http.post("http://localhost:8081/hello",{name:$scope.myValue}).then(function(response){
        $scope.myWelcome=angular.fromJson(response.data);


        $log.log(response)
      })

 /*getBooksByAuthor
        $http.get("http://localhost:8081/hello")
            .then(function(response) {
                $scope.myWelcome = angular.fromJson(response.data);


            });
            */

    }


})

app.factory('AppData',function(){
  return {
    settings :[
        {one: 'one'},
        {two: 'two'},
        {three: 'three'}
    ]
  }
})
