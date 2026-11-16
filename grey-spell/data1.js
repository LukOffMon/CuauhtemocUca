/* Grey~Spell — banco de contenido. Parte 1: A1 y A2 (unidades 1–16).
   Formato de palabras:  francés=español/alternativa=emoji
   Formato de frases:    francés=español
   Notas de gramática:   líneas "|a|b" = tabla, "!" = consejo para mexicanos, **negritas** */
window.GS = window.GS || { units: [] };
GS.U = function (lv, t, es, ic, g, w, s) { GS.units.push({ lv, t, es, ic, g, w, s }); };

GS.U('A1', 'Bonjour !', 'Saludos y presentaciones', '👋',
{ t: 'Pronombres y el verbo être', ct: 'pres', v: `être=ser/estar,s'appeler=llamarse`, k: 'suis es est sommes êtes sont',
n: `En francés **siempre** se dice el pronombre: no puedes decir solo «soy», tienes que decir «je suis».
|je suis|yo soy / estoy
|tu es|tú eres / estás
|il / elle est|él / ella es
|nous sommes|nosotros somos
|vous êtes|ustedes son / usted es
|ils / elles sont|ellos / ellas son
**être** sirve para *ser* y *estar*: «je suis mexicain» (soy mexicano), «je suis fatigué» (estoy cansado).
!«Vous» es «usted» y también «ustedes». No existe el «vosotros» de España, igual que en México.
!La «s» final casi nunca se pronuncia: «tu es» suena «tü é».` },
`bonjour=hola/buenos días=👋
salut=hola/qué onda
bonsoir=buenas noches/buenas tardes=🌙
au revoir=adiós
à bientôt=hasta pronto
merci=gracias=🙏
merci beaucoup=muchas gracias
s'il vous plaît=por favor
de rien=de nada
oui=sí=👍
non=no=👎
pardon=perdón/disculpe
excusez-moi=disculpe/perdone
je=yo
tu=tú
il=él
elle=ella
nous=nosotros
vous=ustedes/usted
ils=ellos
elles=ellas
je suis=yo soy/yo estoy/soy/estoy
tu es=tú eres/tú estás/eres/estás
il est=él es/él está
nous sommes=somos/nosotros somos/estamos
vous êtes=ustedes son/usted es
ils sont=ellos son/son/ellos están
je m'appelle=me llamo
comment ça va ?=¿cómo estás?/¿qué tal?/¿cómo te va?
ça va bien=estoy bien/va bien/bien
enchanté=mucho gusto/encantado=🤝
mexicain=mexicano=🇲🇽
français=francés=🇫🇷
madame=señora
monsieur=señor`,
`Bonjour, je m'appelle Léa.=Hola, me llamo Léa.
Je suis mexicain.=Soy mexicano.
Elle est française.=Ella es francesa.
Comment ça va ?=¿Cómo estás?
Ça va bien, merci.=Estoy bien, gracias.
Nous sommes amis.=Somos amigos.
Vous êtes madame Dupont ?=¿Usted es la señora Dupont?
Tu es très gentil.=Eres muy amable.
Au revoir et à bientôt !=¡Adiós y hasta pronto!
Enchanté, monsieur.=Mucho gusto, señor.
Il est de Mexico.=Él es de la Ciudad de México.`);

GS.U('A1', 'La famille', 'Familia y artículos', '👨‍👩‍👧',
{ t: 'Artículos y el verbo avoir', ct: 'pres', v: `avoir=tener`, k: 'le la les un une des ai as a avons avez ont',
n: `Todo sustantivo es masculino o femenino, como en español… pero **no siempre coinciden**.
|le / un|el / un (masculino)
|la / une|la / una (femenino)
|l'|el / la antes de vocal: l'enfant
|les / des|los, las / unos, unas
El verbo **avoir** (tener):
|j'ai|tengo
|tu as|tienes
|il / elle a|tiene
|nous avons|tenemos
|vous avez|tienen
|ils / elles ont|tienen
!«J'ai» y no «je ai»: si la palabra siguiente empieza con vocal, «je» se convierte en «j'».
!En francés casi siempre se necesita artículo: «Tengo perros» = «J'ai des chiens».` },
`la famille=la familia=👨‍👩‍👧
le père=el papá/el padre=👨
la mère=la mamá/la madre=👩
le frère=el hermano=👦
la sœur=la hermana=👧
le fils=el hijo
la fille=la hija/la niña
le grand-père=el abuelo=👴
la grand-mère=la abuela=👵
l'oncle=el tío
la tante=la tía
le cousin=el primo
la cousine=la prima
le mari=el esposo/el marido
la femme=la esposa/la mujer
l'enfant=el niño/el hijo=🧒
le bébé=el bebé=👶
l'ami=el amigo
l'amie=la amiga
le garçon=el niño/el muchacho
j'ai=tengo/yo tengo
tu as=tienes/tú tienes
il a=él tiene/tiene
nous avons=tenemos/nosotros tenemos
vous avez=ustedes tienen/usted tiene
ils ont=ellos tienen/tienen
le chien=el perro=🐶
le chat=el gato=🐱
petit=pequeño/chico
grand=grande/alto
jeune=joven
la personne=la persona`,
`J'ai un frère et une sœur.=Tengo un hermano y una hermana.
Ma mère s'appelle Ana.=Mi mamá se llama Ana.
Nous avons un chien.=Tenemos un perro.
Le chat est petit.=El gato es pequeño.
Tu as des cousins ?=¿Tienes primos?
Mon père est grand.=Mi papá es alto.
Elle a deux enfants.=Ella tiene dos hijos.
Ils ont un bébé.=Ellos tienen un bebé.
Ma grand-mère est très jeune.=Mi abuela es muy joven.
Voici mon ami Paul.=Este es mi amigo Paul.`);

