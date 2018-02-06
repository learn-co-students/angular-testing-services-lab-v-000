function UserService($http) {
  this.getUser = function () {
    return $http.get('/rest/user');
  };

  this.createFullName = function (user) {
    return user.first_name + ' ' + user.last_name
  };
}

angular
  .module('app')
  .service('UserService', UserService);
