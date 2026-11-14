/* Grey~Spell — Sueco para hispanohablantes de México. 48 unidades A1–C2. */
window.GS = window.GS || { units: [] };
GS.extra = GS.extra || {};
GS.P = GS.P || function (c, lv, t, es, ic, g, w, s) { (GS.extra[c] = GS.extra[c] || { units: [] }).units.push({ lv, t, es, ic, g, w, s }); };
GS.extra.sv = GS.extra.sv || { units: [] };
const SV = (...a) => GS.P('sv', ...a);

SV('A1', 'Hej!', 'Saludos y presentaciones', '👋', { t: 'Pronombres y el verbo vara', k: 'är jag du hon han vi',
n: `¡El verbo no cambia con la persona! **är** = soy, eres, es, somos, son.
|jag är|yo soy
|du är|tú eres
|han / hon är|él / ella es
|vi är|somos
|ni är|ustedes son
|de är|ellos son (se pronuncia «dom»)
!En Suecia casi todos se hablan de **du** (tú), incluso al jefe.` },
`hej=hola=👋
hej då=adiós
god morgon=buenos días=🌅
god natt=buenas noches=🌙
tack=gracias=🙏
tack så mycket=muchas gracias
varsågod=de nada/aquí tienes
ja=sí=👍
nej=no=👎
förlåt=perdón
ursäkta=disculpe
jag=yo
du=tú
jag heter=me llamo
trevligt att träffas=mucho gusto=🤝
hur mår du?=¿cómo estás?`,
`Hej, jag heter Sofia.=Hola, me llamo Sofia.
Hur mår du?=¿Cómo estás?
Jag mår bra, tack.=Estoy bien, gracias.
Jag är från Mexiko.=Soy de México.
Trevligt att träffas!=¡Mucho gusto!
Hej då, vi ses!=¡Adiós, nos vemos!`);

SV('A1', 'Familjen', 'Familia, en / ett y har', '👨‍👩‍👧', { t: 'Dos géneros: en y ett', k: 'en ett har',
n: `Hay dos géneros: **en** (común, 75 %) y **ett** (neutro).
|en bror|un hermano
|ett barn|un niño
El artículo definido va **pegado al final**: bror → bror**n** (el hermano), barn → barn**et**.
**har** = tengo, tienes, tiene… (no cambia).
!Abuelos lógicos: mor + mor = **mormor** (mamá de mamá), far + mor = **farmor** (mamá de papá).` },
`familjen=la familia=👨‍👩‍👧
en pappa=un papá=👨
en mamma=una mamá=👩
en bror=un hermano=👦
en syster=una hermana=👧
en son=un hijo
en dotter=una hija
mormor=la abuela materna=👵
farfar=el abuelo paterno=👴
ett barn=un niño/un hijo=🧒
en kusin=un primo
en man=un hombre/un esposo
en fru=una esposa
en hund=un perro=🐶
en katt=un gato=🐱
jag har=tengo/yo tengo`,
`Jag har en bror och en syster.=Tengo un hermano y una hermana.
Min mamma heter Elsa.=Mi mamá se llama Elsa.
Vi har en hund.=Tenemos un perro.
Katten är liten.=El gato es pequeño.
Har du barn?=¿Tienes hijos?
Min mormor bor i Göteborg.=Mi abuela vive en Gotemburgo.`);

SV('A1', 'Mat', 'Comida y el presente', '🍽️', { t: 'El presente termina en -r', k: 'äter dricker gillar tycker',
n: `Casi todos los verbos terminan en **-r** en presente, igual para todas las personas:
|äta → äter|comer → como, comes…
|dricka → dricker|beber
|gilla → gillar|gustar
**Tycker om** = me gusta: «jag tycker om kaffe».
!**Fika**: la pausa sagrada para café y pan dulce. Es un sustantivo y un verbo.` },
`bröd=pan=🍞
ost=queso=🧀
ett äpple=una manzana=🍎
vatten=agua=💧
mjölk=leche=🥛
kaffe=café=☕
kött=carne=🥩
kyckling=pollo=🍗
fisk=pescado=🐟
potatis=papa=🥔
ett ägg=un huevo=🥚
en kanelbulle=un rol de canela=🥐
äta=comer
dricka=beber/tomar
fika=pausa para café
frukost=desayuno`,
`Jag äter bröd med ost.=Como pan con queso.
Hon dricker vatten.=Ella toma agua.
Jag tycker om kaffe.=Me gusta el café.
Ska vi fika?=¿Vamos por un café?
Vi äter fisk på fredag.=Comemos pescado el viernes.
Kanelbullen är god!=¡El rol de canela está rico!`);

SV('A1', 'Siffror', 'Números, días y hora', '🔢', { t: 'Números y la hora', k: 'klockan är halv kvart',
n: `«Hur mycket är klockan?» = ¿qué hora es?
|klockan är tre|son las tres
|kvart över tre|tres y cuarto
|halv fyra|¡tres y media! (media HACIA las cuatro)
!«Halv fyra» = 3:30, no 4:30. Es la trampa número uno.` },
`ett=uno
två=dos
tre=tres
fyra=cuatro
fem=cinco
sex=seis
sju=siete
åtta=ocho
nio=nueve
tio=diez=🔟
tjugo=veinte
hundra=cien
måndag=lunes
lördag=sábado
söndag=domingo
idag=hoy`,
`Hur mycket är klockan?=¿Qué hora es?
Klockan är tre.=Son las tres.
Idag är det måndag.=Hoy es lunes.
Jag är tjugo år gammal.=Tengo veinte años.
Klockan är halv fyra.=Son las tres y media.
Vi ses på lördag.=Nos vemos el sábado.`);

SV('A1', 'Hemma', 'La casa y det finns', '🏠', { t: 'Det finns (hay) y preposiciones', k: 'finns på i under',
n: `**Det finns** = hay: «det finns en katt».
|på|sobre, en (superficie)
|i|en, dentro de
|under|debajo de
|bredvid|al lado de
!Orden V2: el verbo SIEMPRE en segundo lugar: «I köket **finns** det en stol».` },
`ett hus=una casa=🏠
en lägenhet=un departamento=🏢
ett sovrum=una recámara=🛏️
ett kök=una cocina=🍳
ett badrum=un baño=🛁
ett vardagsrum=una sala=🛋️
en dörr=una puerta=🚪
ett fönster=una ventana=🪟
ett bord=una mesa
en stol=una silla=🪑
en säng=una cama
en nyckel=una llave=🔑
ett kylskåp=un refri
bo=vivir
under=debajo de
bredvid=al lado de`,
`Det finns en katt under bordet.=Hay un gato debajo de la mesa.
Nyckeln ligger på bordet.=La llave está sobre la mesa.
Jag bor i en lägenhet.=Vivo en un departamento.
Badrummet är bredvid sovrummet.=El baño está al lado de la recámara.
Det finns inget kylskåp.=No hay refri.
I köket finns det två stolar.=En la cocina hay dos sillas.`);

SV('A1', 'Kläder och färger', 'Ropa, colores y adjetivos', '👕', { t: 'Adjetivos: -, -t, -a', k: 'röd rött röda stor stort stora',
n: `El adjetivo cambia según el sustantivo:
|en röd bil|un carro rojo (en)
|ett rött hus|una casa roja (ett: +t)
|röda bilar|carros rojos (plural: +a)
Con artículo definido: «den röda bilen» (el carro rojo).
!«Rolig» significa divertido, no «rollizo».` },
`röd=rojo=🔴
blå=azul=🔵
grön=verde=🟢
gul=amarillo=🟡
svart=negro=⚫
vit=blanco=⚪
en skjorta=una camisa=👔
ett par byxor=un pantalón=👖
en klänning=un vestido=👗
en t-shirt=una playera=👕
en jacka=una chamarra=🧥
skor=zapatos=👞
en mössa=un gorro=🧢
glasögon=lentes=👓
fin=bonito/lindo
dyr=caro`,
`Jag har en vit skjorta.=Tengo una camisa blanca.
Hennes klänning är röd.=Su vestido es rojo.
De svarta skorna är dyra.=Los zapatos negros son caros.
Ett rött hus på landet.=Una casa roja en el campo.
Hon har glasögon.=Ella usa lentes.
Jackan är ny.=La chamarra es nueva.`);

