'use strict';
app.controller('ctrl',function ctrl($scope,$http,$log){
  $scope.test='Hello!';
  $scope.settings={
    one:'one',
    two:'two',
    three:'three'
  }

  $scope.getData=function(){
    $http.get("http://localhost:8081/hello")
    .then(function(response) {
        $scope.myWelcome = angular.fromJson(response.data);
        $log.log($scope.myWelcome)
    });

  }


})
