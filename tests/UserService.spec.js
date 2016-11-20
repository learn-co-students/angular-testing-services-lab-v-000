describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({name: 'Traci', loves: 'Bryan'});
  }));

  it('should get the current users information', function () {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        if (res.name === 'Traci' && res.loves === 'Bryan') {
          done();
        }
      });

      $httpBackend.flush();
  });

  it('should join first and last name', function() {
    expect(UserService.createFullName({first_name: 'Traci', last_name: 'Thompson'})).toEqual('Traci Thompson');

  })
});
