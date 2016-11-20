describe('UserService', function () {
	beforeEach(module('app'));

	var UserService;

	beforeEach(inject(function ($injector) {
		UserService = $injector.get('UserService');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'});
	}));

	it('should get the current users information', function (done) {
		$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function (res) {
				var response = res.data;
				if (response.email === 'bill@microsoft.com' && response.first_name === 'Bill') {
					done();
				}
			});

		$httpBackend.flush();
	});
  it('it should join the user\'s first name with their last name', function () {
    expect(UserService.createFullName({first_name: 'Elon', last_name: 'Musk'})).toEqual('Elon Musk');
  });

});