GS.U('A1', 'À table !', 'Comida y verbos en -er', '🥐',
{ t: 'Partitivos y verbos en -er', ct: 'pres', v: `manger=comer,aimer=gustar,adorer=encantar,détester=odiar,boire=tomar/beber`, k: 'du de la des le les',
n: `Para decir «como pan» el francés usa **artículo partitivo** (una parte de algo):
|du pain|pan (masculino)
|de la soupe|sopa (femenino)
|de l'eau|agua (antes de vocal)
|des frites|papas (plural)
Para gustos se usa el artículo definido: «J'aime **le** fromage».
Verbos en **-er** (el 90 % de los verbos): quita -er y agrega:
|je mange|-e
|tu manges|-es
|il mange|-e
|nous mangeons|-ons
|vous mangez|-ez
|ils mangent|-ent (¡no se pronuncia!)
!«J'aime le chocolat» = «me gusta el chocolate». En francés tú eres el sujeto: «yo amo/gusto».
!je mange, tu manges, il mange, ils mangent suenan IGUAL. Escucha el pronombre.` },
`le pain=el pan=🍞
le fromage=el queso=🧀
la pomme=la manzana=🍎
l'eau=el agua=💧
le lait=la leche=🥛
le café=el café=☕
le thé=el té=🍵
la viande=la carne=🥩
le poulet=el pollo=🍗
le poisson=el pescado=🐟
le riz=el arroz=🍚
les frites=las papas fritas/las papas=🍟
la soupe=la sopa=🍲
le sucre=el azúcar
le sel=la sal=🧂
l'œuf=el huevo=🥚
la banane=el plátano=🍌
l'orange=la naranja=🍊
le jus=el jugo=🧃
le gâteau=el pastel=🍰
le chocolat=el chocolate=🍫
la tomate=el jitomate/el tomate=🍅
le croissant=el cuernito/el croissant=🥐
manger=comer
boire=beber/tomar
aimer=gustar/amar
adorer=encantar/adorar
détester=odiar
le petit-déjeuner=el desayuno
le déjeuner=la comida/el almuerzo
le dîner=la cena
la faim=el hambre`,
`Je mange du pain.=Como pan.
Elle boit de l'eau.=Ella toma agua.
Nous aimons le fromage.=Nos gusta el queso.
Tu veux du café ?=¿Quieres café?
Je déteste le poisson.=Odio el pescado.
Ils mangent des frites.=Ellos comen papas fritas.
J'adore le chocolat !=¡Me encanta el chocolate!
Il boit du jus d'orange.=Él toma jugo de naranja.
Le petit-déjeuner est prêt.=El desayuno está listo.
Vous mangez de la soupe ?=¿Ustedes comen sopa?
J'ai faim !=¡Tengo hambre!`);

GS.U('A1', 'Les nombres', 'Números, días y la hora', '🔢',
{ t: 'Números y la hora', ct: 'pres', v: `avoir=tener,être=ser/estar`, k: 'heures est ans et demie',
n: `Los números del 70 al 99 son una aventura:
|70|soixante-dix (60 + 10)
|80|quatre-vingts (4 × 20)
|90|quatre-vingt-dix (4 × 20 + 10)
|21, 31…|vingt et un, trente et un
Para la hora: «Il est trois heures» (son las tres). Siempre singular: **il est**.
|et quart|y cuarto
|et demie|y media
|moins le quart|menos cuarto
!La edad se dice con **avoir**, igual que en español: «J'ai vingt ans» = tengo veinte años.
!Los días de la semana van en minúscula y sin artículo: «lundi» = el lunes.` },
`zéro=cero=0️⃣
deux=dos=2️⃣
trois=tres=3️⃣
quatre=cuatro=4️⃣
cinq=cinco=5️⃣
six=seis=6️⃣
sept=siete=7️⃣
huit=ocho=8️⃣
neuf=nueve=9️⃣
dix=diez=🔟
onze=once
douze=doce
vingt=veinte
trente=treinta
cinquante=cincuenta
cent=cien
lundi=lunes
mardi=martes
mercredi=miércoles
jeudi=jueves
vendredi=viernes
samedi=sábado
dimanche=domingo
aujourd'hui=hoy
demain=mañana
hier=ayer
l'heure=la hora=⏰
la semaine=la semana
le mois=el mes
l'année=el año
midi=mediodía
minuit=medianoche`,
`Il est trois heures.=Son las tres.
Quelle heure est-il ?=¿Qué hora es?
Aujourd'hui, c'est lundi.=Hoy es lunes.
J'ai vingt ans.=Tengo veinte años.
Demain, c'est samedi.=Mañana es sábado.
Il est midi.=Es mediodía.
Il est huit heures et demie.=Son las ocho y media.
Le cours est le mardi.=La clase es los martes.
Elle a trente ans.=Ella tiene treinta años.
Il est dix heures moins le quart.=Son cuarto para las diez.`);

