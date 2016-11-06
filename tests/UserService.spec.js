describe('UserService', function () {
  
  beforeEach(module('app'));
 
  var UserService, $httpBackend;
 
  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Kaileigh', last_name: 'McCrea'});
  }));

  it('should get the current users information', function () {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        expect(res.data).toEqual({first_name: 'Kaileigh', last_name: 'McCrea'});
      });

    $httpBackend.flush();
   });

  it('should return full name', function () {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var user = UserService.createFullName(res.data);
        expect(user).toEqual('Kaileigh McCrea');
      });

    $httpBackend.flush();
  });
});
