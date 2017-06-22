
var PureJS=(function(self){
  function getData(){
  var book=document.getElementById('book').value;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8081/hello', false);
  var obj={name:'javascript',page:1}
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));


  console.log(JSON.parse(xhr.responseText))
  /*for(let prop in result.books.book){
    console.log(result.books.book[prop])
  }
  result.books.book.forEach(function(item,index){
    console.log(item+ ' index '+index)
  })
  }
  */

  }
  return{
    getData:getData
  }
})(PureJS)

'use strict';
var app = angular.module('app',[]).filter('htmlToText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

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
        });
    /*    $http.post("http://localhost:8081/home/compare", {
name:'12'
        }).then(function(response) {

            $log.log(response)

        });
        */


    }

});

'use strict';
app.controller('signUp', function search($scope, $http, $log) {
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
        } else if($scope.message.length < 10) {
            $scope.feedback_state = true;
        }
    }
    $scope.like=function(id,like_type){


      $http.post('http://localhost:8081/book/'+like_type+'/'+id,{
        book_id: $location.absUrl().split('/').pop()
      })
      .then(function(response){
        $scope.b = response.data;
        $log.log(id,response);
      })

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

app.factory('AppData',function(){
  return {
    settings :[
        {one: 'one'},
        {two: 'two'},
        {three: 'three'}
    ]
  }
})
