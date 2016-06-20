describe('UserService', function () {
   beforeEach(module('app'));

   var UserService, $httpBackend;

   beforeEach(inject(function ($injector) {
     UserService = $injector.get('UserService');
     $httpBackend = $injector.get('$httpBackend');

     $httpBackend.when('GET', '/rest/user').respond({user: 'John', email: 'john@gmail.com'});
   }));

  it("retrieves the user's info"), function (done) {
    $httpBackend.expectGet('/rest/user/');

    UserService
    .getUserInfo()
    .then(function (res) {
      var data = res.data;
      if data.user === 'John' && data.email === 'john@gmail.com') {
        done();
      }
    });

  $httpBackend.flush();

  });

  it("joins the user's first and last name with a space in between"), function (done) {
    var user = { first_name: 'John', last_name: 'Doe' };
    expect(UserService.createFullName(user)).toEquak('John Doe');
  });

});
