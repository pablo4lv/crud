let api = `https://6542c1e001b5e279de1f88f3.mockapi.io/users/`;

let inputGet1 = document.getElementById("inputGet1Id")
let btnGet1 = document.getElementById("btnGet1");

let inputNombre = document.getElementById("inputPostNombre");
let inputApellido = document.getElementById("inputPostApellido");
let btnPost = document.getElementById("btnPost");

let inputPutId = document.getElementById("inputPutId");
let inputPutNombre = document.getElementById("inputPutNombre");
let inputPutApellido = document.getElementById("inputPutApellido");
let btnPut = document.getElementById("btnSendChanges");

let inputDelete = document.getElementById("inputDelete");
let btnDelete = document.getElementById("btnDelete");

let results = document.getElementById("results");

btnGet1.addEventListener("click", async () => {
    var get = {
        method: `GET`,
    }
    
    await algo( api+inputGet1.value , get)

    mostrar(result)
})

btnPost.addEventListener("click", async () => {
    let datos =  {
        name: inputNombre.value,
        lastname: inputApellido.value,
    }
    
    var post = {
        method: `POST`,
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    }
    
    await algo( api, post)
    
    mostrar(result)
})

btnPut.addEventListener("click", async () => {
    let datos =  {
        name: inputPutNombre.value,
        lastname: inputPutApellido.value,
    }
    
    var put = {
        method: `PUT`,
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    }
    
    await algo( api + inputPutId.value, put)
    
    mostrar(result)
})

btnDelete.addEventListener("click", async () => {

    var borrar = {
        method: `DELETE`
    }
    
    await algo( api + inputDelete.value, borrar)
    
    mostrar(result)
})

function mostrar(ev){
    results.innerHTML = ``;
    if (ev.length>1){
        ev.forEach(e => {
            results.innerHTML += 
            `<li class="list-group-item"><p>ID: ${e.id}</p><p>NAME: ${e.name}</p><p>LASTNAME: ${e.lastname}</p></li>
            `
        })
    }else{
        results.innerHTML = `<li class="list-group-item"><p>ID: ${ev.id}</p><p>NAME: ${ev.name}</p><p>LASTNAME: ${ev.lastname}</p></li>
        `
    }
}

let result = {}
async function algo(url, param){
    try{
        const response = await fetch(url,param);
        if (response.ok){
            const data = await response.json();
            result = data;
            console.log(result);//
        }else{
            document.getElementById("alert-error").classList.add("show");
            setTimeout(() => {
                document.getElementById("alert-error").classList.remove("show");
            }, 3000);
        }
    }catch(err){
        console.error(err)
        }
}