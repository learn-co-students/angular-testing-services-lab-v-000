describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
      UserService = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');

  it('Get logged in user information', function (done) {
      $httpBackend.expectGET('/rest/user');

  UserService
      .getUserInfo()
      .then(function (res) {
        var data = res.data;
        if (data.email === 'test@gmail.com' && data.user === 'Test') {
            done();
          }
        });
  $httpBackend.flush();
  });

  it('Join the users first and last name', function() {
    expect(UserService.createFulName({ first_name: 'test', last_name: 'last'})).toEqual('test last');
  })
});
