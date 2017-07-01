'use strict';
app.controller('admin', function admin($scope, $http, $log) {
    $log.log('start')
    $scope.data = "";
    $scope.user={}
    $scope.load = function(changePassword) {


        $http.post('http://localhost:8081/home/administrator/admin', {
          change:changePassword,
          password: $scope.user.password,
          id:$scope.user.id,
        }).then(function(response) {
console.log('load administrator')
            $log.log('response', response.data.data)
            $scope.data = response.data.data;
        })




    }

    $scope.changePass = function(item) {
        item.password = item.password;
        $scope.user={
          password:item.password,
          id:item.id
        }
        $log.log('password ' + item.password)
        $scope.load(true)
    }
})
