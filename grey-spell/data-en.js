/* Grey~Spell — Inglés (Estados Unidos) para hispanohablantes de México. 48 unidades A1–C2.
   Palabras: inglés=español/alternativa=emoji · Frases: inglés=español
   Las contracciones (I'm, don't) se aceptan también escritas completas (I am, do not). */
window.GS = window.GS || { units: [] };
GS.extra = GS.extra || {};
GS.P = GS.P || function (c, lv, t, es, ic, g, w, s) { (GS.extra[c] = GS.extra[c] || { units: [] }).units.push({ lv, t, es, ic, g, w, s }); };
GS.extra.en = GS.extra.en || { units: [] };
const EN = (...a) => GS.P('en', ...a);

/* ============================ A1 ============================ */
EN('A1', 'Hello!', 'Saludos, pronombres y to be', '👋', { t: 'El verbo to be (ser / estar)', k: 'am is are',
n: `En inglés **siempre** se dice el sujeto: «I am», nunca solo «am».
|I am · I'm|yo soy / estoy
|you are · you're|tú eres / usted es
|he / she / it is|él / ella / eso es
|we are · we're|nosotros somos
|they are · they're|ellos son
**you** sirve para tú, usted y ustedes. Fácil.
!«It» es para cosas y animales: «It is a dog». No existe en español, pero el inglés lo exige: «It is cold» (hace frío).` },
`hello=hola=👋
hi=hola/qué onda
good morning=buenos días=🌅
good afternoon=buenas tardes
good night=buenas noches=🌙
goodbye=adiós/hasta luego
thank you=gracias=🙏
please=por favor
you're welcome=de nada
yes=sí=👍
no=no=👎
sorry=perdón/lo siento
I=yo
you=tú/usted/ustedes
my name is=me llamo/mi nombre es
nice to meet you=mucho gusto/encantado=🤝
Mexico=México=🇲🇽`,
`Hello, my name is Ana.=Hola, me llamo Ana.
I'm from Mexico.=Soy de México.
How are you?=¿Cómo estás?
I'm fine, thank you.=Estoy bien, gracias.
We are friends.=Somos amigos.
Are you a teacher?=¿Eres maestro?
Nice to meet you, Mr. Smith.=Mucho gusto, señor Smith.
She is very nice.=Ella es muy amable.`);

EN('A1', 'Family', 'Familia, a/an/the y have', '👨‍👩‍👧', { t: 'Artículos y el verbo have', k: 'have has a an the',
n: `En inglés los sustantivos **no tienen género**: «the» sirve para el, la, los, las.
|a|un, una (antes de consonante): a dog
|an|un, una (antes de sonido vocal): an apple
|the|el, la, los, las
El verbo **have** (tener):
|I / you / we / they have|tengo, tienes, tenemos, tienen
|he / she / it has|tiene
!La edad no se «tiene»: se «es». «I am 20 years old» (tengo 20 años). Nunca «I have 20 years».` },
`father=padre/papá=👨
mother=madre/mamá=👩
dad=papá
mom=mamá
son=hijo
daughter=hija
brother=hermano
sister=hermana
grandfather=abuelo=👴
grandmother=abuela=👵
uncle=tío
aunt=tía
baby=bebé=👶
dog=perro=🐶
cat=gato=🐱
parents=padres/los papás`,
`This is my father.=Este es mi papá.
I have a brother and a sister.=Tengo un hermano y una hermana.
Do you have a dog?=¿Tienes perro?
My mother's name is Rosa.=Mi mamá se llama Rosa.
She has a cat.=Ella tiene un gato.
My son is ten years old.=Mi hijo tiene diez años.`);

EN('A1', 'Food', 'Comida y presente simple', '🍔', { t: 'Presente simple', k: 'eat eats drink drinks like likes',
n: `El presente es muy simple: el verbo **casi no cambia**.
|I eat|yo como
|you eat|tú comes
|he / she eats|él / ella come (¡con -s!)
|we eat|nosotros comemos
|they eat|ellos comen
!La **-s** de he / she / it es el error más común de los hispanohablantes: «She likes tacos», no «She like».` },
`bread=pan=🍞
water=agua=💧
coffee=café=☕
milk=leche=🥛
juice=jugo=🧃
apple=manzana=🍎
egg=huevo=🥚
cheese=queso=🧀
chicken=pollo=🍗
rice=arroz=🍚
beans=frijoles=🫘
hamburger=hamburguesa=🍔
eat=comer
drink=beber/tomar
cook=cocinar
delicious=delicioso/rico=😋`,
`I drink coffee every day.=Tomo café todos los días.
She likes chicken.=A ella le gusta el pollo.
We eat rice and beans.=Comemos arroz con frijoles.
The bread is delicious.=El pan está delicioso.
My dad cooks on Sundays.=Mi papá cocina los domingos.
They drink juice.=Ellos toman jugo.`);

EN('A1', 'Numbers and Time', 'Números, días y hora', '🕐', { t: 'Números, días y la hora', k: "one two three o'clock half",
n: `Los números del 13 al 19 terminan en **-teen**; las decenas en **-ty**:
|thirteen · thirty|13 · 30
|fourteen · forty|14 · 40
|fifteen · fifty|15 · 50
La hora: «It's three o'clock» (son las tres). «It's half past three» (son las tres y media).
!Los días y meses van **con mayúscula**: Monday, January.
!«Thirteen» y «thirty» suenan parecido: en -teen el acento va al final (thir-TEEN).` },
`one=uno=1️⃣
two=dos=2️⃣
three=tres=3️⃣
four=cuatro=4️⃣
five=cinco=5️⃣
ten=diez=🔟
twenty=veinte
hundred=cien/ciento=💯
Monday=lunes
Tuesday=martes
Wednesday=miércoles
Friday=viernes
weekend=fin de semana
clock=reloj=🕐
today=hoy
tomorrow=mañana`,
`It's three o'clock.=Son las tres.
Today is Monday.=Hoy es lunes.
I am twenty years old.=Tengo veinte años.
What time is it?=¿Qué hora es?
It's half past four.=Son las cuatro y media.
See you tomorrow!=¡Nos vemos mañana!`);

EN('A1', 'At Home', 'La casa y there is / there are', '🏠', { t: 'There is / There are', k: 'there is are',
n: `«Hay» se dice de dos formas:
|There is a table.|Hay una mesa. (singular)
|There are two chairs.|Hay dos sillas. (plural)
|Is there a garden?|¿Hay jardín?
|There isn't a TV.|No hay tele.
!En inglés el adjetivo va **antes** del sustantivo: «a big house» (una casa grande).` },
`house=casa=🏠
apartment=departamento=🏢
room=cuarto/habitación
kitchen=cocina=🍳
bathroom=baño=🛁
bedroom=recámara/dormitorio=🛏️
table=mesa
chair=silla=🪑
bed=cama=🛏️
window=ventana=🪟
door=puerta=🚪
garden=jardín=🌳
lamp=lámpara=💡
sofa=sillón/sofá=🛋️
big=grande
small=pequeño/chico`,
`There is a big garden.=Hay un jardín grande.
There are three bedrooms.=Hay tres recámaras.
Is there a bathroom here?=¿Hay un baño aquí?
The kitchen is very small.=La cocina es muy pequeña.
I live in an apartment.=Vivo en un departamento.
The lamp is on the table.=La lámpara está en la mesa.`);

EN('A1', 'Clothes and Colors', 'Ropa, colores y adjetivos', '👕', { t: 'El adjetivo va antes', k: 'red blue black white',
n: `El adjetivo va **antes** del sustantivo y **nunca** cambia:
|a red shirt|una camisa roja
|red shirts|camisas rojas (¡sin -s en red!)
|a beautiful dress|un vestido bonito
Plural regular: **-s** (shoes). Algunos irregulares: man → men, woman → women, child → children.
!«Pants» y «jeans» siempre son plurales: «My jeans **are** blue».` },
`shirt=camisa=👔
T-shirt=playera=👕
pants=pantalón=👖
dress=vestido=👗
shoes=zapatos=👞
jacket=chamarra=🧥
hat=sombrero/gorra=🎩
socks=calcetines=🧦
red=rojo=🔴
blue=azul=🔵
green=verde=🟢
yellow=amarillo=🟡
black=negro=⚫
white=blanco=⚪
beautiful=bonito/hermoso
expensive=caro=💸`,
`The shirt is blue.=La camisa es azul.
I'm wearing black pants.=Traigo puesto un pantalón negro.
These shoes are very expensive.=Estos zapatos son muy caros.
She has a beautiful dress.=Ella tiene un vestido bonito.
My jacket is green.=Mi chamarra es verde.
What color is your hat?=¿De qué color es tu gorra?`);

