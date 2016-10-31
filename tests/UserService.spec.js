describe('UserService', function(){
  beforeEach(module('app'));
  var UserService, $httpBackend;
  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend
      .when({method: "GET", url: "/rest/user"})
      .respond({first_name: "Bill", last_name: "Gates"});
  }));

  it('makes a get request', function(done){
    $httpBackend.expectGET();
    done();
    $httpBackend.flush();
  });

  it('can retrieve and format names', function(done){
    $httpBackend.expectGET();

    UserService
      .getUser()
      .then(function(data){
        expect(UserService.createFullName()).toBe("Bill Gates");
      });
    done();
    $httpBackend.flush();    
  })
});