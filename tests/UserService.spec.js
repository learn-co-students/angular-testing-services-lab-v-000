describe('UserService', function () {
  beforeEach(module('app')); 

  var UserService;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend')
    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Matt', last_name: 'Cassara'});
  }));

  it('should get the users information', function (done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res){
        var data = res.data
        if (data.first_name === 'Matt' && data.last_name === "Cassara"){
          done();
        }
      });
    $httpBackend.flush();
  });

  it('concatenates a users first and last name', function (done){
    $httpBackend.expectGET('/rest/user');

    var fullName = "";

    UserService
      .getUser()
      .then(function(user){
        var fullName = UserService.createFullName(user);
        done();
      });
    $httpBackend.flush();

    expect(createdFullName).toEqual('Matt Cassara');
  });

});