SV('A1', 'I staden', 'La ciudad y moverse', '🏙️', { t: 'Gå, åka y till', k: 'går åker till',
n: `|gå|ir a pie
|åka|ir en vehículo: «jag åker buss»
|till|a (dirección): «till banken»
|var?|¿dónde? · vart? = ¿a dónde?
!La diferencia gå / åka es obligatoria: ¡no puedes «gå» a Estocolmo desde Monterrey!` },
`en stad=una ciudad=🏙️
en gata=una calle
en bank=un banco=🏦
ett sjukhus=un hospital=🏥
en skola=una escuela=🏫
ett museum=un museo=🏛️
en affär=una tienda
ett bageri=una panadería=🥖
ett apotek=una farmacia=💊
en park=un parque=🌳
en bio=un cine=🎬
en buss=un camión=🚌
tunnelbanan=el metro=🚇
till vänster=a la izquierda=⬅️
till höger=a la derecha=➡️
var=dónde`,
`Jag går till banken.=Voy al banco (a pie).
Var ligger apoteket?=¿Dónde está la farmacia?
Vi åker buss till skolan.=Vamos en camión a la escuela.
Sväng till vänster.=Dé vuelta a la izquierda.
Ska vi gå på bio?=¿Vamos al cine?
Museet ligger till höger.=El museo está a la derecha.`);

SV('A1', 'Vardag', 'Rutina y verbos reflexivos', '⏰', { t: 'Reflexivos con sig', k: 'mig dig sig oss',
n: `|jag klär på mig|me visto
|du klär på dig|te vistes
|han klär på sig|se viste
|vi klär på oss|nos vestimos
Orden V2: «På morgonen **duschar** jag» (en la mañana me baño).
!«Lagom» = ni mucho ni poco, lo justo. Es casi una filosofía.` },
`vakna=despertarse
stiga upp=levantarse
duscha=bañarse=🚿
klä på sig=vestirse
lägga sig=acostarse=🛌
arbeta=trabajar=💼
plugga=estudiar=📚
på morgonen=en la mañana=🌅
på kvällen=en la noche=🌃
tidigt=temprano
sent=tarde
alltid=siempre
aldrig=nunca
sedan=luego/después
ofta=seguido
lagom=lo justo`,
`Jag stiger upp klockan sju.=Me levanto a las siete.
På morgonen duschar jag.=En la mañana me baño.
Vi lägger oss sent.=Nos acostamos tarde.
Sedan äter jag frukost.=Luego desayuno.
Han arbetar alltid på måndag.=Él siempre trabaja los lunes.
Jag vaknar aldrig tidigt.=Nunca me despierto temprano.`);

SV('A2', 'Fritid', 'Pasatiempos y negación', '⚽', { t: 'La negación inte', k: 'inte aldrig',
n: `**inte** va después del verbo en oraciones principales:
|Jag spelar inte fotboll.|No juego futbol.
Pero en subordinadas va antes: «…att jag **inte** spelar».
!«Spela» = jugar y tocar un instrumento: «spela gitarr».` },
`fotboll=futbol=⚽
musik=música=🎵
gitarr=guitarra=🎸
en film=una película=🎬
en serie=una serie=📺
en bok=un libro=📖
stranden=la playa=🏖️
spela=jugar/tocar
simma=nadar=🏊
dansa=bailar=💃
sjunga=cantar=🎤
läsa=leer
titta på=ver/mirar
helgen=el fin de semana
en fest=una fiesta=🎉
tillsammans=juntos`,
`Jag spelar fotboll på helgen.=Juego futbol el fin de semana.
Hon spelar gitarr.=Ella toca la guitarra.
Jag tittar inte på tv.=No veo la tele.
Vi dansar aldrig.=Nunca bailamos.
Ska vi titta på en film tillsammans?=¿Vemos una película juntos?
Han läser en bok.=Él lee un libro.`);

SV('A2', 'Vädret', 'Clima y estaciones', '⛅', { t: 'Det regnar: el sujeto vacío', k: 'det regnar snöar',
n: `Como el sueco necesita sujeto, usa **det**: «det regnar» (llueve).
|det är varmt|hace calor
|det är kallt|hace frío
|det snöar|nieva
!En invierno en el norte de Suecia el sol casi no sale; en verano casi no se pone.` },
`sol=sol=☀️
regn=lluvia=🌧️
snö=nieve=❄️
vind=viento=💨
ett moln=una nube=☁️
åska=tormenta/truenos=⛈️
sommar=verano=🌞
vinter=invierno=⛄
vår=primavera=🌷
höst=otoño=🍂
varm=caliente/cálido
kall=frío
ett paraply=un paraguas=☂️
himlen=el cielo
mörk=oscuro
ljus=claro/luminoso`,
`Det regnar idag.=Hoy llueve.
Det är kallt på vintern.=Hace frío en invierno.
Det snöar i Kiruna.=Nieva en Kiruna.
Ta med ett paraply!=¡Llévate un paraguas!
Himlen är blå.=El cielo es azul.
På sommaren är det ljust hela natten.=En verano hay luz toda la noche.`);

SV('A2', 'Shopping', 'Compras y forma definida', '🛍️', { t: 'La forma definida', k: 'den det de',
n: `|en tröja → tröjan|un suéter → el suéter
|ett äpple → äpplet|una manzana → la manzana
|tröjor → tröjorna|suéteres → los suéteres
Con adjetivo, doble marca: «**den** blå tröj**an**».
!Suecia casi no usa efectivo: todo se paga con tarjeta o con Swish.` },
`köpa=comprar
sälja=vender
betala=pagar
kosta=costar
hur mycket=cuánto
priset=el precio=🏷️
pengar=dinero=💵
ett kort=una tarjeta=💳
en affär=una tienda=🏬
kassan=la caja
billig=barato
dyr=caro
rea=rebajas
en kronor=coronas=💰
prova=probarse
en tröja=un suéter`,
`Hur mycket kostar tröjan?=¿Cuánto cuesta el suéter?
Kan jag betala med kort?=¿Puedo pagar con tarjeta?
Den blå tröjan är på rea.=El suéter azul está en rebaja.
Får jag prova byxorna?=¿Me puedo probar el pantalón?
Det kostar hundra kronor.=Cuesta cien coronas.
Affären stänger klockan åtta.=La tienda cierra a las ocho.`);

SV('A2', 'Resor', 'Viajes y pretérito', '✈️', { t: 'Preteritum', k: 'åkte köpte reste var',
n: `Cuatro grupos según el infinitivo:
|-a → -ade|resa → reste · titta → tittade
|-a → -de/-te|köpa → köpte · stänga → stängde
|irregular|vara → var · åka → åkte · gå → gick
!Igual para todas las personas: «jag reste, vi reste».` },
`en resa=un viaje=🧳
resa=viajar
ett flygplan=un avión=✈️
ett tåg=un tren=🚆
en bil=un carro=🚗
flygplatsen=el aeropuerto
en biljett=un boleto=🎫
ett pass=un pasaporte=🛂
en resväska=una maleta=🧳
ett hotell=un hotel=🏨
boka=reservar
komma fram=llegar
semester=vacaciones=🏝️
ett land=un país
försenad=retrasado
igår=ayer`,
`Jag reste till Stockholm förra året.=Viajé a Estocolmo el año pasado.
Vi köpte biljetterna igår.=Compramos los boletos ayer.
Bokade du hotellet?=¿Reservaste el hotel?
Tåget var försenat.=El tren estaba retrasado.
De åkte till Norge.=Fueron a Noruega.
Jag tappade mitt pass.=Perdí mi pasaporte.`);

SV('A2', 'Hälsa', 'Salud y perfecto', '🩺', { t: 'Perfekt: har + supino', k: 'har varit gjort ätit',
n: `**har + supino** = he hecho:
|jag har ätit|he comido
|hon har varit sjuk|ha estado enferma
|vi har gjort|hemos hecho
Supino: -a → -at (pratat), -er → -t (köpt), irregular: varit, gjort, ätit.
!«Jag har ont i huvudet» = me duele la cabeza.` },
`huvudet=la cabeza
ett öga=un ojo=👁️
näsan=la nariz=👃
munnen=la boca=👄
handen=la mano=✋
armen=el brazo=💪
benet=la pierna=🦵
foten=el pie=🦶
ryggen=la espalda
magen=la panza
hjärtat=el corazón=❤️
en läkare=un doctor=🩺
sjuk=enfermo=🤒
feber=fiebre
medicin=medicina=💊
trött=cansado=😴`,
`Jag har ont i huvudet.=Me duele la cabeza.
Hon har varit sjuk hela veckan.=Ha estado enferma toda la semana.
Har du varit hos läkaren?=¿Has ido al doctor?
Jag har feber.=Tengo fiebre.
Han har brutit armen.=Se ha roto el brazo.
Vi har aldrig varit i Sverige.=Nunca hemos estado en Suecia.`);

