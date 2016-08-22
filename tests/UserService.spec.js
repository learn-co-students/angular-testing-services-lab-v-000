describe('UserService', function () {

  beforeEach(module('app'));

  var UserService, $httpBackend;;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Miranda', last_name: 'Raymond'});
  }));

  it('should retrieve the current user\'s information.', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
    .getUser()
    .then(function(res) {
      var data = res.data;
      if (data.first_name === 'Miranda' && data.last_name === 'Raymond') {
        done();
      }
    });

    $httpBackend.flush();
  });

  it('should create a user\'s full name', function() {
    expect(UserService.createFullName({first_name: 'Miranda', last_name: 'Raymond'})).toEqual('Miranda Raymond');
  });
});
