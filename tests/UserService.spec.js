describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user')
      .respond({first_name:'Avi', last_name:'Turkewitz'});
  }));

  it('#getUser() should get user data from API', function(done){
    $httpBackend.expectGET('/rest/user');
    UserService
      .getUser()
      .then(function(res) {
        if (res.data.first_name === 'Avi') {
          done();
        }
    });
    $httpBackend.flush();
  });

  it('#createFullName() should join the users first and last name', function(){
    // $httpBackend.expectGET('/rest/user');
    // var some_user = UserService
    //   .getUser()
    //   .then(function(res) {
    //      return res.data;
    //    });

    var some_user = {first_name: 'Avi', last_name: 'Turkewitz'}

    expect(UserService.createFullName(some_user)).toEqual('Avi Turkewitz');

    // $httpBackend.flush();
  })
});
