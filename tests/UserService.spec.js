describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Steve', last_name: 'Jobs'});
  }));

  it('should get the current user', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        if (res.data.first_name === 'Steve' && res.data.last_name === 'Jobs') {
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should get the current user', function () {
    expect(UserService.createFullName({first_name: 'Steve', last_name: 'Jobs'})).toBe('Steve Jobs');
  });
});
