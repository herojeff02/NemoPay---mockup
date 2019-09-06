function mainTable(){
    firebase.database().ref('/users/').on('value', function(snapshot) {
        document.body.innerHTML='';
        document.write("<h3>NemoPay Admin</h3>");
        for(let userID in snapshot.val()){
            firebase.database().ref('/users/'+userID).on('value', function(snapshot) {
                document.writeln("<p>served : " + snapshot.val().served + " | menu : " + snapshot.val().menuID+" | time : "+ snapshot.val().orderTime+" | requests : "+ snapshot.val().requests+  "  <button style=\"margin-left:1rem;height: 2rem;border-radius: 0\" onclick=\"servedChange(\'" + userID + "\')\">serve now</button></p>");
            })
        }
    });
}

function servedChange(myKey){
    let menuID = -4;
    let orderTime = -4;
    let requests = "-4";
    firebase.database().ref('/users/' +myKey+'/menuID').once('value', function(snapshot) {
        menuID = snapshot.val();
        alert(snapshot.val()+"번 메뉴 서빙!!!");
    });
    firebase.database().ref('/users/' +myKey+'/orderTime').once('value', function(snapshot) {
        orderTime = snapshot.val();
    });
    firebase.database().ref('/users/' +myKey+'/requests').once('value', function(snapshot) {
        requests = snapshot.val() || "";
    });
    
    let postData = {
        menuID : menuID,
        served : true,
        orderTime : orderTime,
        requests : requests
    };

    let updates = {};
    updates['/users/'+myKey] = postData;
    firebase.database().ref().update(updates);
}

mainTable();