EN('A1', 'In the City', 'La ciudad, preguntas y preposiciones', '🏙️', { t: 'Preguntas con Wh-', k: 'where what who how when',
n: `Las preguntas empiezan con **Wh-** (y How):
|where?|¿dónde?
|what?|¿qué?
|who?|¿quién?
|how?|¿cómo?
|when?|¿cuándo?
|why?|¿por qué?
Preposiciones de lugar: **in** (dentro), **on** (sobre / en una calle), **next to** (junto a), **between** (entre).
!«Where» (dónde) y «were» (eran) se escriben parecido pero suenan diferente: «uer» vs «uer» corto. Fíjate en la h.` },
`city=ciudad=🏙️
street=calle
bus=camión/autobús=🚌
subway=metro=🚇
car=carro/coche=🚗
bike=bicicleta=🚲
bank=banco=🏦
pharmacy=farmacia=💊
museum=museo=🏛️
park=parque=🌳
hospital=hospital=🏥
left=izquierda=⬅️
right=derecha=➡️
straight ahead=derecho/todo recto=⬆️
near=cerca
far=lejos`,
`Where is the bank?=¿Dónde está el banco?
I take the bus to work.=Tomo el camión al trabajo.
Go straight ahead and turn left.=Siga derecho y dé vuelta a la izquierda.
The pharmacy is next to the park.=La farmacia está junto al parque.
How do I get to the museum?=¿Cómo llego al museo?
Is it far from here?=¿Está lejos de aquí?`);

EN('A1', 'Daily Routine', 'Rutina y adverbios de frecuencia', '⏰', { t: 'Adverbios de frecuencia', k: 'always usually often sometimes never',
n: `El adverbio va **antes del verbo** (pero después de «to be»):
|I **always** get up early.|Siempre me levanto temprano.
|She **never** drinks coffee.|Ella nunca toma café.
|He **is often** late.|Él llega tarde seguido.
|always > usually > often > sometimes > never|siempre > normalmente > seguido > a veces > nunca
!Muchos verbos de rutina usan «get»: get up (levantarse), get dressed (vestirse), get home (llegar a casa).` },
`get up=levantarse=⏰
have breakfast=desayunar=🥞
take a shower=bañarse/ducharse=🚿
brush my teeth=lavarme los dientes=🪥
work=trabajar=💼
go to bed=irse a dormir=🛏️
sleep=dormir=😴
morning=mañana
evening=tarde/noche
early=temprano
late=tarde
always=siempre
usually=normalmente/por lo general
often=seguido/a menudo
sometimes=a veces
never=nunca`,
`I always get up at seven.=Siempre me levanto a las siete.
She usually has breakfast at home.=Normalmente desayuna en casa.
We never work on Sundays.=Nunca trabajamos los domingos.
He takes a shower every morning.=Se baña todas las mañanas.
I sometimes go to bed late.=A veces me duermo tarde.
My brother is often late.=Mi hermano llega tarde seguido.`);

/* ============================ A2 ============================ */
EN('A2', 'Free Time', 'Pasatiempos y negación', '⚽', { t: "don't / doesn't + like + -ing", k: "don't doesn't do does",
n: `Para negar y preguntar en presente se usa **do / does**:
|I **don't** play tennis.|No juego tenis.
|She **doesn't** like jazz.|A ella no le gusta el jazz.
|**Do** you play guitar?|¿Tocas la guitarra?
|**Does** he swim?|¿Él nada?
Después de like, love, hate: verbo con **-ing**: «I like swimming».
!Con «doesn't» el verbo pierde la -s: «She doesn't like», nunca «doesn't likes».` },
`hobby=pasatiempo=🎯
soccer=futbol=⚽
swimming=natación=🏊
dancing=baile=💃
reading=lectura=📖
singing=canto=🎤
painting=pintura=🎨
play=jugar/tocar
guitar=guitarra=🎸
movie theater=cine=🎬
concert=concierto=🎵
hiking=senderismo=🥾
game=juego/partido
video game=videojuego=🎮
friend=amigo/amiga
free time=tiempo libre`,
`I like playing soccer.=Me gusta jugar futbol.
She doesn't like dancing.=A ella no le gusta bailar.
Do you play the guitar?=¿Tocas la guitarra?
We don't have free time.=No tenemos tiempo libre.
Does he like video games?=¿Le gustan los videojuegos?
I love reading at night.=Me encanta leer en la noche.`);

EN('A2', 'Weather', 'Clima y presente continuo', '🌦️', { t: 'Presente continuo: am / is / are + -ing', k: 'raining snowing is are',
n: `Para lo que pasa **ahora mismo**: be + verbo-ing.
|It **is raining**.|Está lloviendo.
|I **am wearing** a jacket.|Traigo puesta una chamarra.
|They **are playing** outside.|Están jugando afuera.
!Para el clima, el sujeto es **it**: «It's hot» (hace calor), «It's windy» (hace viento). «It» nunca se omite.` },
`weather=clima/tiempo
sun=sol=☀️
rain=lluvia=🌧️
snow=nieve=❄️
wind=viento=💨
cloud=nube=☁️
cold=frío=🥶
hot=caluroso/hace calor=🥵
warm=templado/cálido
spring=primavera=🌷
summer=verano=🏖️
fall=otoño=🍂
winter=invierno=⛄
umbrella=paraguas=☂️
storm=tormenta=⛈️
sunny=soleado`,
`It's raining today.=Hoy está lloviendo.
It's very cold in winter.=En invierno hace mucho frío.
The sun is shining.=Está saliendo el sol.
It's hot in summer.=En verano hace calor.
Take an umbrella!=¡Llévate un paraguas!
What's the weather like in Mexico?=¿Cómo está el clima en México?`);

EN('A2', 'Shopping', 'Compras, this/that y how much', '🛒', { t: 'this, that, these, those', k: 'this that these those much many',
n: `Demostrativos según distancia y número:
|this · these|este, esta · estos, estas (cerca)
|that · those|ese, aquel · esos, aquellos (lejos)
|How much is it?|¿Cuánto cuesta?
|How many…?|¿Cuántos…? (contables)
|How much…?|¿Cuánto…? (no contables: money, water)
!«I would like» (I'd like) es la forma amable de pedir: «I'd like this one, please».` },
`buy=comprar
sell=vender
cost=costar
price=precio=🏷️
money=dinero=💵
dollar=dólar=💵
cash=efectivo
card=tarjeta=💳
store=tienda=🏪
supermarket=supermercado=🛒
bag=bolsa=👜
cheap=barato
sale=oferta/rebaja
size=talla
receipt=recibo/ticket=🧾
expensive=caro`,
`How much is this?=¿Cuánto cuesta esto?
I'd like these shoes, please.=Quisiera estos zapatos, por favor.
Can I pay with card?=¿Puedo pagar con tarjeta?
That shirt is too big.=Esa camisa me queda grande.
Those jeans are on sale.=Esos jeans están en oferta.
How many bags do you need?=¿Cuántas bolsas necesita?`);

EN('A2', 'Travel', 'Viajes y pasado regular', '✈️', { t: 'Pasado simple regular: -ed', k: 'visited traveled stayed did',
n: `El pasado regular agrega **-ed**, igual para todas las personas:
|I visited|visité
|she traveled|ella viajó
|we stayed|nos quedamos
Para negar y preguntar se usa **did** y el verbo vuelve al infinitivo:
|I **didn't** visit Rome.|No visité Roma.
|**Did** you travel?|¿Viajaste?
!La -ed suena de tres formas: «t» (worked), «d» (played) e «id» (visited, wanted).` },
`trip=viaje=🧳
travel=viajar
airport=aeropuerto=🛫
plane=avión=✈️
train=tren=🚆
ticket=boleto=🎫
suitcase=maleta=🧳
passport=pasaporte=🛂
hotel=hotel=🏨
beach=playa=🏖️
sea=mar=🌊
mountain=montaña=⛰️
map=mapa=🗺️
photo=foto=📷
vacation=vacaciones
book=reservar/libro`,
`I visited New York last year.=Visité Nueva York el año pasado.
We stayed in a small hotel.=Nos quedamos en un hotel pequeño.
Did you travel by plane?=¿Viajaste en avión?
She didn't like the food.=No le gustó la comida.
I booked the tickets online.=Reservé los boletos en línea.
Where is my passport?=¿Dónde está mi pasaporte?`);

EN('A2', 'Health', 'Salud y pasado irregular', '🩺', { t: 'Pasados irregulares', k: 'went had felt took was were',
n: `Los verbos más usados son irregulares; apréndelos de memoria:
|go → went|fui
|have → had|tuve
|feel → felt|me sentí
|take → took|tomé
|be → was / were|fui, estuve / fuimos, estuvimos
!Para el dolor: «I have a headache» (me duele la cabeza), «My back hurts» (me duele la espalda).` },
`doctor=doctor/médico=🩺
sick=enfermo=🤒
healthy=sano
head=cabeza
stomach=estómago/panza
back=espalda
fever=fiebre=🌡️
cold=resfriado/gripa=🤧
pill=pastilla=💊
hospital=hospital=🏥
hurt=doler
tooth=diente=🦷
eye=ojo=👁️
hand=mano=✋
tired=cansado=😴
headache=dolor de cabeza`,
`I'm sick.=Estoy enfermo.
I have a headache.=Me duele la cabeza.
I went to the doctor yesterday.=Ayer fui al doctor.
She felt tired all day.=Se sintió cansada todo el día.
Did you take your pills?=¿Te tomaste tus pastillas?
My back hurts.=Me duele la espalda.`);

