'use strict';
app.controller('signUp', function signUp($scope, $http, $log) {
    $scope.state = {
        email: false,
        name: false
    }
    $scope.check = function(inputValue, checkType) {
        $http.post('http://localhost:8081/auth/check', {
            data: inputValue,
            check: checkType
        }).then(function(response) {
            $log.log('test: ' + response.data.length)
            if (response.data.length > 0) {
                $scope.state[checkType] = true
            } else if (response.data.length == 0) {
                $scope.state[checkType] = false
            }
        })
    }
});
