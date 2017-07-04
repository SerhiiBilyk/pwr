'use strict';
app.controller('user', function user($scope, $http, $log, $timeout, $location, ) {

    $scope.message = '';
    $scope.feedback = true;
    $scope.feedback_state = true;
    $scope.authenticated = false;
    $scope.likes_state = false;

    $scope.swearing = ['ass', 'fuck', 'asshole', 'kurwa'];




    $scope.setFeedback = function(val) {
        if (val) {
            return 'like'
        } else {
            return 'dislike'
        }
    }

    $scope.validate = function(message) {

        $scope.swearing.forEach(function(element) {
            var regexp = new RegExp(element, 'gi')
            $scope.message = $scope.message.replace(regexp, '[censored]')
        })


        if ($scope.message.length > 10) {

            $scope.feedback_state = false;
        } else if ($scope.message.length < 10) {
            $scope.feedback_state = true;
        }
    }
    $scope.complain = function(user_id, comment_id) {
        $log.log('complain')
        $http.post('http://localhost:8081/book/comment/complain/', {
            user_id: user_id,
            comment_id: comment_id

        }).then(function(response) {

        })
    }

    $scope.addLike = function(like_type, id) {
        if ($scope.authenticated) {

            $http.post('http://localhost:8081/book/comment/add/' + like_type + '/' + id, {
                    book_id: $location.absUrl().split('/').pop(),
                    coment_id: id
                })
                .then(function(response) {
                    $scope.b = response.data;

                })

        }
    }
    $scope.showLikes = function(like_type, coment_id, item) {
        /*
          $log.log('item', item, like_type)
          if (like_type == 'likes' && item.suma < 1) {
              $log.log('like working state', 'state', $scope.likes_state)
              return false;
          } else if (like_type == 'dislikes' && item.suma2 < 1) {
              $log.log('dislike working state', 'state', $scope.likes_state)
              return false;
          } else {*/
        $http({
            url: 'http://localhost:8081/book/showLikes/' + like_type + '/' + coment_id,
            method: 'GET'
        }).then(function(res) {
            $scope.likeNames = '';
            $scope.likeNames = res.data.data;
            $scope.likes_state = true;

            //access returned res here

        }, function(error) {
            //handle error here
        });
        //  }




    }
    $scope.leave = function() {
        $scope.likeNames = '';
        $scope.likes_state = false;

    }

    $scope.loadBooks = function() {
      $log.log('load books')
        $http({
            url: 'http://localhost:8081/home/user/load/books',
            method: 'GET'
        }).then(function(res) {
          $log.log('books are loaded changed',res)

            $scope.userBooks = res.data.data;
            $log.log($scope.userBooks)


        }, function(error) {
            //handle error here
        });




    }

    $scope.load = function(auth) {

        $scope.curBook = $location.absUrl().split('/').pop()

        $http.get('http://localhost:8081/book/comments/' + $scope.curBook, {
            /*
                        coment: $scope.message,
                        feedback: $scope.feedback
                  */
        }).then(function(response) {

            $scope.b = response.data.data;
            $scope.authenticated = response.data.authenticated;

        })




    }
    $scope.addComment = function() {

        $scope.curBook = $location.absUrl().split('/').pop()
        $http.post('http://localhost:8081/book/add/comment/' + $scope.curBook, {
            coment: $scope.message,
            feedback: $scope.feedback
        }).then(function(response) {

            $scope.b = response.data.data;

        })
    }



    //ng-mouseenter="popUp"+item.id+"=true" ng-mouseleave="popUp"+item.id+"=false"



});
