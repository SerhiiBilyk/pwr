'use strict';
app.controller('manager', function manager($scope, $http, $log) {
    $scope.manager = "Manager test";

    $scope.load = function() {
        $http({
            url: 'http://localhost:8081/home/manager/load/comments',
            method: 'GET'
        }).then(function(res) {
            $log.log(res)
            $scope.comments = res.data.data;

            //access returned res here

        }, function(error) {
            //handle error here
        });
    }
    $scope.update = function(id, checked) {
        checked == 0 || checked == 3 ? index = 1 : index = 0;
        $http.post('http://localhost:8081/home/manager/update/comment/' + id, {
            index: index
        }).then(function(response) {
            $scope.load()
        })


    }

})
