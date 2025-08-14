// -------------------------------- DOM manipulations PART I -------------------------------------------------------------|
// // Menu data structure
// var menuLinks = [
//   { text: 'about', href: '/about' },
//   { text: 'catalog', href: '/catalog' },
//   { text: 'orders', href: '/orders' },
//   { text: 'account', href: '/account' },
// ];

// Updated menu data structure:
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

// Part 1: Getting Started
// 1. Select and cache the <main> element in a variable named mainEl.
let mainEL = document.querySelector("main");

// 2. Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
    // Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
mainEL.style.backgroundColor = `var(--main-bg)`;

// 3. Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEL.innerHTML = `<h1>DOM Manipulation</h1>`;

// 4. Add a class of flex-ctr to mainEl.
    // Hint: Use the Element.classList API.
mainEL.classList.add("flex-ctr");


// Part 2: Creating a Menu Bar
// 1. Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById("top-menu");

// 2. Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = `100%`;

// 3. Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = `var(--top-menu-bg)`;

// 4. Add a class of flex-around to topMenuEl.
topMenuEl.classList.add("flex-around");


// // Part 3: Adding Menu Buttons
// // 1. Iterate over the entire menuLinks array and for each "link" object:
// menuLinks.forEach((link) => {
//     // 2. Create an <a> element.
//     const newEL = document.createElement("a");
//     // 3. On the new element, add an href attribute with its value set to the href property of the "link" object.
//     newEL.href = link.href;
//     // 4. Set the new element's content to the value of the text property of the "link" object.
//     newEL.textContent = link.text;
//     // 5. Append the new element to the topMenuEl element.
//     topMenuEl.appendChild(newEL);
// });


// Part 3: Adding Menu Buttons
// Iterate over the entire menuLinks array and for each "link" object:
for(let link of menuLinks){
    //  // Create an <a> element.
    let menuButton = document.createElement('a');

    //  // On the new element, add an href attribute with its value set to the href property of the "link" object.
    menuButton.setAttribute("href", link.href);
    
    //  // Set the new element's content to the value of the text property of the "link" object.
    menuButton.textContent = link.text;
    // console.log(menuButton);

    //  // Append the new element to the topMenuEl element.
    topMenuEl.appendChild(menuButton);
}


// Part 4: Adding Interactivity
// With the basic structure of the page now generated purely with JavaScript, we have demonstrated the ability to manipulate the DOM in several fundamental ways.


// -------------------------------- end of DOM manipulations PART I -------------------------------------------------------|

// -------------------------------- DOM manipulations PART II - event handling -------------------------------------------------------------|
// Part 2: Adding Additional HTML and CSS
// In order to facilitate this, add the following additional "sub-menu" <nav> element to the index.html file within your <header> element, 
// beneath the existing <nav> element, as follows
            // <header>
            // 	<nav id="top-menu"></nav>
            // 	<!-- Add the <nav> element below -->
            // 	<nav id="sub-menu"></nav>
            // </header>
// Other than this change, do not modify index.html in any way.
// Secondly, add the following to the styles.css file:
            // header, #top-menu {
            // 	position: relative;
            // }
            // #top-menu {
            // 	z-index: 20;
            // }
            // #sub-menu {
            // 	width: 100%;
            // 	z-index: 10;
            // 	transition: top 0.5s ease-out;
            // }
            // #sub-menu a:hover {
            // 	background-color: var(--top-menu-bg);
            // }
            // nav a.active {
            // 	background-color: var(--sub-menu-bg);
            // 	color: var(--main-bg);
            // }
// Other than this change, do not modify styles.css in any way.

// Part 3: Creating the Submenu
// 1. Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
let subMenuEl = document.getElementById("sub-menu");

// 2. Set the height subMenuEl element to be "100%".
subMenuEl.style.height = `100%`;

// 3. Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = `var(--sub-menu-bg)`;

// 4. Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add("flex-around");

// Now, change the position of the submenu to temporarily hide it. Later, we will make the submenu appear dynamically based on user interaction:
// 1. Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = `absolute`;

// 2. Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = `0`;


// Part 4: Adding Menu Interaction
// Update the menuLinks array to the following:
// In order to add interaction:
// 1. Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
let topMenuLinks = topMenuEl.querySelectorAll(`a`);

// 2. Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener( "click", function(e) {
    // 1. The first line of code of the event listener function should call the event object's preventDefault() method.
    e.preventDefault();

    const clickedEl = e.target;
    // 2. The second line of code of the function should immediately return if the element clicked was not an <a> element.
    if (e.target.tagName !== "A") {
        return;
    }
    // 3. Log the content of the <a> to verify the handler is working.
    console.log("Content of <a> element clicked:", clickedEl.textContent.toLowerCase());

