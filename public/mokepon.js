let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
let botonMascotaJugador = document.getElementById('boton-mascota')
let botonReiniciar=document.getElementById('boton-reiniciar')

let sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')
let spanMascotaJugador=document.getElementById('mascota-jugador')

let spanMascotaEnemigo=document.getElementById('mascota-enemigo')

const spanVidasJugador=document.getElementById('vidas-jugador')
const spanVidasEnemigo=document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas=document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa=document.getElementById('ver-mapa')
const mapa=document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones=[]
let mokeponesEnemigos = []
let ataqueJugador=[]
let ataqueEnemigo=[]
let opcionDeMokepones

let inputHipodoge
let inputCapipepo
let inputRatigueya

let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo

let botonFuego
let botonAgua
let botonTierra

let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo

let victoriasJugador = 0
let victoriasEnemigo = 0

let vidasJugador = 3
let vidasEnemigo = 3

let lienzo=mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20 
const anchoMaximoDelMapa = 350

if(anchoDelMapa>anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * (600 / 800)

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

// -------------------------------------------------- DEFINICION CLASE MOKEPON

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.alto)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
        )
    }
}

// -------------------------------------------------- INICIALIZACION DE OBJETOS

let hipodoge=new Mokepon('Hipodoge','./assets/hipodoge_attack.webp',5, './assets/hipodoge.webp')
let capipepo=new Mokepon('Capipepo','./assets/capipepo_attack.webp',5, './assets/capipepo.webp')
let ratigueya=new Mokepon('Ratigueya','./assets/ratigueya_attack.webp',5, './assets/ratigueya.webp')

/*
let hipodogeEnemigo=new Mokepon('Hipodoge','./assets/hipodoge_attack.webp',5, './assets/hipodoge.webp',)
let capipepoEnemigo=new Mokepon('Capipepo','./assets/capipepo_attack.webp',5, './assets/capipepo.webp',)
let ratigueyaEnemigo=new Mokepon('Ratigueya','./assets/ratigueya_attack.webp',5, './assets/ratigueya.webp')
*/
// -------------------------------------------------- ADICION DE ATAQUES A MOQUEPONES

const HIPODOGE_ATAQUES = [
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🔥',id: 'boton-fuego'},
    {nombre: '🪨',id: 'boton-tierra'},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

//hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🌊',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

//capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🌊',id:'boton-agua'},
    {nombre:'🪨',id:'boton-tierra'},
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

//ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya)

// -------------------------------------------------- F INICIAR JUEGO
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display='none'
    sectionVerMapa.style.display='none'

    mokepones.forEach(

        (mokepon) => {
            opcionDeMokepones=`
            <input type="radio" name="mascota" id="${mokepon.nombre}" />
            <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="${mokepon.nombre}">
            </label>
            `
            contenedorTarjetas.innerHTML+=opcionDeMokepones

            inputHipodoge=document.getElementById('Hipodoge')
            inputCapipepo=document.getElementById('Capipepo')
            inputRatigueya=document.getElementById('Ratigueya')
        }
    )

    botonMascotaJugador.addEventListener('click',selecionarMascotaJugador)

    botonReiniciar.addEventListener('click',reiniciarJuego)

    unirseAlJuego()

    botonReiniciar.style.display='none'
}

// -------------------------------------------------- F UNIRSE AL JUEGO
function unirseAlJuego(){

    fetch("http://localhost:7000/unirse")
    .then(function(res){
        //console.log(res)
        if(res.ok){
            res.text()
                .then(function(respuesta){
                    console.log(respuesta) //console.log("Respuesta del servidor (jugadorId):", respuesta)
                    jugadorId = respuesta
                })
        }
    })
}