SV('A2', 'Jobbet', 'Profesiones y futuro', '💼', { t: 'Ska y kommer att', k: 'ska kommer att',
n: `|ska + infinitivo|plan o intención: «jag ska jobba»
|kommer att + inf.|predicción: «det kommer att regna»
!Las profesiones van sin artículo: «Hon är läkare» (es doctora).` },
`ett jobb=un trabajo
ett kontor=una oficina=🏢
chefen=el jefe
en kollega=un compañero
lön=sueldo=💰
ett möte=una junta/una reunión
ett företag=una empresa
en advokat=un abogado=⚖️
en lärare=un maestro=👨‍🏫
en kock=un cocinero=👨‍🍳
en servitör=un mesero
en intervju=una entrevista
söka=buscar/solicitar
hitta=encontrar
en dator=una computadora=💻
jobba=trabajar`,
`Jag ska söka ett nytt jobb.=Voy a buscar un trabajo nuevo.
Hon ska bli läkare.=Ella va a ser doctora.
Vi ska ha ett möte.=Vamos a tener una junta.
Det kommer att regna imorgon.=Mañana va a llover.
Min chef är snäll.=Mi jefe es amable.
Jag har en intervju imorgon.=Tengo una entrevista mañana.`);

SV('A2', 'Skolan', 'Escuela y verbos modales', '🎒', { t: 'Kan, vill, måste', k: 'kan vill måste får',
n: `Modal + infinitivo **sin «att»**:
|jag kan simma|sé / puedo nadar
|jag vill läsa|quiero leer
|jag måste gå|tengo que irme
|jag får gå|puedo / me dejan ir
!«Måste inte» no existe: se dice «behöver inte» (no hace falta).` },
`en lektion=una clase
ett prov=un examen=📝
ett betyg=una calificación
ett häfte=un cuaderno=📓
en penna=una pluma=🖊️
ett suddgummi=una goma
en ryggsäck=una mochila=🎒
läxor=tarea
universitetet=la universidad=🎓
lära sig=aprender
förstå=entender
en fråga=una pregunta=❓
ett svar=una respuesta
biblioteket=la biblioteca=📚
kunna=poder/saber
vilja=querer`,
`Får jag ställa en fråga?=¿Puedo hacer una pregunta?
Du måste göra läxorna.=Tienes que hacer la tarea.
Hon vill plugga på universitetet.=Ella quiere estudiar en la universidad.
Jag förstår inte frågan.=No entiendo la pregunta.
Vi kan inte komma.=No podemos venir.
Du behöver inte vänta.=No hace falta que esperes.`);

SV('A2', 'På restaurang', 'Restaurante y pronombres objeto', '🍝', { t: 'Mig, dig, honom, henne', k: 'mig dig honom henne den det dem',
n: `|jag → mig|me
|du → dig|te
|han → honom|lo / le (a él)
|hon → henne|la / le (a ella)
|de → dem|los / les (se pronuncia «dom»)
!«Notan» o «räkningen» = la cuenta. Dar propina no es obligatorio.` },
`en meny=un menú=📋
en rätt=un platillo=🍽️
efterrätt=postre=🍮
dryck=bebida=🥤
vin=vino=🍷
öl=cerveza=🍺
notan=la cuenta=🧾
dricks=propina
en gaffel=un tenedor=🍴
en kniv=un cuchillo=🔪
en sked=una cuchara=🥄
ett glas=un vaso
god=rico/bueno=😋
stark=picante/fuerte=🌶️
beställa=pedir/ordenar
sallad=ensalada=🥗`,
`Kan vi få notan, tack?=¿Nos trae la cuenta, por favor?
Jag vill beställa.=Quiero ordenar.
Maten är jättegod!=¡La comida está riquísima!
Jag ser honom inte.=No lo veo.
Har ni ett bord för två?=¿Tienen una mesa para dos?
Efterrätten är god.=El postre está rico.`);

SV('B1', 'Barndom', 'Recuerdos y pretérito irregular', '🧸', { t: 'Preteritum para el pasado habitual', k: 'var hade gick brukade',
n: `El sueco no tiene copretérito: usa el pretérito o **brukade** (solía):
|Jag brukade leka ute.|Jugaba (solía jugar) afuera.
|När jag var liten…|Cuando era niño…
Irregulares clave: var, hade, gick, gjorde, sa, såg.
!«Leka» = jugar (niños). «Spela» = jugar un juego con reglas o un deporte.` },
`barndomen=la infancia
ett minne=un recuerdo
en leksak=un juguete=🧸
en docka=una muñeca=🪆
en boll=una pelota=⚽
en granne=un vecino
gården=el patio
leka=jugar
växa upp=crecer
minnas=recordar
berätta=contar
blyg=tímido
gråta=llorar=😢
skratta=reír=😂
godis=dulces=🍬
brukade=solía`,
`När jag var liten bodde jag i Puebla.=Cuando era niño vivía en Puebla.
Vi brukade leka på gården.=Jugábamos en el patio.
Mormor berättade sagor.=Mi abuela contaba cuentos.
Han var väldigt blyg.=Él era muy tímido.
Varje sommar åkte vi till landet.=Cada verano íbamos al campo.
Jag minns min första cykel.=Me acuerdo de mi primera bici.`);

SV('B1', 'Naturen', 'Naturaleza y plural definido', '🌲', { t: 'Plural definido', k: 'träden fåglarna sjöarna',
n: `|ett träd → träden|los árboles
|en fågel → fåglarna|los pájaros
|en sjö → sjöarna|los lagos
!**Allemansrätten**: derecho de todos a caminar y acampar en la naturaleza, aunque sea terreno privado.` },
`naturen=la naturaleza
en skog=un bosque=🌲
ett träd=un árbol=🌳
en blomma=una flor=🌸
en flod=un río=🏞️
en sjö=un lago
havet=el mar=🌊
en ö=una isla=🏝️
en fågel=un pájaro=🐦
en häst=un caballo=🐴
en ko=una vaca=🐄
en älg=un alce=🫎
en björn=un oso=🐻
en varg=un lobo=🐺
en fjäril=una mariposa=🦋
vandra=hacer senderismo=🥾`,
`Vi gick i skogen när det började regna.=Caminábamos en el bosque cuando empezó a llover.
Jag såg en älg!=¡Vi un alce!
Fåglarna sjöng hela morgonen.=Los pájaros cantaron toda la mañana.
Sverige har nästan hundratusen sjöar.=Suecia tiene casi cien mil lagos.
Vi vandrade i fjällen.=Hicimos senderismo en las montañas.
Träden är gröna på sommaren.=Los árboles están verdes en verano.`);

SV('B1', 'Teknik', 'Tecnología y futuro', '📱', { t: 'Futuro: ska / kommer att / presente', k: 'ska kommer att',
n: `El presente también sirve de futuro con una expresión de tiempo: «Jag **ringer** imorgon» (te llamo mañana).
!Spotify, Skype y Minecraft nacieron en Suecia.` },
`en mobil=un celular=📱
en laptop=una laptop=💻
skärmen=la pantalla=🖥️
tangentbordet=el teclado=⌨️
en app=una app
ett lösenord=una contraseña=🔑
sociala medier=redes sociales
ett meddelande=un mensaje=💬
ladda ner=descargar=⬇️
skicka=mandar/enviar
spara=guardar
radera=borrar
batteriet=la batería=🔋
en laddare=un cargador=🔌
en fil=un archivo=📁
dela=compartir`,
`Jag ska ladda ner appen imorgon.=Voy a descargar la app mañana.
Robotar kommer att göra mycket jobb.=Los robots van a hacer mucho trabajo.
Jag har glömt mitt lösenord.=Olvidé mi contraseña.
Mobilen har inget batteri kvar.=Al celular no le queda batería.
Kan du skicka filen?=¿Puedes mandar el archivo?
Jag ringer dig imorgon.=Te llamo mañana.`);