GS.U('A1', 'La maison', 'La casa e il y a', '🏠',
{ t: 'Il y a y preposiciones', ct: 'pres', v: `habiter=vivir,aimer=gustar`, k: 'sur sous dans devant derrière entre près loin',
n: `**Il y a** = hay. Nunca cambia: «il y a un chat», «il y a trois chats».
Negativo: «il n'y a pas **de** frigo» (después de «pas», un/une/des se vuelven **de**).
|sur|sobre, encima de
|sous|debajo de
|dans|en, dentro de
|devant / derrière|delante de / detrás de
|à côté de|al lado de
|près de / loin de|cerca de / lejos de
!de + le = **du**: «près du lit». de + la no cambia: «près de la table».
!«Habiter» = vivir (en un lugar). «J'habite à Monterrey».` },
`la maison=la casa=🏠
l'appartement=el departamento=🏢
la chambre=la recámara/el cuarto=🛏️
la cuisine=la cocina=🍳
la salle de bains=el baño=🛁
le salon=la sala=🛋️
la porte=la puerta=🚪
la fenêtre=la ventana=🪟
la table=la mesa
la chaise=la silla=🪑
le lit=la cama
le canapé=el sillón/el sofá
le jardin=el jardín=🌳
la clé=la llave=🔑
la lampe=la lámpara=💡
le miroir=el espejo=🪞
le frigo=el refri/el refrigerador
l'escalier=la escalera
le mur=la pared=🧱
le toit=el techo
il y a=hay
sur=sobre/encima de
sous=debajo de
dans=en/dentro de
devant=delante de/enfrente de
derrière=detrás de
à côté de=al lado de
entre=entre
près de=cerca de
loin de=lejos de
ici=aquí
habiter=vivir`,
`Il y a un chat sous la table.=Hay un gato debajo de la mesa.
La clé est sur la table.=La llave está sobre la mesa.
Ma chambre est petite.=Mi recámara es pequeña.
Il y a trois chambres.=Hay tres recámaras.
Le jardin est derrière la maison.=El jardín está detrás de la casa.
La lampe est à côté du lit.=La lámpara está al lado de la cama.
Il n'y a pas de frigo.=No hay refri.
J'habite dans un appartement.=Vivo en un departamento.
La cuisine est près du salon.=La cocina está cerca de la sala.
Le miroir est dans la salle de bains.=El espejo está en el baño.`);

GS.U('A1', 'Les couleurs', 'Ropa, colores y adjetivos', '👕',
{ t: 'Concordancia de adjetivos', ct: 'pres', v: `porter=llevar/usar,aimer=gustar`, k: 'blanche blanc noires noir bleues bleu verte vert nouveau belle',
n: `Los adjetivos concuerdan como en español: femenino **+e**, plural **+s**.
|un pantalon vert|une jupe verte
|un sac noir|des chaussures noires
|blanc|blanche (irregular)
|beau / nouveau|belle / nouvelle
Casi siempre van **después** del sustantivo, salvo algunos cortitos que van antes: beau, joli, petit, grand, jeune, nouveau, bon.
!«Marron» y «orange» no cambian nunca: «des chaussures marron».
!El café como color se dice «marron». Un «café» en Francia solo se toma.` },
`rouge=rojo=🔴
bleu=azul=🔵
vert=verde=🟢
jaune=amarillo=🟡
noir=negro=⚫
blanc=blanco=⚪
gris=gris
rose=rosa=🌸
orange=naranja=🟠
violet=morado=🟣
marron=café/marrón=🟤
la chemise=la camisa=👔
le pantalon=el pantalón=👖
la robe=el vestido=👗
la jupe=la falda
le t-shirt=la playera=👕
la veste=la chamarra/la chaqueta=🧥
le manteau=el abrigo
les chaussures=los zapatos=👞
les baskets=los tenis=👟
le chapeau=el sombrero=👒
la casquette=la gorra=🧢
les chaussettes=los calcetines=🧦
le sac=la bolsa=👜
les lunettes=los lentes=👓
porter=llevar/usar
beau=bonito/guapo
belle=bonita/guapa
nouveau=nuevo
cher=caro
joli=bonito/lindo
la taille=la talla`,
`Je porte une chemise blanche.=Llevo una camisa blanca.
Sa robe est rouge.=Su vestido es rojo.
Les chaussures noires sont chères.=Los zapatos negros son caros.
Tu aimes ma casquette verte ?=¿Te gusta mi gorra verde?
Elle porte des lunettes.=Ella usa lentes.
Ce pantalon est trop grand.=Este pantalón es demasiado grande.
Mes baskets sont bleues.=Mis tenis son azules.
Il a un nouveau manteau.=Él tiene un abrigo nuevo.
La jupe est très jolie.=La falda es muy bonita.
Quelle est votre taille ?=¿Cuál es su talla?`);

