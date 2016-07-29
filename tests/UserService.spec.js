describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({
        first_name:'Zac',
        last_name: 'Baston',
        email: 'zbaston@gmail.com'
    });
  }));

  it('should get a user', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(response) {
        var data = response.data;

        if (data.first_name === 'Zac' && data.last_name === 'Baston') {
          done();
        }
      });

    $httpBackend.flush();
  });

  it('should get a user full name', function() {
    var user = {first_name: "Zac", last_name: "Baston"}
    expect(UserService.createFullName(user)).toEqual('Zac Baston');
  })
});