SV('B1', 'Känslor', 'Emociones y posesivo sin', '😊', { t: 'Sin, sitt, sina', k: 'sin sitt sina hans hennes',
n: `**sin** = su (del propio sujeto); **hans/hennes** = su (de otra persona):
|Erik älskar sin fru.|Erik ama a su esposa (la suya).
|Erik älskar hans fru.|Erik ama a la esposa de otro. 😬
!«Jag saknar dig» = te extraño.` },
`glad=feliz/contento=😊
ledsen=triste=😢
arg=enojado=😠
orolig=preocupado=😟
nervös=nervioso
förvånad=sorprendido=😲
stolt=orgulloso
avundsjuk=envidioso/celoso
rädd=asustado=😱
glädje=alegría
kärlek=amor=❤️
skam=vergüenza
en kram=un abrazo=🤗
le=sonreír=😄
sakna=extrañar
hjälpa=ayudar`,
`Jag saknar dig.=Te extraño.
Hon ger sin mamma en kram.=Ella le da un abrazo a su mamá.
Han är arg på mig.=Está enojado conmigo.
Jag är rädd för spindlar.=Les tengo miedo a las arañas.
De är stolta över sin son.=Están orgullosos de su hijo.
Var inte orolig!=¡No te preocupes!`);

SV('B1', 'Media', 'Medios y voz pasiva en -s', '📰', { t: 'La pasiva con -s', k: 'sägs läses visas',
n: `Agregar **-s** al verbo hace pasiva o impersonal:
|det sägs att…|se dice que…
|tidningen läses|el periódico se lee
|filmen visas|la película se proyecta
!Suecia tiene la ley de libertad de prensa más antigua del mundo (1766).` },
`nyheterna=las noticias=📰
en tidning=un periódico
en journalist=un periodista
en artikel=un artículo
tv=la tele=📺
radio=la radio=📻
en kanal=un canal
ett program=un programa
en reklam=un anuncio
en källa=una fuente
publicera=publicar
direkt=en vivo
falska nyheter=noticias falsas
en läsare=un lector
en rubrik=un titular
en podd=un pódcast=🎙️`,
`Det sägs att han ska avgå.=Se dice que va a renunciar.
Tidningen läses av många.=El periódico es leído por muchos.
Matchen visas direkt.=El partido se transmite en vivo.
Den här nyheten är falsk.=Esta noticia es falsa.
Jag lyssnar på en podd varje dag.=Escucho un pódcast cada día.
Journalisten publicerade en artikel.=La periodista publicó un artículo.`);

SV('B1', 'Drömmar', 'Sueños y condicional', '💭', { t: 'Skulle y om', k: 'skulle om',
n: `|jag skulle vilja…|me gustaría…
|om jag var rik, skulle jag…|si fuera rico, …
«Om» + pretérito, luego «skulle»: «Om jag **hade** pengar **skulle** jag resa».
!Tras «om…» el verbo va primero: «…**skulle** jag resa» (V2).` },
`en dröm=un sueño=💭
drömma=soñar
framtiden=el futuro
ett mål=una meta=🎯
livet=la vida
världen=el mundo=🌍
tur=suerte=🍀
känd=famoso=⭐
flytta=mudarse=📦
utomlands=en el extranjero
hopp=esperanza
hoppas=esperar/ojalá
kanske=tal vez
en dag=algún día
ett äventyr=una aventura
förverkliga=realizar`,
`Om jag var rik skulle jag resa jorden runt.=Si fuera rico, viajaría alrededor del mundo.
Jag skulle vilja bo i Stockholm.=Me gustaría vivir en Estocolmo.
Skulle du kunna hjälpa mig?=¿Podrías ayudarme?
En dag ska jag förverkliga min dröm.=Algún día cumpliré mi sueño.
Vad skulle du göra i mitt ställe?=¿Qué harías en mi lugar?
Jag hoppas att du kommer.=Espero que vengas.`);

SV('B1', 'Åsikter', 'Opiniones y orden subordinado', '🗣️', { t: 'Orden en la subordinada', k: 'att inte tycker tror',
n: `En la subordinada, **inte** va ANTES del verbo:
|Jag kommer inte.|No vengo.
|Han säger att han inte kommer.|Dice que no viene.
|tycker|opinar · **tror** = creer (suponer)
!El sueco no tiene subjuntivo. ¡Una cosa menos!` },
`en åsikt=una opinión
enligt mig=en mi opinión
tycka=opinar
tro=creer
hålla med=estar de acuerdo=👍
ha rätt=tener razón
ha fel=estar equivocado
ett argument=un argumento
övertyga=convencer
en debatt=un debate
en lösning=una solución
ett problem=un problema
tvivla=dudar
självklart=claro/por supuesto
däremot=en cambio
enligt=según`,
`Jag tycker att du har rätt.=Opino que tienes razón.
Han säger att han inte kommer.=Dice que no viene.
Jag håller inte med dig.=No estoy de acuerdo contigo.
Tror du att det regnar imorgon?=¿Crees que llueva mañana?
Självklart kommer jag!=¡Claro que voy!
Enligt mig är det ett problem.=En mi opinión, es un problema.`);

SV('B1', 'Samhället', 'Sociedad y relativo som', '🏛️', { t: 'El relativo som', k: 'som där vars',
n: `**som** = que, quien (no cambia nunca):
|mannen som pratar|el hombre que habla
|boken som jag läser|el libro que leo
|staden där jag bor|la ciudad donde vivo
|vars|cuyo
!Suecia es famosa por el **folkhemmet** («la casa del pueblo»): el Estado de bienestar.` },
`samhället=la sociedad
en medborgare=un ciudadano
befolkningen=la población
kommunen=el municipio
en byggnad=un edificio=🏢
trafiken=el tráfico=🚦
trottoaren=la banqueta
föroreningar=contaminación=🏭
buller=ruido=🔊
hyran=la renta
ett boende=una vivienda
tryggheten=la seguridad
en volontär=un voluntario
en strejk=una huelga
kollektivtrafik=transporte público
välfärd=bienestar social`,
`Det är staden där jag är född.=Es la ciudad donde nací.
Mannen som pratar är kommunalråd.=El hombre que habla es concejal.
Boken som jag läser är bra.=El libro que leo es bueno.
Hyran är för dyr.=La renta es demasiado cara.
Kollektivtrafiken fungerar bra.=El transporte público funciona bien.
Volontärerna som hjälper är fantastiska.=Los voluntarios que ayudan son fantásticos.`);

SV('B2', 'Miljön', 'Medio ambiente y pasiva', '🌎', { t: 'Pasiva con bli y -s', k: 'blir återvinns',
n: `|-s|proceso general: «plast återvinns»
|bli + participio|cambio concreto: «skogen blev skövlad»
!Greta Thunberg empezó su huelga escolar por el clima en Estocolmo en 2018.` },
`miljön=el medio ambiente=🌎
klimatet=el clima
global uppvärmning=calentamiento global=🔥
planeten=el planeta=🌍
förnybar energi=energía renovable
en solpanel=un panel solar=☀️
återvinna=reciclar=♻️
sopor=basura=🗑️
plast=plástico
slösa=desperdiciar
spara=ahorrar
skydda=proteger
torka=sequía
en översvämning=una inundación=🌊
hållbar=sustentable
utsläpp=emisiones`,
`Plast återvinns i Sverige.=En Suecia se recicla el plástico.
Vi måste spara vatten.=Debemos ahorrar agua.
Utsläppen måste minska.=Las emisiones deben bajar.
Skogen blev förstörd av branden.=El bosque fue destruido por el incendio.
Det är synd att man slösar så mycket.=Es una lástima que se desperdicie tanto.
Förnybar energi är framtiden.=La energía renovable es el futuro.`);