GS.U('A1', 'En ville', 'La ciudad y el verbo aller', '🏙️',
{ t: 'Aller y las contracciones', ct: 'pres', v: `aller=ir`, k: 'au la vais vas va allons allez vont',
n: `**Aller** (ir) es irregular:
|je vais|voy
|tu vas|vas
|il / elle va|va
|nous allons|vamos
|vous allez|van
|ils / elles vont|van
Con «à» hay contracciones, como «a + el = al»:
|à + le = au|au cinéma
|à + les = aux|aux toilettes
|à la|à la banque
|à l'|à l'école
!«On va au parc ?» — «on» (uno/nosotros) es muy usado al hablar: on va = vamos.` },
`la ville=la ciudad=🏙️
la rue=la calle
la banque=el banco=🏦
la gare=la estación de tren=🚉
l'hôpital=el hospital=🏥
l'école=la escuela=🏫
l'église=la iglesia=⛪
le musée=el museo=🏛️
le marché=el mercado
le supermarché=el súper/el supermercado=🛒
la boulangerie=la panadería=🥖
la pharmacie=la farmacia=💊
le parc=el parque=🌳
le cinéma=el cine=🎬
la place=la plaza
le restaurant=el restaurante=🍽️
la poste=el correo=📮
le pont=el puente=🌉
le quartier=el barrio/la colonia
aller=ir
je vais=voy/yo voy
tu vas=vas/tú vas
il va=va/él va
nous allons=vamos/nosotros vamos
vous allez=van/ustedes van
ils vont=van/ellos van
à gauche=a la izquierda=⬅️
à droite=a la derecha=➡️
tout droit=todo derecho/todo recto=⬆️
où=dónde
le plan=el mapa/el plano=🗺️`,
`Je vais à la banque.=Voy al banco.
Où est la gare ?=¿Dónde está la estación?
Nous allons au cinéma.=Vamos al cine.
Tournez à gauche.=Dé vuelta a la izquierda.
La pharmacie est tout droit.=La farmacia está todo derecho.
Ils vont au marché le samedi.=Ellos van al mercado los sábados.
Tu vas à l'école ?=¿Vas a la escuela?
Le musée est à droite.=El museo está a la derecha.
Il y a une boulangerie dans mon quartier.=Hay una panadería en mi colonia.
On va au parc ?=¿Vamos al parque?`);

GS.U('A1', 'Ma journée', 'Rutina y verbos pronominales', '⏰',
{ t: 'Verbos pronominales', ct: 'pres', v: `se lever=levantarse,se laver=lavarse,se coucher=acostarse,s'habiller=vestirse,se réveiller=despertarse`, k: 'me te se nous vous',
n: `Como en español (me levanto), hay verbos con pronombre reflexivo:
|je me lève|me levanto
|tu te lèves|te levantas
|il se lève|se levanta
|nous nous levons|nos levantamos
|vous vous levez|se levantan
|ils se lèvent|se levantan
Antes de vocal: me → m', te → t', se → s': «je m'habille».
!«Se doucher» es bañarse en regadera. En México decimos «bañarse» para todo; en francés «se baigner» es meterse a nadar.
!«Lever» cambia de acento: je lève, pero nous levons.` },
`se réveiller=despertarse
se lever=levantarse
se laver=lavarse
se doucher=bañarse/ducharse=🚿
s'habiller=vestirse
se coucher=acostarse=🛌
se brosser les dents=lavarse los dientes=🪥
travailler=trabajar=💼
étudier=estudiar=📚
le matin=la mañana=🌅
l'après-midi=la tarde
le soir=la noche/la tarde
la nuit=la noche=🌃
tôt=temprano
tard=tarde
toujours=siempre
souvent=seguido/a menudo
parfois=a veces
jamais=nunca
d'abord=primero
ensuite=luego/después
enfin=por fin/finalmente
le réveil=el despertador=⏰
rentrer=regresar/volver
d'habitude=normalmente/por lo general
vite=rápido
déjeuner=comer/almorzar
la douche=la regadera/la ducha=🚿
le savon=el jabón=🧼
la serviette=la toalla`,
`Je me lève à sept heures.=Me levanto a las siete.
Elle se douche le matin.=Ella se baña en la mañana.
Nous nous couchons tard.=Nos acostamos tarde.
Tu te réveilles tôt ?=¿Te despiertas temprano?
D'abord, je m'habille.=Primero, me visto.
Ensuite, je prends le petit-déjeuner.=Luego, desayuno.
Il travaille le lundi.=Él trabaja los lunes.
Ils se brossent les dents.=Ellos se lavan los dientes.
Je rentre à six heures.=Regreso a las seis.
Je ne me lève jamais tôt le dimanche.=Nunca me levanto temprano los domingos.`);

