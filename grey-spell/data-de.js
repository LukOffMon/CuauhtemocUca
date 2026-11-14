/* Grey~Spell — Alemán para hispanohablantes de México. 48 unidades A1–C2.
   Palabras: alemán=español/alternativa=emoji · Frases: alemán=español
   Los sustantivos llevan su artículo (der, die, das): así se aprende el género desde el día uno. */
window.GS = window.GS || { units: [] };
GS.extra = GS.extra || {};
GS.P = GS.P || function (c, lv, t, es, ic, g, w, s) { (GS.extra[c] = GS.extra[c] || { units: [] }).units.push({ lv, t, es, ic, g, w, s }); };
GS.extra.de = GS.extra.de || { units: [] };
const DE = (...a) => GS.P('de', ...a);

/* ============================ A1 ============================ */
DE('A1', 'Hallo!', 'Saludos, pronombres y sein', '👋', { t: 'El verbo sein (ser / estar)', k: 'bin bist ist sind seid',
n: `En alemán, como en francés, **siempre** se dice el pronombre: «ich bin», nunca solo «bin».
|ich bin|yo soy / estoy
|du bist|tú eres / estás
|er / sie / es ist|él / ella / ello es
|wir sind|nosotros somos
|ihr seid|ustedes son (de confianza)
|sie / Sie sind|ellos son / usted es
**Sie** con mayúscula = usted (formal). **sie** con minúscula = ella o ellos.
!Los sustantivos se escriben **siempre con mayúscula**: der Tag, die Frau, das Haus.
!«Du» es para amigos, familia y niños. Con desconocidos y en el trabajo, «Sie».` },
`hallo=hola=👋
guten Morgen=buenos días=🌅
guten Tag=buenas tardes/buen día
guten Abend=buenas noches/buenas tardes=🌙
tschüss=adiós/bye
auf Wiedersehen=hasta luego/adiós
danke=gracias=🙏
bitte=por favor/de nada
ja=sí=👍
nein=no=👎
Entschuldigung=perdón/disculpe
ich=yo
du=tú
wir=nosotros
ich heiße=me llamo
freut mich=mucho gusto/encantado=🤝
Mexiko=México=🇲🇽
Deutschland=Alemania=🇩🇪`,
`Hallo, ich heiße Lena.=Hola, me llamo Lena.
Ich bin aus Mexiko.=Soy de México.
Wie geht es dir?=¿Cómo estás?
Mir geht es gut, danke.=Estoy bien, gracias.
Wir sind Freunde.=Somos amigos.
Sind Sie Frau Müller?=¿Usted es la señora Müller?
Du bist sehr nett.=Eres muy amable.
Freut mich, Herr Schmidt.=Mucho gusto, señor Schmidt.`);

DE('A1', 'Die Familie', 'Familia, der/die/das y haben', '👨‍👩‍👧', { t: 'Los tres géneros y el verbo haben', k: 'habe hast hat haben der die das',
n: `El alemán tiene **tres géneros**: masculino (der), femenino (die) y neutro (das).
|der Vater|el padre (masculino)
|die Mutter|la madre (femenino)
|das Kind|el niño, la niña (neutro)
El verbo **haben** (tener):
|ich habe|tengo
|du hast|tienes
|er / sie hat|tiene
|wir haben|tenemos
!El género casi nunca se adivina por lógica: «das Mädchen» (la niña) es neutro. Aprende cada sustantivo **con su artículo**.
!En plural los tres géneros usan **die**: die Kinder, die Eltern.` },
`der Vater=el padre/el papá=👨
die Mutter=la madre/la mamá=👩
das Kind=el niño/la niña/el hijo=🧒
der Sohn=el hijo
die Tochter=la hija
der Bruder=el hermano
die Schwester=la hermana
der Opa=el abuelo=👴
die Oma=la abuela=👵
der Onkel=el tío
die Tante=la tía
das Baby=el bebé=👶
der Hund=el perro=🐶
die Katze=la gata/el gato=🐱
Eltern=padres/los padres
Geschwister=hermanos/los hermanos`,
`Das ist mein Vater.=Este es mi padre.
Ich habe einen Bruder.=Tengo un hermano.
Hast du Geschwister?=¿Tienes hermanos?
Meine Mutter heißt Ana.=Mi madre se llama Ana.
Wir haben einen Hund.=Tenemos un perro.
Die Oma hat eine Katze.=La abuela tiene un gato.
Das Kind ist drei Jahre alt.=El niño tiene tres años.`);

DE('A1', 'Essen und Trinken', 'Comida y verbos en presente', '🥨', { t: 'Presente de los verbos regulares', k: 'trinke trinkst trinkt trinken esse isst',
n: `Quita **-en** al infinitivo y agrega la terminación:
|ich trinke|yo bebo
|du trinkst|tú bebes
|er / sie trinkt|él / ella bebe
|wir trinken|nosotros bebemos
|ihr trinkt|ustedes beben
|sie / Sie trinken|ellos beben / usted bebe
Algunos verbos cambian la vocal con du y er: **essen → du isst, er isst**.
!El verbo va **siempre en segunda posición**: «Heute **esse** ich Brot» (Hoy como pan).` },
`das Brot=el pan=🍞
die Brezel=el pretzel=🥨
das Wasser=el agua=💧
der Kaffee=el café=☕
der Tee=el té=🍵
die Milch=la leche=🥛
das Bier=la cerveza=🍺
der Apfel=la manzana=🍎
die Wurst=la salchicha=🌭
der Käse=el queso=🧀
das Ei=el huevo=🥚
die Kartoffel=la papa=🥔
essen=comer
trinken=beber/tomar
kochen=cocinar
lecker=rico/delicioso=😋`,
`Ich trinke Kaffee.=Tomo café.
Isst du gern Käse?=¿Te gusta comer queso?
Wir kochen heute zusammen.=Hoy cocinamos juntos.
Das Brot ist sehr lecker.=El pan está muy rico.
Er trinkt keine Milch.=Él no toma leche.
Ich esse einen Apfel.=Me como una manzana.
Heute trinke ich Wasser.=Hoy tomo agua.`);

DE('A1', 'Zahlen und Zeit', 'Números, días y hora', '🕐', { t: 'Los números se leen al revés', k: 'eins zwei drei vier fünf zwanzig',
n: `Del 21 al 99 se dice primero la **unidad** y luego la decena: **einundzwanzig** = uno-y-veinte (21).
|eins, zwei, drei|1, 2, 3
|zehn, elf, zwölf|10, 11, 12
|zwanzig, dreißig|20, 30
|hundert, tausend|100, 1000
La hora: «Es ist drei Uhr» (son las tres). «halb vier» = **las tres y media** (¡media hacia las cuatro!).
!«Halb vier» engaña a todos los hispanohablantes: significa 3:30, no 4:30.` },
`eins=uno=1️⃣
zwei=dos=2️⃣
drei=tres=3️⃣
vier=cuatro=4️⃣
fünf=cinco=5️⃣
zehn=diez=🔟
zwanzig=veinte
hundert=cien/ciento=💯
der Montag=el lunes
der Dienstag=el martes
der Mittwoch=el miércoles
der Freitag=el viernes
das Wochenende=el fin de semana
die Uhr=el reloj/la hora=🕐
heute=hoy
morgen=mañana`,
`Es ist drei Uhr.=Son las tres.
Heute ist Montag.=Hoy es lunes.
Ich bin zwanzig Jahre alt.=Tengo veinte años.
Wie spät ist es?=¿Qué hora es?
Es ist halb vier.=Son las tres y media.
Am Wochenende habe ich frei.=El fin de semana estoy libre.
Morgen ist Freitag.=Mañana es viernes.`);

DE('A1', 'Zu Hause', 'La casa y el acusativo', '🏠', { t: 'Acusativo: el objeto directo', k: 'einen den keinen ein eine',
n: `El objeto directo (acusativo) solo cambia en **masculino**:
|der → den|Ich sehe **den** Tisch.
|ein → einen|Ich habe **einen** Stuhl.
|die, das|no cambian
«Es gibt» + acusativo = hay: «Es gibt **einen** Garten» (Hay un jardín).
!Truco: si el sustantivo es masculino y recibe la acción, piensa «-n»: den, einen, keinen.` },
`das Haus=la casa=🏠
die Wohnung=el departamento=🏢
das Zimmer=el cuarto/la habitación
die Küche=la cocina=🍳
das Bad=el baño=🛁
das Schlafzimmer=la recámara/el dormitorio=🛏️
der Tisch=la mesa
der Stuhl=la silla=🪑
das Bett=la cama=🛏️
das Fenster=la ventana=🪟
die Tür=la puerta=🚪
der Garten=el jardín=🌳
die Lampe=la lámpara=💡
das Sofa=el sillón/el sofá=🛋️
groß=grande
klein=pequeño/chico`,
`Wir haben eine Wohnung in Berlin.=Tenemos un departamento en Berlín.
Es gibt einen Garten.=Hay un jardín.
Ich kaufe einen Tisch.=Compro una mesa.
Die Küche ist sehr klein.=La cocina es muy pequeña.
Das Bett ist im Schlafzimmer.=La cama está en la recámara.
Siehst du den Stuhl?=¿Ves la silla?
Das Haus hat drei Zimmer.=La casa tiene tres cuartos.`);

DE('A1', 'Kleidung und Farben', 'Ropa, colores y plurales', '👕', { t: 'Plurales y adjetivos', k: 'rot blau schwarz weiß die',
n: `Después del verbo, el adjetivo **no cambia**: «Das Hemd ist rot», «Die Schuhe sind rot».
Los plurales tienen varias formas; apréndelas con la palabra:
|das Hemd → die Hemden|camisa → camisas
|der Schuh → die Schuhe|zapato → zapatos
|die Hose → die Hosen|pantalón → pantalones
|das Kleid → die Kleider|vestido → vestidos
!«Die Hose» es singular: un pantalón. Igual que en español decimos «el pantalón».` },
`das Hemd=la camisa=👔
das T-Shirt=la playera=👕
die Hose=el pantalón=👖
das Kleid=el vestido=👗
der Schuh=el zapato=👞
die Jacke=la chamarra=🧥
der Hut=el sombrero=🎩
die Socke=el calcetín=🧦
rot=rojo=🔴
blau=azul=🔵
grün=verde=🟢
gelb=amarillo=🟡
schwarz=negro=⚫
weiß=blanco=⚪
schön=bonito/hermoso
teuer=caro=💸`,
`Das Hemd ist blau.=La camisa es azul.
Ich trage eine schwarze Hose.=Llevo un pantalón negro.
Die Schuhe sind sehr teuer.=Los zapatos son muy caros.
Das Kleid ist schön.=El vestido es bonito.
Meine Jacke ist grün.=Mi chamarra es verde.
Welche Farbe hat dein Hut?=¿De qué color es tu sombrero?`);

