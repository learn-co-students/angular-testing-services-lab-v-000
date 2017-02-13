describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({
      first_name: 'Beyonce',
      last_name: 'Knowles',
      email: 'shouldhavewon@aoty.com'
    });
  }));

  it('should get the current users information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService.getUser().then(function (res) {
      var data = res.data;
      if (data.first_name === 'Beyonce'
        && data.last_name === 'Knowles'
        && data.email === 'shouldhavewon@aoty.com') {
        done();
      }
    });

    $httpBackend.flush();
  });

  it('should return the users full name', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService.getUser().then(function (res) {
      var user = res.data;
      if (UserService.createFullName(user) === 'Beyonce Knowles') {
        done();
      }
    });

    $httpBackend.flush();
  })
});
