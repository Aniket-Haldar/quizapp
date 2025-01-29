// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOd151uKEYs9n4PVWINFy-VVwrxkI65Cs",
    authDomain: "quizweb-7f061.firebaseapp.com",
    projectId: "quizweb-7f061",
    storageBucket: "quizweb-7f061.appspot.com",
    messagingSenderId: "1:934899932881:web:ce062fbaa6ae4672512ff0",
    appId: "G-52QB20WC8Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Register Function
function register() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let full_name = document.getElementById('full_name').value;

    // Validate input
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is Invalid!');
        return;
    }
    if (!validate_field(full_name)) {
        alert('Please enter your full name!');
        return;
    }

    // Create user in Firebase
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            let database_ref = database.ref();

            let user_data = {
                email: email,
                full_name: full_name,
                last_login: Date.now()
            };

            database_ref.child('users/' + user.uid).set(user_data);
            alert('User Created! Redirecting...');
            
            // Redirect to play.html after successful registration
            window.location.href = "play.html";
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login Function
function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Validate input
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is Invalid!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            let database_ref = database.ref();

            let user_data = {
                last_login: Date.now()
            };

            database_ref.child('users/' + user.uid).update(user_data);
            alert('User Logged In! Redirecting...');

            // Redirect to play.htm after successful login
            window.location.href = "play.html";
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Validation Functions
function validate_email(email) {
    let expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field && field.trim().length > 0;
}