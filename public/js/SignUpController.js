'use strict';
app.controller('signUp', function search($scope, $http, $log) {
$scope.email_state=false;
$scope.name_state=false;
    $scope.checkEmail = function() {
      $log.log('name')
        $http.post("http://localhost:8081/auth/emailCheck", {
            userEmail:$scope.userEmail
        }).then(function(response) {
            $log.log($scope.email_state)
            if(response.data.length>0){
              $scope.email_state=true;
            }else if(response.data.length==0){
              $scope.email_state=false;
            }
        })
    }
    $scope.checkName = function() {
        $http.post("http://localhost:8081/auth/nameCheck", {
            userName:$scope.userName
        }).then(function(response) {
            $log.log($scope.name_state)
            if(response.data.length>0){
              $scope.name_state=true;
            }else if(response.data.length==0){
              $scope.name_state=false;
            }
        })
    }
});
