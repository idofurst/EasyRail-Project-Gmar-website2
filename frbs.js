let fprSignupStarted = false;

        const firebaseConfig = {
            apiKey: "AIzaSyBRkRDYyG3Qoh1WCaWEBDA5ew8wsD1bRlA",
            authDomain: "easyrail-b114f.firebaseapp.com",
            projectId: "easyrail-b114f",
            storageBucket: "easyrail-b114f.firebasestorage.app",
            messagingSenderId: "93156981126",
            appId: "1:93156981126:web:afb94138e70c8f2b375407",
            measurementId: "G-EJ1467NFKQ"
        };
        
        const app = firebase.initializeApp(firebaseConfig);
        console.log(app)

        function logout() {
    firebase.auth().signOut()
        .then(() => {
            console.log("User signed out successfully.");
            // Redirect to home page or refresh
            window.location.href = "/index.html"; 
        })
        .catch((error) => {
            console.error("Error signing out: ", error);
        });
}

// Add state observer for login status
firebase.auth().onAuthStateChanged(function(user) {
    const userEmailItem = document.getElementById("userEmailListItem");
    const authActionItem = document.getElementById("authActionListItem");
    
    // Safety check in case the elements don't exist on all pages
    if (!userEmailItem || !authActionItem) return;

    if (user) {
        // User is signed in, display email and Logout link
        userEmailItem.innerHTML = `<span class="nav-link">${user.email}</span>`;
        authActionItem.innerHTML = `<a class="nav-link" href="#" onclick="logout(); return false;">התנתק</a>`;
    } else {
        // User is signed out, clear email and display Login link
        userEmailItem.innerHTML = '';
        authActionItem.innerHTML = `<a class="nav-link" href="/login.html">כניסת משתמש</a>`;
    }
});

// ... rest of the existing code in frbs.js
        
        function saveUser(){
        document.getElementById("error").style.display = "none"
        document.getElementById("suce").style.display = "none"
        email = document.getElementById("email").value
          pass = document.getElementById("pass").value
         if(email === "" || pass.length <8){
             document.getElementById("error").style.display = "block"
             document.getElementById("error").innerText = "יש להזין שם משתמש וסיסמה חוקיים"
            return
         }

         firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user)
                document.getElementById("suce").style.display = "block"
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });

        }
        function login(){
            document.getElementById("error").style.display = "none"
            document.getElementById("suce").style.display = "none"
            email = document.getElementById("loginemail").value
            pass = document.getElementById("loginpass").value
         if(email === "" || pass.length <8){
            document.getElementById("error").style.display = "block"
             document.getElementById("error").innerText = "יש להזין שם משתמש וסיסמה חוקיים"
            return
         }

         firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user)
                document.getElementById("suce").style.display = "block"
                document.getElementById("suce").innerText = "נכנסת בהצלחה"
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });

        }
     function erhide(){
        document.getElementById("error").style.display = "none"
        document.getElementById("suce").style.display = "none"
     }

     firebase.database().ref("/from altera/a").on('value',reciveData);
     function reciveData(snapshot){
            if(snapshot.val()>30){
                
            }


     }
     function pumpon(){
        firebase.database().ref('/toAltera').set(129);
     }

     function pumpoff(){
        firebase.database().ref('/toAltera').set(130);
     }

     function buzzhigh(){
        firebase.database().ref('/toAltera').set(67);
     }

     function buzzlow(){
        firebase.database().ref('/toAltera').set(66);
     }
     
     function buzzoff(){
        firebase.database().ref('/toAltera').set(68);
     }    
     
     function stephigh(){
        firebase.database().ref('/toAltera').set(2);
     }

     function steplow(){
        firebase.database().ref('/toAltera').set(4);
     }
     
     function stepoff(){
        firebase.database().ref('/toAltera').set(0);
     }    





     function FPRsignup(){
    fprSignupStarted = true;

    const statusEl = document.getElementById("fprStatus");
    if (statusEl) {
        statusEl.style.display = "block";
        statusEl.className = "alert alert-info mt-3";
        statusEl.innerText = "ממתין לרישום טביעת אצבע...";
    }

    // Trigger FPR device
    firebase.database().ref('/toFPR/toRstat').set(1);
}

     function FPRlogin(){
        firebase.database().ref('/')
     }
     // Listen to fingerprint registration result
firebase.database().ref("/fromFPR/Rstat").on("value", function(snapshot) {
    // 🚫 Do nothing unless FPRsignup was pressed
    if (!fprSignupStarted) return;

    const val = snapshot.val();
    const statusEl = document.getElementById("fprStatus");

    if (!statusEl) return;

    if (val === 1) {
        statusEl.className = "alert alert-success mt-3";
        statusEl.innerText = "טביעת האצבע נרשמה בהצלחה ✅";
    } 
    else if (val === 0) {
        statusEl.className = "alert alert-danger mt-3";
        statusEl.innerText = "רישום טביעת האצבע נכשל ❌";
    }
});
