/* lo que es llamado desde index.html */

const form = document.querySelector("form")
const repayment = document.querySelector("#repayment")


form.addEventListener("submit", (e) => {
    e.preventDefault();

 

    const dataform = new FormData(form);


    let monto = dataform.get("prestamo")
    let interes = dataform.get("interes")
    let ano = dataform.get("ano")


    let Validar = true;


    if (lleno(monto)) {
        Validar = false
        MostrarError("prestamo", "Mortgage amount is requiered.")
    }

    if (lleno(interes)) {
        Validar = false
        MostrarError("interes", "Interest rate is requiered.")
    }

    if (lleno(ano)) {
        Validar = false
        MostrarError("ano", "Mortgage term is requiered.")
    }



    if (lleno(monto) && positivo(monto)) {
        Validar = false
        MostrarError("prestamo", "Mortgage amount need be positive number.")
    }

    if (lleno(interes) && positivo(interes)) {
        Validar = false
        MostrarError("interes", "Interest rate need be positive number.")
    }

    if (lleno(ano) && positivo(ano)) {
        Validar = false
        MostrarError("ano", "Interest rate need be positive number.")
    }


    if (Validar) {
      /*   alert("entro") */
        document.querySelector(".mostras_imagen").classList.add("d-none")
        document.querySelector(".mostras_resultado").classList.remove("d-none")
        
        let pagomes = calcularPagoMensual(monto, interes, ano);
        document.querySelector(".pago_del_mes").textContent = `${pagomes}`
        

    }

})


function lleno(value) {
    return value === "" || value === null;
}


function positivo(value) {
    return !isNaN(value) && Number(value) > 0;

}

function positivo(value) {
    const Inte = /[+]\d+$/;
    return Inte.test(value) && Number(value) > 0;
}


function positivo(value) {
    const Inte = /[+]\d+$/;
    return Inte.test(value) && Number(value) > 0;
}


function MostrarError(inputName, message) {
    const input = document.querySelector(`input[name="${inputName}"]`);
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-menssage");
    errorElement.style.color = "red";
    errorElement.innerText = message;

    if (input) {
        input.parentElement.appendChild(errorElement);

    }

}


function calcularPagoMensual(P, r_anual, n_anos) {

    let r_mensual = r_anual / 12 / 100;

    let n_total = n_anos * 12;

    let M = (P * r_mensual * Math.pow(1 + r_mensual, n_total)) / (Math.pow(1 + r_mensual, n_total) - 1);

    return M.toFixed(2);

}

function calcularInteres(P, r_anual, n_anos) {
    return (P * r_anual * n_anos).toFixed(2);

}





