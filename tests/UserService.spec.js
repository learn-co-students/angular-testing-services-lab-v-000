describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;
  var $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get("UserService");
    $httpBackend = $injector.get("$httpBackend");

    $httpBackend.when("GET", '/rest/user').respond({first_name: "Frank",last_name: "Bangles"});
  }));

  it("get users's info",function(done){
    $httpBackend.expectGET("/rest/user");

    UserService
      .getUser()
      .then(function(res){
        var data = res.data;
        if(data.first_name === "Frank" && data.last_name === "Bangles"){
          done();
        };
      });
      $httpBackend.flush();
  });
  it("full name",function(){
    expect(UserService.createFullName({first_name: "Frank", last_name: "Bangles"})).toEqual("Frank Bangles");
  });
});