EN('A2', 'Work', 'Profesiones y going to', '💼', { t: 'Futuro con going to', k: 'going am is are',
n: `**be + going to + verbo** = planes e intenciones:
|I'm going to work tomorrow.|Voy a trabajar mañana.
|She's going to be a doctor.|Ella va a ser doctora.
|Are you going to call him?|¿Le vas a llamar?
Las profesiones llevan **a / an**: «She is **a** teacher», «He is **an** engineer».
!En español decimos «soy maestra». En inglés el artículo es obligatorio: «I'm a teacher».` },
`work=trabajo/trabajar=💼
job=empleo/trabajo
teacher=maestro/maestra=👩‍🏫
cook=cocinero=👨‍🍳
engineer=ingeniero
nurse=enfermera/enfermero
boss=jefe
office=oficina=🏢
company=empresa
coworker=compañero de trabajo
earn=ganar (dinero)
salary=sueldo/salario
on time=puntual/a tiempo=⏱️
break=descanso
meeting=junta/reunión
appointment=cita`,
`I'm an engineer.=Soy ingeniero.
She's going to be a nurse.=Ella va a ser enfermera.
I'm going to look for a new job.=Voy a buscar un trabajo nuevo.
My boss is very nice.=Mi jefe es muy buena onda.
We have a meeting at ten.=Tenemos una junta a las diez.
Are you going to work tomorrow?=¿Vas a trabajar mañana?`);

EN('A2', 'School', 'Escuela y can / have to', '🏫', { t: 'can, must, have to', k: 'can must have has',
n: `Modales: el siguiente verbo va **sin «to»** y nunca lleva -s.
|can|poder / saber: I **can** swim.
|can't|no poder: You **can't** smoke here.
|have to · has to|tener que: She **has to** study.
|must|deber (fuerte, escrito): You **must** wear a uniform.
|don't have to|no tener que (no es necesario)
!«You mustn't» = está prohibido. «You don't have to» = no es necesario. ¡Son muy diferentes!` },
`school=escuela=🏫
university=universidad=🎓
student=alumno/estudiante
classroom=salón de clases
notebook=cuaderno=📓
book=libro=📚
pencil=lápiz=✏️
pen=pluma=🖊️
exam=examen=📝
homework=tarea
grade=calificación/grado
learn=aprender
study=estudiar
teach=enseñar
ask=preguntar=❓
answer=respuesta/responder`,
`I can speak English.=Sé hablar inglés.
You have to do your homework.=Tienes que hacer tu tarea.
She has to study for the exam.=Ella tiene que estudiar para el examen.
You can't use your phone in class.=No puedes usar el celular en clase.
We don't have to wear a uniform.=No tenemos que usar uniforme.
Can I ask a question?=¿Puedo hacer una pregunta?`);

EN('A2', 'At the Restaurant', 'Restaurante y pronombres', '🍽️', { t: 'me, you, him, her, us, them', k: 'me him her us them',
n: `Después del verbo o de una preposición, el pronombre cambia:
|I → me|Can you help **me**?
|he → him|I called **him**.
|she → her|I love **her**.
|we → us|Come with **us**.
|they → them|I know **them**.
«Could I have…?» o «I'd like…» para pedir. Nunca «I want» con el mesero: suena brusco.
!En Estados Unidos la propina (tip) es de 15 a 20 % y no viene incluida.` },
`restaurant=restaurante=🍽️
menu=menú/carta=📋
waiter=mesero
order=pedir/ordenar
check=cuenta=🧾
tip=propina
soup=sopa=🍲
meat=carne=🥩
fish=pescado=🐟
vegetables=verduras=🥦
salad=ensalada=🥗
dessert=postre=🍰
glass=vaso/copa=🥛
fork=tenedor=🍴
knife=cuchillo=🔪
full=lleno/satisfecho`,
`Can I have the check, please?=¿Me trae la cuenta, por favor?
I'd like the fish, please.=Quisiera el pescado, por favor.
Could you bring us some water?=¿Nos podría traer agua?
The waiter gave her the menu.=El mesero le dio el menú.
I'm full, thank you.=Estoy lleno, gracias.
Don't forget the tip.=No olvides la propina.`);

/* ============================ B1 ============================ */
EN('B1', 'Childhood', 'Recuerdos y used to', '🧸', { t: 'used to: lo que solías hacer', k: 'used to did',
n: `**used to + verbo** = hábitos o estados del pasado que ya no ocurren:
|I **used to** play outside.|Antes jugaba afuera. / Solía jugar afuera.
|She **used to** have long hair.|Ella tenía el pelo largo.
|**Did** you **use to** live here?|¿Vivías aquí antes?
|I **didn't use to** like vegetables.|Antes no me gustaban las verduras.
!Es el equivalente práctico del **copretérito** mexicano (jugaba, vivía) para hábitos.` },
`childhood=infancia
toy=juguete=🧸
teddy bear=osito de peluche=🧸
doll=muñeca=🪆
playground=parque de juegos=🛝
neighbor=vecino
memory=recuerdo
remember=acordarse/recordar
grow up=crecer
back then=en ese entonces
climb=trepar
fight=pelear
secret=secreto=🤫
balloon=globo=🎈
candle=vela=🕯️
kid=niño/chamaco`,
`When I was a kid, I used to live on a farm.=Cuando era niño, vivía en una granja.
I used to have a teddy bear.=Tenía un osito de peluche.
We used to play in the street.=Jugábamos en la calle.
Did you use to climb trees?=¿Te subías a los árboles?
I grew up in Guadalajara.=Crecí en Guadalajara.
Back then we were very happy.=En ese entonces éramos muy felices.`);

EN('B1', 'Nature', 'Naturaleza, comparativos y superlativos', '🌲', { t: 'Comparativos y superlativos', k: 'bigger biggest more most than',
n: `Palabras cortas: **-er / -est**. Palabras largas: **more / most**.
|big → bigger → the biggest|grande → más grande → el más grande
|tall → taller → the tallest|alto
|beautiful → more beautiful → the most beautiful|bonito
|good → better → the best|bueno → mejor → el mejor
|bad → worse → the worst|malo → peor → el peor
!«Than» = que (en comparaciones): «The river is longer **than** the lake». No lo confundas con «then» (luego).` },
`nature=naturaleza
forest=bosque=🌲
tree=árbol=🌳
flower=flor=🌸
lake=lago
river=río=🏞️
bird=pájaro=🐦
animal=animal
bear=oso=🐻
fox=zorro=🦊
horse=caballo=🐴
rock=piedra/roca=🪨
sky=cielo
star=estrella=⭐
moon=luna=🌙
desert=desierto=🏜️`,
`The Nile is longer than the Amazon.=El Nilo es más largo que el Amazonas.
This is the most beautiful lake I've seen.=Es el lago más bonito que he visto.
Bears are bigger than foxes.=Los osos son más grandes que los zorros.
It's the best park in the city.=Es el mejor parque de la ciudad.
The stars are brighter in the desert.=Las estrellas brillan más en el desierto.
Today is worse than yesterday.=Hoy está peor que ayer.`);

EN('B1', 'Technology', 'Tecnología: will vs going to', '💻', { t: 'will y going to', k: "will won't going",
n: `**will** = decisiones en el momento, promesas y predicciones.
**going to** = planes ya decididos o evidencias.
|I'll help you!|¡Yo te ayudo! (decisión ahora)
|I'm going to buy a laptop.|Voy a comprar una laptop. (plan)
|It will rain tomorrow.|Mañana va a llover. (predicción)
|won't = will not|no + futuro
!«I'll call you» = te marco (promesa). En inglés se usa muchísimo al hablar.` },
`computer=computadora=💻
cell phone=celular=📱
internet=internet=🌐
app=aplicación/app
password=contraseña=🔑
email=correo electrónico=📧
download=descargar
save=guardar
delete=borrar
screen=pantalla=🖥️
keyboard=teclado=⌨️
battery=batería=🔋
charge=cargar
message=mensaje=💬
send=mandar/enviar
printer=impresora=🖨️`,
`I'm going to buy a new phone.=Voy a comprar un celular nuevo.
My battery is dead.=Se me acabó la batería.
Don't worry, I'll send it today.=No te preocupes, hoy lo mando.
Did you save the file?=¿Guardaste el archivo?
I won't forget my password.=No voy a olvidar mi contraseña.
Technology will change everything.=La tecnología lo cambiará todo.`);