SV('B2', 'Karriär', 'Carrera y pluscuamperfecto', '📈', { t: 'Pluskvamperfekt', k: 'hade börjat slutat',
n: `**hade + supino** = había hecho:
|mötet hade börjat|la junta había empezado
|hon hade slutat|ella había renunciado
!«Säga upp sig» = renunciar. «Bli uppsagd» = ser despedido.` },
`en karriär=una carrera profesional
en befordran=un ascenso
säga upp sig=renunciar
avskeda=despedir
ett kontrakt=un contrato=📝
praktik=prácticas profesionales
facket=el sindicato
övertid=horas extra
distansarbete=trabajo remoto=🏠
erfarenhet=experiencia
en deadline=una fecha límite
leda=dirigir
förhandla=negociar
en löneförhöjning=un aumento
en tjänst=un puesto
deltid=medio tiempo`,
`När jag kom hade mötet redan börjat.=Cuando llegué, la junta ya había empezado.
Hon hade sagt upp sig före krisen.=Ella había renunciado antes de la crisis.
Vi hade avslutat projektet i tid.=Habíamos terminado el proyecto a tiempo.
Jag jobbar deltid.=Trabajo medio tiempo.
Han fick en befordran.=Le dieron un ascenso.
Jag bad om en löneförhöjning.=Pedí un aumento.`);

SV('B2', 'Konst', 'Arte y comparativos', '🎨', { t: 'Comparativo y superlativo', k: 'större störst bättre bäst',
n: `|stor · större · störst|grande · más grande · el más grande
|bra · bättre · bäst|bueno · mejor · el mejor
|vacker · vackrare · vackrast|bello
|mer / mest|para palabras largas
!«Än» = que: «större än» (más grande que).` },
`konst=arte=🎨
en tavla=un cuadro
en målare=un pintor
måleri=pintura
en skulptur=una escultura=🗿
en utställning=una exposición
ett verk=una obra
ett mästerverk=una obra maestra
teatern=el teatro=🎭
en skådespelare=un actor
en roman=una novela
en författare=un escritor=✍️
en dikt=un poema
publiken=el público
applådera=aplaudir=👏
en konsert=un concierto=🎤`,
`Det här museet är större än det andra.=Este museo es más grande que el otro.
Det är den bästa boken jag har läst.=Es el mejor libro que he leído.
Publiken applåderade länge.=El público aplaudió largo rato.
Romanen är ett mästerverk.=La novela es una obra maestra.
ABBA är världens mest kända svenska band.=ABBA es la banda sueca más famosa del mundo.
Konserten var bättre än jag trodde.=El concierto fue mejor de lo que pensé.`);

SV('B2', 'Politik', 'Política y Estado', '🗳️', { t: 'Pasiva formal', k: 'antogs väljs valdes',
n: `|lagen antogs|la ley fue aprobada
|regeringen väljs|el gobierno es elegido
Suecia es una monarquía parlamentaria: el rey tiene un papel solo ceremonial.
!**Riksdagen** = el parlamento. **Statsminister** = primer ministro.` },
`politik=política
regeringen=el gobierno
statsministern=el primer ministro
ett val=una elección=🗳️
rösta=votar
en röst=un voto/una voz
riksdagen=el parlamento
en lag=una ley=⚖️
demokrati=democracia
en rättighet=un derecho
frihet=libertad=🕊️
jämlikhet=igualdad
skatt=impuesto
korruption=corrupción
ett parti=un partido político
kungen=el rey=👑`,
`Lagen antogs av riksdagen.=La ley fue aprobada por el parlamento.
Regeringen väljs vart fjärde år.=El gobierno se elige cada cuatro años.
Skatterna kommer att höjas.=Los impuestos van a subir.
Att rösta är en rättighet.=Votar es un derecho.
Kungen har ingen politisk makt.=El rey no tiene poder político.
Partiet förlorade valet.=El partido perdió la elección.`);

SV('B2', 'Vetenskap', 'Ciencia e hipótesis', '🔬', { t: 'Om jag hade vetat…', k: 'hade skulle ha',
n: `Para lo que habría pasado:
|Om jag hade vetat…|Si hubiera sabido…
|…skulle jag ha kommit.|…habría venido.
Se puede omitir «ha»: «hade jag vetat det, hade jag kommit».
!Alfred Nobel era sueco: el Nobel se entrega cada 10 de diciembre en Estocolmo.` },
`vetenskap=ciencia=🔬
en forskare=un investigador
forskning=investigación
ett labb=un laboratorio=🧪
en upptäckt=un descubrimiento
ett vaccin=una vacuna=💉
ett virus=un virus=🦠
en sjukdom=una enfermedad
behandling=tratamiento
hjärnan=el cerebro=🧠
blod=sangre=🩸
ett ben=un hueso/una pierna=🦴
frisk=sano
förebygga=prevenir
en teori=una teoría
bevisa=demostrar`,
`Om jag hade vetat skulle jag ha kommit tidigare.=Si hubiera sabido, habría venido antes.
Vaccinet har räddat miljoner liv.=La vacuna ha salvado millones de vidas.
Forskarna gjorde en viktig upptäckt.=Los investigadores hicieron un descubrimiento importante.
Hjärnan använder mycket energi.=El cerebro usa mucha energía.
Vi hade kunnat undvika sjukdomen.=Habríamos podido evitar la enfermedad.
Teorin måste bevisas.=La teoría debe demostrarse.`);

SV('B2', 'Relationer', 'Relaciones y estilo indirecto', '💞', { t: 'Estilo indirecto', k: 'att om sa frågade',
n: `|«Jag älskar dig.»|Han sa att han älskade mig.
|«Kommer du?»|Hon frågade om jag kom.
|«Vad vill du?»|Jag frågade vad han ville.
!«Sambo» = pareja que vive junta sin casarse. Es muy común en Suecia.` },
`ett förhållande=una relación
ett par=una pareja=💑
pojkvän=novio
flickvän=novia
en sambo=pareja que vive junta
bli kär=enamorarse=😍
gifta sig=casarse=💍
ett bröllop=una boda
skilja sig=divorciarse
förtroende=confianza
ett gräl=una pelea
förlåta=perdonar
en lögn=una mentira
sanningen=la verdad
vänskap=amistad
svartsjuka=celos`,
`Han sa att han älskade mig.=Me dijo que me amaba.
Hon frågade om vi skulle komma.=Ella preguntó si íbamos a venir.
De sa att de skulle gifta sig i maj.=Dijeron que se casarían en mayo.
Jag frågade vad han ville.=Le pregunté qué quería.
Hon blev kär i sin granne.=Se enamoró de su vecino.
Kan jag lita på dig?=¿Puedo confiar en ti?`);

SV('B2', 'Ekonomi', 'Economía y verbos con partícula', '💹', { t: 'Verbos con partícula', k: 'upp ut av',
n: `La partícula cambia el sentido y lleva el acento:
|ta upp|mencionar, sacar un tema
|ge upp|rendirse
|gå ut|salir
|stänga av|apagar
!«Ta» = tomar, pero «ta upp» = plantear; «ta av» = quitarse (ropa).` },
`ekonomin=la economía=📈
ett lån=un préstamo
skuld=deuda
sparande=ahorro
investera=invertir
börsen=la bolsa de valores
inflation=inflación
en kris=una crisis=📉
tillväxt=crecimiento
vinst=ganancia
förlust=pérdida
en budget=un presupuesto
konsumenten=el consumidor
räntan=la tasa de interés
konkurs=quiebra
ge upp=rendirse`,
`Han blev rik genom att investera på börsen.=Se hizo rico invirtiendo en la bolsa.
Inflationen har stigit i år.=La inflación ha subido este año.
Företaget gick i konkurs.=La empresa quebró.
Jag måste betala av mitt lån.=Tengo que pagar mi préstamo.
Ge inte upp!=¡No te rindas!
Hon tog upp frågan på mötet.=Ella planteó el tema en la junta.`);

SV('B2', 'Norden', 'Los países nórdicos', '🌐', { t: 'Conectores y escandinavos', k: 'men eftersom därför fast',
n: `Sueco, noruego y danés se entienden entre sí, casi como español y portugués.
|eftersom|ya que
|därför|por eso
|fast / trots att|aunque
|medan|mientras
!Finlandia tiene el sueco como lengua oficial junto al finés.` },
`Norden=los países nórdicos
Norge=Noruega=🇳🇴
Danmark=Dinamarca=🇩🇰
Finland=Finlandia=🇫🇮
Island=Islandia=🇮🇸
ett officiellt språk=un idioma oficial
en dialekt=un dialecto
eftersom=ya que
därför=por eso
trots att=aunque/a pesar de que
medan=mientras
tack vare=gracias a
på grund av=a causa de
dessutom=además
alltså=o sea/entonces
däremot=en cambio`,
`Svenska och norska liknar varandra.=El sueco y el noruego se parecen.
Eftersom det regnar stannar vi hemma.=Como llueve, nos quedamos en casa.
Trots att det var kallt badade vi.=Aunque hacía frío, nos bañamos.
Tack vare dig klarade jag det.=Gracias a ti lo logré.
Han dricker te medan hon dricker kaffe.=Él toma té mientras ella toma café.
Jag är trött, därför går jag och lägger mig.=Estoy cansado, por eso me voy a acostar.`);