// Progress Check - Ensure that clicking ABOUT, CATALOG, etc. logs about, catalog, etc. when a link is clicked. Clicking anywhere other than on a link should do nothing.

// Now that we have references to each of these links, and a registered event listener, we will want to add a toggled "active" state to each menu item, showing whether or not it is currently selected:
    topMenuLinks.forEach( link => {
        // 1. The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
        if (link == clickedEl) {
            // if already active, de-activate it
            if (link.classList.contains(`active`)){
                link.classList.remove(`active`);
                subMenuEl.style.top = `0`;      // hide submenu
            } else {
                // activate clicked link
                link.classList.add(`active`);
            }
        } else {
            // 2. The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.
            // Hint: Removing a non-existent class from an element does not cause an error!
            link.classList.remove(`active`);    
        }
    })

    // topMenuLinks.forEach(link => link.classList.remove(`active`));
    //   // If already active, deactivate and hide submenu
    // if (clickedEl.classList.contains('active')) {
    //     clickedEl.classList.remove('active');
    //     subMenuEl.style.top = '0'; // Hide submenu
    //     return;
    // }

    // // Activate clicked <a>
    // clickedEl.classList.add('active');

// Progress Check - Clicking any of the links should make that link active and clear the others. Clicking an active link should clear that link. Here is what it should look like so far, with "CATALOG" active:


// Part 5: Adding Submenu Interaction
// Within the same event listener, we want to toggle the submenu between active and non-active states. First, we will set the submenu to show or hide itself depending on the menu state:
// 1. Within the event listener, if the clicked <a> element does not yet have a class of "active" (it was inactive when clicked):
        // a. If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
        // b. Otherwise, set the CSS top property of subMenuEl to 0.
        // Hint: Caching the "link" object will come in handy for passing its subLinks array later.
    let linkText = clickedEl.textContent.toLowerCase();
    let linkObj = menuLinks.find(link => link.text == linkText);    // find matching link obj from menuLinks
    
    if (linkObj && linkObj.subLinks) {      // if sublinks exist, build and show submenu
        buildSubmenu(linkObj.subLinks);
        subMenuEl.style.top = `100%`;
    } else {
        subMenuEl.style.top = `0`;      // hide submenu

      // If no subLinks (like ABOUT), show its content in main
        mainEL.innerHTML = `<h1>${clickedEl.textContent}</h1>`;
    }
});

// Progress Check - Ensure that clicking CATALOG, ORDERS, etc. shows the submenu bar, and that clicking them again hides it. Clicking ABOUT should not show the submenu bar.

// The submenu needs to be dynamic based on the clicked link. To facilitate that, we will create a helper function called buildSubmenu that does the following:
function buildSubmenu(subLinks) {
    // 1. Clear the current contents of subMenuEl.
    subMenuEl.innerHTML = ``;

    // 2. Iterate over the subLinks array, passed as an argument, and for each "link" object:
    subLinks.forEach(link => {

        // a. Create an <a> element.
        const aEl = document.createElement(`a`);

        // b. Add an href attribute to the <a>, with the value set by the href property of the "link" object.
        aEl.setAttribute(`href`, link.href);

        // c. Set the element's content to the value of the text property of the "link" object.
        aEl.textContent = link.text;

        // d. Append the new element to the subMenuEl.
        subMenuEl.appendChild(aEl);
    });
}
// Once you have created your helper function, include it in the event listener within the same logic that shows the submenu, remembering to pass the array of sub-links as an argument.
// Progress Check - Here is what the page should look like so far:


// The menu is almost complete! Now, we need to add interactions to the submenu items themselves:
// 1. Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener(`click`, function(event){
    // a. The first line of code of the event listener function should call the event object's preventDefault() method.
    event.preventDefault();
    // b. The second line of code within the function should immediately return if the element clicked was not an <a> element.
    if (event.target.tagName !== `A`) return;
    // c. Log the content of the <a> to verify the handler is working.
    console.log(event.target.textContent);
    // 2. Next, the event listener should set the CSS top property of subMenuEl to 0.
    subMenuEl.style.top = `0`;
    // 3. Remove the active class from each <a> element in topMenuLinks.
    topMenuLinks.forEach(link => {
        link.classList.remove(`active`);
    });
    // 4. Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
    mainEL.innerHTML = `<h1>${event.target.textContent}</h1>`;
});

// If the ABOUT link is clicked, an <h1>About</h1> should be displayed.

// -------------------------------- end of DOM manipulations PART II - event handling -------------------------------------------------------|
