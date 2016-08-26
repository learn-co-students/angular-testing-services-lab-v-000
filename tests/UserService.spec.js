describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'});
  }));

  it("should get the users information", function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (response) {
        var data = response.data;

        if (data.email === 'bill@microsoft.com' && data.first_name === 'Bill', data.last_name === "Gates" ) {
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should return the users first and last name with a space in between', function () {
    expect(UserService.createFullName({first_name: "Bill", last_name: "Gates"})).toEqual("Bill Gates");
  });
});