/* ---------------- A2 ---------------- */

GS.U('A2', 'Temps libre', 'Pasatiempos, faire y la negación', '⚽',
{ t: 'La negación ne… pas', ct: 'pres', v: `faire=hacer,jouer=jugar/tocar,regarder=ver,écouter=escuchar,lire=leer`, k: 'ne pas jamais plus rien',
n: `La negación **rodea** al verbo:
|ne… pas|no: je ne danse pas
|ne… jamais|nunca: je ne danse jamais
|ne… plus|ya no: je ne danse plus
|ne… rien|nada: je ne vois rien
|ne… personne|nadie: je ne vois personne
Antes de vocal: **n'**: «je n'écoute pas».
**Faire** (hacer): je fais, tu fais, il fait, nous faisons, vous faites, ils font.
!jouer **au** football (deporte = jugar) / jouer **de la** guitare (instrumento = tocar).
!Al hablar rápido los franceses se comen el «ne»: «je sais pas». En un examen, escríbelo siempre.` },
`le sport=el deporte
le football=el futbol=⚽
le basket=el básquet=🏀
la natation=la natación=🏊
le vélo=la bici=🚲
la musique=la música=🎵
la guitare=la guitarra=🎸
le piano=el piano=🎹
la danse=el baile=💃
le film=la película=🎬
la série=la serie=📺
le jeu vidéo=el videojuego=🎮
le livre=el libro=📖
la photo=la foto=📷
la plage=la playa=🏖️
la montagne=la montaña=⛰️
faire=hacer
jouer=jugar/tocar
nager=nadar
danser=bailar
chanter=cantar=🎤
lire=leer
regarder=ver/mirar
écouter=escuchar=🎧
le week-end=el fin de semana
le temps libre=el tiempo libre
rien=nada
personne=nadie
ensemble=juntos
la fête=la fiesta=🎉`,
`Je fais du sport le week-end.=Hago deporte el fin de semana.
Il joue au football.=Él juega futbol.
Elle joue de la guitare.=Ella toca la guitarra.
Je ne regarde pas la télé.=No veo la tele.
Nous ne dansons jamais.=Nunca bailamos.
Tu fais de la natation ?=¿Haces natación?
Ils ne jouent plus aux jeux vidéo.=Ya no juegan videojuegos.
Je n'écoute rien.=No escucho nada.
On regarde un film ensemble ?=¿Vemos una película juntos?
Qu'est-ce que tu fais ce soir ?=¿Qué haces esta noche?`);

GS.U('A2', 'La météo', 'Clima y estaciones', '⛅',
{ t: 'Il fait… y el clima', ct: 'pres', v: `faire=hacer,pleuvoir=llover`, k: 'fait il pleut neige chaud froid beau',
n: `Para el clima casi todo empieza con **il fait** (hace):
|il fait beau|hace buen tiempo
|il fait chaud / froid|hace calor / frío
|il fait vingt degrés|hace veinte grados
Algunos verbos propios:
|il pleut|llueve
|il neige|nieva
|il y a du vent|hay viento
Estaciones: **au** printemps, **en** été, **en** automne, **en** hiver.
!«Le temps» es el tiempo (clima y reloj). «La météo» es el pronóstico.
!«J'ai chaud» = tengo calor (tu cuerpo). «Il fait chaud» = hace calor (el ambiente).` },
`le temps=el clima/el tiempo
le soleil=el sol=☀️
la pluie=la lluvia=🌧️
la neige=la nieve=❄️
le vent=el viento=💨
le nuage=la nube=☁️
l'orage=la tormenta=⛈️
il pleut=llueve/está lloviendo
il neige=nieva/está nevando
il fait beau=hace buen tiempo
il fait chaud=hace calor=🥵
il fait froid=hace frío=🥶
il fait mauvais=hace mal tiempo
le printemps=la primavera=🌷
l'été=el verano=🌞
l'automne=el otoño=🍂
l'hiver=el invierno=⛄
la température=la temperatura=🌡️
le degré=el grado
le parapluie=el paraguas=☂️
la saison=la estación del año
humide=húmedo
sec=seco
la chaleur=el calor
le ciel=el cielo
l'arc-en-ciel=el arcoíris=🌈
la météo=el pronóstico/el clima
le brouillard=la niebla=🌫️
frais=fresco
la tempête=la tempestad`,
`Quel temps fait-il ?=¿Qué tiempo hace?
Il fait très chaud aujourd'hui.=Hace mucho calor hoy.
Il pleut depuis ce matin.=Llueve desde esta mañana.
En hiver, il neige.=En invierno, nieva.
Il fait vingt degrés.=Hace veinte grados.
Prends ton parapluie !=¡Llévate tu paraguas!
Le ciel est bleu.=El cielo es azul.
J'aime l'automne.=Me gusta el otoño.
Il y a du vent.=Hay viento.
Au printemps, il fait frais.=En primavera hace fresco.`);

