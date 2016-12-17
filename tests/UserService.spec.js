describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'});
  }));

  it("should get the current user's information", function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res){
        var data = res.data;
        if (data.first_name === 'Bill' && data.last_name === 'Gates' && data.email === 'bill@microsoft.com') {
          done();
        }
      });
      $httpBackend.flush();
  });

  it('should correctly add first and last names', function(){
    expect(UserService.createFullName({first_name: 'Frodo', last_name: 'Baggins'})).toEqual('Frodo Baggins');
  });

});