DE('A1', 'In der Stadt', 'La ciudad, preguntas y gehen/fahren', '🏙️', { t: 'Preguntas con W', k: 'wo wohin was wer wie',
n: `Las preguntas empiezan con **W** y el verbo va en segundo lugar:
|wo?|¿dónde?
|wohin?|¿a dónde?
|was?|¿qué?
|wer?|¿quién?
|wie?|¿cómo?
|wann?|¿cuándo?
**gehen** = ir a pie. **fahren** = ir en vehículo (du fährst, er fährt).
!«Wo» es dónde, no «quién». «Wer» es quién. Es el error número uno.` },
`die Stadt=la ciudad=🏙️
die Straße=la calle
der Bahnhof=la estación de tren=🚉
der Bus=el camión/el autobús=🚌
die U-Bahn=el metro=🚇
das Auto=el carro/el coche=🚗
das Fahrrad=la bicicleta=🚲
die Bank=el banco=🏦
die Apotheke=la farmacia=💊
das Museum=el museo=🏛️
der Park=el parque=🌳
gehen=ir (a pie)/caminar
fahren=ir (en vehículo)/manejar
links=a la izquierda=⬅️
rechts=a la derecha=➡️
geradeaus=derecho/todo recto=⬆️`,
`Wo ist der Bahnhof?=¿Dónde está la estación de tren?
Ich fahre mit dem Bus.=Voy en camión.
Gehen Sie geradeaus und dann links.=Siga derecho y luego a la izquierda.
Wohin fährst du?=¿A dónde vas?
Die Apotheke ist rechts.=La farmacia está a la derecha.
Wer wohnt hier?=¿Quién vive aquí?
Wie komme ich zum Museum?=¿Cómo llego al museo?`);

DE('A1', 'Der Alltag', 'Rutina y verbos separables', '⏰', { t: 'Verbos separables', k: 'auf an ein aus fern',
n: `Muchos verbos tienen un **prefijo que se va al final** de la frase:
|aufstehen|Ich **stehe** um sieben Uhr **auf**.
|anrufen|Ich **rufe** dich **an**.
|einkaufen|Wir **kaufen** heute **ein**.
|fernsehen|Er **sieht** abends **fern**.
!Escucha hasta el final: «Ich mache die Tür…» puede ser «auf» (abro) o «zu» (cierro). ¡El sentido llega al último!` },
`aufstehen=levantarse=⏰
frühstücken=desayunar=🥐
duschen=bañarse/ducharse=🚿
arbeiten=trabajar=💼
anrufen=llamar por teléfono=📞
einkaufen=hacer las compras=🛒
fernsehen=ver la tele=📺
schlafen=dormir=😴
der Morgen=la mañana
der Abend=la noche/la tarde
früh=temprano
spät=tarde
immer=siempre
oft=a menudo/seguido
manchmal=a veces
nie=nunca`,
`Ich stehe um sieben Uhr auf.=Me levanto a las siete.
Wir frühstücken zusammen.=Desayunamos juntos.
Er ruft seine Mutter an.=Él le llama a su mamá.
Abends sehe ich fern.=En la noche veo la tele.
Am Samstag kaufen wir ein.=El sábado hacemos las compras.
Ich dusche immer morgens.=Siempre me baño en la mañana.`);

/* ============================ A2 ============================ */
DE('A2', 'Freizeit', 'Pasatiempos, gern y negación', '⚽', { t: 'nicht y kein', k: 'nicht kein keine keinen gern',
n: `**kein** niega un sustantivo (= ningún, no… un). **nicht** niega todo lo demás.
|Ich habe **kein** Auto.|No tengo carro.
|Ich spiele **nicht** gut.|No juego bien.
«gern» = con gusto. «Ich spiele **gern** Fußball» = Me gusta jugar futbol.
|gern|me gusta
|lieber|prefiero
|am liebsten|lo que más me gusta
!No digas «nicht ein»: se dice «kein».` },
`das Hobby=el pasatiempo=🎯
der Fußball=el futbol=⚽
schwimmen=nadar=🏊
tanzen=bailar=💃
lesen=leer=📖
singen=cantar=🎤
malen=pintar=🎨
spielen=jugar/tocar
die Gitarre=la guitarra=🎸
das Kino=el cine=🎬
das Konzert=el concierto=🎵
wandern=hacer senderismo=🥾
das Spiel=el juego/el partido
der Freund=el amigo
die Freundin=la amiga/la novia
gern=con gusto/me gusta`,
`Ich spiele gern Fußball.=Me gusta jugar futbol.
Sie tanzt lieber.=Ella prefiere bailar.
Ich habe keine Zeit.=No tengo tiempo.
Wir gehen heute nicht ins Kino.=Hoy no vamos al cine.
Am liebsten lese ich.=Lo que más me gusta es leer.
Spielst du Gitarre?=¿Tocas la guitarra?`);

DE('A2', 'Das Wetter', 'Clima y estaciones', '🌦️', { t: 'Es regnet: el sujeto «es»', k: 'es regnet schneit ist',
n: `Para el clima siempre se usa **es** como sujeto:
|es regnet|llueve
|es schneit|nieva
|es ist kalt|hace frío
|es ist warm|hace calor
|die Sonne scheint|hace sol
!En alemán no se «hace» calor: el clima «es» caliente: «Es ist heiß».
!Las estaciones son masculinas: der Frühling, der Sommer, der Herbst, der Winter.` },
`das Wetter=el clima/el tiempo
die Sonne=el sol=☀️
der Regen=la lluvia=🌧️
der Schnee=la nieve=❄️
der Wind=el viento=💨
die Wolke=la nube=☁️
kalt=frío=🥶
warm=caluroso/cálido
heiß=muy caliente/hace mucho calor=🥵
der Frühling=la primavera=🌷
der Sommer=el verano=🏖️
der Herbst=el otoño=🍂
der Winter=el invierno=⛄
regnen=llover
der Regenschirm=el paraguas=☂️
das Gewitter=la tormenta=⛈️`,
`Heute regnet es.=Hoy llueve.
Im Winter ist es sehr kalt.=En invierno hace mucho frío.
Die Sonne scheint.=Hace sol.
Im Sommer ist es heiß.=En verano hace mucho calor.
Nimm einen Regenschirm mit!=¡Llévate un paraguas!
Wie ist das Wetter in Mexiko?=¿Cómo está el clima en México?`);

DE('A2', 'Einkaufen', 'Compras, möchten y dieser', '🛒', { t: 'möchten y dieser', k: 'möchte möchtest dieser diese dieses',
n: `**möchten** (quisiera) es la forma amable de pedir:
|ich möchte|quisiera
|du möchtest|quisieras
|er / sie möchte|quisiera
**dieser / diese / dieses** = este, esta (sigue el género).
|Wie viel kostet das?|¿Cuánto cuesta?
!En las tiendas alemanas casi nadie regatea, y en muchos lugares se paga todavía en efectivo.` },
`kaufen=comprar
verkaufen=vender
kosten=costar
der Preis=el precio=🏷️
das Geld=el dinero=💶
der Euro=el euro=💶
die Kasse=la caja
bar=en efectivo
die Karte=la tarjeta=💳
der Supermarkt=el supermercado=🛒
die Tasche=la bolsa=👜
billig=barato
das Angebot=la oferta
die Größe=la talla
zu groß=demasiado grande
die Quittung=el recibo/el ticket=🧾`,
`Wie viel kostet das?=¿Cuánto cuesta?
Ich möchte diese Jacke.=Quisiera esta chamarra.
Kann ich mit Karte zahlen?=¿Puedo pagar con tarjeta?
Dieses Hemd ist zu groß.=Esta camisa es demasiado grande.
Das ist sehr billig!=¡Está muy barato!
Brauchen Sie eine Tasche?=¿Necesita una bolsa?`);

DE('A2', 'Reisen', 'Viajes y Perfekt con haben', '✈️', { t: 'Perfekt: el pasado hablado', k: 'habe hast hat gemacht gekauft gesehen',
n: `Para hablar del pasado se usa **haben + participio al final**:
|machen → gemacht|Ich **habe** Fotos **gemacht**.
|kaufen → gekauft|Wir **haben** Tickets **gekauft**.
|sehen → gesehen|Hast du das Meer **gesehen**?
|essen → gegessen|Er **hat** Tacos **gegessen**.
!El participio casi siempre lleva **ge-**. Los regulares terminan en -t; los irregulares en -en.` },
`die Reise=el viaje=🧳
reisen=viajar
der Flughafen=el aeropuerto=🛫
das Flugzeug=el avión=✈️
der Zug=el tren=🚆
das Ticket=el boleto=🎫
der Koffer=la maleta=🧳
der Pass=el pasaporte=🛂
das Hotel=el hotel=🏨
der Strand=la playa=🏖️
das Meer=el mar=🌊
der Berg=la montaña=⛰️
die Karte=el mapa/la tarjeta=🗺️
das Foto=la foto=📷
der Urlaub=las vacaciones
buchen=reservar`,
`Ich habe ein Hotel gebucht.=Reservé un hotel.
Wir haben viele Fotos gemacht.=Tomamos muchas fotos.
Hast du das Meer gesehen?=¿Viste el mar?
Der Zug hat Verspätung.=El tren viene retrasado.
Im Urlaub habe ich viel gegessen.=En las vacaciones comí mucho.
Wo ist mein Pass?=¿Dónde está mi pasaporte?`);

DE('A2', 'Gesundheit', 'Salud y Perfekt con sein', '🩺', { t: 'Perfekt con sein', k: 'bin bist ist sind gegangen gefahren gekommen',
n: `Los verbos de **movimiento** o **cambio de estado** forman el pasado con **sein**:
|gehen|Ich **bin** zum Arzt **gegangen**.
|fahren|Wir **sind** nach Wien **gefahren**.
|kommen|Er **ist** spät **gekommen**.
|bleiben|Sie **ist** zu Hause **geblieben**.
!«Mir tut der Kopf weh» = me duele la cabeza (literalmente: «a mí me hace daño la cabeza»).` },
`der Arzt=el doctor/el médico=🩺
die Ärztin=la doctora
krank=enfermo=🤒
gesund=sano
der Kopf=la cabeza
der Bauch=la panza/el estómago
der Rücken=la espalda
das Fieber=la fiebre=🌡️
die Erkältung=el resfriado/la gripa=🤧
die Tablette=la pastilla=💊
das Krankenhaus=el hospital=🏥
wehtun=doler
der Zahn=el diente=🦷
das Auge=el ojo=👁️
die Hand=la mano=✋
müde=cansado=😴`,
`Ich bin krank.=Estoy enfermo.
Mir tut der Kopf weh.=Me duele la cabeza.
Ich bin zum Arzt gegangen.=Fui al doctor.
Er ist zu Hause geblieben.=Él se quedó en casa.
Hast du Fieber?=¿Tienes fiebre?
Nimm diese Tablette.=Tómate esta pastilla.`);

