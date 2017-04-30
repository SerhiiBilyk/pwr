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