SV('C1', 'Uttryck I', 'Expresiones idiomáticas', '🎭', { t: 'No traduzcas palabra por palabra', k: 'räkor gräddfil',
n: `|ingen fara på taket|no pasa nada (no hay peligro en el techo)
|glida in på en räkmacka|tenerla fácil (deslizarse en un sándwich de camarones)
!Los modismos suecos aman la comida y el clima.` },
`ingen fara på taket=no pasa nada
glida in på en räkmacka=tenerla fácil
det är ingen ko på isen=no hay prisa/no hay problema
att ha en räv bakom örat=ser muy astuto
att lägga rabarber på=apropiarse de algo
att ana ugglor i mossen=olerse algo raro
att sitta i klistret=estar en un aprieto
att dra alla över en kam=meter a todos en el mismo costal
att skita i det blå skåpet=regarla en grande
att gå som katten kring het gröt=andarse por las ramas
att slå två flugor i en smäll=matar dos pájaros de un tiro
att ta tjuren vid hornen=agarrar al toro por los cuernos
att vara ute och cykla=andar perdido/estar equivocado
att köpa grisen i säcken=comprar a ciegas
mitt i prick=en el blanco/exacto
det är inte mitt bord=no es mi problema`,
`Ingen fara på taket!=¡No pasa nada!
Han gick som katten kring het gröt.=Se anduvo por las ramas.
Nu sitter vi i klistret.=Ahora estamos en un aprieto.
Du är ute och cyklar.=Estás muy equivocado.
Det är ingen ko på isen.=No hay prisa.
Hon har en räv bakom örat.=Ella es muy astuta.`);

SV('C1', 'Debatt', 'Argumentar con precisión', '⚖️', { t: 'Conectores de debate', k: 'däremot dessutom alltså',
n: `|för det första|en primer lugar
|dessutom|además
|å ena sidan… å andra sidan|por un lado… por otro
|sammanfattningsvis|en resumen
!Los suecos valoran el **konsensus**: debatir sin pelear.` },
`argumentera=argumentar
motbevisa=refutar
hävda=afirmar/sostener
en tes=una tesis
en slutsats=una conclusión
ett exempel=un ejemplo
för det första=en primer lugar
dessutom=además
dock=sin embargo
enligt min mening=en mi opinión
sammanfattningsvis=en resumen
å ena sidan=por un lado
å andra sidan=por otro lado
fördom=prejuicio
en kompromiss=un acuerdo intermedio
konsensus=consenso`,
`För det första måste vi se på kostnaden.=En primer lugar debemos ver el costo.
Å ena sidan är det dyrt, å andra sidan är det bra.=Por un lado es caro, por otro es bueno.
Dessutom finns det risker.=Además hay riesgos.
Sammanfattningsvis är jag inte övertygad.=En resumen, no estoy convencido.
Han hävdar att han har rätt.=Él afirma que tiene razón.
Vi hittade en kompromiss.=Encontramos un acuerdo.`);

SV('C1', 'Litteratur', 'Literatura sueca', '📚', { t: 'El sueco literario', k: 'skrev föddes',
n: `Autores clave: Selma Lagerlöf (primera mujer Nobel de Literatura), Astrid Lindgren (Pippi Calzaslargas), August Strindberg, Tomas Tranströmer.
!La novela negra nórdica (Mankell, Larsson) es un género mundial.` },
`en saga=un cuento de hadas
en novell=un cuento
en karaktär=un personaje
en hjälte=un héroe
berättaren=el narrador
handlingen=la trama
ett kapitel=un capítulo
en metafor=una metáfora
rim=rima
en vers=un verso
upplösningen=el desenlace
ett sekel=un siglo
en författare=un autor
litteraturen=la literatura
en deckare=una novela policiaca
en läsare=un lector`,
`Selma Lagerlöf fick Nobelpriset 1909.=Selma Lagerlöf recibió el Nobel en 1909.
Astrid Lindgren skrev om Pippi Långstrump.=Astrid Lindgren escribió sobre Pippi Calzaslargas.
Berättaren minns sin barndom.=El narrador recuerda su infancia.
Upplösningen är överraskande.=El desenlace es sorprendente.
Svenska deckare är populära.=Las novelas policiacas suecas son populares.
Boken har tolv kapitel.=El libro tiene doce capítulos.`);

SV('C1', 'Rättvisa', 'Derecho y justicia', '👨‍⚖️', { t: 'Sustantivos en -ning y -else', k: 'gripandet undertecknandet utredningen',
n: `|gripa → gripandet|detener → la detención
|utreda → utredningen|investigar → la investigación
|besluta → beslutet|decidir → la decisión
!**Ombudsman** es una palabra sueca que el mundo adoptó (defensor del pueblo).` },
`rättvisa=justicia
en domstol=un tribunal
en domare=un juez=👨‍⚖️
den åtalade=el acusado
ett offer=una víctima
ett vittne=un testigo
ett bevis=una prueba
ett brott=un delito
en stöld=un robo
en tjuv=un ladrón
en rättegång=un juicio
skyldig=culpable
oskyldig=inocente
döma=sentenciar/condenar
fängelse=cárcel=⛓️
böter=multa`,
`Polisen grep den misstänkte.=La policía detuvo al sospechoso.
Domaren meddelade domen.=El juez dictó la sentencia.
Han dömdes till böter.=Fue condenado a una multa.
Det finns inga bevis mot honom.=No hay pruebas en su contra.
Vittnet talade under rättegången.=El testigo habló en el juicio.
Utredningen går långsamt.=La investigación avanza lentamente.`);

SV('C1', 'Filosofi', 'Filosofía y concesión', '🦉', { t: 'Trots att, även om, hur… än', k: 'trots även hur än',
n: `|trots att|a pesar de que
|även om|aunque, incluso si
|hur mycket jag än försöker|por más que lo intente
|vad du än gör|hagas lo que hagas
!Sin subjuntivo: el sueco expresa la concesión solo con estas palabras.` },
`filosofi=filosofía
tanken=el pensamiento
medvetande=conciencia
förnuft=razón
moral=moral
etik=ética
lycka=felicidad
en dygd=una virtud
begär=deseo
existensen=la existencia
människan=el ser humano
själen=el alma
kunskap=conocimiento
tvivel=duda
meningen=el sentido
visdom=sabiduría`,
`Jag tänker, alltså finns jag.=Pienso, luego existo.
Trots att han är rik är han inte lycklig.=Aunque es rico, no es feliz.
Hur mycket jag än försöker lyckas jag inte.=Por más que lo intento, no lo logro.
Även om det regnar går jag ut.=Aunque llueva, saldré.
Vad du än gör, gör det bra.=Hagas lo que hagas, hazlo bien.
Tvivel är början till visdom.=La duda es el principio de la sabiduría.`);

SV('C1', 'Historia', 'Historia de Suecia', '🏰', { t: 'Narrar la historia', k: 'var blev grundades',
n: `Vikingos (siglos VIII–XI), Imperio sueco (siglo XVII), neutralidad en el siglo XX, ingreso a la OTAN en 2024.
!**På 1600-talet** = en el siglo XVII (literal: en los 1600).` },
`kung=rey=👑
drottning=reina
ett rike=un reino
krig=guerra
fred=paz=☮️
ett slag=una batalla
en soldat=un soldado
monarki=monarquía
folket=el pueblo
vikingarna=los vikingos
ett slott=un castillo=🏰
medeltiden=la Edad Media
neutralitet=neutralidad
en stormakt=una gran potencia
ett fördrag=un tratado
erövra=conquistar`,
`Vikingarna reste ända till Amerika.=Los vikingos viajaron hasta América.
Sverige var en stormakt på 1600-talet.=Suecia fue una gran potencia en el siglo XVII.
Gustav Vasa blev kung 1523.=Gustav Vasa se volvió rey en 1523.
Sverige var neutralt under andra världskriget.=Suecia fue neutral en la Segunda Guerra Mundial.
Slottet byggdes på medeltiden.=El castillo se construyó en la Edad Media.
Kriget varade i tre år.=La guerra duró tres años.`);

