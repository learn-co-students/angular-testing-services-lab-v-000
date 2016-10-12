describe('UserService', function () {

	beforeEach(module('app'));

	var UserService, $httpBackend;

	beforeEach(inject(function ($injector) {
		UserService = $injector.get('UserService');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend.when('GET', '/rest/user').respond({
			user: {
				first_name: 'Bill',
				last_name: 'Gates'
			},
			email: 'bill@microsoft.com'
		});
	}));

	it('should get the current users first name', function(done) {
        $httpBackend.expectGET('/rest/user');

        UserService
        	.getUser()
        	.then(function(resp) {
        		var data = resp.data;
        		if(data.user.first_name === 'Bill') {
        			done();
        		}
        	});

		$httpBackend.flush();

    });

    it('should join the current users first name and last name', function(done) {
    	$httpBackend.expectGET('rest/user');    	

    	UserService
    		.getUser()
    		.then(function(resp) {
    			var data = resp.data;
    			var fullName = UserService.createFullName(data.user);

    			if(fullName === 'Bill Gates') {
    				done();
    			}
    		});

    	$httpBackend.flush();

    });

});
