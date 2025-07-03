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

let mokepones=[]
let ataqueJugador=[]
let ataqueEnemigo=[]
let opcionDeMokepones

let inputHipodoge
let inputCapipepo
let inputRatigueya

let mascotaJugador
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

// -------------------------------------------------- DEFINICION CLASE MOKEPON

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

// -------------------------------------------------- INICIALIZACION DE OBJETOS

let hipodoge=new Mokepon('Hipodoge','./assets/hipodoge_attack.webp',5)
let capipepo=new Mokepon('Capipepo','./assets/capipepo_attack.webp',5)
let ratigueya=new Mokepon('Ratigueya','./assets/ratigueya_attack.webp',5)

// -------------------------------------------------- ADICION DE ATAQUES A MOQUEPONES

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
    {nombre:'🔥',id:'boton-uego'},
    {nombre:'🌊',id:'boton-agua'},
    {nombre:'🪨',id:'boton-tierra'},
)

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
    botonReiniciar.style.display='none'
}

// -------------------------------------------------- F SELECCION MASCOTA JUGADOR
function selecionarMascotaJugador(){

    sectionSeleccionarMascota.style.display='none'
    //sectionSeleccionarAtaque.style.display='flex'
    sectionVerMapa.style.display='flex'
    
    iniciarMapa()

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
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
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
            ataqueAleatorioEnemigo()
        })
    })
    
}

// -------------------------------------------------- F SELECCIONAR MASCOTA DEL ENEMIGO
function seleccionarMascotaEnemigo(){

    let mascotaAleatorio=aleatorio(0,mokepones.length-1)

    spanMascotaEnemigo.innerHTML=mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo=mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

// -------------------------------------------------- F ATAQUE ALEATORIO DEL ENEMIGO
function ataqueAleatorioEnemigo(){
    
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

    capipepo.x = capipepo.x + capipepo.velocidadX
    capipepo.y = capipepo.y + capipepo.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    lienzo.drawImage(
        capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto
    )
}

// -------------------------------------------------- Fs MOVIMIENTO

function moverDerecha(){
    capipepo.velocidadX = 5
}

function moverIzquierda(){
    capipepo.velocidadX = -5
}

function moverAbajo(){
    capipepo.velocidadY = 5
}

function moverArriba(){
    capipepo.velocidadY = -5
}

function detenerMovimiento(){
    capipepo.velocidadX = 0
    capipepo.velocidadY = 0
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
    mapa.width = 320
    mapa.height = 240
    intervalo = setInterval(pintarCanvas,50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

window.addEventListener('load',iniciarJuego) 