describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Tom Haverford'});
  }));

  it('should get the users info', function () {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        if (res.user === 'Tom Haverford'){
          done();
        }
      });
      $httpBackend.flush();
  });

  it('should output a users name correctly', function(){
    var user = {first_name: 'Bill', last_name: 'Clinton'};
    expect(UserService.createFullName(user)).toEqual('Bill Clinton');
  });

});