DE('A2', 'Arbeit', 'Profesiones y verbos modales', '💼', { t: 'können, müssen, wollen', k: 'kann muss will darf soll',
n: `Los modales mandan el otro verbo **al final** en infinitivo:
|können|Ich **kann** Deutsch **sprechen**.
|müssen|Du **musst** heute **arbeiten**.
|wollen|Er **will** Arzt **werden**.
|dürfen|Hier **darf** man nicht **rauchen**.
|sollen|Wir **sollen** pünktlich **sein**.
!Las profesiones no llevan artículo: «Ich bin Lehrerin» (soy maestra), no «eine Lehrerin».` },
`die Arbeit=el trabajo=💼
der Beruf=la profesión
der Lehrer=el maestro=👨‍🏫
die Lehrerin=la maestra=👩‍🏫
der Koch=el cocinero=👨‍🍳
der Ingenieur=el ingeniero
die Krankenschwester=la enfermera
der Chef=el jefe
das Büro=la oficina=🏢
die Firma=la empresa
der Kollege=el compañero de trabajo
verdienen=ganar (dinero)
das Gehalt=el sueldo/el salario
pünktlich=puntual=⏱️
die Pause=el descanso
der Termin=la cita`,
`Ich bin Ingenieurin.=Soy ingeniera.
Ich kann gut kochen.=Sé cocinar bien.
Du musst pünktlich sein.=Tienes que ser puntual.
Er will Arzt werden.=Él quiere ser médico.
Hier darf man nicht rauchen.=Aquí no se puede fumar.
Ich habe morgen einen Termin.=Mañana tengo una cita.`);

DE('A2', 'Die Schule', 'Escuela y dativo', '🏫', { t: 'El dativo: mit, bei, nach, zu', k: 'dem der den mit bei',
n: `Después de **mit, bei, nach, von, zu, aus, seit** siempre va el **dativo**:
|der / das → dem|mit **dem** Lehrer
|die → der|mit **der** Lehrerin
|die (plural) → den …n|mit **den** Kindern
|zu + dem = zum|zum Bahnhof
|zu + der = zur|zur Schule
!Memoriza la frase «aus, bei, mit, nach, seit, von, zu»: todas piden dativo, siempre.` },
`die Schule=la escuela=🏫
die Universität=la universidad=🎓
der Schüler=el alumno
die Schülerin=la alumna
die Klasse=el salón/el grupo
das Heft=el cuaderno=📓
das Buch=el libro=📚
der Stift=el lápiz/la pluma=✏️
die Prüfung=el examen=📝
die Hausaufgabe=la tarea
lernen=aprender/estudiar
lehren=enseñar
die Note=la calificación
die Pause=el recreo
fragen=preguntar=❓
antworten=responder`,
`Ich gehe zur Schule.=Voy a la escuela.
Sie spricht mit dem Lehrer.=Ella habla con el maestro.
Ich wohne bei meinen Eltern.=Vivo con mis padres.
Nach der Schule spiele ich.=Después de la escuela juego.
Morgen habe ich eine Prüfung.=Mañana tengo un examen.
Wir fahren mit dem Bus zur Uni.=Vamos en camión a la universidad.`);

DE('A2', 'Im Restaurant', 'Restaurante y pronombres', '🍽️', { t: 'mir, dir, ihn, ihm', k: 'mir dir ihm ihn ihr',
n: `Los pronombres cambian según la función:
|ich → mich / mir|me (acusativo / dativo)
|du → dich / dir|te
|er → ihn / ihm|lo / le
|sie → sie / ihr|la / le
«Bringen Sie **mir** die Karte?» = ¿Me trae el menú?
!La propina (das Trinkgeld) se redondea al pagar: dices el total que quieres dar, por ejemplo «Machen Sie zwanzig».` },
`das Restaurant=el restaurante=🍽️
die Speisekarte=el menú/la carta=📋
der Kellner=el mesero
bestellen=pedir/ordenar
die Rechnung=la cuenta=🧾
das Trinkgeld=la propina
die Suppe=la sopa=🍲
das Fleisch=la carne=🥩
der Fisch=el pescado=🐟
das Gemüse=las verduras=🥦
der Salat=la ensalada=🥗
der Nachtisch=el postre=🍰
das Glas=el vaso/la copa=🥛
die Gabel=el tenedor=🍴
das Messer=el cuchillo=🔪
satt=lleno/satisfecho`,
`Die Rechnung, bitte!=¡La cuenta, por favor!
Bringen Sie mir die Speisekarte?=¿Me trae el menú?
Ich möchte den Fisch bestellen.=Quisiera pedir el pescado.
Schmeckt es dir?=¿Te gusta? (la comida)
Ich gebe ihm das Glas.=Le doy el vaso.
Danke, ich bin satt.=Gracias, estoy lleno.`);

/* ============================ B1 ============================ */
DE('B1', 'Kindheit', 'Recuerdos y Präteritum', '🧸', { t: 'Präteritum: war, hatte, konnte', k: 'war waren hatte hatten konnte musste',
n: `Para **sein, haben** y los **modales**, el pasado se dice en Präteritum (más corto):
|ich war|yo era / estaba
|ich hatte|yo tenía
|ich konnte|yo podía
|ich musste|yo tenía que
|ich wollte|yo quería
«Als ich Kind **war**…» = Cuando era niño…
!**als** = cuando (una vez en el pasado). **wenn** = cuando (cada vez, o en futuro).` },
`die Kindheit=la infancia
das Spielzeug=el juguete=🧸
der Teddy=el osito de peluche=🧸
die Puppe=la muñeca=🪆
der Spielplatz=el parque de juegos=🛝
der Nachbar=el vecino
die Erinnerung=el recuerdo
sich erinnern=acordarse/recordar
früher=antes
damals=en aquel entonces
als=cuando
klettern=trepar
streiten=pelearse
das Geheimnis=el secreto=🤫
der Ballon=el globo=🎈
die Kerze=la vela=🕯️`,
`Als ich Kind war, wohnte ich auf dem Land.=Cuando era niño, vivía en el campo.
Ich hatte einen Teddy.=Tenía un osito de peluche.
Früher konnte ich nicht schwimmen.=Antes no sabía nadar.
Damals waren wir sehr glücklich.=En aquel entonces éramos muy felices.
Ich musste immer früh schlafen.=Siempre tenía que dormirme temprano.
Erinnerst du dich an den Spielplatz?=¿Te acuerdas del parque de juegos?`);

DE('B1', 'Natur', 'Naturaleza y preposiciones de dos vías', '🌲', { t: 'Wechselpräpositionen', k: 'in im den dem auf',
n: `**in, an, auf, über, unter, vor, hinter, neben, zwischen** usan dos casos:
|¿Dónde? (wo) → dativo|Der Vogel sitzt **auf dem** Baum.
|¿A dónde? (wohin) → acusativo|Der Vogel fliegt **auf den** Baum.
|in + dem = im|im Wald
|in + das = ins|ins Wasser
!Pregúntate: ¿hay movimiento hacia un lugar? Acusativo. ¿Solo posición? Dativo.` },
`die Natur=la naturaleza
der Wald=el bosque=🌲
der Baum=el árbol=🌳
die Blume=la flor=🌸
der See=el lago
der Fluss=el río=🏞️
die Wiese=el prado
der Vogel=el pájaro=🐦
das Tier=el animal
der Bär=el oso=🐻
der Fuchs=el zorro=🦊
das Pferd=el caballo=🐴
der Stein=la piedra=🪨
der Himmel=el cielo
der Stern=la estrella=⭐
der Mond=la luna=🌙`,
`Wir gehen in den Wald.=Vamos al bosque.
Im Wald gibt es viele Tiere.=En el bosque hay muchos animales.
Der Vogel sitzt auf dem Baum.=El pájaro está en el árbol.
Die Kinder springen ins Wasser.=Los niños se avientan al agua.
Am Himmel sehe ich die Sterne.=En el cielo veo las estrellas.
Ein Fuchs läuft über die Wiese.=Un zorro corre por el prado.`);

DE('B1', 'Technik', 'Tecnología y futuro con werden', '💻', { t: 'Futur I: werden + infinitivo', k: 'werde wirst wird werden',
n: `**werden + infinitivo al final** = futuro.
|ich werde|Ich **werde** ein Handy **kaufen**.
|du wirst|Du **wirst** es **sehen**.
|er wird|Es **wird** **regnen**.
|wir werden|Wir **werden** **gewinnen**.
!En la vida diaria se usa mucho el presente para el futuro: «Morgen kaufe ich ein Handy».` },
`der Computer=la computadora=💻
das Handy=el celular=📱
das Internet=el internet=🌐
die App=la aplicación/la app
das Passwort=la contraseña=🔑
die E-Mail=el correo electrónico=📧
herunterladen=descargar
speichern=guardar
löschen=borrar
der Bildschirm=la pantalla=🖥️
die Tastatur=el teclado=⌨️
der Akku=la batería=🔋
aufladen=cargar
die Nachricht=el mensaje=💬
schicken=mandar/enviar
der Drucker=la impresora=🖨️`,
`Ich werde ein neues Handy kaufen.=Me voy a comprar un celular nuevo.
Mein Akku ist leer.=Se me acabó la batería.
Hast du die Datei gespeichert?=¿Guardaste el archivo?
Ich schicke dir eine Nachricht.=Te mando un mensaje.
Die Technik wird immer schneller.=La tecnología será cada vez más rápida.
Vergiss dein Passwort nicht!=¡No olvides tu contraseña!`);

