describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend, data;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Christian', last_name: 'Whitesides'})
  }));

  it('should get the information of the current user', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res) {
        data = res.data;
        if (data.first_name === 'Christian' && data.last_name === 'Whitesides') {
          done();
        }
      });
      $httpBackend.flush();
  });

  it('should join the user first and last names with a space in between', function() {
    expect(UserService.createFullName(data)).toEqual('Christian Whitesides');
  });
});
