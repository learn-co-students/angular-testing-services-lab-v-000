describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({last_name: 'Curry', email: 'splash@warriors.com'});
  }));

  it('should get the current users information', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(response){
        if (response.data.last_name === 'Curry' && response.data.email === 'splash@warriors.com'){
          done();
        }
      })

    $httpBackend.flush();
  });
  
  it('should combine a users first and last name', function(){
    var user = {first_name: 'Steph', last_name: 'Curry'}
    expect(UserService.createFullName(user)).toEqual('Steph Curry');
  });

});