EN('B1', 'Feelings', 'Emociones: -ed vs -ing', '💛', { t: 'bored vs boring', k: 'bored boring excited exciting',
n: `**-ed** describe cómo te sientes; **-ing** describe lo que causa la emoción:
|I'm bored.|Estoy aburrido.
|The movie is boring.|La película es aburrida.
|I'm excited.|Estoy emocionado.
|The game is exciting.|El partido está emocionante.
!«I'm boring» = soy aburrido (como persona). Cuidado con esta trampa.
!«I miss you» = te extraño. «Miss» también es perder (un tren).` },
`feeling=sentimiento
happy=feliz=😊
sad=triste=😢
angry=enojado=😠
nervous=nervioso=😬
afraid=asustado/con miedo=😨
love=amor=❤️
bored=aburrido (persona)
boring=aburrido (cosa)
excited=emocionado
exciting=emocionante
surprised=sorprendido=😮
proud=orgulloso
lonely=solo/solitario
miss=extrañar
hope=esperanza/esperar`,
`I'm so excited about the trip!=¡Estoy muy emocionado por el viaje!
This class is really boring.=Esta clase está bien aburrida.
Don't be angry with me.=No te enojes conmigo.
I miss my family.=Extraño a mi familia.
She's afraid of dogs.=Ella les tiene miedo a los perros.
We're very proud of you.=Estamos muy orgullosos de ti.`);

EN('B1', 'Media', 'Medios y presente perfecto', '📰', { t: 'Present perfect: have / has + participio', k: 'have has seen ever never',
n: `Experiencias **sin fecha** o que siguen hasta ahora:
|I **have seen** that movie.|He visto esa película.
|She **has never been** to Paris.|Nunca ha ido a París.
|**Have** you **ever** read it?|¿Alguna vez lo has leído?
|I **have just** finished.|Acabo de terminar.
!Con fecha concreta usa pasado simple: «I saw it **yesterday**», no «I have seen it yesterday».` },
`newspaper=periódico=📰
magazine=revista
TV=tele/televisión=📺
news=noticias
article=artículo
show=programa
series=serie
movie=película=🎬
radio=radio=📻
podcast=pódcast=🎧
ad=anuncio
report=informar/reportaje
believe=creer
opinion=opinión
true=cierto/verdadero
fake news=noticias falsas`,
`Have you ever seen this series?=¿Alguna vez has visto esta serie?
I've never read that newspaper.=Nunca he leído ese periódico.
She has just published an article.=Ella acaba de publicar un artículo.
We've watched three episodes today.=Hoy hemos visto tres episodios.
I think that news is fake.=Creo que esa noticia es falsa.
I listen to podcasts every day.=Escucho pódcasts todos los días.`);

EN('B1', 'Dreams', 'Sueños y segundo condicional', '🌠', { t: 'If I were…, I would…', k: 'would were could',
n: `Situaciones **imaginarias**: if + pasado, would + verbo.
|**If** I **were** rich, I **would** travel.|Si fuera rico, viajaría.
|**If** I **had** time, I **would** learn piano.|Si tuviera tiempo, aprendería piano.
|What **would** you do?|¿Qué harías?
|I **could** help you.|Podría ayudarte.
!Con «if» se usa «were» para todos: «If I were you…» (yo que tú…).` },
`dream=sueño/soñar=💭
wish=deseo/desear=🌠
goal=meta=🎯
plan=plan
future=futuro
rich=rico=💰
famous=famoso
world=mundo=🌍
island=isla=🏝️
adventure=aventura
maybe=quizás/tal vez
achieve=lograr
win=ganar=🏆
luck=suerte=🍀
lottery=lotería
travel the world=viajar por el mundo`,
`If I were rich, I would travel the world.=Si fuera rico, viajaría por el mundo.
What would you do if you won the lottery?=¿Qué harías si te ganaras la lotería?
If I were you, I would accept.=Yo que tú, aceptaría.
My dream is to be a pilot.=Mi sueño es ser piloto.
We could work together.=Podríamos trabajar juntos.
Good luck!=¡Buena suerte!`);

EN('B1', 'Opinions', 'Opinar y primer condicional', '💬', { t: 'If + presente, will + verbo', k: 'will should think agree',
n: `Situaciones **reales o posibles**:
|If it rains, I'll stay home.|Si llueve, me quedo en casa.
|If you study, you'll pass.|Si estudias, vas a pasar.
Para opinar y aconsejar:
|I think (that)…|Creo que…
|In my opinion…|En mi opinión…
|You should…|Deberías…
|I agree / I disagree.|Estoy de acuerdo / No estoy de acuerdo.
!Nunca «I am agree». Es «I agree», sin «am».` },
`opinion=opinión
think=pensar/creer
agree=estar de acuerdo=🤝
disagree=no estar de acuerdo
right=razón/correcto
wrong=equivocado/incorrecto
should=debería
advice=consejo
argument=argumento/discusión
advantage=ventaja
disadvantage=desventaja
however=sin embargo
besides=además
important=importante
for=a favor de
against=en contra de`,
`In my opinion, it's a great idea.=En mi opinión, es una gran idea.
I agree with you.=Estoy de acuerdo contigo.
You should talk to her.=Deberías hablar con ella.
If it rains, we'll stay home.=Si llueve, nos quedamos en casa.
Are you for or against it?=¿Estás a favor o en contra?
You're right about that.=En eso tienes razón.`);

EN('B1', 'Society', 'Sociedad y oraciones de relativo', '🏘️', { t: 'who, which, that, where', k: 'who which that where',
n: `Pronombres relativos:
|who|para personas: the woman **who** lives here
|which|para cosas: the book **which** I bought
|that|para personas y cosas (informal)
|where|para lugares: the town **where** I was born
|whose|cuyo: the man **whose** car was stolen
!Si el relativo es objeto, se puede omitir: «The book (that) I bought».` },
`society=sociedad
people=gente/personas
citizen=ciudadano
community=comunidad
unemployment=desempleo
poverty=pobreza
equality=igualdad=⚖️
rights=derechos
help=ayudar=🤝
volunteer=voluntario
neighborhood=colonia/vecindario=🏘️
culture=cultura
rule=regla
problem=problema
immigrant=inmigrante
government=gobierno`,
`The man who lives there is a doctor.=El hombre que vive ahí es doctor.
This is the town where I was born.=Este es el pueblo donde nací.
I help people who need it.=Ayudo a la gente que lo necesita.
The book that you lent me is great.=El libro que me prestaste está buenísimo.
She's the woman whose son is a pilot.=Es la señora cuyo hijo es piloto.
Equality is an important right.=La igualdad es un derecho importante.`);

/* ============================ B2 ============================ */
EN('B2', 'Environment', 'Medio ambiente y voz pasiva', '🌍', { t: 'Voz pasiva: be + participio', k: 'is are was were been',
n: `La pasiva pone el foco en la acción:
|They recycle plastic. → Plastic **is recycled**.|Se recicla el plástico.
|The forest **was destroyed**.|El bosque fue destruido.
|More **must be done**.|Hay que hacer más.
|The law **has been approved**.|La ley ha sido aprobada.
!La pasiva en inglés es mucho más común que en español: muchas veces equivale a nuestro «se»: «English is spoken here» (aquí se habla inglés).` },
`environment=medio ambiente=🌍
climate change=cambio climático=🔥
energy=energía=⚡
renewable=renovable
solar panel=panel solar=☀️
recycle=reciclar=♻️
trash=basura=🗑️
plastic=plástico
waste=desperdiciar/desperdicio
save=ahorrar
protect=proteger
drought=sequía
flood=inundación=🌊
deforestation=deforestación
sustainable=sustentable
pollution=contaminación=🏭`,
`Plastic is recycled in many countries.=El plástico se recicla en muchos países.
The forest was destroyed by a fire.=El bosque fue destruido por un incendio.
More energy must be saved.=Hay que ahorrar más energía.
The law has been approved.=La ley ha sido aprobada.
We need to protect the environment.=Tenemos que proteger el medio ambiente.
Spanish is spoken here.=Aquí se habla español.`);

EN('B2', 'Career', 'Mundo laboral y past perfect', '📈', { t: 'Past perfect: had + participio', k: 'had already before',
n: `**had + participio** = algo que pasó **antes** de otro momento del pasado:
|When I arrived, the meeting **had** already **started**.|Cuando llegué, la junta ya había empezado.
|She **had worked** there for ten years before she quit.|Había trabajado ahí diez años antes de renunciar.
|I **hadn't seen** him before.|No lo había visto antes.
!Para el currículum: «résumé» en Estados Unidos, «CV» en Inglaterra.` },
`career=carrera profesional
position=puesto
job application=solicitud de empleo
apply=postularse/aplicar
job interview=entrevista de trabajo
résumé=currículum=📄
quit=renunciar
fire=despedir
promotion=ascenso=📈
contract=contrato=📝
internship=prácticas profesionales
union=sindicato
overtime=horas extra
employer=empleador
employee=empleado
experience=experiencia`,
`I had already applied when they called me.=Ya me había postulado cuando me llamaron.
When I arrived, the interview had started.=Cuando llegué, la entrevista ya había empezado.
She had worked there for years before she quit.=Había trabajado ahí años antes de renunciar.
He got a promotion last month.=Le dieron un ascenso el mes pasado.
I have a job interview tomorrow.=Mañana tengo una entrevista de trabajo.
How much experience do you have?=¿Cuánta experiencia tiene?`);

