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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         // Define spec for URLs definition
         it('All URLs are defined', function() {
            // Using Array allFeeds, check each url of all feeds is defined or not
            for(var i=0; i< allFeeds.length; i++) {
                // Apply expect function for each url in allFeeds array
                expect(allFeeds[i].url).toBeDefined();
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         // Define spec for names definition
         it('All names are defined', function() {
            // Using Array allFeeds, check each name of all feeds is defined or not
            for(var i=0; i< allFeeds.length; i++) {
                // Apply expect function for each name in allFeeds array
                expect(allFeeds[i].name).toBeDefined();
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
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
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         // Define spec for menu-hidden default
         it('The menu is hidden by default', function() {
           // Check body element has 'menu-hidden' class or not
           expect(bodyElm.hasClass('menu-hidden')).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          // Define spec for visibility of menu-change
          it('The menu changes visibility', function() {
            // Check body element has menu-hidden class or not
            if(bodyElm.hasClass('menu-hidden') === true) {
              // Using trigger function, Execute 'click' event on menuIcon
              menuIcon.trigger('click');
              // If body element has 'menu-hidden' class before,
              // body element does not have 'menu-hidden' class after executing toggle()
              expect(bodyElm.hasClass('menu-hidden')).toBe(false);
            }else {
              // Using trigger function, Execute 'click' event on menuIcon
              menuIcon.trigger('click');
              // If body element does not have 'menu-hidden' class before,
              // body element should have 'menu-hidden' class after executing toggle()
              expect(bodyElm.hasClass('menu-hidden')).toBe(true);
            }
          });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
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
            var flag;
            // If .entry element(s) exist(s) under .feed, flag is true
            if($('.feed').find('.entry').length > 0) {
                flag = true;
                //console.log($('.feed').find('.entry').length); // Check the number of entries
            } else {
                // If .entry element(s) do/does not exist under .feed, flag is false
                flag = false;
            }

            // Set expect function on flag variable
            expect(flag).toBe(true);
            //console.log('flag expect');
            // Call callback function
            done();
         })
    })


    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Seclection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         beforeEach(function(done) {
            // Passing parameter 'id':1 for checking change of previous feed
            //console.log('start loadFeed in beforeEach');
            loadFeed(1, done);
         });

         it('The content actually changes when a new feed is loaded', function(done) {
            console.log('init 2');
            // Declare variable str and
            // Assign text content in the 0th child of .entry element into str
            var str = $('.entry').children().eq(0).text();
            //console.log(str); // check str content
            // If new feed(id is 1) is loaded, 0th content needs to be 'My New ~~'
            expect(str).toBe('My New Favorite ES6 Toy: Destructured Objects as Parameters');
            // Execute callback function
            //console.log('done flag');
            done();
         });
    })

}());
