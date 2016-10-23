describe('UserService', function () {
  var $controller;

  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function ($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'});
  }));

  it('should get the current users information', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res){
        var data = res.data;
        if(data.email === 'bill@microsoft.com' && data.first_name === 'Bill'){
          done();
        }
      });
      $httpBackend.flush();
  });

  it('should add names together correctly', function(){
    expect(UserService.createFullName({first_name: 'Bill', last_name: 'Gates'})).toEqual('Bill Gates');
  });
});

// The first function is to get the user's logged in information
// from /rest/user. Test this method using $httpBackend to mock
// the response (you can mock any response, just make sure to test
// for the same response that you mock!)
//
//
// The second function is to join the user's first name with their
// last name, with a space in between. Test that this function returns
// the expected output.
