'use strict';
app.controller('search', function search($scope, $http, $log) {
    $scope.test = "Hello Angular!"
    $scope.books = [];
    $scope.page = 0;
    $scope.dataLength = 0;
    $scope.showNext = false;
    $scope.showPrev = false;
    $scope.pageQuantity = 0;
    $scope.nextPage = function(items) {
        $scope.page = $scope.page + items;

        if ($scope.page > 0 && $scope.page + 10 < $scope.dataLength) {
            $scope.showPrev = true;
            $scope.showNext = true;
        } else if ($scope.page == 0) {
            $scope.showPrev = false;
            $scope.showNext = true;
        } else if ($scope.page + 10 > $scope.dataLength) {
            $log.log('more')
            $scope.showNext = false;
        }

    }
    /**
     *@param {name} send this parametr to routing /home as req.body.name
     *next,result is pushed to {books[]}
     *which is rendered in views/home.pug
     */
    $scope.loadBooks = function() {

        $http.post("http://localhost:8081/home/loadData", {
            name: $scope.userBook
        }).then(function(response) {
            $scope.page = 0;
            $scope.books = [];
            $scope.books.push(response.data);
            $scope.showNext = true;
            $scope.dataLength = response.data.length;
            $scope.pageQuantity = response.data.length / 10;
            $log.log($scope.books[0])
        })

    }

});