// -------------------------------------------------- F SELECCION MASCOTA JUGADOR
function selecionarMascotaJugador(){

    //sectionSeleccionarMascota.style.display='none'

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML=inputHipodoge.id
        mascotaJugador=inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML=inputCapipepo.id
        mascotaJugador=inputCapipepo.id
    }else if(inputRatigueya.checked){
       spanMascotaJugador.innerHTML=inputRatigueya.id
       mascotaJugador=inputRatigueya.id
    }else{
        alert("Misigno?")
        return
    }

    sectionSeleccionarMascota.style.display='none'

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display='flex'
    
    iniciarMapa()
}

// -------------------------------------------------- F SELECCIONAR MOKEPON
function seleccionarMokepon(mascotaJugador){

    fetch(`http://localhost:7000/mokepon/${jugadorId}`, {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

// -------------------------------------------------- F EXTRAER ATQUES
function extraerAtaques(mascotaJugador){
    let ataques
    for(let i=0;i<mokepones.length;i++){
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

// -------------------------------------------------- F MOSTRAR ATAQUES
function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon=`
        <button id =${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML+=ataquesMokepon
    })

    botonFuego=document.getElementById('boton-fuego')
    botonAgua=document.getElementById('boton-agua')
    botonTierra=document.getElementById('boton-tierra')
    botones=document.querySelectorAll('.BAtaque')

}

// -------------------------------------------------- F SECUENCIA DE ATAQUES
function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e)=>{
            if(e.target.textContent ==='🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true
            }else if(e.target.textContent === '🌊'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true
            }
            //ataqueAleatorioEnemigo()
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
    
}

// -------------------------------------------------- F ENVIAR ATAQUES
function enviarAtaques(){
    fetch(`http://localhost:7000/mokepon/${jugadorId}/ataques`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques,50)

}

// -------------------------------------------------- F OBTENER ATAQUES
function obtenerAtaques(){

    fetch(`http://localhost:7000/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if(res.ok){
                res.json()
                .then(function ({ataques}){
                    if(ataques.length === 5){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
}

// -------------------------------------------------- F SELECCIONAR MASCOTA DEL ENEMIGO
function seleccionarMascotaEnemigo(enemigo){

    //let mascotaAleatorio=aleatorio(0,mokepones.length-1)

    spanMascotaEnemigo.innerHTML=enemigo.nombre//mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo=enemigo.ataques//mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

// -------------------------------------------------- F ATAQUE ALEATORIO DEL ENEMIGO
function ataqueAleatorioEnemigo(){
    console.log('Ataques del enemigo', ataquesMokeponEnemigo)
    let ataqueAleatorio=aleatorio(0,ataquesMokeponEnemigo.length-1)

    if(ataqueAleatorio==0 || ataqueAleatorio==1){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio==3 || ataqueAleatorio==4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

// -------------------------------------------------- F INICIAR PELEA
function iniciarPelea(){
    if(ataqueJugador.length===5){
        combate()
    }
}

// -------------------------------------------------- F INDEX AMBOS OPONENTES
function indexAmbosOponentes(jugador,enemigo){
    indexAtaqueJugador=ataqueJugador[jugador]
    indexAtaqueEnemigo=ataqueEnemigo[enemigo]
}

// -------------------------------------------------- F COMBATE
function combate(){

    clearInterval(intervalo)

    for(let index=0;index<ataqueJugador.length;index++){
        if(ataqueJugador[index]===ataqueEnemigo[index]){
            indexAmbosOponentes(index,index)
            crearMensaje("Empate 👽")    
        }
        else if(ataqueJugador[index]==='FUEGO' && ataqueEnemigo[index]==='TIERRA'){
            indexAmbosOponentes(index,index)
            crearMensaje("Ganaste 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else if(ataqueJugador[index]==='AGUA' && ataqueEnemigo[index]==='FUEGO'){
            indexAmbosOponentes(index,index)
            crearMensaje("Ganaste 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else if(ataqueJugador[index]==='TIERRA' && ataqueEnemigo[index]==='AGUA'){
            indexAmbosOponentes(index,index)
            crearMensaje("Ganaste 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else{
            indexAmbosOponentes(index,index)
            crearMensaje("Perdiste 👹")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML=victoriasEnemigo
        }
    }
/*    
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
*/
    revisarVictorias()
}

// -------------------------------------------------- F REVISAR VICTORIAS
function revisarVictorias(){

    let botonReiniciar=document.getElementById('boton-reiniciar')
    
    if (victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate 👽")
    }
    else if(victoriasJugador>victoriasEnemigo){
        crearMensajeFinal(("Felicitaciones ! Ganaste 🎎"))
        botonReiniciar.style.display='block'
    }
    else{
        crearMensajeFinal("Lo siento, perdiste 🎃")
        botonReiniciar.style.display='block'
    }
}

// -------------------------------------------------- CREAR MENSAJE
function crearMensaje(resultado){

    let nuevoAtaqueDelJugador=document.createElement('p')
    let nuevoAtaqueDelEnemigo=document.createElement('p')

    sectionMensajes.innerHTML=resultado
    nuevoAtaqueDelJugador.innerHTML=indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML=indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

// -------------------------------------------------- F CREAR MENSAJE FINAL
function crearMensajeFinal(resultadoFinal){

    let parrafo=document.createElement('p')
    parrafo.innerHTML=resultadoFinal
    sectionMensajes.appendChild(parrafo)
}

// -------------------------------------------------- F REINICIAR JUEGO
function reiniciarJuego(){
    location.reload()
}

// -------------------------------------------------- F ALEATORIO
function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// -------------------------------------------------- F PINTAR CANVAS
function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon){

        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
/*
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
*/

    //mokeponEnemigo.pintarMokepon()
/*
    if(mascotaJugadorObjeto.velocidadX != 0 || mascotaJugadorObjeto.velocidadY != 0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
*/
}

// -------------------------------------------------- F ENVIAR POSICION
function enviarPosicion(x,y){

    fetch(`http://localhost:7000/mokepon/${jugadorId}/posicion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if(res.ok){
            res.json()
                .then(function ({enemigos}){
                console.log(enemigos)
                mokeponesEnemigos = enemigos.map(function(enemigo){
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if (mokeponNombre === "Hipodoge"){
                        mokeponEnemigo = new Mokepon('Hipodoge','./assets/hipodoge_attack.webp',5, './assets/hipodoge.webp', enemigoId)
                    }
                    else if (mokeponNombre === "Capipepo"){
                        mokeponEnemigo = new Mokepon('Capipepo','./assets/capipepo_attack.webp',5, './assets/capipepo.webp', enemigoId)
                    }
                    else if (mokeponNombre === "Ratigueya"){
                        mokeponEnemigo = new Mokepon('Ratigueya','./assets/ratigueya_attack.webp',5, './assets/ratigueya.webp', enemigoId)
                    }

                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y
                    
                    //mokeponEnemigo.pintarMokepon()

                    return mokeponEnemigo
                })
            })
        }
    })
}

// -------------------------------------------------- Fs MOVIMIENTO

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

// -------------------------------------------------- F PRESION DE TECLAS
function sePresionoUnaTecla(event){

    switch(event.key){

        case 'ArrowUp':
            moverArriba()
        break

        case 'ArrowDown':
            moverAbajo()
        break

        case 'ArrowLeft':
            moverIzquierda()
        break

        case 'ArrowRight':
            moverDerecha()
        break

        default:
            break
    }

}

// -------------------------------------------------- F INICIAR MAPA
function iniciarMapa(){
    //mapa.width = 320
    //mapa.height = 240
    mascotaJugadorObjeto = obterneObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas,50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

// -------------------------------------------------- F OBTENER OBJETO MASCOTA
function obterneObjetoMascota(){
    for(let i=0;i<mokepones.length;i++){
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

// -------------------------------------------------- REVISAR COLISION
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + enemigo.alto
    const derechaMascota = mascotaJugadorObjeto.x + enemigo.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x



    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return;
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Se detecto una colision")

    enemigoId = enemigo.id

    sectionSeleccionarAtaque.style.display='flex'
    sectionVerMapa.style.display='none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load',iniciarJuego) 