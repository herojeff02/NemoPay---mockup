window.scrollTo(0,0);

function nextPage(num) {
    switch (num) {
        case 0:
            window.open("/checkout_0.html", "_self");
            break;
        case 1:
            window.open("/checkout_1.html", "_self");
            break;
    }
}