DE('B1', 'Gefühle', 'Emociones y verbos reflexivos', '💛', { t: 'Verbos reflexivos', k: 'mich dich sich uns euch',
n: `Como en español, muchos verbos llevan **sich**:
|ich freue mich|me alegro
|du ärgerst dich|te enojas
|er fühlt sich|él se siente
|wir verlieben uns|nos enamoramos
**sich freuen auf** = esperar con ilusión (algo futuro). **sich freuen über** = alegrarse por (algo presente).
!«Ich vermisse dich» = te extraño. ¡Sin «sich»!` },
`das Gefühl=el sentimiento
glücklich=feliz=😊
traurig=triste=😢
wütend=furioso/enojado=😠
nervös=nervioso=😬
die Angst=el miedo=😨
die Liebe=el amor=❤️
die Freude=la alegría
sich freuen=alegrarse
sich ärgern=enojarse
sich fühlen=sentirse
vermissen=extrañar
überrascht=sorprendido=😮
stolz=orgulloso
einsam=solo/solitario
die Hoffnung=la esperanza`,
`Ich freue mich auf das Wochenende.=Tengo muchas ganas de que llegue el fin de semana.
Ärgere dich nicht!=¡No te enojes!
Wie fühlst du dich?=¿Cómo te sientes?
Ich vermisse meine Familie.=Extraño a mi familia.
Sie hat Angst vor Hunden.=Ella les tiene miedo a los perros.
Wir sind stolz auf dich.=Estamos orgullosos de ti.`);

DE('B1', 'Medien', 'Medios y oraciones con weil y dass', '📰', { t: 'El verbo al final: weil, dass, ob', k: 'weil dass ob wenn',
n: `Después de **weil, dass, ob, wenn** el verbo conjugado se va **al final**:
|Ich lese, **weil** ich Zeit **habe**.|Leo porque tengo tiempo.
|Ich glaube, **dass** es **stimmt**.|Creo que es cierto.
|Weißt du, **ob** er **kommt**?|¿Sabes si viene?
!Coma obligatoria antes de weil, dass y ob. Es una regla, no un estilo.` },
`die Zeitung=el periódico=📰
die Zeitschrift=la revista
das Fernsehen=la televisión=📺
Nachrichten=las noticias
der Artikel=el artículo
die Sendung=el programa
die Serie=la serie
der Film=la película=🎬
das Radio=el radio=📻
der Podcast=el pódcast=🎧
die Werbung=la publicidad
berichten=informar
glauben=creer
die Meinung=la opinión
stimmen=ser cierto
online=en línea`,
`Ich lese Zeitung, weil ich informiert sein will.=Leo el periódico porque quiero estar informado.
Ich glaube, dass die Nachricht falsch ist.=Creo que la noticia es falsa.
Weißt du, ob die Serie gut ist?=¿Sabes si la serie es buena?
Er sagt, dass er keine Zeit hat.=Dice que no tiene tiempo.
Wenn ich müde bin, höre ich Podcasts.=Cuando estoy cansado, escucho pódcasts.
Die Werbung nervt mich.=La publicidad me molesta.`);

DE('B1', 'Träume', 'Sueños y Konjunktiv II', '🌠', { t: 'würde, wäre, hätte', k: 'würde wäre hätte könnte',
n: `El condicional se forma con **würde + infinitivo**:
|ich würde reisen|yo viajaría
|ich wäre|yo sería / estaría
|ich hätte|yo tendría
|ich könnte|yo podría
«**Wenn** ich reich **wäre**, **würde** ich die Welt **sehen**.» = Si fuera rico, vería el mundo.
!Con sein y haben no uses würde: di «wäre» y «hätte».` },
`der Traum=el sueño=💭
träumen=soñar
der Wunsch=el deseo=🌠
wünschen=desear
das Ziel=la meta=🎯
der Plan=el plan
die Zukunft=el futuro
reich=rico=💰
berühmt=famoso
die Welt=el mundo=🌍
die Insel=la isla=🏝️
das Abenteuer=la aventura
vielleicht=quizás/tal vez
erreichen=lograr/alcanzar
gewinnen=ganar=🏆
das Glück=la suerte/la felicidad=🍀`,
`Wenn ich reich wäre, würde ich reisen.=Si fuera rico, viajaría.
Ich hätte gern ein Haus am Meer.=Me gustaría tener una casa junto al mar.
Was würdest du machen?=¿Qué harías?
Mein Traum ist, Pilotin zu werden.=Mi sueño es ser piloto.
Wir könnten zusammen arbeiten.=Podríamos trabajar juntos.
Viel Glück!=¡Mucha suerte!`);

DE('B1', 'Meinungen', 'Opinar y conectores', '💬', { t: 'deshalb, trotzdem: inversión', k: 'deshalb trotzdem außerdem dann',
n: `Con **deshalb, trotzdem, außerdem, dann** el verbo va justo después (posición 2):
|Es regnet, **deshalb bleibe** ich zu Hause.|Llueve, por eso me quedo en casa.
|Es regnet, **trotzdem gehe** ich spazieren.|Llueve, aun así salgo a caminar.
Para opinar:
|Ich finde, dass…|Me parece que…
|Meiner Meinung nach…|En mi opinión…
|Da hast du recht.|En eso tienes razón.
!«Ich bin einverstanden» = estoy de acuerdo. No traduzcas «estoy de acuerdo» palabra por palabra.` },
`die Meinung=la opinión
finden=encontrar/opinar
denken=pensar
recht haben=tener razón
einverstanden=de acuerdo=🤝
dafür=a favor
dagegen=en contra
das Argument=el argumento
der Vorteil=la ventaja
der Nachteil=la desventaja
deshalb=por eso
trotzdem=aun así/sin embargo
außerdem=además
wichtig=importante
richtig=correcto=✅
falsch=falso/incorrecto=❌`,
`Ich finde das Buch interessant.=El libro me parece interesante.
Meiner Meinung nach ist das falsch.=En mi opinión, eso está mal.
Da hast du recht.=En eso tienes razón.
Es ist teuer, trotzdem kaufe ich es.=Es caro; aun así lo compro.
Ich bin müde, deshalb gehe ich schlafen.=Estoy cansado, por eso me voy a dormir.
Bist du dafür oder dagegen?=¿Estás a favor o en contra?`);

DE('B1', 'Gesellschaft', 'Sociedad y oraciones de relativo', '🏘️', { t: 'Relativsätze: der, die, das', k: 'der die das den dem',
n: `El pronombre relativo copia el **género** del sustantivo y toma el **caso** de su función. El verbo va al final:
|Der Mann, **der** dort **wohnt**…|El hombre que vive allí…
|Die Frau, **die** ich **kenne**…|La mujer que conozco…
|Das Kind, **dem** ich **helfe**…|El niño al que ayudo…
|Der Hund, **den** ich **sehe**…|El perro que veo…
!En español «que» sirve para todo. En alemán tienes que elegir: der, die, das, den, dem…` },
`die Gesellschaft=la sociedad
der Mensch=el ser humano/la persona
Leute=la gente
der Bürger=el ciudadano
die Gemeinschaft=la comunidad
die Arbeitslosigkeit=el desempleo
die Armut=la pobreza
die Gleichheit=la igualdad=⚖️
das Recht=el derecho
helfen=ayudar=🤝
der Verein=la asociación/el club
freiwillig=voluntario
die Nachbarschaft=el vecindario=🏘️
die Kultur=la cultura
die Regel=la regla
das Problem=el problema`,
`Der Mann, der dort wohnt, ist Arzt.=El hombre que vive allí es doctor.
Das ist die Frau, die ich kenne.=Esa es la mujer que conozco.
Ich helfe Leuten, die arm sind.=Ayudo a gente que es pobre.
Das Kind, dem ich helfe, ist sehr klug.=El niño al que ayudo es muy listo.
In unserer Nachbarschaft gibt es einen Verein.=En nuestro vecindario hay una asociación.
Gleichheit ist ein wichtiges Recht.=La igualdad es un derecho importante.`);

/* ============================ B2 ============================ */
DE('B2', 'Umwelt', 'Medio ambiente y voz pasiva', '🌍', { t: 'Passiv: werden + participio', k: 'wird werden wurde wurden',
n: `La voz pasiva pone el foco en la acción, no en quién la hace:
|Man recycelt Plastik.|Se recicla el plástico.
|Plastik **wird** recycelt.|El plástico es reciclado.
|Der Wald **wurde** zerstört.|El bosque fue destruido.
|Es **muss** mehr getan **werden**.|Hay que hacer más.
!«von» indica quién lo hizo: «Der Baum wurde **von** dem Sturm zerstört».` },
`die Umwelt=el medio ambiente=🌍
der Klimawandel=el cambio climático=🔥
die Energie=la energía=⚡
erneuerbar=renovable
die Solaranlage=el panel solar=☀️
recyceln=reciclar=♻️
der Müll=la basura=🗑️
das Plastik=el plástico
verschwenden=desperdiciar
sparen=ahorrar
schützen=proteger
die Dürre=la sequía
die Überschwemmung=la inundación=🌊
die Abholzung=la deforestación
nachhaltig=sustentable
die Luftverschmutzung=la contaminación del aire=🏭`,
`In Deutschland wird viel recycelt.=En Alemania se recicla mucho.
Der Wald wurde zerstört.=El bosque fue destruido.
Es muss mehr Energie gespart werden.=Hay que ahorrar más energía.
Plastik wird oft verschwendet.=El plástico se desperdicia seguido.
Wir müssen die Umwelt schützen.=Tenemos que proteger el medio ambiente.
Die Häuser wurden von der Flut beschädigt.=Las casas fueron dañadas por la inundación.`);

DE('B2', 'Karriere', 'Mundo laboral y pluscuamperfecto', '📈', { t: 'Plusquamperfekt', k: 'hatte hatten war waren nachdem',
n: `**hatte / war + participio** = había hecho. Se usa para lo anterior a otro pasado:
|Ich **hatte** die Stelle schon **angenommen**.|Ya había aceptado el puesto.
|Er **war** schon **gegangen**.|Él ya se había ido.
Con **nachdem** (después de que) casi siempre aparece:
|**Nachdem** ich gekündigt **hatte**, reiste ich.|Después de renunciar, viajé.
!«kündigen» = renunciar o despedir. «Mir wurde gekündigt» = me despidieron.` },
`die Karriere=la carrera profesional
die Stelle=el puesto/la vacante
die Bewerbung=la solicitud de empleo
sich bewerben=postularse/aplicar
das Vorstellungsgespräch=la entrevista de trabajo
der Lebenslauf=el currículum=📄
kündigen=renunciar/despedir
die Beförderung=el ascenso=📈
der Vertrag=el contrato=📝
das Praktikum=las prácticas profesionales
die Gewerkschaft=el sindicato
Überstunden=las horas extra
der Arbeitgeber=el empleador
der Arbeitnehmer=el empleado/el trabajador
selbstständig=independiente/por su cuenta
die Erfahrung=la experiencia`,
`Ich hatte mich schon beworben.=Ya me había postulado.
Nachdem sie gekündigt hatte, gründete sie eine Firma.=Después de renunciar, fundó una empresa.
Er war schon gegangen, als ich kam.=Él ya se había ido cuando llegué.
Ich habe morgen ein Vorstellungsgespräch.=Mañana tengo una entrevista de trabajo.
Sie hat eine Beförderung bekommen.=Le dieron un ascenso.
Wie viel Erfahrung haben Sie?=¿Cuánta experiencia tiene?`);

