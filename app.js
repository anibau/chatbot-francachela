const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flow1 = addKeyword('1', {sensitive:true})
 .addAnswer(
    [
        '📄 LISTO PARA HACER TU PEDIDO 🤓', '↪️ Cliente *Francachela*, agradecemos tu preferencia'
    ])
 .addAnswer('Indícanos tu *código* de cliente o N° DNI')
 .addAnswer('Ejemplo: *#111* / *#1111111*',
 {capture: true}, (ctx, {fallBack})=> {
    if(!ctx.body.includes('#')) {
        return fallBack()
    }
    console.log('mensaje entrante:',ctx.body)})
 .addAnswer('"¡Celebra la llegada de la primavera con nuestras irresistibles ofertas en vinos y licores selectos!. ¡No te lo pierdas!🥳"')
 .addAnswer(['↪️ Click abajo para ver Catálogos Francachela [Link 📌:https://drive.google.com/file/d/1xmGCiT1L9FsARiawJ6U2yoUevOi0UCdb/view]', '↪️ Click abajo para ver Promociones [Link 📌:https://drive.google.com/file/d/1xmGCiT1L9FsARiawJ6U2yoUevOi0UCdb/view]','↪️ Click abajo para ver el Productos Unitarios. [Link 📌: https://drive.google.com/file/d/1OhUZXP2u1epdDUqgSHEKaUcfSAavl-u3/view]', '↪️ Escribe "MENU" para regresar al Menú Principal'], {delay:1000} )
 .addAnswer('Para agilizar tu pedido, mándanos una *captura* o el código de la promoción y producto que deseas.', {
    delay:4500}
)

const flow2 = addKeyword('2', {sensitive: true})
 .addAnswer('Hola, mi pana 😉')
 .addAnswer(
    [
        '📬Recuerda que por ser cliente Francachela estás participando de los SORTEOS DE LICORES MENSUALES .',
        '📬Mientras más PUNTOS FRANCACHELA tengas, más oportunidades de ganar tienes 🙀🎉🥳', '↪️ 📝Escribe "MENU" para regresar al Menú Principal'
    ], {delay:1000})
 .addAnswer('Si quieres saber cuántos puntos tienes, coloca tu *Código* de Cliente o *DNI*', {delay:1500})
 .addAnswer('Ejemplo: *#111* / *#1111111*',
 {capture: true}, (ctx, {fallBack})=> {
    if(!ctx.body.includes('#')) {
        return fallBack()
    }
    console.log('mensaje entrante:',ctx.body)})
 .addAnswer('↪️ ¡Excelente! En breve uno de nuestros agentes te enviará la información.'
)


const flow3 = addKeyword('3', {sensitive: true})
 .addAnswer('↪️ Hola 👋, indícanos tu *código* de cliente o N° DNI')
 .addAnswer('Ejemplo: *#111* / *#1111111*',
  {capture: true}, (ctx, {fallBack})=> {
    if(!ctx.body.includes('#')) {
        return fallBack()
    }
    console.log('mensaje entrante:',ctx.body)})
 .addAnswer('Querido client@, escribenos en detalle tu *EXPERIENCIA FRANCACHELA*')
 .addAnswer('Y en breve uno de nuestros agentes se pondrá en contacto contigo', {delay:1500}
)

const flow4 = addKeyword('4', {sensitive:true}).addAnswer(
    [
        'Felicidades!!!😉👍👏', 'Estas a punto de comvertirte en uno de nuestros clientes FRANCACHELA', 'Y asi disfrutar de nuestros beneficios🎁🍾😊', '↪️ 📝Escribe "MENU" para regresar al Menú Principal'
    ]) 
    .addAnswer('📄Rellena tus siguientes *DATOS*:', {delay:1000})
    .addAnswer(['✓ N° de DNI:', '✓ N° de Celular con WhatsApp:', '✓ Apellidos:', '✓ Nombres:', '✓ Fecha de Nacimiento (día/mes/año):'], {delay:2000})

const flow5 = addKeyword('5', {sensitive: true})
 .addAnswer('Aqui puedes ver nuestras *Tiendas Asociadas* 🏪')
 .addAnswer(
    [ '✓ ¡Recuerda indicar tu código luego de cada compra para que no se pierdan tus puntos! ',
        '✓ ¡Acumula, canjea y disfruta con Francachela !'], {delay:1500})
 .addAnswer(['📍*Licoreria RON Y RON*] https://maps.app.goo.gl/vz1oA5zomyjsPLJ49','📍*Licoreria BARTEQUILA*] https://maps.app.goo.gl/exsmD3mLBKLsBJPa6', '↪️ 📝Escribe "MENU" para regresar al Menú Principal'], {delay:2500}
)

const flowPrincipal = addKeyword(['Hola','hola','Buenas','MENU', 'menú', 'Menu', 'menu', 'MENÚ '],{sensitive: true})
    .addAnswer(['🙌 Hola bienvenid@ a FRANCACHELA', 'La Licorería para TODO San Juan de Miraflores'])
    .addAnswer([ '✓ ¡Recuerda indicar tu código luego de cada compra para que no se pierdan tus puntos! ', '✓ ¡Atento porque vienen muchos más beneficios!', '✅ SÍGUENOS para más promociones exclusivas en nuestras redes sociales:', '💥 Facebook: https://www.facebook.com/licoreria.francachela/ ', ' 💥 Instagram: https://www.instagram.com/licoreria_francachela'], {delay:1500})
    .addAnswer('🚚Atención de *DELIVERY → 4PM a 10 PM* - Miércoles a Sábado', {delay:2500})
    .addAnswer('Digita el número de la *OPCIÓN* de tu preferencia:', {delay:2000})

    .addAnswer(
        [
            '¿En que puedo ayudarte hoy?',
            '*MENÚ PRINCIPAL*',
            'Escribe 👉1️⃣ Para Hacer un *Pedido*',
            'Escribe 👉2️⃣ Para Consultar tus *Puntos Acumulados*',
            'Escribe 👉3️⃣ Para dejar una *Sugerencia y/o Reclamo*',
            'Escribe 👉4️⃣ Para Obtener un *Código* y Empezar a Acumular Puntos',
            'Escribe 👉5️⃣ Para Conocer nuestras *Tiendas Asociadas*'
        ],
        null,
        null,
        [flow1, flow2, flow3, flow4, flow5], {delay:4000}
)

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
