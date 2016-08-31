describe('UserService', function () {

  //set the root module
  beforeEach(module('app'));

  //mock API calls using $httpBackend
  var UserService, $httpBackend;

  //Step 1 of $httpBackend: define the response
  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({
      first_name: 'Bill',
      last_name: 'Gates'
    });
  }));

  //Step 2: set the endpoint we are sending request to
  it('should get the current users information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(response) {
        var user = response.data
        if(user.first_name === 'Bill' && user.last_name === 'Gates') {
          done();
        }
      });
  
  // Step 3: execute the async request
      $httpBackend.flush();
  });

  it('should return a full name', function() {
    expect(UserService.createFullName({first_name: 'The', last_name: 'Man'})).toBe('The Man');
  });

});



// describe('UserService', function () {
//     beforeEach(module('app'));
 
//     var UserService, $httpBackend;
 
//     beforeEach(inject(function ($injector) {
//         UserService = $injector.get('UserService');
//         $httpBackend = $injector.get('$httpBackend');
 
//         $httpBackend.when('GET', '/rest/user').respond({user: 'Bill Gates', email: 'bill@microsoft.com'});
//     }));
 
//     it('should get the current users information', function (done) {
//         $httpBackend.expectGET('/rest/user');
 
//         UserService
//           .getUserInfo()
//           .then(function (res) {
//             if (res.email === 'bill@microsoft.com' && res.user === 'Bill Gates') {
//               done();
//             }
//           });
 
//         $httpBackend.flush();
//     });
// });