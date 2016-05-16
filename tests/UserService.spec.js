describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector))){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user:'Tracy', email: 'tracy@gmail.com'});
  }));
  
  it('should return the users info'), function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res) {
        var data = res.data;
        if (data.email === 'tracy@gmail.com' && data.first_name === 'Tracy'){
          done();
        }
      });
      $httpBackend.flush();
  });
it('should add the names together', function(){
  expect(UserService.createFullName({first_name: 'Tracy', last_name: 'Tran'})).toEqual('Tracy Tran');
  });
});
