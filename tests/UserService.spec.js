describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Michael', last_name: 'Casciato', email: 'mike@m.com'});
  }));

  it('should get the users information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data;
        if (data.first_name === 'Michael' && data.last_name === 'Casciato' && data.email === 'mike@m.com') {
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should correctly join first and last name', function() {
    expect(UserService.createFullName({first_name: 'Chris', last_name: 'Casciato'})).toEqual('Chris Casciato')
  })
});
