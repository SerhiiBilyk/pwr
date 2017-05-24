'use strict';
app.controller('search', function search($scope,$http,$log) {
  $scope.test="Hello Angular!"
  $scope.books=[];
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
