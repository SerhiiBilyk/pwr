'use strict';
app.controller('search', function search($scope, $http,$log) {
  $scope.test="Hello Angular!"
  $scope.loadBooks=function(){
    $http.post("http://localhost:8081/home/loadData", {
        name: 'javascript'
    }).then(function(response) {
      $log.log(response)

    })
  }

});
