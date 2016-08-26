describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend')

    $httpBackend.when('GET', '/rest/user').respond({username:"Mr Robot", skill:"Hacking"})

  }));


  it('Should test user service', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data

        if (data.username === "Mr Robot" && data.skill === "Hacking") {
          done();
        }
      });
      $httpBackend.flush();
  });

});
