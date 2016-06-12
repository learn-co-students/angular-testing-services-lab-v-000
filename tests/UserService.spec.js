describe('UserService', function () {
  var $controller;

  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');


    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Shana', last_name: 'Moore'});
  }));

  it("should get the user's logged in information", function (success) {
      $httpBackend.expectGET('/rest/user');

      UserService
        .getUser()
        .then(function (response) {
          var data = response.data;
          if (data.first_name === 'Shana'){
            success();
          }
        });
      $httpBackend.flush();  
  });

  it("it should join the user's first name with their last name, with a space in between", function () {
    expect(UserService.createFullName({first_name: 'Shana', last_name: 'Moore'})).toEqual('Shana Moore');
  });
});