GS.U('A2', 'Les courses', 'Compras y demostrativos', '🛍️',
{ t: 'Ce, cet, cette, ces', ct: 'pres', v: `acheter=comprar,vendre=vender`, k: 'ce cette ces cet',
n: `Los demostrativos sirven para «este/ese» (el francés no distingue entre los dos):
|ce pantalon|este pantalón (masculino)
|cet appartement|este depa (masculino + vocal)
|cette robe|este vestido (femenino)
|ces chaussures|estos zapatos (plural)
Para preguntar precio: «Combien coûte… ?» / «C'est combien ?»
**Acheter** cambia acento: j'ach**è**te, nous achetons.
!«Je voudrais» (quisiera) es la forma amable de pedir. «Je veux» suena muy directo.
!«Essayer» es probarse ropa. Probar comida es «goûter».` },
`acheter=comprar
vendre=vender
payer=pagar
coûter=costar
combien=cuánto
le prix=el precio=🏷️
l'argent=el dinero=💵
la carte bancaire=la tarjeta=💳
la monnaie=el cambio/las monedas=🪙
le magasin=la tienda=🏬
la caisse=la caja
le client=el cliente
le vendeur=el vendedor
les soldes=las rebajas/las ofertas
pas cher=barato
gratuit=gratis
le ticket=el ticket/el recibo=🧾
le panier=la canasta=🧺
essayer=probarse/intentar
ce=este/ese
cette=esta/esa
ces=estos/esos
cet=este/ese
le kilo=el kilo
la bouteille=la botella=🍾
la boîte=la caja/la lata
le paquet=el paquete=📦
l'euro=el euro=💶
je voudrais=quisiera/me gustaría
le centre commercial=la plaza comercial`,
`Combien coûte ce pantalon ?=¿Cuánto cuesta este pantalón?
Je voudrais un kilo de tomates.=Quisiera un kilo de jitomates.
Cette robe est trop chère.=Este vestido es demasiado caro.
Je peux payer par carte ?=¿Puedo pagar con tarjeta?
Ces chaussures sont en soldes.=Estos zapatos están en oferta.
Ça fait dix euros.=Son diez euros.
Je peux essayer cette veste ?=¿Me puedo probar esta chamarra?
Cet appartement est grand.=Este departamento es grande.
Le magasin ferme à huit heures.=La tienda cierra a las ocho.
Vous avez de la monnaie ?=¿Tiene cambio?`);

GS.U('A2', 'Voyager', 'Viajes y passé composé', '✈️',
{ t: 'Passé composé con avoir', ct: 'pc', v: `visiter=visitar,prendre=tomar,acheter=comprar,faire=hacer,voir=ver,manger=comer`, k: 'ai as a avons avez ont',
n: `El **passé composé** = tu pretérito: «visité, comí, vi».
Se forma con **avoir** + participio:
|j'ai visité|visité
|tu as mangé|comiste
|il a fini|terminó
|nous avons vendu|vendimos
Participios: -er → **-é**, -ir → **-i**, -re → **-u**. Irregulares importantes:
|faire → fait|prendre → pris
|voir → vu|boire → bu
|avoir → eu|être → été
!Aunque se parece a «he visitado», en francés se usa para TODO el pasado terminado: «Ayer comí tacos» = «Hier, j'ai mangé des tacos».` },
`le voyage=el viaje=🧳
voyager=viajar
l'avion=el avión=✈️
le train=el tren=🚆
le bus=el camión/el autobús=🚌
la voiture=el carro/el coche=🚗
le métro=el metro=🚇
le bateau=el barco=🚢
l'aéroport=el aeropuerto
le billet=el boleto=🎫
le passeport=el pasaporte=🛂
la valise=la maleta=🧳
l'hôtel=el hotel=🏨
réserver=reservar
visiter=visitar
le touriste=el turista
le pays=el país
la carte postale=la postal=💌
les vacances=las vacaciones=🏝️
partir=salir/irse
arriver=llegar
le départ=la salida
l'arrivée=la llegada
en retard=tarde/con retraso
à l'heure=a tiempo
la frontière=la frontera
j'ai voyagé=viajé
j'ai visité=visité
nous avons pris=tomamos
la ceinture=el cinturón`,
`J'ai visité Paris l'année dernière.=Visité París el año pasado.
Nous avons pris le train.=Tomamos el tren.
Tu as réservé l'hôtel ?=¿Reservaste el hotel?
Elle a perdu son passeport.=Ella perdió su pasaporte.
Ils ont acheté les billets.=Ellos compraron los boletos.
L'avion est en retard.=El avión está retrasado.
J'ai fait ma valise.=Hice mi maleta.
Vous avez aimé le voyage ?=¿Les gustó el viaje?
On a mangé à l'hôtel.=Comimos en el hotel.
J'ai vu la tour Eiffel.=Vi la Torre Eiffel.`);