DE('B2', 'Kunst', 'Arte y declinación del adjetivo', '🎨', { t: 'Adjektivdeklination', k: 'schöne schönen schönes alte alten',
n: `Antes del sustantivo, el adjetivo **toma terminación**:
|der alte Maler|el pintor viejo
|ein alter Maler|un pintor viejo
|das schöne Bild|el cuadro bonito
|ein schönes Bild|un cuadro bonito
|mit dem alten Maler|con el pintor viejo (dativo: -en)
!Atajo: después de der/die/das casi siempre **-e** o **-en**. Después de ein, el adjetivo «muestra» el género: -er, -e, -es.` },
`die Kunst=el arte=🎨
der Künstler=el artista
die Künstlerin=la artista
das Gemälde=la pintura/el cuadro=🖼️
die Ausstellung=la exposición
die Galerie=la galería
die Skulptur=la escultura=🗿
das Theater=el teatro=🎭
die Bühne=el escenario
das Orchester=la orquesta=🎻
der Maler=el pintor
zeichnen=dibujar=✏️
beeindruckend=impresionante
modern=moderno
das Werk=la obra
das Meisterwerk=la obra maestra`,
`Das ist ein schönes Bild.=Es un cuadro bonito.
Der alte Maler lebt in Wien.=El viejo pintor vive en Viena.
Wir besuchen eine moderne Ausstellung.=Visitamos una exposición moderna.
Ich spreche mit der jungen Künstlerin.=Hablo con la artista joven.
Das ist ein beeindruckendes Werk.=Es una obra impresionante.
Sie mag klassische Musik.=Le gusta la música clásica.`);

DE('B2', 'Politik', 'Política y genitivo', '🏛️', { t: 'El genitivo: wegen, trotz, während', k: 'des der wegen trotz während',
n: `El genitivo indica posesión y va con algunas preposiciones formales:
|das Auto **des** Mannes|el carro del hombre
|die Rede **der** Kanzlerin|el discurso de la canciller
|**wegen des** Regens|a causa de la lluvia
|**trotz des** Streiks|a pesar de la huelga
|**während der** Wahl|durante la elección
!En el habla diaria muchos usan «von» + dativo: «das Auto von dem Mann». En textos formales, genitivo.` },
`die Politik=la política
die Regierung=el gobierno
der Bundeskanzler=el canciller federal
die Wahl=la elección=🗳️
wählen=votar/elegir
die Partei=el partido
das Gesetz=la ley=📜
der Bundestag=el parlamento alemán
die Demokratie=la democracia
die Rede=el discurso=🎙️
der Streik=la huelga
die Steuer=el impuesto
die Grenze=la frontera
das Bundesland=el estado federado
die Opposition=la oposición
die Mehrheit=la mayoría`,
`Wegen des Streiks fahren keine Züge.=A causa de la huelga no hay trenes.
Die Rede der Kanzlerin war lang.=El discurso de la canciller fue largo.
Trotz des Regens gingen viele wählen.=A pesar de la lluvia, mucha gente fue a votar.
Während der Wahl gab es viele Debatten.=Durante la elección hubo muchos debates.
Deutschland hat sechzehn Bundesländer.=Alemania tiene dieciséis estados federados.
Die Partei hat die Mehrheit verloren.=El partido perdió la mayoría.`);

DE('B2', 'Wissenschaft', 'Ciencia y oraciones con zu', '🔬', { t: 'um … zu, ohne … zu, statt … zu', k: 'um zu ohne statt',
n: `Infinitivo con **zu** al final:
|**um** … **zu**|para: Ich lerne, **um** Ärztin **zu** werden.
|**ohne** … **zu**|sin: Er ging, **ohne** etwas **zu** sagen.
|**statt** … **zu**|en lugar de: **Statt** zu lernen, spielt er.
Con verbos separables, «zu» va en medio: **anzurufen**, **aufzustehen**.
!«um … zu» solo si el sujeto es el mismo. Si cambia, usa «damit»: «Ich erkläre es, damit du es verstehst».` },
`die Wissenschaft=la ciencia=🔬
der Wissenschaftler=el científico
die Forschung=la investigación
forschen=investigar
das Experiment=el experimento=🧪
das Labor=el laboratorio
die Entdeckung=el descubrimiento
entdecken=descubrir
die Theorie=la teoría
beweisen=demostrar/probar
das Ergebnis=el resultado
die Zelle=la célula=🦠
das Gehirn=el cerebro=🧠
der Planet=el planeta=🪐
die Physik=la física
die Chemie=la química=⚗️`,
`Ich studiere, um Forscherin zu werden.=Estudio para ser investigadora.
Er ging, ohne etwas zu sagen.=Se fue sin decir nada.
Statt zu lernen, spielt er Videospiele.=En lugar de estudiar, juega videojuegos.
Das Experiment hat die Theorie bewiesen.=El experimento demostró la teoría.
Es ist wichtig, die Ergebnisse zu prüfen.=Es importante revisar los resultados.
Vergiss nicht, mich anzurufen!=¡No olvides llamarme!`);

DE('B2', 'Beziehungen', 'Relaciones y discurso indirecto', '💞', { t: 'Konjunktiv I: el discurso indirecto', k: 'sei habe komme könne',
n: `Para citar lo que otro dijo, el alemán formal usa el **Konjunktiv I**:
|Er sagt: «Ich bin müde.»|Er sagt, er **sei** müde.
|Sie sagt: «Ich habe Zeit.»|Sie sagt, sie **habe** Zeit.
|Er sagt: «Ich komme.»|Er sagt, er **komme**.
En el habla diaria se dice simplemente: «Er sagt, dass er müde ist».
!Lo vas a ver en todas las noticias: el periodista no toma partido, solo reporta.` },
`die Beziehung=la relación
die Ehe=el matrimonio=💍
heiraten=casarse
sich trennen=separarse
die Scheidung=el divorcio
der Partner=la pareja
die Partnerin=la pareja
das Vertrauen=la confianza
eifersüchtig=celoso
sich verlieben=enamorarse=😍
der Streit=la pelea
sich versöhnen=reconciliarse
treu=fiel
die Hochzeit=la boda=💒
der Verlobte=el prometido
die Freundschaft=la amistad`,
`Er sagt, er sei verliebt.=Dice que está enamorado.
Sie sagt, sie habe keine Zeit.=Dice que no tiene tiempo.
Wir heiraten im Mai.=Nos casamos en mayo.
Vertrauen ist das Wichtigste.=La confianza es lo más importante.
Nach dem Streit haben sie sich versöhnt.=Después de la pelea se reconciliaron.
Er sei sehr eifersüchtig, sagt sie.=Ella dice que él es muy celoso.`);

DE('B2', 'Wirtschaft', 'Economía y conectores dobles', '💶', { t: 'sowohl … als auch, weder … noch, je … desto', k: 'sowohl weder noch je desto',
n: `Conectores de dos partes:
|**sowohl** A **als auch** B|tanto A como B
|**weder** A **noch** B|ni A ni B
|**entweder** A **oder** B|o A o B
|**nicht nur** A, **sondern auch** B|no solo A, sino también B
|**je** mehr, **desto** besser|entre más, mejor
!«Je … desto» es muy usado: «Je früher, desto besser» = entre más temprano, mejor.` },
`die Wirtschaft=la economía
das Unternehmen=la empresa
der Markt=el mercado=📊
die Aktie=la acción (de bolsa)=📈
die Börse=la bolsa de valores
der Gewinn=la ganancia
der Verlust=la pérdida=📉
die Inflation=la inflación
der Kredit=el crédito/el préstamo
Zinsen=los intereses
investieren=invertir
die Krise=la crisis
der Export=la exportación
die Steuer=el impuesto
das Wachstum=el crecimiento
die Konkurrenz=la competencia`,
`Je mehr man spart, desto besser.=Entre más se ahorra, mejor.
Weder die Preise noch die Löhne steigen.=Ni los precios ni los sueldos suben.
Sowohl Deutschland als auch Mexiko exportieren Autos.=Tanto Alemania como México exportan carros.
Das Unternehmen hat einen großen Gewinn gemacht.=La empresa tuvo una gran ganancia.
Die Inflation ist gestiegen.=La inflación subió.
Entweder investieren wir jetzt oder nie.=O invertimos ahora o nunca.`);

DE('B2', 'DACH-Länder', 'Alemania, Austria y Suiza', '🏔️', { t: 'Un idioma, tres países', k: 'Grüezi Servus Moin',
n: `**DACH** = Deutschland (D), Österreich (A) y Schweiz (CH).
|Deutschland|Moin! (norte) · Guten Tag
|Österreich|Servus! · Grüß Gott
|Schweiz|Grüezi! · Merci vielmal
Cambian palabras cotidianas:
|Kartoffel (D)|Erdapfel (A): papa
|Januar (D)|Jänner (A): enero
!En Suiza no se usa la ß: siempre «ss» (Strasse). Y el suizo alemán hablado es muy distinto del escrito.` },
`Österreich=Austria=🇦🇹
die Schweiz=Suiza=🇨🇭
Wien=Viena
Zürich=Zúrich
München=Múnich
Alpen=los Alpes=🏔️
der Dialekt=el dialecto
die Grenze=la frontera
das Bundesland=el estado federado
der Kanton=el cantón
die Hauptstadt=la capital
das Hochdeutsch=el alemán estándar
die Schokolade=el chocolate=🍫
der Käse=el queso=🧀
das Schnitzel=el escalope empanizado=🍖
der Walzer=el vals=💃`,
`In Österreich sagt man Servus.=En Austria se dice «Servus».
Die Hauptstadt der Schweiz ist Bern.=La capital de Suiza es Berna.
Wien ist die Stadt der Musik.=Viena es la ciudad de la música.
In Zürich spricht man Schweizerdeutsch.=En Zúrich se habla suizo alemán.
Die Alpen sind wunderschön.=Los Alpes son hermosísimos.
Das Wiener Schnitzel ist sehr berühmt.=El escalope vienés es muy famoso.`);

