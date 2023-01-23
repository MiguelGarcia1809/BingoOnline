
const cartas_player = document.querySelector(".cartas-player");
const cartas_cpu = document.querySelector(".cartas-CPU");

//Aquí se guardaran las cartas de los participantes
let player=[];
let cpu = [];

//Funcion para escoger 15 numeros entre 1 y 90 sin repeticion
function escogerNumero(arr){
    while(arr.length<15){
        let num = Math.floor(Math.random()*90) + 1;
        if (arr.indexOf(num) == -1 && arr.length<15) {
            arr.push(num);
        }
    }
    return arr;
}

//Se escogen 15 numeros random entre 1 y 90 sin repetirse y se colocan dentro de player[]
escogerNumero(player);

//Se escogen 15 numeros random entre 1 y 90 sin repetirse y se colocan dentro de cpu[]
escogerNumero(cpu);

//Funcion que genera los tr y td de las tabla
function generaTabla(arr,frag,cartas){
    for(let i=0;i<3;i++){
        let tr = document.createElement("tr");
        let indiceInicial = i*5;
        let indiceFinal = indiceInicial + 5;
        for(let j=0;j<5;j++){
            let td = document.createElement("td");
            let valor = arr.slice(indiceInicial,indiceFinal)[j];
            td.classList.add("carta");
            td.classList.add(`c${valor}`);
            td.textContent = valor;
            tr.appendChild(td);
        }
        frag.appendChild(tr);
    }
    cartas.appendChild(frag);
}

const fragmento_player = document.createDocumentFragment();
generaTabla(player,fragmento_player,cartas_player);

const fragmento_cpu = document.createDocumentFragment();
generaTabla(cpu,fragmento_cpu,cartas_cpu);


//Valores del 1 al 90 que saldrán al dar click en el botón
let pozo = [];
for (let i = 1; i<= 90; i++) {
    pozo.push(i);
}

const button = document.querySelector(".button");
const resultado = document.querySelector(".resultado");

//Validar si el numero del pozo está en los arreglos player y cpu, y eliminarlos del arreglo
function validarNumero(numero,arr){
    if(arr.indexOf(numero)!==-1){
        const cartas = document.querySelectorAll(`.c${numero}`);
        cartas.forEach((carta)=>{
            carta.classList.remove("carta");
            carta.classList.add("eliminado");
        });
        let indice=arr.indexOf(numero);
        arr.splice(indice,1);
    }
}


//Mostrar en pantalla al ganador de la partida y evitar que se sigan sacando numeros
function validarVictoria(arr){
    if(arr.length == 0){
        button.disabled = true;
    }
}


//Sacar un numero del pozo, validarlo y mostrar en pantalla los resultados
function sacarNumero(){
    let random = Math.floor(Math.random()*90) + 1;
    if (pozo.indexOf(random) !== -1) {
        let p = document.createElement("p");
        p.textContent = random;
        p.classList.add("carta-resultado");
        resultado.appendChild(p);
        let indice = pozo.indexOf(random);
        pozo.splice(indice,1);
        validarNumero(random,player);
        validarNumero(random,cpu);
        validarVictoria(player);
        validarVictoria(cpu);
    }else{
        sacarNumero();
    }
}

button.addEventListener("click",sacarNumero);