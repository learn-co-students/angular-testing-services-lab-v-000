describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Mike Randell', email: 'mikerand1991@gmail.com'});
  }));

  it('should get the user info', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data;
        if (data.email === 'mikerand1991@gmail.com' && data.user === 'Mike Randell') {
          done();
        };
      });

    $httpBackend.flush();
  });

});
