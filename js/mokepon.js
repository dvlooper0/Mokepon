let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
let botonMascotaJugador = document.getElementById('boton-mascota')
let botonFuego=document.getElementById('boton-fuego')
let botonAgua=document.getElementById('boton-agua')
let botonTierra=document.getElementById('boton-tierra')
let botonReiniciar=document.getElementById('boton-reiniciar')

let sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')
let inputHipodoge=document.getElementById('hipodoge')
let inputCapipepo=document.getElementById('capipepo')
let inputRatigueya=document.getElementById('ratigueya')
let spanMascotaJugador=document.getElementById('mascota-jugador')

let spanMascotaEnemigo=document.getElementById('mascota-enemigo')

let spanVidasJugador=document.getElementById('vidas-jugador')
let spanVidasEnemigo=document.getElementById('vidas-enemigo')

let sectionMensajes = document.getElementById('resulrado')
let ataqueDelJugador = document.getElementById('ataque-del-jugador')
let ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

let mokepones=[]
let ataqueJugador
let ataqueEnemigo
let vidasJugador=3
let vidasEnemigo=3

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques=[]
    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/hipodoge_attack.webp',5)
let capipepo = new Mokepon('Capipepo','./assets/capipepo_attack.webp',5)
let ratigueya = new Mokepon('Ratigueya','./assets/ratigueya_attack.webp',5)

hipodoge.ataques.push(
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🔥',id: 'boton-fuego'},
    {nombre: '🪨',id: 'boton-tierra'},
)

capipepo.ataques.push(
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🌊',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},
)

ratigueya.ataques.push(
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-guego'},
    {nombre:'🌊',id:'boton-agua'},
    {nombre:'🪨',id:'boton-tierra'},
)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display='none'
    botonMascotaJugador.addEventListener('click',selecionarMascotaJugador)
    botonFuego.addEventListener('click',ataqueFuego)
    botonAgua.addEventListener('click',ataqueAgua)
    botonTierra.addEventListener('click',ataqueTierra)
    botonReiniciar.addEventListener('click',reiniciarJuego)
    botonReiniciar.style.display='none'
}

function selecionarMascotaJugador(){
    sectionSeleccionarAtaque.style.display='flex'
    sectionSeleccionarMascota.style.display='none'

    if(inputHipodoge.checked)
        spanMascotaJugador.innerHTML='Hipodoge'
    else if(inputCapipepo.checked)
        spanMascotaJugador.innerHTML='Capipepo'
    else if(inputRatigueya.checked)
        spanMascotaJugador.innerHTML='Ratigueya'
    else
        alert("Misigno?")
    
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){

    let mascotaAleatorio=aleatorio(1,3)
    
    if(mascotaAleatorio==1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    }else if(mascotaAleatorio==2){
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    }else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function ataqueFuego(){
    ataqueJugador='FUEGO'
    //alert(ataqueJugador)
    ataqueAleatorioEnemigo()
    //alert(ataqueEnemigo)
}

function ataqueAgua(){
    ataqueJugador='AGUA'
    //alert(ataqueJugador)
    ataqueAleatorioEnemigo()
    //alert(ataqueEnemigo)
}

function ataqueTierra(){
    ataqueJugador='TIERRA'
    //alert(ataqueJugador)
    ataqueAleatorioEnemigo()
    //alert(ataqueEnemigo)
}

function ataqueAleatorioEnemigo(){
    
    let ataqueAleatorio=aleatorio(1,3)

    if(ataqueAleatorio==1){
        ataqueEnemigo='FUEGO'
    }else if(ataqueAleatorio==2){
        ataqueEnemigo='AGUA'
    }else{
        ataqueEnemigo='TIERRA'
    }

    combate()
}

function combate(){
    
    if(ataqueJugador==ataqueEnemigo){
        crearMensaje("Empate 👽")
    }
    else if(ataqueJugador == 'FUEGO' && ataqueEnemigo =='TIERRA'){
        crearMensaje("Ganaste 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML=vidasEnemigo
    }
    else if(ataqueJugador == 'AGUA' && ataqueEnemigo =='FUEGO'){
        crearMensaje("Ganaste 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML=vidasEnemigo
    }
    else if(ataqueJugador == 'TIERRA' && ataqueEnemigo =='AGUA'){
        crearMensaje("Ganaste 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML=vidasEnemigo
    }else{
        crearMensaje("Perdiste 👹")
        vidasJugador--
        spanVidasJugador.innerHTML=vidasJugador
    }   

    revisarVidas()
}

function revisarVidas(){

    let botonReiniciar=document.getElementById('boton-reiniciar')
    
    if (vidasEnemigo==0){
        crearMensajeFinal(("Felicitaciones ! Ganaste 🎎"))
        botonReiniciar.style.display='block'
    }
    else if(vidasJugador==0){
        crearMensajeFinal("Lo siento, perdiste 🎃")
        botonReiniciar.style.display='block'
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueDelJugador=document.createElement('p')
    let nuevoAtaqueDelEnemigo=document.createElement('p')

    
    //let parrafo=document.createElement('p')
    //parrafo.innerHTML='Tu mascota atacó con '+ataqueJugador +', la mascota del enemigo atacó con ' +ataqueEnemigo +' '+ resultado

    //sectionMensajes.appendChild(parrafo)
}
function crearMensajeFinal(resultadoFinal){


    let parrafo=document.createElement('p')
    parrafo.innerHTML=resultadoFinal

    //sectionMensajes.appendChild(parrafo)

    botonFuego.disabled=true
    botonAgua.disabled=true
    botonTierra.disabled=true
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load',iniciarJuego) 