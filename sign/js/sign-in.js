let myInput = document.querySelector(".password");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");
let forgetpass = document.getElementById("fp");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, child, get,set,onValue,push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth,updateProfile ,sendPasswordResetEmail,createUserWithEmailAndPassword,reload,sendSignInLinkToEmail,signOut,signInWithEmailAndPassword,onAuthStateChanged ,sendEmailVerification,deleteUser} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";



const firebaseConfig2 = {
  apiKey: "AIzaSyCWjR-SzTBkaJMVj9gcA6g_spcn6YS9Rg0",
  authDomain: "test-45ec8.firebaseapp.com",
  databaseURL: "https://test-45ec8-default-rtdb.firebaseio.com",
  projectId: "test-45ec8",
  storageBucket: "test-45ec8.appspot.com",
  messagingSenderId: "1038009051334",
  appId: "1:1038009051334:web:69f178ad59e73683bbcfc7"
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig2, 'secondary');

const db2 = getDatabase(app2);
const auth = getAuth(app2);

document.getElementById('eye').addEventListener('click',togglePasswordVisibility)
function togglePasswordVisibility() {
  if (myInput.type === "password") {
    myInput.type = "text";
  } else {
    myInput.type = "password";
  }
}
// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
  document.getElementById("message").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
  document.getElementById("message").style.display = "none";
};

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};

try {
  forgetpass.addEventListener("click", () => {
  window.location.href = "forgetpassword.html";
});
} catch (error) {
  
}



try {
  
document.getElementById('sign_up').addEventListener('click',function(){
  document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault()
  });
const newPostKey = push(child(ref(db2), 'posts')).key;
const newPostcode = push(child(ref(db2), 'posts')).key;

 var data =  {
    "id":newPostKey,
    "idcardnum":   document.getElementsByClassName('idd')[0].value,
    "invitecode":newPostcode,
    "name": document.getElementById('name').value,
    "email": document.getElementById('email').value,
    "phone": document.getElementById('phone').value,
    "password":document.getElementsByClassName('password')[0].value,
    "gender":document.getElementById('gend').value,
    "savedappartment":[],
    "tokens":0,
    "profilepic":'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
}
const email = document.getElementById('email').value
const password = document.getElementsByClassName('password')[0].value
createUserWithEmailAndPassword(auth, email,password ).then(function () {
document.getElementById('sign_up').disabled = true;
sendEmailVerification(auth.currentUser)
  .then((user) => {
    document.getElementById('senemail').style.display='flex'
    document.getElementById('timer').style.display='flex'

  //  var cccc=  setInterval(function() {
  //     reload(auth.currentUser);
  //      if (auth.currentUser.emailVerified) {
  //          console.log("Email Verified!");
  //          push(ref(db2, '/'), data).then(function () {
  //                   document.getElementById("form").submit();
  //                 })   
  //          clearInterval(cccc)
  //      }
  //    }, 1000);  
var tim = 60;
  var cccc=  setInterval(function() {
    console.log(tim--)
    document.getElementById('timer').innerHTML=tim;
        reload(auth.currentUser);
         if (auth.currentUser.emailVerified) {
             console.log("Email Verified!");
             push(ref(db2, '/'), data).then(function () {
                      document.getElementById("form").submit();
                    })   
             clearInterval(cccc)
         }
         if (tim ==0) {
          deleteUser(auth.currentUser)
          document.getElementById('senemail').style.display='none'
          document.getElementById('sign_up').disabled = false;
          clearInterval(cccc)
          document.getElementById('timer').innerHTML='you have to sign up again'

         }
         window.addEventListener('beforeunload', function (e) {
          // e.preventDefault();
          // e.returnValue = ''
          if (!auth.currentUser.emailVerified){
            deleteUser(auth.currentUser)
          }
      });
       }, 1000);  
           
  });
})


})
} catch (error) {
  
}

try {
  
  document.getElementById('sign_in').addEventListener('click',function(){
    document.getElementById("form2").addEventListener("submit", function(event){
      event.preventDefault()
    });
    window.db2 =  getDatabase(app2)
    // const auth = getAuth();
signInWithEmailAndPassword(auth, document.getElementById('email').value, document.getElementsByClassName('password')[0].value)
  .then((userCredential) => {
    console.log('1h')

    // Signed in 
    // const user = userCredential.user;
    const starCountRef2 = ref(db2, '/');
    onValue(starCountRef2, (snapshot) => {
      window.dataa = snapshot.val();
      console.log('1hh')

     for(var key in dataa) {
      if (document.getElementById('email').value==dataa[key]['email']) {
        console.log('1')
        // if (document.getElementsByClassName('password')[0].value==dataa[key]['password']) {
          console.log('2')
          localStorage.setItem("myid", dataa[key]['id'])
          localStorage.setItem("opid", key)
          set(ref(db2, '/' + key + '/password'),document.getElementsByClassName('password')[0].value).then(function () {
            document.getElementById("form2").submit();
        
           })

        // }
        
      }

    }

        
    });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
   
  
  })
  } catch (error) {
    
  }


  
