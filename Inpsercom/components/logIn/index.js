'use strict';
app.logIn = kendo.observable({
    onShow: function () {  document.getElementById("password").value = "";},
    afterShow: function () { }
});
app.localization.registerView('logIn');

function signin() {
    try {
        var em = document.getElementById("email").value;
        var pa = document.getElementById("password").value;
        if (em == "" || !em) { alert("El Email no tiene datos"); return; }
        if (pa == "" || !pa) { alert("El Password no tiene datos"); document.getElementById("password").focus(); return; }
        var resul = validaLogin(document.getElementById("email").value, document.getElementById("password").value);
        if (resul == "false" || resul == "" || !resul) {
            alert("El ID o password son incorrectos por favor verifique");
            document.getElementById("password").focus();
            return;
        }
        var usu = validausuario(em); //resultado.Cliente[0].persona_nombre
        var tipo = "";
        if (usu.Cliente[0].identificacion_cliente.length == 10) { tipo = "C"; }
        else {
            if (usu.Cliente[0].identificacion_cliente.length == 13) { tipo = "R"; }
            else { tipo = "P"; }
        }
        var Usuario = {
            chasis: usu.Cliente[0].chasis,//"8LGJE5520CE010039",
            identificacion_cliente: usu.Cliente[0].identificacion_cliente,  //"0992327685001",
            tipodocumento: tipo, //"R",
            uid: "1234567890", // usu.Cliente[0].alta_movil_imei,
            telefono_celular: usu.Cliente[0].telefono_celular, //"0995545554",
            //numeroorden: "72363",
            secuencia_mv01: usu.Cliente[0].secuencia_mv01,
            mail: usu.Cliente[0].mail
        };
        localStorage.setItem("Inp_DatosUsuario", JSON.stringify(Usuario));
        datos_Cliente = Usuario;
        var veh = validavehicu(em);
        if (veh == "" || veh == null || !(veh)) { mens("Registre autos", "warning"); }
        else {
            veh=veh.Vehiculo[0];
            var Vehiculo = {
                secuencia_mv01: veh.secuencia_mv01, //6,
                mail: veh.mail, //"nerycarmela@hotmail.com",
                chasis: veh.chasis, //"19JJDSXSMLSLXS",
                numeroorden: veh.numeroorden,
                contrato_tipo: veh.contrato_tipo, //"",
                contrato_estado: veh.contrato_estado, //false,
                contrato_fecha_desde: veh.contrato_fecha_desde, //"1900-01-01",
                contrato_fecha_hasta: veh.contrato_fecha_hasta, //"1900-01-01",
                estado_vh02: veh.estado_vh02, //false,
                alta_movil_imei: veh.alta_movil_imei, // "",
                alta_movil_ip: veh.alta_movil_ip // ""
            }
            localStorage.setItem("Inp_DatosVehiculo", JSON.stringify(Vehiculo));
            datos_Vehiculo = Vehiculo;
        }
        kendo.mobile.application.navigate("components/miKia/view.html");
    } catch (s) {
        alert("signin " + s);
    }
}

//190.108.66.10
function validaLogin(email, password) {
    try {
        var resultado = "";
        var _identificacion = email + ";" + password;
        if ((_identificacion !== "") && (_identificacion)) {
            resultado = "";
            var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Login/" + _identificacion;
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        resultado = data.LoginGetResult;
                    } catch (e) {
                        borraCampos();
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            });
            return resultado;
        }
    } catch (f) {
        alert("ValidaLogin " + f);
    }
}

function validausuario(email) {
    try {
        if ((email != "") && (email)) {
            var resultado = "";
            var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Usuario/" + email;
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        resultado = JSON.parse(data.UsuarioGetResult);
                    } catch (e) {
                        borraCampos();
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            });
            return resultado;
        }
    } catch (f) {
        alert("validausuario " + f);
    }
}

function validavehicu(emailp) {
    try {
        if ((emailp !== "") && (emailp)) {
            var resultado = "";
            var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Vehiculo/" + emailp;
            //alert(Url);
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        resultado = JSON.parse(data.VehiculoGetResult);
                    } catch (e) {
                        borraCampos();
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));

                }
            });
            return resultado;
        }
    } catch (f) {
        alert("validavehiculo " + f);
    }
}

function borraCampos() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function ValidaMail() {
    try {
        if (document.getElementById("email").value != "") {
            var result = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(document.getElementById("email").value);
            if (result == false) {
                document.getElementById("email").style.borderColor = "red";
            } else {
                document.getElementById("email").style.borderColor = "";
            }
        }
    } catch (f) {
        alert("ValidaMail " + f);
    }
}