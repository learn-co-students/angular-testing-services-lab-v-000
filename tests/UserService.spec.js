describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Gus'});
  }));

  it('should get the current user info', function(done) {
    $httpBackend.expectGET('/rest/user');
      UserService
        .getUser()
        .then(function(res) {
          var data  = res.data;
          if (data.user === 'Gus') {
            done();
          }
        });
      $httpBackend.flush();
  });
});
