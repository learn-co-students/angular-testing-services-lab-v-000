describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'});
  }));

  it('should get users logged in information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data;
        if (data.email === 'bill@microsoft.com' && data.first_name === 'Bill') {
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should join first and last name together ', function() {
    expect(UserService.createFullName({first_name: 'Greatest', last_name: 'Ever'})).toEqual('Greatest Ever');
  });
});
