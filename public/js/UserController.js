'use strict';
app.controller('user', function user($scope, $http, $log, $timeout, $location) {

    $scope.message = '';
    $scope.feedback = true;
    $scope.feedback_state =true;
    $scope.setFeedback = function(val) {
        if (val) {
            return 'like'
        } else {
            return 'dislike'
        }
    }
    $scope.validate = function() {
      $log.log('validate')
      $log.log($scope.message)

        if ($scope.message.length > 10) {
            $scope.feedback_state = false;
        } else {
            $scope.feedback_state = true;
        }
    }




    $scope.showPopUp = function() {
        $log.log($scope.books)
    }
    $scope.hidePopUp = function() {
        $log.log(x)
        $scope.x = false;
    }
    $scope.load = function() {
        $log.log('feedback: ' + $scope.feedback)
        $scope.curBook = $location.absUrl().split('/').pop()
        $http.post('http://localhost:8081/book/' + $scope.curBook, {
            coment: $scope.message,
            feedback: $scope.feedback
        }).then(function(response) {

            $scope.b = response.data;

            $log.log(response.data[0])
        })
    }



    //ng-mouseenter="popUp"+item.id+"=true" ng-mouseleave="popUp"+item.id+"=false"



});