GS.U('A2', 'La santé', 'Cuerpo, salud y être en pasado', '🩺',
{ t: 'Passé composé con être', ct: 'pc', v: `aller=ir,venir=venir,arriver=llegar,partir=irse,tomber=caerse,rester=quedarse`, k: 'suis es est sommes êtes sont',
n: `Unos 16 verbos de movimiento usan **être** en vez de avoir. Truco: la casa de **Dr & Mrs Vandertramp**:
|aller, venir, arriver, partir|ir, venir, llegar, irse
|entrer, sortir, monter, descendre|entrar, salir, subir, bajar
|naître, mourir, rester, tomber|nacer, morir, quedarse, caerse
Con être el participio **concuerda**: «elle est allé**e**», «ils sont parti**s**».
Todos los verbos pronominales también usan être: «je me suis levé».
!«J'ai mal à la tête» = me duele la cabeza. Literal: «tengo dolor a la cabeza».
!«Je suis né à Puebla» = nací en Puebla.` },
`la tête=la cabeza
les yeux=los ojos=👀
l'œil=el ojo=👁️
le nez=la nariz=👃
la bouche=la boca=👄
l'oreille=la oreja=👂
la main=la mano=✋
le bras=el brazo=💪
la jambe=la pierna=🦵
le pied=el pie=🦶
le dos=la espalda
le ventre=la panza/el estómago
le cœur=el corazón=❤️
la dent=el diente=🦷
le médecin=el doctor/el médico=🩺
malade=enfermo=🤒
la fièvre=la fiebre
le rhume=el resfriado/la gripa=🤧
le médicament=la medicina=💊
j'ai mal à=me duele
fatigué=cansado=😴
la santé=la salud
tomber=caerse/caer
rester=quedarse
la douleur=el dolor
guérir=curarse/sanar
le rendez-vous=la cita
la toux=la tos
l'ordonnance=la receta médica
se sentir=sentirse`,
`J'ai mal à la tête.=Me duele la cabeza.
Je suis tombé dans la rue.=Me caí en la calle.
Elle est allée chez le médecin.=Ella fue al doctor.
Nous sommes restés à la maison.=Nos quedamos en casa.
Il est arrivé à l'hôpital.=Él llegó al hospital.
Tu es malade ?=¿Estás enfermo?
J'ai de la fièvre.=Tengo fiebre.
Ils sont partis tôt.=Ellos se fueron temprano.
Je ne me sens pas bien.=No me siento bien.
Je suis né à Guadalajara.=Nací en Guadalajara.`);

GS.U('A2', 'Au travail', 'Profesiones y futuro próximo', '💼',
{ t: 'Futur proche: aller + infinitivo', ct: 'fp', v: `chercher=buscar,travailler=trabajar,trouver=encontrar,gagner=ganar,avoir=tener,faire=hacer`, k: 'vais vas va allons allez vont',
n: `Igual que «voy a trabajar»: **aller + infinitivo**.
|je vais travailler|voy a trabajar
|tu vas chercher|vas a buscar
|il va gagner|va a ganar
|nous allons avoir|vamos a tener
|vous allez faire|van a hacer
|ils vont trouver|van a encontrar
Negativo: «je **ne** vais **pas** travailler».
Las profesiones no llevan artículo después de être: «Il est cuisinier» (es cocinero).
!«Qu'est-ce que tu fais dans la vie ?» = ¿a qué te dedicas?
!«Sympa» = buena onda. «Le patron» = el jefe.` },
`le travail=el trabajo/la chamba
le bureau=la oficina/el escritorio=🏢
le patron=el jefe
le collègue=el compañero de trabajo
le salaire=el sueldo/el salario=💰
la réunion=la junta/la reunión
l'entreprise=la empresa
l'avocat=el abogado=⚖️
l'ingénieur=el ingeniero
le professeur=el maestro/el profesor=👨‍🏫
le cuisinier=el cocinero=👨‍🍳
l'infirmier=el enfermero
le serveur=el mesero
le policier=el policía=👮
l'étudiant=el estudiante
le chômage=el desempleo
l'entretien=la entrevista
le CV=el currículum=📄
chercher=buscar
trouver=encontrar
gagner=ganar
embaucher=contratar
le projet=el proyecto
l'ordinateur=la computadora=💻
le courriel=el correo electrónico=📧
la retraite=la jubilación
le métier=el oficio/la profesión
sympa=buena onda/amable
devenir=volverse/llegar a ser
l'usine=la fábrica=🏭`,
`Je vais chercher un travail.=Voy a buscar un trabajo.
Elle va devenir ingénieure.=Ella va a ser ingeniera.
Nous allons avoir une réunion.=Vamos a tener una junta.
Mon patron est sympa.=Mi jefe es buena onda.
Tu vas envoyer ton CV ?=¿Vas a mandar tu currículum?
Il travaille dans une entreprise.=Él trabaja en una empresa.
Ils vont embaucher deux serveurs.=Van a contratar a dos meseros.
J'ai un entretien demain.=Tengo una entrevista mañana.
Mon frère est cuisinier.=Mi hermano es cocinero.
Qu'est-ce que tu fais dans la vie ?=¿A qué te dedicas?`);

