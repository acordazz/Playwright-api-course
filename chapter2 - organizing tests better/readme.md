# Chapter 2: Organizing your tests

Continuing with the API:
https://restful-booker.herokuapp.com/apidoc/index.html

The code has some enhancements comparing to the previous chapter. We now have some additional ways to organize our code:
- test.describe(): allows us to group some tests according to any reason we want. An example would be to configure a group of tests to run in parallel, or with a specific number of retries. In addition we can use all types of test.use() configurations (ex: a specific locale such as 'en-US')
- test.beforeAll(), test.beforeEach(), test.afterAll(), test.afterEach(): similar to other unit test frameworks.
- test.skip(): can be used to skip tests depending on the browser for example
- test.fail(): if you don't have a finished test yet you can keep it failed until you fix it. Similar concept to Red-Green-Refactor in TDD
  
  See: https://playwright.dev/docs/api/class-test