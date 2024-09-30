/* lo que es llamado desde index.html */

const form = document.querySelector("form")
const repayment = document.querySelector("#repayment")


form.addEventListener("submit", (e) => {
    e.preventDefault();

 

    const dataform = new FormData(form);


    let monto = dataform.get("prestamo")
    let interes = dataform.get("interes")
    let ano = dataform.get("ano")
    let mortgageType = dataform.get("mortgageType")


    let Validar = true;


    if (lleno(monto)) {
        Validar = false
        MostrarError("prestamo", "Monto es requerdio.")
    }

    if (lleno(interes)) {
        Validar = false
        MostrarError("interes", "Interes es requerido.")
    }

    if (lleno(ano)) {
        Validar = false;
        MostrarError("ano", "Año es requerido.")
    }

    
    if (lleno(mortgageType)) {
        Validar = false;
        MostrarError("mortgageType", "Type es requerido.") 
    }

  
   
    if (Validar) {
      
        document.querySelector(".mostras_imagen").classList.add("d-none")
        document.querySelector(".mostras_resultado").classList.remove("d-none")
        
        let pagomes = calculomes(monto, interes, ano);
        document.querySelector(".pago_del_mes").textContent = `${pagomes}`

        let pagototal = calculototal(monto, interes, ano);
        document.querySelector(".pago_total_prestamo").textContent = `${pagototal}`
        

    }

})

function clearform(){
    document.getElementById("formdata").reset();
    MostrarError.reset();
    

}

function lleno(value) {
    return value === "" || value === null;
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


function calculomes(monto, interes, ano) {

    let interes_mensual = interes / 12 / 100;

    let total_meses = ano * 12;

    let MesPago = (monto * interes_mensual * Math.pow(1 + interes_mensual, total_meses)) / (Math.pow(1 + interes_mensual, total_meses) - 1);

    return MesPago.toFixed(2);

}

    function calculototal(monto, interes, ano) {

        let interes_mensual = interes / 12 / 100;
    
        let total_meses = ano * 12;
    
        let TotalPago = ((monto * interes_mensual * Math.pow(1 + interes_mensual, total_meses)) / (Math.pow(1 + interes_mensual, total_meses) - 1)) * total_meses;
    
        clearform();

        return TotalPago.toFixed(2);

    
}

function calculointeres(monto, interes, ano) {
    return (monto * interes * ano).toFixed(2);

}





