function Registrar() {
    const emailLogUp = document.getElementById('emailLogUp').value;
    const passLogUp = document.getElementById('passLogUp').value;

    firebase.auth().createUserWithEmailAndPassword(emailLogUp, passLogUp)
        .then(() => {
            // Signed in
            //var user = userCredential.user;
            sendEmailVerification()
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log(errorCode);
            console.log(errorMessage);
        });
}

function Ingreso() {
    const emailLogIn = document.getElementById('emailLogIn').value;
    const passLogIn = document.getElementById('passLogIn').value;

    firebase.auth().signInWithEmailAndPassword(emailLogIn, passLogIn)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
        });
}

// funcion para ver si hay usuraio logeado o no
function Observador() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('existe usuario activo')
            contentsLogIn(user);

            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            console.log('*************************');
            console.log(user.emailVerified);
            console.log('*************************');

        // ...
        } else {
            // User is signed out
            console.log('no existe usuario activo')
            // ...
            contentMain.innerHTML = `
            <div class="alert alert-warning" role="alert">
            A simple warning alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
            </div>
            `;
        }
    });
}

// se ejecuta cuando entra
Observador();

//contenido de usuario logeado
function contentsLogIn(user) {
    const contentMain = document.getElementById('contentMain')
    var user = user;

    if (user.emailVerified) {
        contentMain.innerHTML = `
        <div class="container mt-5">
            <div class="alert alert-success mt-4" role="alert">
                <h4 class="alert-heading">Bienvenido!:  ${user.email}</h4>
                <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                <hr>
                <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
            </div>
            <button onclick="Cerrar()" class="btn btn-danger">Cerrar Sesion</button>
        </div>
        `;
    }

}


function Cerrar() {
    firebase.auth().signOut()
        .then(() => {
            // Signed in
            console.log('saliendo....')
            // ...
        })
        .catch((error) => {
            console.log(error)
        });
}

function sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
            console.log('enviando correo')
        })
        .catch((error) => {
            console.log(error)
        });;
}