/* ============================ C1 ============================ */
DE('C1', 'Redewendungen I', 'Expresiones idiomáticas', '🎭', { t: 'No traduzcas palabra por palabra', k: 'Daumen Tomaten Bahnhof',
n: `Las expresiones se aprenden **como bloque**:
|Ich verstehe nur Bahnhof.|No entiendo nada (literal: solo entiendo «estación»).
|Tomaten auf den Augen haben|no ver lo obvio
|die Daumen drücken|desear suerte (cruzar los dedos)
|Das ist nicht mein Bier.|No es asunto mío.
!Muchas tienen equivalente mexicano: «Schwein haben» = tener suerte («tener puerco»).` },
`Ich verstehe nur Bahnhof=no entiendo nada/no entiendo ni jota
die Daumen drücken=cruzar los dedos/desear suerte
Tomaten auf den Augen haben=no ver lo obvio
Das ist nicht mein Bier=no es asunto mío/no es mi bronca
Schwein haben=tener suerte/tener buena suerte
ins Fettnäpfchen treten=meter la pata
die Nase voll haben=estar harto
auf dem Holzweg sein=estar equivocado
den Nagel auf den Kopf treffen=dar en el clavo
Hals- und Beinbruch=mucha suerte/éxito
jemandem auf den Keks gehen=sacar de quicio a alguien
alles in Butter=todo bien/todo en orden
die Katze im Sack kaufen=comprar a ciegas
um den heißen Brei reden=andarse por las ramas
Kohldampf haben=tener mucha hambre
blau sein=estar borracho/estar pedo`,
`Ich drücke dir die Daumen!=¡Te deseo suerte!
Sorry, ich verstehe nur Bahnhof.=Perdón, no entiendo nada.
Du hast den Nagel auf den Kopf getroffen.=Diste en el clavo.
Ich habe die Nase voll von diesem Job.=Estoy harto de este trabajo.
Rede nicht um den heißen Brei!=¡No te andes por las ramas!
Keine Sorge, alles in Butter.=No te preocupes, todo bien.`);

DE('C1', 'Debatte', 'Debatir y Konjunktiv II pasado', '⚖️', { t: 'hätte … gemacht, wäre … gewesen', k: 'hätte hätten wäre wären',
n: `Lo que **habría** pasado: **hätte / wäre + participio**.
|Wenn ich das gewusst **hätte**…|Si lo hubiera sabido…
|…**hätte** ich anders **gehandelt**.|…habría actuado diferente.
|Das **wäre** besser **gewesen**.|Eso habría sido mejor.
Con modales hay doble infinitivo: «Du **hättest** es mir **sagen müssen**» (me lo debiste haber dicho).
!Para debatir: «Einerseits… andererseits…» = por un lado… por otro.` },
`die Debatte=el debate
argumentieren=argumentar
behaupten=afirmar/sostener
widersprechen=contradecir
überzeugen=convencer
die These=la tesis
die Gegenposition=la postura contraria
einerseits=por un lado
andererseits=por otro lado
zweifellos=sin duda
der Standpunkt=el punto de vista
die Schlussfolgerung=la conclusión
abwägen=sopesar
berechtigt=justificado/legítimo
der Einwand=la objeción
zustimmen=estar de acuerdo`,
`Wenn ich das gewusst hätte, wäre ich gekommen.=Si lo hubiera sabido, habría venido.
Das wäre besser gewesen.=Eso habría sido mejor.
Du hättest es mir sagen müssen.=Me lo debiste haber dicho.
Einerseits ist es teuer, andererseits ist es nützlich.=Por un lado es caro, por otro es útil.
Ich muss Ihnen widersprechen.=Tengo que contradecirlo.
Ihr Einwand ist berechtigt.=Su objeción es legítima.`);

DE('C1', 'Literatur', 'Literatura y participios como adjetivo', '📚', { t: 'Partizipialattribute', k: 'lesende geschriebene gelesene',
n: `El alemán escrito «empaqueta» oraciones enteras antes del sustantivo:
|das Buch, das Kafka geschrieben hat|el libro que escribió Kafka
|das **von Kafka geschriebene** Buch|el libro escrito por Kafka
|der Mann, der liest|el hombre que lee
|der **lesende** Mann|el hombre leyendo
!Lee de afuera hacia adentro: artículo → sustantivo, y luego todo lo de en medio.` },
`die Literatur=la literatura=📚
der Roman=la novela
die Erzählung=el relato
das Gedicht=el poema
der Dichter=el poeta
der Schriftsteller=el escritor=✍️
die Figur=el personaje
die Handlung=la trama
der Erzähler=el narrador
das Kapitel=el capítulo
die Verwandlung=la metamorfosis
das Märchen=el cuento de hadas=🧚
die Sage=la leyenda
veröffentlichen=publicar
die Übersetzung=la traducción
der Leser=el lector`,
`Kafka schrieb «Die Verwandlung».=Kafka escribió «La metamorfosis».
Das von Goethe geschriebene Gedicht ist berühmt.=El poema escrito por Goethe es famoso.
Die Brüder Grimm sammelten Märchen.=Los hermanos Grimm recopilaron cuentos de hadas.
Der lesende Mann bemerkte uns nicht.=El hombre que leía no nos notó.
Die Handlung des Romans ist komplex.=La trama de la novela es compleja.
Ich lese die spanische Übersetzung.=Leo la traducción al español.`);

DE('C1', 'Recht', 'Derecho y estilo nominal', '⚖️', { t: 'Nominalstil', k: 'die der Prüfung Entscheidung',
n: `El lenguaje formal convierte verbos en sustantivos:
|entscheiden → die Entscheidung|decidir → la decisión
|prüfen → die Prüfung|revisar → la revisión
|Nachdem der Vertrag geprüft wurde…|Después de que se revisó el contrato…
|**Nach Prüfung** des Vertrags…|Tras la revisión del contrato…
!Los sustantivos en -ung, -heit, -keit son **siempre femeninos**.` },
`das Recht=el derecho/la ley
das Gericht=el tribunal/el juzgado
der Richter=el juez=👨‍⚖️
der Anwalt=el abogado
die Anwältin=la abogada
die Klage=la demanda
klagen=demandar
das Urteil=la sentencia
der Zeuge=el testigo
die Strafe=la pena/la multa
schuldig=culpable
unschuldig=inocente
die Entscheidung=la decisión
die Prüfung=la revisión/el examen
der Verdacht=la sospecha
die Verhandlung=la audiencia/la negociación`,
`Nach Prüfung der Unterlagen wurde entschieden.=Tras revisar los documentos, se tomó una decisión.
Das Gericht hat ein Urteil gefällt.=El tribunal dictó sentencia.
Der Zeuge sagte die Wahrheit.=El testigo dijo la verdad.
Sie wurde für unschuldig erklärt.=Fue declarada inocente.
Ich brauche einen Anwalt.=Necesito un abogado.
Die Entscheidung des Richters ist endgültig.=La decisión del juez es definitiva.`);

DE('C1', 'Philosophie', 'Filosofía y concesión', '🤔', { t: 'obwohl, zwar … aber, dennoch', k: 'obwohl zwar aber dennoch',
n: `Para conceder un punto:
|**Obwohl** es schwer **ist**, mache ich weiter.|Aunque es difícil, sigo.
|Es ist **zwar** schwer, **aber** möglich.|Es difícil, sí, pero posible.
|Es regnete; **dennoch** gingen wir.|Llovía; no obstante, fuimos.
|**Wenngleich**… (formal)|Si bien…
!Con «obwohl» el verbo se va al final; con «dennoch» va justo después.` },
`die Philosophie=la filosofía
der Philosoph=el filósofo
das Denken=el pensamiento=🤔
die Vernunft=la razón
die Freiheit=la libertad=🕊️
die Wahrheit=la verdad
das Bewusstsein=la conciencia
die Existenz=la existencia
das Sein=el ser
die Ethik=la ética
die Pflicht=el deber
die Erkenntnis=el conocimiento
der Sinn=el sentido
der Zweifel=la duda
das Wesen=la esencia
die Weltanschauung=la cosmovisión`,
`Obwohl es schwer ist, gebe ich nicht auf.=Aunque es difícil, no me rindo.
Das ist zwar logisch, aber nicht gerecht.=Eso es lógico, sí, pero no es justo.
Kant schrieb über die Vernunft.=Kant escribió sobre la razón.
Was ist der Sinn des Lebens?=¿Cuál es el sentido de la vida?
Freiheit bedeutet auch Verantwortung.=La libertad también significa responsabilidad.
Er zweifelte, dennoch handelte er.=Dudaba; no obstante, actuó.`);

DE('C1', 'Geschichte', 'Historia de Alemania', '🧱', { t: 'Präteritum narrativo y pasiva en pasado', k: 'wurde wurden fiel gründete',
n: `La historia se cuenta en **Präteritum**:
|1871 **wurde** das Deutsche Reich **gegründet**.|En 1871 se fundó el Imperio alemán.
|1989 **fiel** die Mauer.|En 1989 cayó el Muro.
|1990 **wurde** Deutschland **wiedervereinigt**.|En 1990 Alemania fue reunificada.
!«Vergangenheitsbewältigung»: el trabajo colectivo de asumir el pasado. Una palabra que explica mucho de Alemania.` },
`die Geschichte=la historia/el cuento
das Jahrhundert=el siglo
der Krieg=la guerra
der Frieden=la paz=🕊️
die Mauer=el muro=🧱
die Wiedervereinigung=la reunificación
die Teilung=la división
das Reich=el imperio
der Kaiser=el emperador=👑
die Revolution=la revolución
die Erinnerung=la memoria/el recuerdo
das Denkmal=el monumento=🗽
gründen=fundar
fallen=caer
die Diktatur=la dictadura
die Freiheit=la libertad`,
`Die Berliner Mauer fiel 1989.=El Muro de Berlín cayó en 1989.
Deutschland wurde 1990 wiedervereinigt.=Alemania fue reunificada en 1990.
Im 16. Jahrhundert lebte Martin Luther.=En el siglo XVI vivió Martín Lutero.
Nach dem Krieg wurde das Land geteilt.=Después de la guerra, el país fue dividido.
Das Denkmal erinnert an die Opfer.=El monumento recuerda a las víctimas.
Die Menschen wollten Freiheit.=La gente quería libertad.`);

