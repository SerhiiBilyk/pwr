'use strict';
app.controller('ctrl', function ctrl($scope, $http, $log, AppData) {
    $scope.test = 'Hello!';
    $scope.myService = AppData.settings;
    $scope.switch = false;
    $scope.wait = false;
    $scope.myArray = [];
    $scope.myValue = "javascript";
    $scope.getData = function(i) {
        if (i < 9) {
            $http.post("http://localhost:8081/hello", {
                name: $scope.myValue,
                page: i
            }).then(function(response) {
                if (i == 1) {
                    $scope.myArray.length = 0;
                    $scope.myWelcome = "";
                    $scope.myWelcome = angular.fromJson(response.data);
                    $scope.myArray.push(angular.fromJson(response.data))
                    $log.log('prop ' + $scope.myArray[0].search.results);
                    $log.log('array ' + $scope.myArray.length);
                }
                $scope.myArray.push(angular.fromJson(response.data))
                $log.log(response)
                $log.log('array ' + $scope.myArray.length);
                return response ? $scope.getData(i + 1) : 'hello';
            })

        } else {
            return 'end'
        }
    }
    $scope.loadToDatabase=function(){
      $http.post("http://localhost:8081/home/loadData", {name:'javascript',page:1}).then(function(response) {


      })

    }
})
