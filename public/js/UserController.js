'use strict';
app.controller('user', function user($scope, $http, $log, $timeout, $location) {

    $scope.message = '';
    $scope.feedback = true;
    $scope.feedback_state = true;
    $scope.authenticated = false;


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
        } else if ($scope.message.length < 10) {
            $scope.feedback_state = true;
        }
    }
    /*
        $scope.like=function(id,like_type){


          $http.post('http://localhost:8081/book/'+like_type+'/'+id,{
            book_id: $location.absUrl().split('/').pop()
          })
          .then(function(response){
            $scope.b = response.data;
            $log.log(id,response);
          })

        }
        */
    $scope.addLike = function(like_type, id) {
if(  $scope.authenticated){

        $http.post('http://localhost:8081/book/' + like_type + '/' + id, {
                book_id: $location.absUrl().split('/').pop(),
                coment_id: id
            })
            .then(function(response) {
                $scope.b = response.data;
                $log.log('test,', response.data, $scope.b)
                $log.log('end like function', id, response);
            })

}
    }
    $scope.showLikes = function(coment_id) {
        $log.log('showLikes')
        $http({
            url: 'http://localhost:8081/book/like/showLikes/' + coment_id,
            method: 'GET'
        }).then(function(res) {

            $scope.likeNames=res.data.data;

              $log.log('likeNames',$scope.likeNames)
            //access returned res here

        }, function(error) {
            //handle error here
        });

    }
    $scope.leave = function() {

        $log.log('leave')
    }



    $scope.showPopUp = function() {
        $log.log($scope.books)
    }
    $scope.hidePopUp = function() {
        $log.log(x)
        $scope.x = false;
    }
    $scope.load = function(auth) {

        $scope.curBook = $location.absUrl().split('/').pop()
        $log.log('feedback: ' + $scope.feedback, $scope.curBook)
        $http.post('http://localhost:8081/book/' + $scope.curBook, {
            /*
                        coment: $scope.message,
                        feedback: $scope.feedback
                  */
        }).then(function(response) {

            $scope.b = response.data.data;
            $scope.authenticated = response.data.authenticated;
            $log.log('response', response)
        })




    }
    $scope.addComment = function() {
        $log.log('addComent')
        $scope.curBook = $location.absUrl().split('/').pop()
        $http.post('http://localhost:8081/book/add/comment/' + $scope.curBook, {
            coment: $scope.message,
            feedback: $scope.feedback
        }).then(function(response) {
            $log.log('response from add', response)
            $scope.b = response.data.data;

        })
    }



    //ng-mouseenter="popUp"+item.id+"=true" ng-mouseleave="popUp"+item.id+"=false"



});
