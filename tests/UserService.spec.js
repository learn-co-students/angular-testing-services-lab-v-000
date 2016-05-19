describe('UserService', function() {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({

      first_name: 'Bill',
      last_name: 'Gates',
      email: 'bill@microsoft.com'});
  }));

  it('should get the current users information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var user = res.data;
        if (user.email === 'bill@microsoft.com' && user.last_name === 'Gates') {
          done();
        }
      });

    $httpBackend.flush();
  });

  it('should return a human-readable name (e.g.: Tom Thompson)', function() {
    var fullname = UserService
      .createFullName({first_name: 'John', last_name: 'Johnson'});

    expect(fullname).toEqual('John Johnson');
  });
});
