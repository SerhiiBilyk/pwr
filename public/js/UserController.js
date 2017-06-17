'use strict';
app.controller('user', function user($scope, $http, $log, $timeout, $location) {

    $scope.test = " ";


    $scope.showPopUp = function() {
        $log.log($scope.books)
    }
    $scope.hidePopUp = function() {
        $log.log(x)
        $scope.x = false;
    }
    $scope.load = function() {
$log.log($scope.test)
        $scope.curBook = $location.absUrl().split('/').pop()
        $http.post('http://localhost:8081/book/' + $scope.curBook, {
            coment: $scope.test
        }).then(function(response) {

            $scope.b = response.data;
            $log.log(response.data[0])
        })
    }



    //ng-mouseenter="popUp"+item.id+"=true" ng-mouseleave="popUp"+item.id+"=false"



});