EN('B2', 'Art', 'Arte y present perfect continuous', '🎨', { t: 'for, since y have been + -ing', k: 'for since been',
n: `Para algo que **empezó en el pasado y sigue**:
|I **have been painting** for two hours.|Llevo dos horas pintando.
|She **has been studying** art **since** 2020.|Estudia arte desde 2020.
|**for** + duración|for ten years (desde hace diez años)
|**since** + punto de inicio|since Monday (desde el lunes)
!«¿Cuánto tiempo llevas…?» = «How long have you been…?»` },
`art=arte=🎨
artist=artista
painting=pintura/cuadro=🖼️
exhibition=exposición
gallery=galería
sculpture=escultura=🗿
theater=teatro=🎭
stage=escenario
orchestra=orquesta=🎻
painter=pintor
draw=dibujar=✏️
impressive=impresionante
modern=moderno
work=obra
masterpiece=obra maestra
museum=museo=🏛️`,
`I've been painting for two hours.=Llevo dos horas pintando.
She has been studying art since 2020.=Estudia arte desde 2020.
How long have you been playing the violin?=¿Cuánto tiempo llevas tocando el violín?
This painting is a masterpiece.=Este cuadro es una obra maestra.
We visited an amazing exhibition.=Visitamos una exposición increíble.
Frida Kahlo is a famous Mexican artist.=Frida Kahlo es una artista mexicana famosa.`);

EN('B2', 'Politics', 'Política y estilo indirecto', '🏛️', { t: 'Reported speech', k: 'said told would had',
n: `Al reportar lo que alguien dijo, el tiempo «retrocede» un paso:
|«I am tired.» → He said he **was** tired.|Dijo que estaba cansado.
|«I will vote.» → She said she **would** vote.|Dijo que votaría.
|«I have won.» → He said he **had** won.|Dijo que había ganado.
**say** no lleva persona; **tell** sí: «He **said** that…» / «He **told me** that…».
!Nunca «He said me». Es «He told me» o «He said to me».` },
`politics=política
government=gobierno
president=presidente
election=elección=🗳️
vote=votar/voto
party=partido
law=ley=📜
Congress=Congreso
democracy=democracia
speech=discurso=🎙️
strike=huelga
tax=impuesto
border=frontera
state=estado
majority=mayoría
campaign=campaña`,
`She said she would vote tomorrow.=Dijo que votaría mañana.
He told me that he was tired.=Me dijo que estaba cansado.
The president said the law had passed.=El presidente dijo que la ley había sido aprobada.
They told us the strike was over.=Nos dijeron que la huelga había terminado.
The campaign starts next month.=La campaña empieza el próximo mes.
Every vote counts.=Cada voto cuenta.`);

EN('B2', 'Science', 'Ciencia: gerundio vs infinitivo', '🔬', { t: '-ing o to + verbo', k: 'to doing avoid decide',
n: `Algunos verbos piden **-ing** y otros **to + verbo**:
|enjoy, avoid, finish, keep, mind|+ -ing: I enjoy **reading**.
|want, decide, hope, need, plan|+ to: I decided **to study**.
|Después de preposición|siempre -ing: good **at** drawing
|stop doing vs stop to do|dejar de hacer vs detenerse para hacer
!«I'm looking forward **to seeing** you»: aquí «to» es preposición, así que va -ing.` },
`science=ciencia=🔬
scientist=científico
research=investigación/investigar
experiment=experimento=🧪
lab=laboratorio
discovery=descubrimiento
discover=descubrir
theory=teoría
prove=demostrar/probar
result=resultado
cell=célula=🦠
brain=cerebro=🧠
planet=planeta=🪐
physics=física
chemistry=química=⚗️
data=datos`,
`She decided to study physics.=Decidió estudiar física.
I enjoy doing experiments.=Disfruto hacer experimentos.
Scientists keep looking for answers.=Los científicos siguen buscando respuestas.
Avoid touching the samples.=Evita tocar las muestras.
The results proved the theory.=Los resultados demostraron la teoría.
I'm looking forward to seeing the data.=Tengo muchas ganas de ver los datos.`);

EN('B2', 'Relationships', 'Relaciones y phrasal verbs', '💞', { t: 'Phrasal verbs', k: 'up out on along',
n: `Verbo + partícula = **significado nuevo**. Apréndelos como palabras completas:
|break up|terminar (una relación)
|get along (with)|llevarse bien
|ask out|invitar a salir
|make up|reconciliarse
|look after|cuidar
|fall for|enamorarse de
!Son la clave del inglés hablado. Un nativo dice «find out» mucho más que «discover».` },
`relationship=relación
marriage=matrimonio=💍
get married=casarse
break up=terminar/cortar
divorce=divorcio
partner=pareja
trust=confianza/confiar
jealous=celoso
fall in love=enamorarse=😍
argue=discutir/pelear
make up=reconciliarse
faithful=fiel
wedding=boda=💒
fiancé=prometido
get along=llevarse bien
ask out=invitar a salir`,
`They broke up last week.=Cortaron la semana pasada.
I get along with my sister.=Me llevo bien con mi hermana.
He asked her out to dinner.=La invitó a cenar.
After the fight, they made up.=Después de la pelea se reconciliaron.
Trust is the most important thing.=La confianza es lo más importante.
We're getting married in May.=Nos casamos en mayo.`);

EN('B2', 'Economy', 'Economía y conectores', '💵', { t: 'although, however, despite', k: 'although however despite whereas',
n: `Conectores de contraste:
|**Although** it's expensive, I'll buy it.|Aunque es caro, lo voy a comprar.
|It's expensive. **However**, I'll buy it.|Es caro. Sin embargo, lo voy a comprar.
|**Despite** the price, I'll buy it.|A pesar del precio, lo voy a comprar.
|**Despite being** expensive…|A pesar de ser caro… (con -ing)
|**whereas**|mientras que (contraste)
!«Despite» nunca lleva «of». Es «despite the crisis» o «in spite of the crisis».` },
`economy=economía
company=empresa
market=mercado=📊
stock=acción (de bolsa)=📈
stock market=bolsa de valores
profit=ganancia
loss=pérdida=📉
inflation=inflación
loan=préstamo/crédito
interest rate=tasa de interés
invest=invertir
crisis=crisis
exports=exportaciones
growth=crecimiento
competition=competencia
budget=presupuesto`,
`Although prices went up, sales grew.=Aunque los precios subieron, las ventas crecieron.
Despite the crisis, the company made a profit.=A pesar de la crisis, la empresa tuvo ganancias.
Inflation is high. However, wages are rising.=La inflación es alta. Sin embargo, los sueldos suben.
Mexico exports cars, whereas Chile exports copper.=México exporta carros, mientras que Chile exporta cobre.
I want to invest in the stock market.=Quiero invertir en la bolsa.
We need a bigger budget.=Necesitamos un presupuesto más grande.`);

EN('B2', 'English Around the World', 'Inglés de Estados Unidos y del Reino Unido', '🌎', { t: 'US vs UK', k: 'apartment flat elevator lift',
n: `El inglés es oficial en decenas de países. Las dos grandes variantes:
|apartment (US)|flat (UK): departamento
|elevator (US)|lift (UK): elevador
|cookie (US)|biscuit (UK): galleta
|fall (US)|autumn (UK): otoño
|color (US)|colour (UK): color
!Este curso usa el inglés de Estados Unidos, el más útil desde México. Ambos se entienden sin problema.` },
`United States=Estados Unidos=🇺🇸
United Kingdom=Reino Unido=🇬🇧
Canada=Canadá=🇨🇦
Australia=Australia=🇦🇺
accent=acento
apartment=departamento
elevator=elevador
cookie=galleta=🍪
fries=papas fritas=🍟
subway=metro=🚇
vacation=vacaciones
soccer=futbol=⚽
mail=correo
gas=gasolina=⛽
truck=camión de carga=🚚
line=fila`,
`In the UK they say «flat» instead of «apartment».=En el Reino Unido dicen «flat» en vez de «apartment».
English is spoken in many countries.=El inglés se habla en muchos países.
Her accent is from Texas.=Su acento es de Texas.
Australians call a friend «mate».=Los australianos le dicen «mate» a un amigo.
Canada has two official languages.=Canadá tiene dos idiomas oficiales.
We waited in line for an hour.=Hicimos fila una hora.`);

