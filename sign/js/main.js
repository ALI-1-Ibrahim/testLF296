import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, child, get,set,onValue ,runTransaction,onDisconnect, serverTimestamp,increment,update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

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

// Initialize Realtime Database and get a reference to the service

const db2 = getDatabase(app2);



    document.getElementById('confirm').addEventListener('click',function(){
        console.log(document.getElementById('icode').value)
        document.getElementById("form2").addEventListener("submit", function(event){
          event.preventDefault()
        });

        const starCountRef2 = ref(db2, '/');
        onValue(starCountRef2, (snapshot) => {
            window.dataa = snapshot.val();
            console.log('1hh')
        
            for (var key in dataa) {
                if (document.getElementById('icode').value == dataa[key]['invitecode']) {
                    console.log('1')
                    // if (document.getElementsByClassName('password')[0].value==dataa[key]['password']) {
                    console.log('2')
                    const updates = {};
                    updates[`/${key}/tokens`] = increment(2);
        
                    update(ref(db2), updates).then(function () {
                        document.getElementById("form2").submit();
                    })
                    break;

                }
            }
            document.getElementById('err').style.display='flex'
        });
    })