GS.U('A2', "À l'école", 'Escuela: poder, querer, deber', '🎒',
{ t: 'Pouvoir, vouloir, devoir', ct: 'pres', v: `pouvoir=poder,vouloir=querer,devoir=deber,apprendre=aprender,comprendre=entender`, k: 'peux peut veux veut dois doit pouvons voulons devons',
n: `Tres verbos clave que van seguidos de infinitivo:
|pouvoir|je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent
|vouloir|je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent
|devoir|je dois, tu dois, il doit, nous devons, vous devez, ils doivent
«Je dois étudier» = tengo que estudiar. **Devoir** cubre «tener que» y «deber».
!«La note» = la calificación. «Le stylo» = la pluma (para escribir).
!«Réussir un examen» = aprobar / pasar. «Passer un examen» = presentar un examen (¡no significa pasarlo!).` },
`le cours=la clase
la classe=el salón/el grupo
l'examen=el examen=📝
la note=la calificación
le cahier=el cuaderno=📓
le stylo=la pluma=🖊️
le crayon=el lápiz=✏️
la gomme=la goma
le tableau=el pizarrón
la règle=la regla=📏
le sac à dos=la mochila=🎒
les devoirs=la tarea
l'université=la universidad=🎓
apprendre=aprender
comprendre=entender/comprender
répondre=responder/contestar
la question=la pregunta=❓
la réponse=la respuesta
la bibliothèque=la biblioteca=📚
pouvoir=poder
vouloir=querer
devoir=deber/tener que
réussir=aprobar/tener éxito
échouer=reprobar/fracasar
le diplôme=el título/el diploma
la matière=la materia
les mathématiques=las matemáticas=➗
l'histoire=la historia
la récréation=el recreo
l'élève=el alumno`,
`Je peux poser une question ?=¿Puedo hacer una pregunta?
Tu dois faire tes devoirs.=Tienes que hacer tu tarea.
Elle veut étudier à l'université.=Ella quiere estudiar en la universidad.
Nous ne pouvons pas venir.=No podemos venir.
Vous voulez un stylo ?=¿Quieren una pluma?
Il doit réussir l'examen.=Él tiene que aprobar el examen.
Je ne comprends pas la question.=No entiendo la pregunta.
Ils veulent apprendre le français.=Quieren aprender francés.
On peut aller à la bibliothèque.=Podemos ir a la biblioteca.
J'ai une bonne note en maths.=Tengo buena calificación en mate.`);

GS.U('A2', 'Au restaurant', 'Restaurante y pronombres le, la, les', '🍽️',
{ t: 'Pronombres de objeto directo', ct: 'pres', v: `commander=pedir/ordenar,goûter=probar,prendre=tomar,voir=ver`, k: 'le la les',
n: `Para no repetir el objeto: «¿Ves el menú? — Sí, **lo** veo».
|le|lo: je le vois
|la|la: je la goûte
|l'|lo/la antes de vocal: je l'aime
|les|los, las: je les prends
Van **antes** del verbo, como en español: «Je **la** veux» (la quiero).
Con negación: «Je ne **le** vois pas».
!En un restaurante pide «l'addition», no «la cuenta». Y la propina («le pourboire») ya viene incluida en el precio en Francia.
!«L'entrée» es el primer tiempo, no el plato fuerte.` },
`la carte=el menú/la carta=📋
le menu=el menú del día
l'entrée=la entrada/el primer tiempo
le plat=el platillo/el plato fuerte=🍽️
le dessert=el postre=🍮
la boisson=la bebida=🥤
le vin=el vino=🍷
la bière=la cerveza=🍺
l'addition=la cuenta=🧾
le pourboire=la propina
la fourchette=el tenedor=🍴
le couteau=el cuchillo=🔪
la cuillère=la cuchara=🥄
l'assiette=el plato
le verre=el vaso
la salade=la ensalada=🥗
les pâtes=la pasta=🍝
la glace=el helado=🍨
la crêpe=la crepa=🥞
commander=pedir/ordenar
goûter=probar
délicieux=delicioso=😋
épicé=picante=🌶️
bien cuit=bien cocido
végétarien=vegetariano
l'allergie=la alergia
la table=la mesa
le serveur=el mesero
la serviette en papier=la servilleta
la sauce=la salsa`,
`L'addition, s'il vous plaît.=La cuenta, por favor.
Je voudrais commander.=Quisiera ordenar.
Ce plat est très épicé.=Este platillo es muy picante.
Tu la veux ?=¿La quieres?
Je la goûte.=La pruebo.
Vous avez une table pour deux ?=¿Tiene una mesa para dos?
Le dessert est délicieux.=El postre está delicioso.
Je suis végétarien.=Soy vegetariano.
On laisse un pourboire ?=¿Dejamos propina?
Je ne le vois pas.=No lo veo.`);
