describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function ($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'})
  }));


  it('should return the current users info', function(done){
    $httpBackend.expectGET('/rest/user');

  UserService
    .getUser()
    .then(function (response){
      var user = response.data;
      if (user.email === 'bill@microsoft.com' && user.first_name === 'Bill' && user.last_name === 'Gates'){
        done();
      }
    });
    $httpBackend.flush();
  });

  it('should return the current users first name and last name', function(done){
    $httpBackend.expectGET('/rest/user');

  UserService
    .getUser()
    .then(function (response){
      var user = response.data;
      if (UserService.createFullName(user) === 'Bill Gates'){
        done();
      }
    });
    $httpBackend.flush();
  });

});
