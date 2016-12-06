describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Charlie Brown', email: 'charlie@schultz.com'});
  }));


  it('should retrieve user information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res) {
        var data = res.data;
        if (data.user === 'Charlie Brown') {
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should retrieve join user first name and last name', function() {
    var user1 = {first_name: 'Charlie', last_name: 'Brown'};
    var user2 = {first_name: 'Peppermint', last_name: 'Patty'};

    expect(UserService.createFullName(user1)).toEqual('Charlie Brown');
    expect(UserService.createFullName(user2)).toEqual('Peppermint Patty');
  });
});
