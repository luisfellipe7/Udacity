/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */

    describe('RSS Feeds', function () {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* In this test I loop through each feed checking the 'url' value is defined
         * and if its length is not less then 9 just like the test that we do to check
         * if the RSS feeds are defined, but looping through each feed and looking for
         * the url value and checking if the length and content is valid.
         */
        function checkforValidURLs(feed) {
        it('feed have valid URL', function () {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBeLessThan(9); // Checks if at least it has something more than the http:// text is there
                expect(feed.url).toMatch(/^http(s?)\:\/\//); // Regular expression to check if the URL contains https or http meaning that is valid
        });
        }
        // Here I check each URL with the function checkforValidURLs, so we can know which feed has invalid URL
        for (i = 0; i < allFeeds.length; i++) {
            checkforValidURLs(allFeeds[i]);
        }
        /* This test is very similar to the previous one that checks if the urls are valid, but just check if the
         * names are defined, then this is far simpler because we only check if the name is a string.
         */

        it('has valid names', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                expect(typeof allFeeds[i].name).toBe('string');
            }
        });
    });

    /* This is our second test suite - a test suite just contains
     * a related set of tests. This suite is all about the Menu
     * behaviour.
     */

    describe('The menu', function () {

        /* This test checks if the menu is hidden by checking if
         * the body element has the 'menu-hidden' class using jQuery .hasClass() function
         */

        it('should be hidden by default', function () {
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });

        /* This test checks if the class is added to the body element on click, assuring
         * that the state of the menu changes when a click happens
         */

        it('should change the visibility when menu icon is clicked', function () {

            $(".menu-icon-link").trigger('click'); // When the menu icon is clicked we expect that the 'menu-hidden' class was removed
            expect($("body").hasClass('menu-hidden')).toBe(false);

            $(".menu-icon-link").trigger('click'); // When the menu icon is clicked again we expect that the 'menu-hidden' class is applied
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });
    });
    /* This is the third test suite - a test suite just contains
     * a related set of tests. This suite is all about the Initial Entities.
     */
    describe('Initial Entities', function () {

        // As the test is async we use Jasmine's beforeEach and done() funcitons with
        // loadFeed

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // This is the test that checks if there is at least a single .entry element
        // within the .feed container

        it('there is at least a single .entry element within the .feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /* This is the fourth test suite - a test suite just contains
     * a related set of tests. This suite is all about the Selection of a New Feed.
     */
    describe('New Feed Selection', function () {

        /* In this test we check if the content is updated when
         * a differnt feedId is passed to the loadFeed() function.
         */

        var defaultContent,
            updatedContent;

        /* The code bellow runs the loadFeed function with the feedId 0 (default) and 1 (second on the list)
         * and with a callback that is filling the variables with the content we get.
         */

        beforeEach(function (done) {
            loadFeed(0, function () {
                defaultContent = $('.feed').text();

                loadFeed(1, function () {
                    updatedContent = $('.feed').text();
                    done();
                });
            });

        });

        // This test checks if the variables are different if that happend it means the content changed

        it('loads a new feed', function () {
            expect(updatedContent).not.toBe(defaultContent);
        });
    });
}());