/* ============================ C1 ============================ */
EN('C1', 'Idioms I', 'Expresiones idiomáticas', '🎭', { t: 'No traduzcas palabra por palabra', k: 'piece cake leg',
n: `Las expresiones se aprenden **como bloque**:
|It's a piece of cake.|Está facilísimo (literal: «es un pedazo de pastel»).
|Break a leg!|¡Mucha suerte! (en el teatro y escenarios)
|It's raining cats and dogs.|Está lloviendo a cántaros.
|Hit the books.|Ponerse a estudiar.
!Muchas tienen equivalente mexicano: «to spill the beans» = soltar la sopa.` },
`a piece of cake=pan comido/facilísimo
break a leg=mucha suerte
raining cats and dogs=lloviendo a cántaros
hit the books=ponerse a estudiar
spill the beans=soltar la sopa
under the weather=enfermito/medio mal
cost an arm and a leg=costar un ojo de la cara
once in a blue moon=muy de vez en cuando
call it a day=dar por terminado el día
hit the sack=irse a dormir
on cloud nine=en las nubes/feliz de la vida
the last straw=la gota que derramó el vaso
let the cat out of the bag=revelar un secreto
pull someone's leg=tomarle el pelo a alguien
bite the bullet=aguantarse/hacer de tripas corazón
get cold feet=echarse para atrás`,
`Don't worry, the exam was a piece of cake.=No te preocupes, el examen fue pan comido.
Break a leg tonight!=¡Mucha suerte hoy en la noche!
That car cost an arm and a leg.=Ese carro costó un ojo de la cara.
I'm feeling a bit under the weather.=Me siento medio malito.
Let's call it a day.=Ya hay que dejarlo por hoy.
Are you pulling my leg?=¿Me estás tomando el pelo?`);

EN('C1', 'Debate', 'Debatir y tercer condicional', '⚖️', { t: 'If I had known…, I would have…', k: 'had would have known',
n: `Lo que **habría** pasado (y ya no se puede cambiar):
|If I **had known**, I **would have come**.|Si lo hubiera sabido, habría venido.
|If she **hadn't missed** the bus, she **would have arrived** on time.|Si no hubiera perdido el camión, habría llegado a tiempo.
Condicional mixto: «If I **had studied** law, I **would be** a lawyer now».
!Para debatir: «On the one hand… on the other hand…» = por un lado… por otro.` },
`debate=debate
argue=argumentar/sostener
claim=afirmar/afirmación
contradict=contradecir
convince=convencer
thesis=tesis
counterargument=contraargumento
on the one hand=por un lado
on the other hand=por otro lado
undoubtedly=sin duda
point of view=punto de vista
conclusion=conclusión
weigh up=sopesar
valid=válido
objection=objeción
evidence=pruebas/evidencia`,
`If I had known, I would have come.=Si lo hubiera sabido, habría venido.
That would have been better.=Eso habría sido mejor.
You should have told me.=Me lo debiste haber dicho.
On the one hand it's expensive, on the other hand it's useful.=Por un lado es caro, por otro es útil.
I'm afraid I have to disagree.=Me temo que no estoy de acuerdo.
Your objection is valid.=Su objeción es válida.`);

EN('C1', 'Literature', 'Literatura e inversión', '📚', { t: 'Inversión enfática', k: 'never rarely only had',
n: `En estilo formal o literario, algunas palabras negativas al inicio **invierten** sujeto y auxiliar:
|I have never seen such beauty.|**Never have I seen** such beauty.
|We rarely go out.|**Rarely do we** go out.
|If I had known…|**Had I known**… (Si lo hubiera sabido…)
|Only then did I understand.|Solo entonces lo entendí.
!Suena elegante en discursos y ensayos; en una plática normal, suena exagerado.` },
`literature=literatura=📚
novel=novela
short story=cuento/relato
poem=poema
poet=poeta
writer=escritor=✍️
character=personaje
plot=trama
narrator=narrador
chapter=capítulo
fairy tale=cuento de hadas=🧚
legend=leyenda
publish=publicar
translation=traducción
reader=lector
bestseller=éxito de ventas`,
`Never have I read such a beautiful poem.=Nunca he leído un poema tan bonito.
Rarely do we find a book like this.=Rara vez encontramos un libro así.
Had I known the ending, I wouldn't have read it.=Si hubiera sabido el final, no lo habría leído.
Shakespeare wrote thirty-nine plays.=Shakespeare escribió treinta y nueve obras.
The plot of the novel is complex.=La trama de la novela es compleja.
I'm reading the Spanish translation.=Estoy leyendo la traducción al español.`);

EN('C1', 'Law', 'Derecho y registro formal', '⚖️', { t: 'Nominalización y registro formal', k: 'decision approval review',
n: `El inglés formal convierte verbos en sustantivos:
|decide → decision|decidir → decisión
|approve → approval|aprobar → aprobación
|After they reviewed the contract…|Después de que revisaron el contrato…
|**Following a review of** the contract…|Tras una revisión del contrato…
!Palabras formales vs. comunes: «obtain» (get), «request» (ask for), «commence» (start).` },
`law=ley/derecho
court=tribunal/corte
judge=juez=👨‍⚖️
lawyer=abogado
attorney=abogado (EE. UU.)
lawsuit=demanda
sue=demandar
sentence=sentencia/condena
witness=testigo
fine=multa
guilty=culpable
innocent=inocente
decision=decisión
review=revisión/revisar
suspect=sospechoso
hearing=audiencia`,
`Following a review of the documents, a decision was made.=Tras revisar los documentos, se tomó una decisión.
The court reached a verdict.=El tribunal llegó a un veredicto.
The witness told the truth.=El testigo dijo la verdad.
She was found innocent.=Fue declarada inocente.
I need a lawyer.=Necesito un abogado.
The judge's decision is final.=La decisión del juez es definitiva.`);

EN('C1', 'Philosophy', 'Filosofía y deseos: wish / if only', '🤔', { t: 'wish e if only', k: 'wish only were had',
n: `Para lamentarse o desear algo distinto:
|I **wish** I **had** more time.|Ojalá tuviera más tiempo. (presente)
|I **wish** I **had studied** more.|Ojalá hubiera estudiado más. (pasado)
|**If only** I **were** taller!|¡Si tan solo fuera más alto!
|I **wish** you **would** stop.|Ojalá dejaras de hacerlo. (queja)
!«Ojalá» se traduce con wish o hope: «I hope you win» (ojalá ganes, es posible) vs «I wish I could» (ojalá pudiera, no puedo).` },
`philosophy=filosofía
philosopher=filósofo
thought=pensamiento=🤔
reason=razón
freedom=libertad=🕊️
truth=verdad
consciousness=conciencia
existence=existencia
being=ser
ethics=ética
duty=deber
knowledge=conocimiento
meaning=sentido/significado
doubt=duda
essence=esencia
worldview=cosmovisión`,
`I wish I had more time to read.=Ojalá tuviera más tiempo para leer.
If only I had listened to you!=¡Si tan solo te hubiera hecho caso!
What is the meaning of life?=¿Cuál es el sentido de la vida?
Freedom also means responsibility.=La libertad también significa responsabilidad.
I hope you find the answer.=Ojalá encuentres la respuesta.
He doubted, yet he acted.=Dudaba y, aun así, actuó.`);

EN('C1', 'History', 'Historia y modales en pasado', '🗽', { t: 'must have, might have, can’t have', k: 'must might could have',
n: `Para hacer **deducciones sobre el pasado**: modal + have + participio.
|They **must have** been brave.|Deben de haber sido valientes. (casi seguro)
|It **might have** been an accident.|Pudo haber sido un accidente. (posible)
|He **can't have** known.|No pudo haberlo sabido. (imposible)
|You **should have** asked.|Debiste haber preguntado. (crítica)
!En el habla: «must've», «should've». Nunca se escribe «should of».` },
`history=historia
century=siglo
war=guerra
peace=paz=🕊️
independence=independencia
revolution=revolución
empire=imperio
king=rey=👑
colony=colonia
freedom=libertad
memory=memoria
monument=monumento=🗽
found=fundar
civil rights=derechos civiles
slavery=esclavitud
treaty=tratado`,
`The United States became independent in 1776.=Estados Unidos se independizó en 1776.
They must have been very brave.=Deben de haber sido muy valientes.
It might have been different.=Pudo haber sido diferente.
Martin Luther King fought for civil rights.=Martin Luther King luchó por los derechos civiles.
The treaty ended the war.=El tratado puso fin a la guerra.
You should have read the history book.=Debiste haber leído el libro de historia.`);

