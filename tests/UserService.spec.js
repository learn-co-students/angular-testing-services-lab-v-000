describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Bill Gates', email: 'bill@microsoft.com'});
  }));

  it('should get the current users information', function (done) { // must pass the done function in as an argument for this feature to work
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data;
        if (data.email === 'bill@microsoft.com' && data.user === 'Bill Gates') {
          done();
        }
      });

    $httpBackend.flush();
  });

  it('should correctly format the users name', function() {
    expect(UserService.createFullName({first_name: 'Tyler', last_name: 'Taylor'})).toEqual('Tyler Taylor')
  });
});
