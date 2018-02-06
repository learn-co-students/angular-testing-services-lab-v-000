describe('UserService', function () {
  beforeEach(module('app'));
  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Steve', last_name: 'Jobs', email: 'steve@apple.com'});
  }));

  it('should get the users current information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (response) {
        var data = response.data;
        if (data.first_name === 'Steve' && data.email === 'steve@apple.com') {
          done();
        }
      });

      $httpBackend.flush();
  });

  it('should return the users full name correctly', function() {
    expect(UserService.createFullName({first_name: 'Joe', last_name: 'LaChance'})).toEqual('Joe LaChance');
  });
});
