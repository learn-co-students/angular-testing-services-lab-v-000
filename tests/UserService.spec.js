describe('UserService', function () {
  var $controller;

  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Kerry', last_name: 'Example'});
  }));

  it('should get the current user\'s information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res) {
        if (res.data.first_name === 'Kerry' && res.data.last_name === 'Example')  {
          done();
        }
    });

    $httpBackend.flush();
  });
});
