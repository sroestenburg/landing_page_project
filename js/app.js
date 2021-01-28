// navigation menu
highlightItem();

// draw the menu based on the sections in the page
function makeMenu(selectedSection) {
    let sections = document.getElementsByTagName("section");

    let navBarList = "";
    for (let i = 0; i < sections.length; i++) {
        var activeClass = "";
        if (selectedSection == sections[i].getAttribute('id')) {
            activeClass = "active";
        }
        navBarList = navBarList + '<li nav-item class="' + activeClass + '"><a href="index.html#' + sections[i].getAttribute('id') + '">' + sections[i].getAttribute('data-nav') + '</a></li>';
    }
    let menu = document.getElementById("navbar__list");
    menu.innerHTML = navBarList;
}

// adding an event listener to window that happens on # change
window.onhashchange = highlightItem;

// highlight item reads the hash from the url and passes the value to makeMenu without the #
function highlightItem() {
    let selectedItem = window.location.hash.replace("#", "");
    makeMenu(selectedItem);

    // let sections = document.getElementsByTagName("section");
    // for (const section of sections) {
    //     if (section.classList.contains("active") && section.id != selectedItem) {
    //         section.classList.remove("active");
    //     }
    //     if (section.id == selectedItem && !section.classList.contains("active")) {
    //         section.classList.add("active");
    //     }
    // }
}

// scroll to show topBtn and show menu with hightled section on the screen
document.addEventListener("scroll", showTopBtnAndStickyNavbar);
let midscreen = window.innerHeight / 2;

function showTopBtnAndStickyNavbar() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topBtn").style.visibility = "visible";
        document.getElementById("navbar").classList.add("stickyNavbar");
    }
    else {
        document.getElementById("topBtn").style.visibility = "hidden";
        document.getElementById("navbar").classList.remove("stickyNavbar");
    }

    let sections = document.getElementsByTagName("section");
    for (const section of sections) {
        if ((section.getBoundingClientRect().top >= 0 && section.getBoundingClientRect().top <= midscreen) || 
            (section.getBoundingClientRect().top < midscreen && section.getBoundingClientRect().bottom > midscreen)) {
            highlightMenu(section.getAttribute('data-nav'));
            if (!section.classList.contains("active")) {
                section.classList.add("active");
            }
        }
        else if (section.classList.contains("active")) {
            section.classList.remove("active");
        }
    }
}

// highlights menu based on the section appearing in the first half of screen based on viewport.
function highlightMenu(text) {
    let items = document.querySelectorAll("li[nav-item]");
    for (const item of items) {
        if (item.classList.contains("active") && item.innerText != text) {
            item.classList.remove("active");
        }
        if (item.innerText == text && !item.classList.contains("active")) {
            item.classList.add("active");
        }
    }
}

const goToTopbutton = document.getElementById("topBtn");

// on click on topBtn scroll to top
goToTopbutton.addEventListener("click", scrollToTop);
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



