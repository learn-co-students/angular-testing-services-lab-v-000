describe('UserService', function () {
  beforeEach(module('app'));
  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bob', last_name: 'Dylan'});
  }));

  it('gets the user\'s information', function(done){
    $httpBackend.expectGET('/rest/user')

    UserService
      .getUser()
      .then(function(resp){
        if(resp.data.first_name === "Bob" && resp.data.last_name === "Dylan"){
          done();
        }
      });
      $httpBackend.flush();
  });

  it('combines the first and last name into full name', function(){
    expect(UserService.createFullName({first_name: 'Bob', last_name: 'Dylan'})).toEqual('Bob Dylan');
  });

});
