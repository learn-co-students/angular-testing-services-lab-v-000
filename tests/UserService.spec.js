describe('UserService', function () {
  var UserService, $controller;

  beforeEach(module('app'));

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user')
        .respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'});

  }));

  it('should return correct user data', function () { //cant put 'done' in params for some reason
    
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
        .then(function(resp) {
          if (resp.first_name === 'Bill' &&  resp.last_name === 'Gates' && resp.email === 'bill@microsoft.com') {
            done();
          }
        });

    $httpBackend.flush();
  });

  it('should return the correct full name', function(){

    UserService
      .getUser()
        .then(function(resp) {
          expect(UserService.createFullName(resp)).toBe('Bill Gates');
        });

    //expect(UserService.createFullName(user)).toBe('Bill Gates');
  });




});