describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Frog Prince', email: 'frogp@royalty.net'});
  }));

  it('should get the current users information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (resp) {
        var data = resp.data
        if (data.email === 'frogp@royalty.net' && data.user === 'Frog Prince') {
          done();
        }
      });

    $httpBackend.flush();
  });

  it('should return the users first and last names together as a full name', function() {
    var user = { first_name: 'Frog', last_name: 'Prince' }
    expect(UserService.createFullName(user)).toEqual('Frog Prince');
  });
});
