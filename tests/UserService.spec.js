describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Gabe', email: 'gabe@example.com'});
  }));

  it('should test our UserService', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (response) {
        var data = response.data;
        if(data.email === 'gabe@example.com' && data.user === 'Gabe') {
          done();
        }
      });
      $httpBackend.flush();
  });

  it('should correctly concatenate first and last names', function() {
    expect(UserService.createFullName({ first_name: 'Bob', last_name: 'Dylan' })).toEqual('Bob Dylan');
  });
});
