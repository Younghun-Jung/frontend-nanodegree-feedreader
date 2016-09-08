/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Description: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         // Define spec for URLs definition
         it('All URLs are defined', function() {
            // Using Array allFeeds, check each url of all feeds is defined or not
            for(var i=0; i< allFeeds.length; i++) {
                // Apply expect function for each url in allFeeds array
                // expect("").toBeDefined(); //testing parameter ""
                //console.log("allFeeds length: " + allFeeds[i].length);
                //console.log("allFeeds URL length: " + allFeeds[i].url.length);
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].length).not.toBe(0);
            }
         });

        /* Description: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         // Define spec for names definition
         it('All names are defined', function() {
            // Using Array allFeeds, check each name of all feeds is defined or not
            for(var i=0; i< allFeeds.length; i++) {
                // Apply expect function for each name in allFeeds array
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].length).not.toBe(0);
            }
         });
    });


    /* Description: Write a new test suite named "The menu" */
    describe('The menu', function() {
        // Declare variable to assign body element
        var bodyElm;
        // Declare variable to assign menu icon element
        var menuIcon;
        // Assign body element into variable
        beforeEach(function() {
            bodyElm = $('body');
            menuIcon = $('.menu-icon-link');
        });
        /* Description: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         // Define spec for menu-hidden default
         it('The menu is hidden by default', function() {
           // Check body element has 'menu-hidden' class or not
           expect(bodyElm.hasClass('menu-hidden')).toBe(true);
         });

         /* Description: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          // Define spec for visibility of menu-change
          it('The menu changes visibility', function() {
            // Execute click event on menu icon
            menuIcon.trigger('click');
            // Set expect function in case that menu is visible
            expect(bodyElm.hasClass('menu-hidden')).toBe(false);
            // Execute click event on menu icon
            menuIcon.trigger('click');
            // Set expect function in case that menu is not visible
            expect(bodyElm.hasClass('menu-hidden')).toBe(true);
          });
    });


    /* Description: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Description: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            // ID of Initial entrie is 0
            // Passing callback function done() to parameter 'cb' of loadFeed function in app.js
            loadFeed(0, done);
         });

         it('There is at least a single .entry element in .feed container', function(done) {
            // Declare variable for checking .entry being or not
            // boolean type.
            //console.log(done);
            // Assign length of '.entry' elements under '.feed' into variable
            var entryLength = $('.feed').find('.entry').length;
            expect(entryLength).toBeGreaterThan(0);
            done();
         })
    })


    /* Description: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Seclection', function() {
        /* Description: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var origin, changed;

         beforeEach(function(done) {
            //console.log('start loadFeed in beforeEach');
            // Cal loadFeed firstly with index 0 and callback function
            // In callback function, content of '.feed' is assigned into variable ori
            loadFeed(0, function() {
                console.log('loadFeed is finished');
                origin = $('.feed').html();
                // After that, call loadFeed with another index 1
                // call done(), telling jasmine it can start testing expectation
                loadFeed(1, done);
            });
         });

         it('The content actually changes when a new feed is loaded', function(done) {
            //console.log('init 2');
            // Changed content of '.feed' element is assigned into variable
            changed = $('.feed').html();
            expect(changed).not.toBe(origin);
            done();
         });
    })

}());