EN('C1', 'Business English', 'Inglés de negocios', '🤝', { t: 'Correos y juntas en inglés', k: 'regarding attached forward schedule',
n: `Frases clave para el trabajo:
|I'm writing regarding…|Le escribo en relación con…
|Please find attached…|Le adjunto…
|I look forward to hearing from you.|Quedo en espera de su respuesta.
|Let's touch base next week.|Hablamos la próxima semana.
|Could we schedule a call?|¿Podemos agendar una llamada?
!Cierre de correo: «Best regards» o «Kind regards». Nada de «Greetings» al final.` },
`meeting=junta/reunión
call=llamada
deadline=fecha límite
client=cliente
sales=ventas
invoice=factura
negotiate=negociar
agreement=acuerdo
schedule=agendar/horario
attached=adjunto
follow up=dar seguimiento
department=departamento
CEO=director general
presentation=presentación
stakeholder=parte interesada
quarter=trimestre`,
`I'm writing regarding your last order.=Le escribo en relación con su último pedido.
Please find the invoice attached.=Le adjunto la factura.
The deadline is on Friday.=La fecha límite es el viernes.
Could we schedule a call for Monday?=¿Podemos agendar una llamada para el lunes?
I'll follow up with the client.=Le doy seguimiento con el cliente.
I look forward to hearing from you.=Quedo en espera de su respuesta.`);

EN('C1', 'Slang', 'Inglés coloquial de Estados Unidos', '😎', { t: 'Hablar como nativo', k: 'gonna wanna gotta',
n: `En el habla rápida, las palabras se juntan:
|going to → gonna|I'm gonna call you.
|want to → wanna|Do you wanna go?
|got to → gotta|I gotta go.
|kind of → kinda|It's kinda weird.
!Se dicen mucho, pero en un examen o correo formal escribe la forma completa.` },
`awesome=increíble/padrísimo
cool=chido/padre
dude=güey/amigo
hang out=pasar el rato/salir
chill=relajarse/tranquilo
broke=sin lana/quebrado
bucks=dólares/varos
no way=no manches/no puede ser
for real=neta/en serio
my bad=mi culpa/perdón
what's up=qué onda
ghost=dejar en visto/desaparecer
vibe=vibra/ambiente
lit=prendido/buenísimo
sketchy=sospechoso/turbio
whatever=lo que sea/como sea`,
`What's up, dude?=¿Qué onda, güey?
I'm gonna hang out with my friends.=Voy a salir con mis amigos.
For real? No way!=¿Neta? ¡No manches!
Sorry, my bad.=Perdón, mi culpa.
I'm broke until Friday.=Ando sin lana hasta el viernes.
That place looks kinda sketchy.=Ese lugar se ve medio turbio.`);

/* ============================ C2 ============================ */
EN('C2', 'Idioms II', 'Expresiones avanzadas', '🧩', { t: 'Lenguaje figurado culto', k: 'bush gun table',
n: `Expresiones de prensa, juntas y literatura:
|beat around the bush|andarse por las ramas
|jump the gun|adelantarse, precipitarse
|bring something to the table|aportar algo valioso
|the elephant in the room|el problema que nadie quiere mencionar
!Una expresión mal usada suena peor que no usarla. Úsalas cuando ya las hayas leído varias veces.` },
`beat around the bush=andarse por las ramas
jump the gun=precipitarse/adelantarse
bring to the table=aportar
the elephant in the room=el problema que nadie menciona
a blessing in disguise=no hay mal que por bien no venga
cut corners=hacer las cosas a medias/ahorrar a costa de la calidad
add insult to injury=echar sal en la herida
burn the midnight oil=desvelarse trabajando
play devil's advocate=hacer de abogado del diablo
the ball is in your court=te toca a ti
by the skin of my teeth=por un pelito
throw in the towel=tirar la toalla
kill two birds with one stone=matar dos pájaros de un tiro
read between the lines=leer entre líneas
a far cry from=muy lejos de/nada que ver con
cut to the chase=ir al grano`,
`Stop beating around the bush.=Deja de andarte por las ramas.
Let's not jump the gun.=No nos precipitemos.
Losing that job was a blessing in disguise.=Perder ese trabajo fue para bien.
The ball is in your court now.=Ahora te toca a ti.
I passed by the skin of my teeth.=Pasé por un pelito.
Let's cut to the chase.=Vamos al grano.`);

EN('C2', 'Nuances', 'Vocabulario abstracto y matices', '🔍', { t: 'Sinónimos con matiz', k: 'look see watch notice',
n: `El inglés tiene muchas palabras para lo mismo, con matices:
|look / see / watch|mirar / ver / observar algo en movimiento
|notice / realize|notar / darse cuenta
|say / tell / speak / talk|decir / contar a alguien / hablar (idioma) / platicar
|make / do|crear algo / realizar una tarea
!«Realize» no es «realizar»: es darse cuenta. «Realizar» = carry out.` },
`notice=notar
realize=darse cuenta
carry out=realizar/llevar a cabo
glimpse=vistazo
stare=mirar fijamente
serenity=serenidad
wanderlust=ganas de viajar
coziness=sensación de calidez/acogedor
schadenfreude=alegría por el mal ajeno
zeitgeist=espíritu de la época
tact=tacto/delicadeza
ambivalence=ambivalencia
nuanced=con matices
subtle=sutil
underlying=subyacente
elusive=difícil de alcanzar/escurridizo`,
`I didn't realize it was so late.=No me di cuenta de que era tan tarde.
She noticed a subtle change.=Notó un cambio sutil.
The issue is more nuanced than it seems.=El tema tiene más matices de lo que parece.
They carried out an investigation.=Llevaron a cabo una investigación.
Happiness can be elusive.=La felicidad puede ser escurridiza.
He has a lot of tact.=Tiene mucho tacto.`);

EN('C2', 'The Press', 'Lenguaje periodístico', '🗞️', { t: 'El lenguaje de los titulares', k: 'to set slams vows',
n: `Los titulares tienen su propia gramática:
|Presente simple = pasado|«President **visits** Mexico» (el presidente visitó México)
|to + verbo = futuro|«Mayor **to resign**» (el alcalde renunciará)
|Participio = pasiva|«Two **arrested**» (dos personas fueron arrestadas)
Verbos dramáticos: **slam** (criticar duramente), **vow** (prometer), **probe** (investigar), **axe** (recortar).
!«According to» = según. «Reportedly» = según se informa.` },
`headline=titular
editorial=editorial
source=fuente
according to=según
report=informar/reportar
press conference=conferencia de prensa
correspondent=corresponsal
circulation=tiraje
freedom of the press=libertad de prensa
fake news=noticias falsas
investigate=investigar
statement=declaración
interview=entrevista=🎙️
poll=encuesta
reportedly=según se informa
censorship=censura`,
`According to the police, nobody was hurt.=Según la policía, nadie resultó herido.
The minister reportedly resigned.=Según se informa, el ministro renunció.
The headline was misleading.=El titular era engañoso.
Senator slams new tax plan.=Senador critica duramente el nuevo plan fiscal.
Mayor to resign next week.=El alcalde renunciará la próxima semana.
Freedom of the press is the basis of democracy.=La libertad de prensa es la base de la democracia.`);

EN('C2', 'The Future', 'Ciencia y futuro perfecto', '🚀', { t: 'Future perfect y future continuous', k: 'will have been be',
n: `Para hablar del futuro con precisión:
|By 2030, we **will have built** it.|Para 2030 lo habremos construido.
|This time tomorrow I **will be flying**.|Mañana a esta hora estaré volando.
|By June, I **will have been working** here for a year.|Para junio llevaré un año trabajando aquí.
!«By» + fecha = para (a más tardar). «Until» = hasta.` },
`future=futuro=🚀
artificial intelligence=inteligencia artificial=🤖
robot=robot=🤖
space exploration=exploración espacial
outer space=espacio exterior=🌌
genetic engineering=ingeniería genética=🧬
invention=invento
progress=progreso
feasible=factible
unimaginable=inimaginable
sustainability=sustentabilidad
digitalization=digitalización
privacy=privacidad=🔒
challenge=reto/desafío
predict=predecir
quantum physics=física cuántica`,
`By 2030, we will have reached Mars.=Para 2030 habremos llegado a Marte.
This time tomorrow I'll be flying to Tokyo.=Mañana a esta hora estaré volando a Tokio.
Artificial intelligence is changing everything.=La inteligencia artificial lo está cambiando todo.
Privacy is a huge challenge.=La privacidad es un enorme reto.
That was unimaginable fifty years ago.=Eso era inimaginable hace cincuenta años.
It's technically feasible.=Es técnicamente factible.`);

EN('C2', 'Rhetoric', 'Retórica y oraciones hendidas', '🎤', { t: 'Cleft sentences: What I need is…', k: 'what it was is',
n: `Para **enfatizar** una parte de la oración:
|I need a break. → **What I need is** a break.|Lo que necesito es un descanso.
|John called. → **It was John who** called.|Fue John quien llamó.
|**All I want is** peace.|Lo único que quiero es paz.
|**The reason why** I left **was**…|La razón por la que me fui fue…
!Los grandes discursos usan repetición en tres: «government of the people, by the people, for the people».` },
`rhetoric=retórica
speaker=orador=🎤
persuasive=persuasivo
audience=público
allusion=alusión
irony=ironía
comparison=comparación
metaphor=metáfora
emphasize=recalcar/enfatizar
highlight=destacar
punchline=remate (de un chiste)
witty=ingenioso
heckler=persona que interrumpe un discurso
cliché=cliché/frase hecha
compelling=convincente/contundente
eloquent=elocuente`,
`What I need is a long vacation.=Lo que necesito son unas vacaciones largas.
It was my sister who called.=Fue mi hermana quien llamó.
All I want is a little respect.=Lo único que quiero es un poco de respeto.
The speaker was very persuasive.=El orador fue muy persuasivo.
She's incredibly witty.=Es increíblemente ingeniosa.
Avoid empty clichés.=Evita los clichés vacíos.`);