SV('C1', 'Affärer', 'Sueco de negocios', '🤝', { t: 'Correo formal (pero sueco)', k: 'hälsningar bifogar',
n: `El sueco formal es sencillo y directo:
|Hej Anna,|(incluso al cliente)
|Bifogat finns…|Adjunto encontrará…
|Hör gärna av dig.|Quedo a sus órdenes.
|Med vänliga hälsningar,|Saludos cordiales
!Puntualidad absoluta: llegar 5 minutos tarde a una junta es mal visto.` },
`med vänliga hälsningar=saludos cordiales
bifogat=adjunto=📎
hör gärna av dig=quedo a sus órdenes
en offert=una cotización
en faktura=una factura
en leverantör=un proveedor
en partner=un socio
ett videomöte=una videollamada
dagordningen=el orden del día
protokollet=la minuta
leverans=entrega=🚚
återbetalning=reembolso
ett klagomål=una queja
göra affärer=hacer negocios=🤝
VD=director general
punktlig=puntual`,
`Bifogat finns fakturan.=Adjunto encontrará la factura.
Hör gärna av dig om du har frågor.=Quedo a sus órdenes si tiene preguntas.
Kan du bekräfta leveransdatumet?=¿Puede confirmar la fecha de entrega?
Vi gjorde affärer med leverantören.=Hicimos negocios con el proveedor.
Med vänliga hälsningar, Erik.=Saludos cordiales, Erik.
Mötet börjar exakt klockan nio.=La junta empieza exactamente a las nueve.`);

SV('C1', 'Slang', 'Sueco coloquial', '🛹', { t: 'El sueco hablado', k: 'typ asså',
n: `|asså|o sea (alltså)
|typ|tipo, como que
|dom|ellos (de / dem)
|mej / dej|mig / dig (como se pronuncia)
!«Fika», «lagom», «mys» (acogedor) son palabras de identidad sueca.` },
`asså=o sea
typ=tipo/como que
schysst=buena onda/padre
grym=increíble/chido
najs=chido/nice
sjukt=muy (súper)
mys=ambiente acogedor
fredagsmys=noche de viernes en casa
en polare=un cuate
käka=comer/tragar
stålar=lana/dinero
plugga=estudiar
lugnt=tranqui
tjena=qué onda
en kille=un chavo
en tjej=una chava`,
`Tjena, läget?=¿Qué onda, cómo estás?
Det var sjukt kul!=¡Estuvo súper divertido!
Han är en schysst kille.=Es un chavo buena onda.
Lugnt, ingen fara.=Tranqui, no pasa nada.
Ska vi käka?=¿Vamos a comer?
Fredagsmys med tacos!=¡Viernes en casa con tacos!`);

SV('C2', 'Uttryck II', 'Expresiones avanzadas', '🐓', { t: 'Expresiones de nativo', k: 'hund sill',
n: `|här ligger en hund begraven|aquí hay gato encerrado
|som packade sillar|como sardinas en lata (arenques)
!Las tacos son populares en Suecia: el «fredagstaco» es tradición de los viernes.` },
`här ligger en hund begraven=aquí hay gato encerrado
som packade sillar=como sardinas en lata
att hoppa över där gärdsgården är lägst=hacer lo mínimo
att ha is i magen=mantener la calma
att vara på hugget=estar muy motivado
att tappa hakan=quedarse boquiabierto
att få en pik=recibir una indirecta
att prata i nattmössan=decir tonterías
att göra en höna av en fjäder=hacer de un grano de arena una montaña
att inte ha en aning=no tener idea
att sticka ut hakan=arriesgarse a opinar
att ta sig vatten över huvudet=meterse en camisa de once varas
att vara helt borta=estar totalmente perdido
att leva loppan=echar la casa por la ventana
att klä skott för=pagar los platos rotos
att stå med skägget i brevlådan=quedarse en evidencia`,
`Här ligger en hund begraven.=Aquí hay gato encerrado.
Vi stod som packade sillar i tunnelbanan.=Estábamos como sardinas en el metro.
Ha is i magen!=¡Mantén la calma!
Jag tappade hakan.=Me quedé boquiabierto.
Gör inte en höna av en fjäder.=No hagas de un grano de arena una montaña.
Jag har inte en aning.=No tengo idea.`);

SV('C2', 'Nyanser', 'Vocabulario abstracto', '🧠', { t: 'Palabras intraducibles', k: 'lagom jantelagen',
n: `|lagom|lo justo, ni mucho ni poco
|jantelagen|norma social de no creerse más que los demás
|ödmjukhet|humildad
!Usar estas palabras con precisión es señal de nivel C2.` },
`tvetydighet=ambigüedad
en nyans=un matiz
relevans=pertinencia
ett hinder=un obstáculo
ett förhållningssätt=un enfoque
förvirring=desconcierto
entusiasm=entusiasmo
leda=hastío
vänlighet=amabilidad
ödmjukhet=humildad
en illusion=una ilusión
hållbarhet=perdurabilidad
självgodhet=complacencia
uppoffring=sacrificio
jantelagen=ley de Jante
eftertanke=reflexión`,
`Talet saknade relevans.=El discurso carecía de pertinencia.
Hon agerade med vänlighet.=Actuó con amabilidad.
Jantelagen påverkar svensk kultur.=La ley de Jante influye en la cultura sueca.
Det krävs ödmjukhet för att lära sig.=Hace falta humildad para aprender.
Hans förhållningssätt är logiskt.=Su enfoque es lógico.
Allt med eftertanke.=Todo con reflexión.`);

SV('C2', 'Pressen', 'Prensa y futuro perfecto', '🗞️', { t: 'Kommer att ha + supino', k: 'kommer ha',
n: `|jag kommer att ha slutat|habré terminado
|tills dess|para entonces
Titulares en presente: «Regeringen sänker skatten».
!Suecia está siempre entre los primeros lugares del índice de libertad de prensa.` },
`en ledare=un editorial
en krönika=una columna
en krönikör=un columnista
redaktionen=la redacción
chefredaktören=el jefe de redacción
en nyhetsbyrå=una agencia de noticias
ett scoop=una primicia
censur=censura
pressfrihet=libertad de prensa
en opinionsmätning=una encuesta
ett dementi=un desmentido
dementera=desmentir
sprida=difundir
en debatt=una polémica
ett pressmeddelande=un comunicado
upplagan=el tiraje`,
`När du läser detta kommer jag att ha rest.=Cuando leas esto, me habré ido.
Ministern dementerade ryktet.=El ministro desmintió el rumor.
Pressfriheten är grundläggande.=La libertad de prensa es fundamental.
Ledaren väckte debatt.=El editorial generó polémica.
Opinionsmätningen publiceras på måndag.=La encuesta se publica el lunes.
Vi kommer att ha slutat före lunch.=Habremos terminado antes de la comida.`);

SV('C2', 'Vetenskapen', 'Ciencia y tecnología avanzada', '🚀', { t: 'El sueco científico', k: 'man har',
n: `|man har visat att…|se ha demostrado que…
|-s pasiva|«proverna analyserades»
Muchas palabras compuestas: forskningsresultat (resultado de investigación).
!Las palabras compuestas se escriben juntas: «klimatförändring».` },
`astronomi=astronomía=🔭
en galax=una galaxia=🌌
en stjärna=una estrella=⭐
ett svart hål=un agujero negro
universum=el universo
gravitation=gravedad
en atom=un átomo=⚛️
en cell=una célula
evolutionen=la evolución
en algoritm=un algoritmo
data=datos
en raket=un cohete=🚀
en satellit=un satélite=🛰️
en jordbävning=un sismo
ett prov=una muestra
klimatförändring=cambio climático`,
`Proverna analyserades i labbet.=Las muestras se analizaron en el laboratorio.
Raketen sköts upp med framgång.=El cohete fue lanzado con éxito.
Man har visat att universum expanderar.=Se ha demostrado que el universo se expande.
Varje cell innehåller DNA.=Cada célula contiene ADN.
Algoritmen lär sig av data.=El algoritmo aprende de los datos.
Klimatförändringen påverkar allt.=El cambio climático afecta todo.`);

