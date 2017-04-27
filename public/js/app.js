'use strict';
var app = angular.module('app',[]).filter('htmlToText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);