EN('C2', 'Accents', 'Acentos y variantes del inglés', '🗺️', { t: 'Un idioma, muchos acentos', k: 'mate eh',
n: `Algunas variantes que vas a escuchar:
|Southern US|«y'all» = ustedes
|British|«cheers» = gracias / salud
|Australian|«mate» = amigo; «arvo» = la tarde
|Canadian|«eh?» al final = ¿verdad?
|Irish|«grand» = bien, perfecto
!La «r» final se pronuncia en Estados Unidos (car) y casi desaparece en Inglaterra (cah). No hay acento «correcto».` },
`accent=acento
dialect=dialecto
pronunciation=pronunciación
y'all=ustedes (sur de EE. UU.)
cheers=gracias/salud (Reino Unido)
mate=amigo (Reino Unido, Australia)
grand=bien/perfecto (Irlanda)
eh=¿verdad? (Canadá)
Scotland=Escocia
Ireland=Irlanda=🇮🇪
India=India=🇮🇳
New Zealand=Nueva Zelanda=🇳🇿
Texas=Texas
standard English=inglés estándar
native speaker=hablante nativo
understand=entender`,
`I can barely understand his accent.=Apenas le entiendo el acento.
How are y'all doing?=¿Cómo están todos?
Cheers, mate!=¡Gracias, amigo!
English is an official language in India.=El inglés es idioma oficial en la India.
She has a strong Scottish accent.=Tiene un acento escocés muy marcado.
There is no correct accent.=No existe un acento correcto.`);

EN('C2', 'The Mind', 'Psicología y subjuntivo inglés', '🧠', { t: 'El subjuntivo: I suggest that he be…', k: 'be go insist suggest',
n: `Después de **suggest, insist, recommend, demand, it's essential that** el verbo va en forma base (sin -s):
|I suggest that he **go** to therapy.|Sugiero que vaya a terapia.
|It's essential that she **be** on time.|Es esencial que llegue a tiempo.
|They insisted that he **stay**.|Insistieron en que se quedara.
!Es el único rincón donde el inglés «se parece» a nuestro subjuntivo. Suena formal y correcto.` },
`mind=mente
psychology=psicología
self-esteem=autoestima
anxiety=ansiedad
joy of life=alegría de vivir
mindfulness=atención plena
subconscious=subconsciente
denial=negación
resilience=resiliencia
burnout=agotamiento laboral
therapy=terapia
cope=sobrellevar/lidiar
insight=toma de conciencia/perspectiva
behavior=comportamiento
habit=hábito
well-being=bienestar`,
`Mindfulness helps with stress.=La atención plena ayuda con el estrés.
I suggest that he go to therapy.=Sugiero que vaya a terapia.
It's essential that she rest.=Es esencial que descanse.
She's working on her self-esteem.=Está trabajando en su autoestima.
Changing habits is hard.=Cambiar hábitos es difícil.
Burnout is very common nowadays.=El agotamiento laboral es muy común hoy en día.`);

EN('C2', 'Mastery', 'Maestría: el gran final', '🏆', { t: 'Todo junto: estilo y precisión', k: 'had would been were',
n: `Llegaste a C2. Ya combinas todo:
|Third conditional|Had I known, I would have started earlier.
|Inversion|Never have I enjoyed learning so much.
|Cleft|What matters is that you never gave up.
|Phrasal verbs|You figured it out.
|Subjunctive|I insist that you keep going.
!Lee a Toni Morrison y a Hemingway, escucha pódcasts sin subtítulos, mira stand-up: el idioma ya es tuyo. Congratulations!` },
`mastery=maestría/dominio=🏆
congratulations=felicidades=🎉
fluent=con fluidez
effortless=sin esfuerzo
perseverance=perseverancia
breakthrough=gran avance
master=dominar
subtlety=sutileza
accurate=preciso/exacto
open-minded=de mente abierta=🌍
curiosity=curiosidad
milestone=hito
succeed=tener éxito/lograrlo
figure out=descifrar/entender
bilingual=bilingüe
proud=orgulloso`,
`Congratulations, you're fluent in English!=¡Felicidades, hablas inglés con fluidez!
Had I known how fun it was, I would have started earlier.=Si hubiera sabido lo divertido que era, habría empezado antes.
What matters is that you never gave up.=Lo que importa es que nunca te rendiste.
Never have I been so proud.=Nunca había estado tan orgulloso.
You finally figured it out.=Por fin lo descifraste.
This is a real milestone.=Es un verdadero hito.`);

GS.extra.en.ff = `actually|actualmente|en realidad (actualmente = currently)
embarrassed|embarazada|avergonzado, apenado (embarazada = pregnant)
library|librería|la biblioteca (librería = bookstore)
exit|éxito|la salida (éxito = success)
carpet|carpeta|la alfombra (carpeta = folder)
realize|realizar|darse cuenta (realizar = carry out)
assist|asistir a un evento|ayudar (asistir = attend)
attend|atender|asistir (atender = take care of, serve)
sensible|sensible|sensato (sensible = sensitive)
constipated|constipado (resfriado)|estreñido (resfriado = to have a cold)
fabric|fábrica|la tela (fábrica = factory)
lecture|lectura|la conferencia, la clase (lectura = reading)
college|colegio|la universidad (colegio = school)
parents|parientes|los papás (parientes = relatives)
molest|molestar|abusar sexualmente (molestar = to bother)
argument|argumento|discusión, pelea (también argumento lógico)
costume|costumbre|el disfraz (costumbre = custom, habit)
actual|actual|real, verdadero (actual = current)
eventually|eventualmente|al final, con el tiempo
introduce|introducir|presentar a alguien (introducir = insert)
large|largo|grande (largo = long)
record|recordar|grabar, el disco (recordar = remember)
rope|ropa|la cuerda (ropa = clothes)
success|suceso|el éxito (suceso = event)`;
GS.extra.en.cult = `¿Cuánto se deja de propina en un restaurante en Estados Unidos?|Entre 15 y 20 por ciento|Nada, ya está incluida|Un dólar fijo
¿Qué se celebra el cuarto jueves de noviembre?|Thanksgiving, el Día de Acción de Gracias|La Independencia|Halloween
¿Cuándo es el Día de la Independencia de Estados Unidos?|El 4 de julio|El 16 de septiembre|El 1 de mayo
¿Qué es «small talk»?|Plática ligera sobre el clima, el fin de semana o deportes|Una discusión seria|Hablar en voz baja
¿Cómo se escribe la fecha 7 de marzo en Estados Unidos?|3/7 (primero el mes)|7/3|07.03
¿Qué es el Super Bowl?|La final del futbol americano|Un torneo de beisbol|Un concurso de cocina
¿Cuál es la capital de Estados Unidos?|Washington, D. C.|Nueva York|Los Ángeles
¿Qué unidad de temperatura se usa en Estados Unidos?|Grados Fahrenheit|Grados Celsius|Kelvin
¿Cuántas personas hablan español en Estados Unidos?|Más de 40 millones como lengua materna|Menos de un millón|Nadie
¿Qué significa «How are you?» al saludar?|Es solo un saludo; se contesta «Good, thanks!»|Quieren saber tu historial médico|Es una pregunta muy personal
¿Qué es «brunch»?|Una mezcla de desayuno y comida a media mañana|Un tipo de pan|Una bebida
¿En qué país se habla inglés y francés oficialmente?|Canadá|Australia|Irlanda`;
GS.extra.en.phon = `th (think)|La lengua entre los dientes, sin voz: como la «z» de España.|think · three · thanks
th (this)|La lengua entre los dientes, con voz: como una «d» muy suave.|this · mother · they
v|Dientes de arriba sobre el labio de abajo; ¡no es «b»!|very · love · voice
sh|Como cuando pides silencio: «shhh».|she · shop · fish
j|Como «ll» del Río de la Plata pero con «d» al inicio: «dy».|job · June · juice
i corta|Más corta y relajada que la «i» española.|ship · sit · live
ee larga|«i» larga y tensa: sheep no es ship.|sheep · seat · leave
schwa|La vocal más común del inglés: una «e» débil y relajada.|about · banana · the
h|Se pronuncia como una «j» suave, solo aire.|hello · house · happy
-ed (t)|Después de sonidos sordos, la -ed suena «t».|worked · stopped · watched
-ed (id)|Después de t o d, la -ed suena «id».|wanted · needed · visited
r|La lengua no toca el paladar; se curva hacia atrás.|red · car · very`;
