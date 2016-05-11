describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({
      first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'
    });
  }));

  it("should get the current user's info", function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res){
        var data = res.data;
        if (data.first_name === 'Bill' && data.last_name === 'Gates' && data.email === 'bill@microsoft.com') {
          done();
        }
      });

    $httpBackend.flush();
  });

  it("should create a full name from a user object with the first_name and last_name", function(){
    expect(UserService.createFullName({first_name: 'Bill', last_name: 'Gates'})).toEqual('Bill Gates');
  });

});
