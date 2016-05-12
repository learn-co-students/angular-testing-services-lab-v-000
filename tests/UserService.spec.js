describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bob', last_name: 'Smith', email: 'bob@bob.com'});
  }));

  it('should get the current users info', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
    .getUser()
    .then(function (res) {
      var data = res.data
      if (data.email === 'bob@bob.com' && data.first_name === 'Bob' && data.last_name === 'Smith') {
        done();
      }
    });

    $httpBackend.flush();
  });

  it('should add names together correctly', function () {
    expect(UserService.createFullName({first_name: 'Bob', last_name: 'Smith'})).toEqual('Bob Smith');
  });

});
