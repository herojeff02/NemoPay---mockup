window.scrollTo(0,0);

let lastSelected = -1;
function selectMenu(menuNumber) {
    if(lastSelected === -1){
        lastSelected = menuNumber;
        alert("장바구니에 추가되었습니다.");
    }
    else if(lastSelected === menuNumber){
        alert("이미 장바구니에 있습니다.");
    }
    else{
        alert("한 메뉴만 선택할 수 있습니다.");
    }
}

function nextPage() {
    switch (lastSelected) {
        case 0:
            window.open("/shopping_bag_0.html", "_self");
            break;
        case 1:
            window.open("/shopping_bag_1.html", "_self");
            break;
        default:
            alert("장바구니가 비어 있습니다.");
            break;
    }

}