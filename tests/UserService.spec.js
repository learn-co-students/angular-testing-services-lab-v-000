describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'sandy'})
  }));

  it('should get the current users information', function(done) {
      $httpBackend.expectGET('/rest/user');

      UserService
        .getUser()
        .then(function (res) {
          var data = res.data;
          if(data.first_name === 'sandy') {
            done();
          }
        });
      $httpBackend.flush();
  });

  it('should get a first and last name', function() {
    var user = {first_name: 'rob', last_name: 'salazar'}
    var response = UserService.createFullName(user)
    expect(response).toEqual('rob salazar')
  })
});
