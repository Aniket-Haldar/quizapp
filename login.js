// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOd151uKEYs9n4PVWINFy-VVwrxkI65Cs",
    authDomain: "quizweb-7f061.firebaseapp.com",
    projectId: "quizweb-7f061",
    storageBucket: "quizweb-7f061.firebasestorage.app",
    messagingSenderId: "1:934899932881:web:ce062fbaa6ae4672512ff0",
    appId: "G-52QB20WC8Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Register Function (No Changes)
function register() {
    // Get input fields
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let full_name = document.getElementById('full_name').value;
    
    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is invalid!');
        return;
    }
    if (!validate_field(full_name)) {
        alert('Name field cannot be empty!');
        return;
    }

    // Register User
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser;
            var database_ref = database.ref();

            // Create User Data
            var user_data = {
                email: email,
                full_name: full_name,
                last_login: Date.now()
            };

            // Store User Data in Firebase
            database_ref.child('users/' + user.uid).set(user_data);
            alert('User Created Successfully!');
            window.location.href = "play.html";
        })
        .catch(function(error) {
            alert(error.message);
        });
}

// Login Function (Redirect to play.html)
function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is invalid!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser;
            var database_ref = database.ref();

            // Update last login time
            var user_data = { last_login: Date.now() };
            database_ref.child('users/' + user.uid).update(user_data);

            alert('User Logged In Successfully!');
            
            // Redirect to play.html after successful login
            window.location.href = "play.html";
        })
        .catch(function(error) {
            alert(error.message);
        });
}

// Validation Functions
function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field.length > 0;
}