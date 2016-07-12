# Use ngMocks and Jasmine/Karma

## Objectives

- Test the created Services

## Instructions

In this repo we have a service named `UserService` that has two functions.

The first function is to get the user's logged in information from `/rest/user`. Test this method using `$httpBackend` to mock the response (you can mock any response, just make sure to test for the same response that you mock!)

The second function is to join the user's first name with their last name, with a space in between. Test that this function returns the expected output.
