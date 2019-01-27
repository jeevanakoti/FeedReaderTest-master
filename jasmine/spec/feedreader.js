/*jshint esversion: 6 */

/* feedreader.js */

$(function() {

    describe('RSS Feeds', () => {
        
        /* validates allFeeds object */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* validates the url property of the allFeeds object */
         it('has feeds with no empty URL', () => {
            for(const feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

        /* validates the name property of the allFeeds object */
         it('has feeds with no empty name', () => {
            for(const feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });

     });

    describe('The menu', () => {
        const body = document.querySelector('body');

        /* we are hidding the menu by the css
        transform: translate3d(-12em, 0, 0);
        this is included in the class .menu-hidden and the class is applied to the body tag*/

        /* this ensures the body tag has the class */
        it('is hidden by default', () => {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* this simulates the click on menuIcon and checks the presence of menu-hidden tag after clicks */
        it('changes the visibility when the icon is clicked', () => {
            const menuIcon = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);

        });
    });

    describe('Initial Entries', ()=>{

        /* done function will be executed after the feeds are loaded */
        beforeEach((done) => {
            loadFeed(0, done);
        });

        it('should have at least one .entry element within .feed container', (done) => {
            const container = document.querySelector('.feed');
            const elements = container.children;
            expect(elements.length).not.toBe(0);

            /* ensures that there is an element with .entry class */
            for(const element of elements){
                expect(element.querySelector('.entry')).toBeDefined();
            }
            done();
        });

    });

    /* this test load two different RSS feeds from different websites and ensures 
    the actual change of the content by comparing the header title */
    
    describe('New Feed Selection', ()=>{
        var preivousTitle;

        beforeEach((done) => {

            loadFeed(0, ()=>{
                // index 0 loaded
                preivousTitle = document.querySelector('.header-title').innerHTML;
                loadFeed(1, done); // if index 1 is loaded, the following test will be executed
            });
        });

        it('changes the content', (done) => {
            // this checks the actual change of the content by checking the equality of the header title
            const currentTitle = document.querySelector('.header-title').innerHTML;
            expect(currentTitle === preivousTitle).toBe(false);
            done();
        });
    });

}());
