let myKey;
let devFlag = false;
let processing = false;
let servedNotificationActive = false;

function newOrder(menuID){
    if(!processing) {
        console.log("processing");
        processing = true;

        myKey = firebase.database().ref().child('users').push().key;

        if (getCookie("orderedID") && !devFlag) {
            alert("이미 주문 정보가 있습니다.");
            myKey = getCookie("orderedID");
            let wait_window = document.getElementById('wait_window_background');
            wait_window.style.display = 'block';
            $('#wait_window_background').animate({opacity: '1'}, 300);
            leftOrderCounter();
        } else {
            setCookie("orderedID", myKey, 2);

            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            let postData = {
                menuID: menuID,
                served: false,
                orderTime: time,
                requests: document.getElementById('requests').value
            };
            let updates = {};
            updates['/users/' + myKey] = postData;
            firebase.database().ref().update(updates, function (error) {
                if (error) {
                    alert("오류가 발생했습니다.");
                } else {
                    leftOrderCounter();
                    let wait_window = document.getElementById('wait_window_background');
                    wait_window.style.display = 'block';
                    // wait_window.animate({opacity: [0, 1]});

                    $('#wait_window_background').animate({opacity: '1'}, 300);
                }
            });
        }
        if (devFlag) {
            eraseCookie("orderedID");
        }
    }
}

function leftOrderCounter(){
    let count=0;
    firebase.database().ref('/users/').on('value', function(snapshot) {
        for (let userID in snapshot.val()) {
            firebase.database().ref('/users/'+userID).on('value', function(snapshot) {
                if(userID === myKey){
                    if(snapshot.val().served===true){
                        firebase.database().ref('/users/').off();
                        firebase.database().ref('/users/'+userID).off();
                        servedNotification();
                        servedNotificationActive = true;
                        return -1;
                    }
                    return count;
                }
                if(snapshot.val().served === false){
                    count += 1;
                }
            })
        }
        console.log(count);
        document.getElementById('wait_ppl').innerText = (count+1) + "명";
        document.getElementById('wait_time').innerText = Math.floor((count+1)*1.3)+'분';

        count=0;
    });
}

function servedNotification() {
    if (!servedNotificationActive) {
        console.log("SERVED");
        alert("주문하신 메뉴가 준비되었습니다.\n카운터로 와 주세요.");
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdoVCAsES_Q9s0U363MmH7WNwUdJOZwgtXrcLxVK2h3E67e4w/viewform", "_self");
    }
}

function onReceipt(){
    window.open("/receipt_0.html", "_blank");
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}