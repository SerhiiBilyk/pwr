'use strict';
app.controller('search', function search($scope,$http,$log) {
  $scope.test="Hello Angular!"
  $scope.books=[];
  /**
  *@param {name} send this parametr to routing /home as req.body.name
  *next,result is pushed to {books[]}
  *which is rendered in views/home.pug 
  */
  $scope.loadBooks=function(){
    $http.post("http://localhost:8081/home/loadData", {
        name: $scope.userBook
    }).then(function(response) {
      $scope.books=[];
      $scope.books.push(response.data)
      $log.log($scope.books)
    })
  }

});
