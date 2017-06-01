'use strict';
app.controller('signUp', function search($scope, $http, $log) {
$scope.state=false;
    $scope.checkEmail = function() {

        $http.post("http://localhost:8081/auth/emailCheck", {
            userEmail:$scope.userEmail
        }).then(function(response) {
            $log.log($scope.state)
            if(response.data.length>0){
              $scope.state=true;
            }else if(response.data.length==0){
              $scope.state=false;
            }

        })
    }
});