DE('C1', 'Geschäftsdeutsch', 'Alemán de negocios', '🤝', { t: 'Funktionsverbgefüge', k: 'stellen nehmen treffen bringen',
n: `En el mundo laboral se usan frases hechas «verbo + sustantivo»:
|zur Verfügung stellen|poner a disposición
|in Anspruch nehmen|hacer uso de
|eine Entscheidung treffen|tomar una decisión
|zum Ausdruck bringen|expresar
|in Frage kommen|ser una opción
!Correos formales: «Sehr geehrte Damen und Herren» al inicio y «Mit freundlichen Grüßen» al final.` },
`das Meeting=la reunión
die Besprechung=la junta
das Angebot=la oferta/la cotización
die Frist=el plazo
der Kunde=el cliente
die Kundin=la clienta
der Umsatz=las ventas/la facturación
die Rechnung=la factura
verhandeln=negociar
die Vereinbarung=el acuerdo
zur Verfügung stellen=poner a disposición
eine Entscheidung treffen=tomar una decisión
der Ansprechpartner=la persona de contacto
die Abteilung=el departamento
der Geschäftsführer=el director general
die Präsentation=la presentación`,
`Sehr geehrte Damen und Herren,=Estimados señores:
Wir stellen Ihnen die Unterlagen zur Verfügung.=Ponemos los documentos a su disposición.
Die Frist endet am Freitag.=El plazo vence el viernes.
Wir müssen heute eine Entscheidung treffen.=Hoy tenemos que tomar una decisión.
Das kommt für uns nicht in Frage.=Eso no es una opción para nosotros.
Mit freundlichen Grüßen=Atentamente`);

DE('C1', 'Umgangssprache', 'Alemán coloquial y partículas', '😎', { t: 'Partículas: doch, mal, ja, halt', k: 'doch mal ja halt eben',
n: `Pequeñas palabras que dan tono (no se traducen literalmente):
|Komm **mal** her!|¡Ven tantito!
|Das ist **ja** toll!|¡Pero qué padre!
|Mach **doch** mit!|¡Ándale, únete!
|Das ist **halt** so.|Pues así es.
!«Doch» también contesta «sí» a una pregunta negativa: «Kommst du nicht?» — «Doch!» (¡Claro que sí!).` },
`krass=increíble/brutal
geil=chido/padrísimo
cool=chido/padre
Alter=güey/carnal
quatschen=platicar/echar chisme
pennen=dormir/jetearse
die Kohle=la lana/el dinero
der Bock=las ganas
keinen Bock haben=no tener ganas
nerven=molestar/dar lata
chillen=relajarse/echar la flojera
abhauen=largarse/pelarse
die Kneipe=el bar/la cantina=🍻
Na?=¿Qué onda?/¿Qué tal?
Quatsch!=¡Tonterías!
Krass!=¡No manches!`,
`Na, alles klar?=¿Qué onda, todo bien?
Ich habe keinen Bock.=No tengo ganas.
Das ist ja krass!=¡No manches, está brutal!
Komm doch mit!=¡Ándale, vente!
Er nervt total.=Da muchísima lata.
Lass uns heute chillen.=Hoy echemos la flojera.`);

/* ============================ C2 ============================ */
DE('C2', 'Redewendungen II', 'Expresiones avanzadas', '🧩', { t: 'Lenguaje figurado culto', k: 'Strich Rechnung Leine',
n: `Expresiones que vas a leer en prensa y literatura:
|jemandem einen Strich durch die Rechnung machen|arruinarle los planes a alguien
|unter einer Decke stecken|estar confabulados
|etwas auf die lange Bank schieben|dejar algo para después
|Öl ins Feuer gießen|echarle leña al fuego
!Una expresión mal usada suena peor que no usarla. Úsalas cuando ya las hayas leído varias veces.` },
`einen Strich durch die Rechnung machen=arruinar los planes
unter einer Decke stecken=estar confabulados/estar coludidos
auf die lange Bank schieben=dejar para después/posponer
Öl ins Feuer gießen=echarle leña al fuego
den Teufel an die Wand malen=ponerse en lo peor
aus allen Wolken fallen=quedarse de a seis/quedarse helado
sich kein Blatt vor den Mund nehmen=no tener pelos en la lengua
die Flinte ins Korn werfen=tirar la toalla
mit allen Wassern gewaschen sein=ser un zorro/sabérselas de todas todas
jemandem reinen Wein einschenken=decirle la verdad a alguien
etwas aus dem Ärmel schütteln=sacarse algo de la manga
auf großem Fuß leben=darse la gran vida
zwei Fliegen mit einer Klappe schlagen=matar dos pájaros de un tiro
das Kind mit dem Bade ausschütten=pasarse de la raya al corregir algo
jemandem einen Bären aufbinden=tomarle el pelo a alguien
Lunte riechen=olerse algo`,
`Der Regen hat uns einen Strich durch die Rechnung gemacht.=La lluvia nos arruinó los planes.
Mal nicht den Teufel an die Wand!=¡No te pongas en lo peor!
Sie nimmt sich kein Blatt vor den Mund.=Ella no tiene pelos en la lengua.
Wirf nicht die Flinte ins Korn!=¡No tires la toalla!
So schlagen wir zwei Fliegen mit einer Klappe.=Así matamos dos pájaros de un tiro.
Ich muss dir reinen Wein einschenken.=Tengo que decirte la verdad.`);

DE('C2', 'Nuancen', 'Vocabulario abstracto y prefijos', '🔍', { t: 'Prefijos que cambian el sentido', k: 'ver zer ent be',
n: `Los prefijos transforman verbos:
|stehen → verstehen|estar de pie → entender
|brechen → zerbrechen|romper → hacer añicos
|decken → entdecken|cubrir → descubrir
|antworten → beantworten|responder → responder algo (con objeto)
|sprechen → versprechen|hablar → prometer
!**ver-** a veces indica error: «sich verlaufen» (perderse), «sich verschreiben» (equivocarse al escribir).` },
`verstehen=entender/comprender
zerbrechen=romperse en pedazos
entdecken=descubrir
versprechen=prometer
verschwinden=desaparecer
beurteilen=juzgar/evaluar
sich verlaufen=perderse
die Gelassenheit=la serenidad
das Fernweh=las ganas de viajar lejos
die Geborgenheit=la sensación de seguridad y cobijo
die Schadenfreude=la alegría por el mal ajeno
der Zeitgeist=el espíritu de la época
das Feingefühl=la delicadeza/el tacto
die Ambivalenz=la ambivalencia
vielschichtig=complejo/con muchas capas
unterschwellig=subliminal/latente`,
`Ich habe mich in der Altstadt verlaufen.=Me perdí en el centro histórico.
Das Glas ist in tausend Stücke zerbrochen.=El vaso se rompió en mil pedazos.
Sie hat mir versprochen zu kommen.=Me prometió venir.
Das Thema ist vielschichtig.=El tema tiene muchas capas.
Schadenfreude ist ein sehr deutsches Wort.=«Schadenfreude» es una palabra muy alemana.
Bei meiner Oma fühle ich Geborgenheit.=Con mi abuela me siento protegido.`);

DE('C2', 'Presse', 'Lenguaje periodístico y Futur II', '🗞️', { t: 'Futur II y suposiciones', k: 'wird werden haben sein',
n: `**werden + participio + haben/sein** = futuro perfecto o suposición sobre el pasado:
|Bis Montag **werde** ich es **gemacht haben**.|Para el lunes lo habré hecho.
|Er **wird** den Zug **verpasst haben**.|Seguro perdió el tren (suposición).
La prensa usa mucho el Konjunktiv I y el Nominalstil: «Laut Regierung **sei** die Lage stabil».
!«laut» + dativo/genitivo = según: «laut Polizei» (según la policía).` },
`die Schlagzeile=el titular
der Leitartikel=el editorial
die Quelle=la fuente
laut=según
berichten=informar/reportar
die Pressekonferenz=la conferencia de prensa
der Korrespondent=el corresponsal
die Auflage=el tiraje
die Pressefreiheit=la libertad de prensa
die Falschmeldung=la noticia falsa
recherchieren=investigar (periodismo)
die Stellungnahme=la declaración/la postura
das Interview=la entrevista=🎙️
die Umfrage=la encuesta
veröffentlicht=publicado
die Zensur=la censura`,
`Laut Polizei gab es keine Verletzten.=Según la policía, no hubo heridos.
Bis Freitag werden wir alles recherchiert haben.=Para el viernes habremos investigado todo.
Er wird den Zug verpasst haben.=Seguro perdió el tren.
Der Minister sagte, die Lage sei stabil.=El ministro dijo que la situación era estable.
Die Schlagzeile war irreführend.=El titular era engañoso.
Pressefreiheit ist die Basis der Demokratie.=La libertad de prensa es la base de la democracia.`);

DE('C2', 'Zukunft', 'Ciencia, futuro y alternativas a la pasiva', '🚀', { t: 'Passiversatz: sich lassen, -bar, sein zu', k: 'lässt lassen bar ist zu',
n: `Formas elegantes de evitar «werden»:
|Das Problem **lässt sich** lösen.|El problema se puede resolver.
|Das Problem ist **lösbar**.|El problema es resoluble.
|Das Problem **ist** zu **lösen**.|El problema debe / puede resolverse.
|Man kann das Problem lösen.|Se puede resolver el problema.
!El sufijo **-bar** es como «-ble»: machbar (factible), essbar (comestible), unvorstellbar (inimaginable).` },
`die Zukunft=el futuro=🚀
die künstliche Intelligenz=la inteligencia artificial=🤖
der Roboter=el robot=🤖
die Raumfahrt=la exploración espacial
das Weltall=el espacio exterior=🌌
die Gentechnik=la ingeniería genética=🧬
die Erfindung=el invento
der Fortschritt=el progreso
machbar=factible
unvorstellbar=inimaginable
die Nachhaltigkeit=la sustentabilidad
die Digitalisierung=la digitalización
der Datenschutz=la protección de datos=🔒
die Herausforderung=el reto/el desafío
voraussagen=predecir
die Quantenphysik=la física cuántica`,
`Das Problem lässt sich lösen.=El problema se puede resolver.
Das ist technisch machbar.=Eso es técnicamente factible.
Die Folgen sind kaum vorauszusagen.=Las consecuencias son difíciles de predecir.
Künstliche Intelligenz verändert alles.=La inteligencia artificial lo cambia todo.
Datenschutz ist eine große Herausforderung.=La protección de datos es un gran reto.
Vor fünfzig Jahren war das unvorstellbar.=Hace cincuenta años eso era inimaginable.`);

