src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"
src="https://www.gstatic.com/firebasejs/8.2.0/firebase-database.js"
src="https://www.gstatic.com/firebasejs/8.2.0/firebase.js"

    var num = 0;
    var Pn1 = 0;
    var Pn2 = 0;
    var Punto1;
    var Punto2;
    var respuesta;
    var resultado;

    const firebaseConfig = {
        apiKey: "AIzaSyD8c2nLoRyNEW7OKC-dpiaOlEuOhe7RbRA",
        authDomain: "semillerouwu.firebaseapp.com",
        databaseURL: "https://semillerouwu-default-rtdb.firebaseio.com",
        projectId: "semillerouwu",
        storageBucket: "semillerouwu.appspot.com",
        messagingSenderId: "269866843261",
        appId: "1:269866843261:web:bf0fb16c3e7f10ca964514",
        measurementId: "G-0QBHDK8SEW"
    };



    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();

    function arrayJSON(ident, name, direccon, Na, Nc, Nt, Da) {
        var data = {
            id: ident,
            name: name,
            Discapacidad: direccon,
            nameAcu: Na,
            cedulaAcu: Nc,
            numAcu: Nt,
            Direccion: Da,
            Nivel1: {
                pregunta1: {
                    descripcion: "Pulse el rojo",
                    Resultado: "Rojo",
                    Respuesta: "null",

                },
                pregunta2: {
                    descripcion: "Pulse el amarillo",
                    Resultado: "Amarillo",
                    Respuesta: "null",
                },
                pregunta3: {
                    descripcion: "Pulse el Verde",
                    Resultado: "Verde",
                    Respuesta: "null",
                },
                pregunta4: {
                    descripcion: "Pulse el azul",
                    Resultado: "Azul",
                    Respuesta: "null",
                },
            },
            Nivel2: {
                pregunta1: {
                    descripcion: "Arriba",
                    Resultado: "Arriba",
                    Respuesta: "null",
                },
                pregunta2: {
                    descripcion: "Izquierda",
                    Resultado: "Izquierda",
                    Respuesta: "null",
                },
                pregunta3: {
                    descripcion: "Derecha",
                    Resultado: "Derecha",
                    Respuesta: "null",
                },
                pregunta4: {
                    descripcion: "Abajo",
                    Resultado: "Abajo",
                    Respuesta: "null",
                },
            }
        };
        return data;
    }



    function insertDATA() {
        // primerPaso --- var arrayData =arrayJSON("Peter5", "calle ciega sol");
        // primerPaso --- var task=firebase.database().ref("task/5");

        var arrayData = arrayJSON(document.getElementById("id").value, document.getElementById("name").value, document.getElementById("direccon").value, document.getElementById("nameAcu").value, document.getElementById("cedulaAcu").value, document.getElementById("numAcu").value, document.getElementById("direcAcu").value);
        var task = firebase.database().ref("Pacientes/" + document.getElementById("id").value);
        var g = task.set(arrayData);
        console.log(arrayData);
        alert("salvado");
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("direccon").value = "";
        document.getElementById("nameAcu").value="";
        document.getElementById("cedulaAcu").value="";
        document.getElementById("numAcu").value="";
        document.getElementById("direcAcu").value="";
    }
    //--

    function listarDATA() {
        //Leer Documentos
        var tabla = document.getElementById('tabla');
        var task = firebase.database().ref("task" + document.getElementById("id").value);
        var arrayData = task.get(task);
        console.log(arrayData);

        //        db.collection("users").onSnapshot((querySnapshot) => { //cambiamos el get por el onSnapshot
        tabla.innerHTML = ''; // inicia vacia la tabla
        querySnapshot.forEach((task) => {   //forEach es un ciclo se va repitiendo segun la data que se tiene
            console.log('${task.name} => ${task.data().name}');
            tabla.innerHTML += `
            <tr>
            <th scope="row">${task.name}</th>
            <td>${task.data().name}</td>
            <td>${task.data().direccon}</td>
            </tr>
            `;
        });
    }

    //--
    //--
    //--
    function innerHTML(id, result) {
        return document.getElementById(id).innerHTML += result;
    }



    function tabla(direccon, id, name, nameAcu, numAcu, cedulaAcu, Direccion, Punto1, Punto2) {

        return '<tr>' +
            '<td>' + id + '</td>' +
            '<td>' + name + '</td>' +
            '<td>' + direccon + '</td>' +
            '<td>' + nameAcu + '</td>' +
            '<td>' + cedulaAcu + '</td>' +
            '<td>' + numAcu + '</td>' +
            '<td>' + Direccion + '</td>' +
            '<td>' + "Nivel 1 " + '</td>' +
            '<td>' + Punto1 + "/4" + '</td>' +
            '<td>' + "Nivel 2 " + '</td>' +
            '<td>' + Punto2 + "/4" + '</td>' +
            '</tr>';
    }

    function verificar_campos(){
        if ((document.getElementById("id").value)==""||(document.getElementById("name").value)==""||(document.getElementById("direccon").value)==""||(document.getElementById("nameAcu").value)=="" || (document.getElementById("cedulaAcu").value)=="" || (document.getElementById("numAcu").value )=="" ||(document.getElementById("direcAcu").value)=="") {
            alert("todos los campos son obligatorios")
        }else{
            insertDATA()
        }
    }



    function listar() {
        var task = firebase.database().ref("Pacientes/");
        task.on("child_added", function (data) {
            var taskValue = data.val();
            Niv1(taskValue.id);
            num = 0;
            Pn1 = 0;
            console.log("Punto 1= ", Punto1)
            Niv2(taskValue.id);
            console.log("Punto 2= ", Punto2)
            num = 0;
            Pn1 = 0;
            var result = tabla(taskValue.Discapacidad, taskValue.id, taskValue.name, taskValue.nameAcu, taskValue.cedulaAcu, taskValue.numAcu, taskValue.Direccion, Punto1, Punto2);
            innerHTML("loadTask", result);
        });
    }

    function pasat() {
        location.href = "/Juegos/Introduccion_color.html";
    }

    function Niv1(id) {



        for (let i = 0; i < 4; i++) {


            switch (i) {
                case 0:
                    numPregunta = "pregunta1";
                    break;
                case 1:
                    numPregunta = "pregunta2";
                    break;
                case 2:
                    numPregunta = "pregunta3";
                    break;
                case 3:
                    numPregunta = "pregunta4";
                    break;
            }


            Punto1 = comparar(numPregunta, id, "Nivel1", i);
            console.log(i, "pn1", Punto1)

        }
        console.log("---------------------------------------------")
        console.log(Pn1, "retirn")




    }

    function comparar(numPregunta, id, Nv, con) {

        var dbRef = firebase.database().ref("/Pacientes/" + id +"/"+ Nv +"/"+ numPregunta);
        dbRef.on('value', (snapshot) => {
            respuesta = snapshot.child("Respuesta").val();
            resultado = snapshot.child("Resultado").val();
            console.log(respuesta, resultado);
            console.log(con);
            if (respuesta == resultado) {
                Pn1++;
            }
            if (con == 3) {
                console.log(Pn1)
                num = Pn1;

            }
        });
        return num;
    }

    function Niv2(id) {

        for (let i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    numPregunta = "pregunta1";
                    break;
                case 1:
                    numPregunta = "pregunta2";
                    break;
                case 2:
                    numPregunta = "pregunta3";
                    break;
                case 3:
                    numPregunta = "pregunta4";
                    break;

            }
            Punto2 = comparar(numPregunta, id, "Nivel2", i);

            console.log(i, "pn1", Punto2)


        }




    }


