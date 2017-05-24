'use strict';
app.controller('ctrl', function ctrl($scope, $http, $log, AppData) {
    $scope.test = 'Hello!';
    $scope.myService = AppData.settings;
    $scope.switch = false;
    $scope.wait = false;
    $scope.myArray = [];
    $scope.myValue = "java";
    /**
    *@param {i} page number, special fo Goodreads api
    * this function recursively ask about first 8 pages number and load it
    */
    $scope.getData = function(i) {
        if (i < 9) {
            $http.post("http://localhost:8081/hello", {
                name: $scope.myValue,
                page: i
            }).then(function(response) {
                if (i == 1) {
                    $scope.myArray.length = 0;
                    /*reset myWelcome array*/
                    $scope.myWelcome = "";
                    $scope.myWelcome = angular.fromJson(response.data);
                    $scope.myArray.push(angular.fromJson(response.data))
                }
                $scope.myArray.push(angular.fromJson(response.data))
                return response ? $scope.getData(i + 1) : 'hello';
            })
        } else {
            return 'end'
        }
    }

})
