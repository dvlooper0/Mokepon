let ataqueJugador
let ataqueEnemigo
let vidasJugador=3
let vidasEnemigo=3

function iniciarJuego(){

    let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display='none'
    
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click',selecionarMascotaJugador)
    
    let botonFuego=document.getElementById('boton-fuego')
    botonFuego.addEventListener('click',ataqueFuego)
    let botonAgua=document.getElementById('boton-agua')
    botonAgua.addEventListener('click',ataqueAgua)
    let botonTierra=document.getElementById('boton-tierra')
    botonTierra.addEventListener('click',ataqueTierra)
    
    let botonReiniciar=document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click',reiniciarJuego)
    botonReiniciar.style.display='none'
}

function selecionarMascotaJugador(){

    let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display='block'

    let sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display='none'

    let inputHipodoge=document.getElementById('hipodoge')
    let inputCapipepo=document.getElementById('capipepo')
    let inputRatigueya=document.getElementById('ratigueya')
    let spanMascotaJugador=document.getElementById('mascota-jugador')

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
    let spanMascotaEnemigo=document.getElementById('mascota-enemigo')
    
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

    let spanVidasJugador=document.getElementById('vidas-jugador')
    let spanVidasEnemigo=document.getElementById('vidas-enemigo')
    
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

    let sectionMensajes = document.getElementById('mensajes')

    let parrafo=document.createElement('p')
    parrafo.innerHTML='Tu mascota atacó con '+ataqueJugador +', la mascota del enemigo atacó con ' +ataqueEnemigo +' '+ resultado

    sectionMensajes.appendChild(parrafo)
}
function crearMensajeFinal(resultadoFinal){

    let sectionMensajes = document.getElementById('mensajes')

    let parrafo=document.createElement('p')
    parrafo.innerHTML=resultadoFinal

    sectionMensajes.appendChild(parrafo)

    let botonFuego=document.getElementById('boton-fuego')
    botonFuego.disabled=true
    let botonAgua=document.getElementById('boton-agua')
    botonAgua.disabled=true
    let botonTierra=document.getElementById('boton-tierra')
    botonTierra.disabled=true
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load',iniciarJuego) 