DE('C2', 'Rhetorik', 'Retórica y modales subjetivos', '🎤', { t: 'soll, will, dürfte, muss: lo que se dice y se supone', k: 'soll will dürfte muss',
n: `Los modales también expresan **rumor o suposición**:
|Er **soll** reich sein.|Dicen que es rico.
|Er **will** alles gewusst haben.|Afirma haberlo sabido todo (y no le creo).
|Das **dürfte** stimmen.|Eso probablemente es cierto.
|Er **muss** krank sein.|Debe de estar enfermo.
!Este matiz es clave en política y prensa: «soll» reporta sin responsabilizarse.` },
`die Rhetorik=la retórica
der Redner=el orador=🎤
überzeugend=convincente
das Publikum=el público
die Anspielung=la alusión
die Ironie=la ironía
der Vergleich=la comparación
die Metapher=la metáfora
betonen=recalcar/enfatizar
hervorheben=destacar
die Pointe=el remate (de un chiste)
schlagfertig=ingenioso/rápido para contestar
der Zwischenruf=la interrupción (en un discurso)
die Floskel=la frase hecha/el cliché
eindringlich=enfático/insistente
wortgewandt=elocuente`,
`Er soll sehr reich sein.=Dicen que es muy rico.
Sie will nichts davon gewusst haben.=Ella afirma no haber sabido nada.
Das dürfte stimmen.=Eso probablemente es cierto.
Der Redner war sehr überzeugend.=El orador fue muy convincente.
Sie ist unglaublich schlagfertig.=Es increíblemente ingeniosa al contestar.
Vermeide leere Floskeln.=Evita las frases hechas vacías.`);

DE('C2', 'Dialekte', 'Variantes del alemán', '🗺️', { t: 'Bairisch, Schwäbisch, Schwiizerdütsch', k: 'Servus Grüezi Moin',
n: `Además del alemán estándar (Hochdeutsch) hay dialectos muy vivos:
|Bairisch|«I mog di» = Ich mag dich (te quiero)
|Schwäbisch|«-le» como diminutivo: Häusle (casita)
|Berlinerisch|«ick» en vez de «ich»
|Schwiizerdütsch|«Chuchichäschtli» = Küchenschrank (alacena)
|Plattdeutsch|«Moin» = hola, a cualquier hora
!Si entiendes el alemán estándar, en unas semanas te acostumbras a los acentos. Lo escrito casi siempre es Hochdeutsch.` },
`der Dialekt=el dialecto
die Mundart=el habla regional
das Hochdeutsch=el alemán estándar
der Akzent=el acento
Servus=hola/adiós (sur y Austria)
Grüß Gott=buenos días (sur)
Moin=hola (norte)
Grüezi=hola (Suiza)
Bayern=Baviera
Berlinerisch=el habla de Berlín
das Plattdeutsch=el bajo alemán
die Aussprache=la pronunciación
regional=regional
verstehen=entender
der Sprachraum=el área lingüística
die Hochsprache=la lengua estándar`,
`In Bayern sagt man Servus.=En Baviera se dice «Servus».
Ich verstehe den Dialekt kaum.=Casi no entiendo el dialecto.
Im Norden sagt man den ganzen Tag Moin.=En el norte se dice «Moin» todo el día.
Er hat einen starken Akzent.=Tiene un acento muy marcado.
Schweizerdeutsch klingt ganz anders.=El suizo alemán suena muy distinto.
Hochdeutsch versteht man überall.=El alemán estándar se entiende en todas partes.`);

DE('C2', 'Psyche', 'Psicología y palabras compuestas', '🧠', { t: 'Komposita: palabras gigantes', k: 'die der das',
n: `El alemán junta sustantivos sin límite; **el último manda** (género y significado):
|die Hand + der Schuh = **der** Handschuh|el guante («zapato de mano»)
|das Leben + die Freude = **die** Lebensfreude|la alegría de vivir
|die Angst + die Störung = **die** Angststörung|el trastorno de ansiedad
A veces se agrega una **-s-** de unión: Lebensfreude, Arbeitsplatz.
!Para leer una palabra larga, pártela desde el final hacia atrás.` },
`die Psyche=la psique
die Psychologie=la psicología
das Selbstwertgefühl=la autoestima
die Angststörung=el trastorno de ansiedad
die Lebensfreude=la alegría de vivir
die Achtsamkeit=la atención plena/el mindfulness
das Unterbewusstsein=el subconsciente
die Verdrängung=la represión
die Belastbarkeit=la resiliencia
der Leistungsdruck=la presión por rendir
der Weltschmerz=el dolor por el mundo/la melancolía
die Torschlusspanik=el miedo a que se acabe el tiempo
verarbeiten=procesar/asimilar
die Einsicht=la toma de conciencia
das Verhalten=el comportamiento
die Gewohnheit=el hábito`,
`Achtsamkeit hilft gegen Stress.=La atención plena ayuda contra el estrés.
Der Leistungsdruck ist sehr hoch.=La presión por rendir es muy alta.
Sie arbeitet an ihrem Selbstwertgefühl.=Ella trabaja en su autoestima.
Ich muss das erst verarbeiten.=Primero tengo que asimilarlo.
Gewohnheiten zu ändern ist schwer.=Cambiar hábitos es difícil.
Mit vierzig bekam er Torschlusspanik.=A los cuarenta le entró el miedo a que se le acabara el tiempo.`);

DE('C2', 'Meisterschaft', 'Maestría: el gran final', '🏆', { t: 'Todo junto: estilo y precisión', k: 'hätte wäre würde sei',
n: `Llegaste a C2. Ya combinas todo:
|Konjunktiv I|Man sagt, es **sei** möglich.
|Konjunktiv II|Hätte ich das früher gewusst…
|Passiversatz|Das lässt sich machen.
|Nominalstil|Nach Abschluss des Studiums…
|Partikeln|Das ist **halt** so.
!Lee a Goethe, Kafka y Thomas Mann, escucha a Rammstein y Kraftwerk, mira «Dark»: el idioma ya es tuyo. Herzlichen Glückwunsch!` },
`die Meisterschaft=la maestría=🏆
der Glückwunsch=la felicitación=🎉
das Sprachgefühl=el instinto lingüístico
fließend=con fluidez
mühelos=sin esfuerzo
die Ausdauer=la constancia
der Durchbruch=el gran avance
beherrschen=dominar
die Feinheit=el matiz/la sutileza
treffend=preciso/atinado
die Gelassenheit=la serenidad
weltoffen=abierto al mundo=🌍
die Neugier=la curiosidad
der Meilenstein=el hito
gelingen=salir bien/lograrse
Herzlichen Glückwunsch=muchas felicidades`,
`Herzlichen Glückwunsch, du sprichst fließend Deutsch!=¡Muchas felicidades, hablas alemán con fluidez!
Hätte ich gewusst, wie schön es ist, hätte ich früher angefangen.=Si hubiera sabido lo bonito que es, habría empezado antes.
Sprachgefühl entsteht durch Ausdauer.=El instinto para el idioma nace de la constancia.
Man sagt, Deutsch sei schwer, doch es lässt sich lernen.=Dicen que el alemán es difícil, pero se puede aprender.
Nach Abschluss des Kurses beherrschst du die Sprache.=Al terminar el curso dominas el idioma.
Das ist ein echter Meilenstein.=Es un verdadero hito.`);

GS.extra.de.ff = `Gift|regalo|el veneno (regalo = das Geschenk)
Rente|renta|la pensión de jubilación (renta = die Miete)
Mantel|mantel|el abrigo (mantel = die Tischdecke)
Rat|rata|el consejo (rata = die Ratte)
Bad|malo|el baño
Bart|barco|la barba
Konkurs|concurso|la quiebra (concurso = der Wettbewerb)
Tablett|tableta|la charola, la bandeja
Pension|pensión de retiro|la casa de huéspedes, el hostal
Mappe|mapa|la carpeta (mapa = die Karte)
Firma|firma|la empresa (firma = die Unterschrift)
Termin|término|la cita (término = das Ende)
Regal|regalo|el estante, el librero
Tresor|tesoro|la caja fuerte (tesoro = der Schatz)
Brief|breve|la carta
ordinär|ordinario, común|vulgar, corriente
eventuell|eventual|posiblemente, quizá
Kost|costo|la comida, la dieta (costo = die Kosten)
Mist|misterio|la porquería; «Mist!» = ¡Rayos!
Kurs|curso escolar|también el tipo de cambio de una moneda`;
GS.extra.de.cult = `¿Qué se dice al brindar en Alemania?|Prost, mirando a los ojos|Salud, sin mirar|Nada, solo se bebe
¿Qué es la «Mittagsruhe»?|Horas de silencio después de comer en zonas residenciales|Un postre|Una siesta obligatoria en el trabajo
¿Qué día cierran casi todas las tiendas en Alemania?|El domingo|El lunes|El sábado
¿Qué es el «Pfand»?|Un depósito por botellas que te devuelven al regresarlas|Un tipo de pan|Una multa de tránsito
¿Qué es el «Oktoberfest»?|La fiesta de la cerveza de Múnich que empieza en septiembre|Un festival de cine|El día de la reunificación
¿Cuál es la capital de Alemania?|Berlín|Múnich|Fráncfort
¿Qué significa llegar «pünktlich»?|A la hora exacta, o unos minutos antes|Con 15 minutos de retraso|Cuando quieras
¿Qué es la «Kaffee und Kuchen»?|La merienda de café y pastel por la tarde|El desayuno|Un café para llevar
¿En qué países es oficial el alemán?|Alemania, Austria, Suiza, Liechtenstein y Luxemburgo|Solo Alemania|Alemania y Países Bajos
¿Cómo se saluda en una reunión de trabajo?|Con un apretón de manos firme|Con un beso|Con una reverencia
¿Qué es el «Feierabend»?|El momento en que termina la jornada de trabajo|Un día festivo|Una fiesta de cumpleaños
¿Qué se celebra el 3 de octubre en Alemania?|El Día de la Unidad Alemana|La Navidad|El Día del Trabajo`;
GS.extra.de.phon = `ch (ich)|Sonido suave: como una «j» muy ligera con la lengua cerca de los dientes, casi «sh».|ich · nicht · Milch
ch (ach)|Después de a, o, u suena como la «j» mexicana, desde la garganta.|ach · Buch · noch
ü|Di «i» con los labios en forma de «u».|über · Tür · müde
ö|Di «e» con los labios en forma de «o».|schön · hören · Österreich
ä|Como la «e» abierta del español.|Käse · Mädchen · spät
ei|Siempre suena «ai».|mein · drei · Wein
ie|Siempre suena «i» larga.|Liebe · Bier · vier
eu / äu|Suena «oi».|heute · Deutschland · Häuser
w|Suena como la «v» del inglés, con los dientes en el labio.|Wasser · wie · Wien
z|Suena «ts».|Zeit · zehn · Pizza
sch|Suena «sh», como cuando pides silencio.|Schule · schön · Fisch
-er final|En «Vater» o «Lehrer», la -er final suena casi como una «a» suave.|Vater · Lehrer · aber`;