SV('C2', 'Retorik', 'Retórica y estilo', '🎙️', { t: 'Estilo culto', k: 'icke ty',
n: `Palabras cultas o arcaicas:
|ty|pues, porque
|icke|no (inte)
|dock|sin embargo
|varvid|con lo cual
!La litote es muy sueca: «inte så dumt» (nada mal) = ¡excelente!` },
`retorik=retórica
vältalighet=elocuencia
en talare=un orador
ett tal=un discurso
en stilfigur=una figura retórica
överdrift=hipérbole
en eufemism=un eufemismo
ironi=ironía
en paradox=una paradoja
övertala=persuadir
fängsla=cautivar
publiken=el público
tonen=el tono
ty=pues/porque
icke=no (culto)
dock=sin embargo`,
`Det var inte så dumt.=No estuvo nada mal.
Talaren fängslade publiken.=El orador cautivó al público.
Vi stannade, ty det var sent.=Nos quedamos, pues era tarde.
Det var dock för sent.=Sin embargo, era demasiado tarde.
Hon talade med stor vältalighet.=Habló con gran elocuencia.
Icke alla håller med.=No todos están de acuerdo.`);

SV('C2', 'Dialekter', 'Variantes del sueco', '🇫🇮', { t: 'Sueco de Finlandia y dialectos', k: 'skånska finlandssvenska',
n: `|skånska|sur: r gutural, suena casi danés
|göteborgska|Gotemburgo: famoso por sus chistes de palabras
|finlandssvenska|Finlandia: más «limpio» y melódico
!En Finlandia se dice «hej hej» para despedirse y «semla» se llama «fastlagsbulle».` },
`skånska=dialecto de Escania
göteborgska=dialecto de Gotemburgo
finlandssvenska=sueco de Finlandia
norrländska=dialecto del norte
rikssvenska=sueco estándar
en dialekt=un dialecto
uttal=pronunciación
melodi=melodía/entonación
grav accent=acento musical 2
en semla=bollo de crema de Cuaresma
midsommar=fiesta de San Juan
kräftskiva=fiesta de cangrejos
lucia=fiesta de Santa Lucía
surströmming=arenque fermentado
smörgåsbord=bufé sueco
allemansrätten=derecho público de acceso`,
`I Skåne låter svenskan nästan danska.=En Escania el sueco suena casi danés.
Vi firar midsommar med sill och dans.=Celebramos el solsticio con arenque y baile.
Surströmming luktar starkt.=El arenque fermentado huele fuerte.
Finlandssvenska låter väldigt melodiskt.=El sueco de Finlandia suena muy melódico.
På kräftskivan sjunger man snapsvisor.=En la fiesta de cangrejos se cantan canciones.
Lucia firas den trettonde december.=Santa Lucía se celebra el 13 de diciembre.`);

SV('C2', 'Psyket', 'Psicología y sociedad', '🫶', { t: 'Hablar de lo íntimo', k: 'utbrändhet empati',
n: `|det handlar om|se trata de
|hantera|manejar
|må dåligt|sentirse mal
!«Utbrändhet» (burnout) es un diagnóstico médico oficial en Suecia.` },
`psykologi=psicología
beteende=comportamiento
personlighet=personalidad
självkänsla=autoestima
ångest=ansiedad
stress=estrés
utbrändhet=burnout
depression=depresión
terapi=terapia
empati=empatía
motståndskraft=resiliencia
ett trauma=un trauma
motivation=motivación
ojämlikhet=desigualdad
ensamhet=soledad
mobbning=acoso/bullying`,
`Hon gick in i väggen förra året.=Tuvo burnout el año pasado.
Empati är viktigt i ett förhållande.=La empatía es importante en una relación.
Träning hjälper mot stress.=El ejercicio ayuda contra el estrés.
Ensamhet drabbar många äldre.=La soledad afecta a muchas personas mayores.
Vi måste motverka mobbning.=Debemos combatir el acoso.
Det handlar om självkänsla.=Se trata de autoestima.`);

SV('C2', 'Mästerskap', 'Maestría: el gran final', '🏆', { t: 'Repaso maestro', k: 'flytande mödan',
n: `Repasas V2, la subordinada, en/ett, la forma definida, pretérito, perfecto, pluscuamperfecto, pasiva y partículas.
!Mira series suecas, lee a Lindgren en voz alta y haz fika con nativos. Grattis!` },
`behärska=dominar
flytande=con fluidez
modersmål=lengua materna
tvåspråkig=bilingüe
ledigt=con soltura
finslipa=pulir
uthållighet=perseverancia
ansträngning=esfuerzo
en utmaning=un reto
lyckas=lograr
framgång=éxito
resan=el recorrido
värt mödan=vale la pena
stolthet=orgullo
njuta=disfrutar
grattis=felicidades=🎉`,
`Jag talar svenska flytande.=Hablo sueco con fluidez.
Det var värt mödan.=Valió la pena.
Sakta men säkert.=Lento pero seguro.
Jag har nått mitt mål.=Alcancé mi meta.
Grattis till din uthållighet!=¡Felicidades por tu perseverancia!
Svenskan är nu en del av mig.=El sueco ahora es parte de mí.`);

GS.extra.sv.ff = `rolig|rollizo|divertido
glass|vaso|el helado
semester|semestre|las vacaciones
kock|coco|el cocinero
barn|barniz|el niño
fart|harto|la velocidad
bra|brazo|bueno, bien
tack|taco|gracias
mamma|mamá|mamá (¡igual!)
kassa|casa|la caja
fika|finca|la pausa del café
öl|olé|la cerveza
by|bye|el pueblo
sko|esco|el zapato
lim|limón|el pegamento
grind|grano|el portón
tom|tomo|vacío
klocka|clueca|el reloj
sol|sol|el sol (¡igual!)
dum|dumbo|tonto
vara|vara|ser, estar
gift|regalo|casado (y veneno)
rar|raro|amable, encantador
hej|ey|hola
ful|full|feo
puss|pus|el besito
kiss|kiss|el pipí
stad|estado|la ciudad
kul|culo|divertido`;
GS.extra.sv.cult = `¿Qué es el «fika»?|Una pausa para café y algo dulce, casi sagrada|Un deporte de invierno|Un tipo de sauna
¿Qué significa «lagom»?|Ni mucho ni poco: lo justo|Muy grande|Rápido
¿Qué se celebra en «midsommar»?|El solsticio de verano, con flores y baile|La Navidad|El año nuevo
¿Qué es el «allemansrätten»?|El derecho de todos a disfrutar la naturaleza|Una ley de impuestos|Un platillo
¿Cuándo es Santa Lucía?|El 13 de diciembre|El 24 de junio|El 1 de mayo
¿Cuál es la capital de Suecia?|Estocolmo|Oslo|Gotemburgo
¿Qué banda pop sueca ganó Eurovisión en 1974?|ABBA|Roxette|Europe
¿Cómo se paga casi todo en Suecia?|Con tarjeta o celular|En efectivo|Con cheques
¿Qué se come los viernes en muchos hogares suecos?|Tacos («fredagstaco»)|Paella|Sushi
¿Qué es el «Nobel»?|Un premio fundado por el sueco Alfred Nobel|Un barco vikingo|Un queso
¿Qué es la «ley de Jante»?|Norma social de no creerse superior|Una ley de tránsito|Una receta
¿Qué es un «sambo»?|Pareja que vive junta sin casarse|Un baile|Un vecino`;
GS.extra.sv.phon = `å|Como una «o» bien redonda.|på · två · åka
ä|Como la «e» abierta de «perro».|äta · här · mässa
ö|Labios de «o», lengua de «e». No existe en español.|öl · smör · höra
u|Sonido muy cerrado y adelantado, entre «u» e «i».|hus · du · ut
y|Labios de «u», lengua de «i» (como la ü alemana).|by · syster · flyga
sj / skj / stj|Sonido soplado único, como una j suave detrás de la boca.|sju · skjorta · stjärna
k + e, i, y, ä, ö|Suena «ch» suave.|kär · kyrka · köpa
g + e, i, y, ä, ö|Suena como «y».|göra · ge · gylle
j / dj / hj / lj|Suenan como «y».|ja · djur · hjärta · ljus
rs|Se funde en un sonido «sh».|kurs · Lars · först
vocal larga / corta|Larga si sigue una consonante; corta si siguen dos.|tak (largo) · tack (corto)
acento musical|Muchas palabras tienen dos tonos: cambia el significado.|anden (el pato) · anden (el espíritu)`;
