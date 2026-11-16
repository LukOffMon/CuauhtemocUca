/* Grey~Spell — Ruso para hispanohablantes de México. 48 unidades A1–C2.
   Se puede contestar en cirílico o en transliteración latina. */
window.GS = window.GS || { units: [] };
GS.extra = GS.extra || {};
GS.P = GS.P || function (c, lv, t, es, ic, g, w, s) { (GS.extra[c] = GS.extra[c] || { units: [] }).units.push({ lv, t, es, ic, g, w, s }); };
GS.extra.ru = GS.extra.ru || { units: [] };
const RU = (...a) => GS.P('ru', ...a);

RU('A1', 'Привет!', 'Saludos y el alfabeto', '👋', { t: 'Sin verbo «ser» en presente', k: 'я ты он она мы',
n: `¡En presente no se dice «soy»! «Я студент» = (yo) soy estudiante.
|я|yo
|ты|tú (informal)
|он / она|él / ella
|мы|nosotros
|вы|ustedes / usted
|они|ellos
!El cirílico tiene 33 letras; muchas ya las conoces: А, К, М, О, Т. Ojo: Р = r, Н = n, В = v, С = s.` },
`привет=hola=👋
здравствуйте=buenos días (formal)/hola (formal)
доброе утро=buenos días=🌅
добрый вечер=buenas noches=🌙
пока=adiós/bye
до свидания=hasta luego
спасибо=gracias=🙏
пожалуйста=por favor/de nada
да=sí=👍
нет=no=👎
извините=disculpe/perdón
я=yo
ты=tú
меня зовут=me llamo
очень приятно=mucho gusto=🤝
как дела?=¿cómo estás?/¿qué tal?`,
`Привет, меня зовут Анна.=Hola, me llamo Anna.
Как дела?=¿Cómo estás?
Хорошо, спасибо.=Bien, gracias.
Я из Мексики.=Soy de México.
Очень приятно!=¡Mucho gusto!
Пока, до завтра!=¡Adiós, hasta mañana!`);

RU('A1', 'Семья', 'Familia y género', '👨‍👩‍👧', { t: 'Tres géneros y «у меня есть»', k: 'у меня есть мой моя',
n: `El género se ve en la terminación:
|consonante|masculino: брат
|-а / -я|femenino: мама, семья
|-о / -е|neutro: окно
«Tengo» = **у меня есть** (literal: junto a mí hay).
!«Мой брат» (mi hermano), «моя мама» (mi mamá): el posesivo concuerda.` },
`семья=familia=👨‍👩‍👧
папа=papá=👨
мама=mamá=👩
брат=hermano=👦
сестра=hermana=👧
сын=hijo
дочь=hija
бабушка=abuela=👵
дедушка=abuelo=👴
ребёнок=niño/bebé=🧒
муж=esposo
жена=esposa
собака=perro=🐶
кошка=gata/gato=🐱
у меня есть=tengo
друг=amigo`,
`У меня есть брат и сестра.=Tengo un hermano y una hermana.
Мою маму зовут Ольга.=Mi mamá se llama Olga.
У нас есть собака.=Tenemos un perro.
Мой дедушка очень добрый.=Mi abuelo es muy amable.
У тебя есть дети?=¿Tienes hijos?
Это моя бабушка.=Esta es mi abuela.`);

RU('A1', 'Еда', 'Comida y verbos (1.ª conjugación)', '🍽️', { t: 'Presente y acusativo', k: 'ем пью люблю читаю',
n: `1.ª conjugación (читать, leer):
|я читаю|leo
|ты читаешь|lees
|он читает|lee
|мы читаем|leemos
|вы читаете|leen
|они читают|leen
Acusativo femenino: -а → **-у**: «я люблю кашу» (me gusta la avena).
!Irregulares básicos: есть (comer) → я ем; пить (beber) → я пью.` },
`хлеб=pan=🍞
сыр=queso=🧀
яблоко=manzana=🍎
вода=agua=💧
молоко=leche=🥛
кофе=café=☕
чай=té=🍵
мясо=carne=🥩
курица=pollo=🍗
рыба=pescado=🐟
картошка=papa=🥔
суп=sopa=🍲
борщ=borsch (sopa de betabel)
есть=comer
пить=beber/tomar
завтрак=desayuno`,
`Я ем хлеб с сыром.=Como pan con queso.
Она пьёт воду.=Ella toma agua.
Я люблю чай.=Me encanta el té.
Мы едим рыбу.=Comemos pescado.
Ты любишь борщ?=¿Te gusta el borsch?
Завтрак готов.=El desayuno está listo.`);

RU('A1', 'Числа', 'Números, días y hora', '🔢', { t: 'Números y edad', k: 'час часа часов год года лет',
n: `Después de un número el sustantivo cambia:
|1|один час, один год
|2–4|два часа, три года
|5–20|пять часов, двадцать лет
La edad va en dativo: «**Мне** двадцать лет» (a mí 20 años).
!«Сколько тебе лет?» = ¿cuántos años tienes?` },
`один=uno
два=dos
три=tres
четыре=cuatro
пять=cinco
шесть=seis
семь=siete
восемь=ocho
девять=nueve
десять=diez=🔟
двадцать=veinte
сто=cien
понедельник=lunes
суббота=sábado
воскресенье=domingo
сегодня=hoy`,
`Который час?=¿Qué hora es?
Сейчас три часа.=Son las tres.
Сегодня понедельник.=Hoy es lunes.
Мне двадцать лет.=Tengo veinte años.
Сколько тебе лет?=¿Cuántos años tienes?
До субботы!=¡Hasta el sábado!`);

RU('A1', 'Дом', 'La casa y el caso preposicional', '🏠', { t: 'Dónde: в / на + preposicional', k: 'в на доме столе где',
n: `Para decir dónde, el sustantivo termina casi siempre en **-е**:
|дом → в доме|en la casa
|стол → на столе|sobre la mesa
|комната → в комнате|en el cuarto
!«Где?» = ¿dónde? «Здесь» = aquí, «там» = allá.` },
`дом=casa=🏠
квартира=departamento=🏢
комната=cuarto/recámara=🛏️
кухня=cocina=🍳
ванная=baño=🛁
дверь=puerta=🚪
окно=ventana=🪟
стол=mesa
стул=silla=🪑
кровать=cama
ключ=llave=🔑
холодильник=refri
где=dónde
здесь=aquí
там=allá
жить=vivir`,
`Где ключ? Он на столе.=¿Dónde está la llave? Está sobre la mesa.
Я живу в квартире.=Vivo en un departamento.
Кошка в комнате.=La gata está en el cuarto.
Кухня там.=La cocina está allá.
В доме три комнаты.=En la casa hay tres cuartos.
Холодильник на кухне.=El refri está en la cocina.`);

RU('A1', 'Одежда и цвета', 'Ropa, colores y adjetivos', '👕', { t: 'Concordancia de adjetivos', k: 'красный красная красное красные',
n: `|-ый / -ой|masculino: красный
|-ая|femenino: красная
|-ое|neutro: красное
|-ые|plural: красные
!«Красный» (rojo) viene de «красивый» (bonito): la Plaza Roja era «la Plaza Bonita».` },
`красный=rojo=🔴
синий=azul=🔵
зелёный=verde=🟢
жёлтый=amarillo=🟡
чёрный=negro=⚫
белый=blanco=⚪
рубашка=camisa=👔
брюки=pantalón=👖
платье=vestido=👗
футболка=playera=👕
куртка=chamarra=🧥
обувь=zapatos=👞
шапка=gorro=🧢
очки=lentes=👓
красивый=bonito
новый=nuevo`,
`У меня белая рубашка.=Tengo una camisa blanca.
Её платье красное.=Su vestido es rojo.
Это новая куртка.=Es una chamarra nueva.
Она носит очки.=Ella usa lentes.
Чёрные брюки дорогие.=El pantalón negro es caro.
Какая красивая шапка!=¡Qué gorro tan bonito!`);

RU('A1', 'Город', 'La ciudad y verbos de movimiento', '🏙️', { t: 'Идти / ехать + в + acusativo', k: 'иду еду в на',
n: `|идти|ir a pie: я иду
|ехать|ir en vehículo: я еду
Dirección: **в / на + acusativo** (sin -е): «я иду в банк», «я еду на работу».
!Igual que en sueco: hay que decir si vas a pie o en transporte.` },
`город=ciudad=🏙️
улица=calle
банк=banco=🏦
больница=hospital=🏥
школа=escuela=🏫
музей=museo=🏛️
магазин=tienda
аптека=farmacia=💊
парк=parque=🌳
кино=cine=🎬
автобус=camión/autobús=🚌
метро=metro=🚇
налево=a la izquierda=⬅️
направо=a la derecha=➡️
прямо=derecho
идти=ir a pie`,
`Я иду в банк.=Voy al banco (a pie).
Где аптека?=¿Dónde está la farmacia?
Мы едем на метро.=Vamos en metro.
Поверните налево.=Dé vuelta a la izquierda.
Музей прямо.=El museo está derecho.
Пойдём в кино?=¿Vamos al cine?`);

RU('A1', 'Распорядок дня', 'Rutina y verbos en -ся', '⏰', { t: 'Verbos reflexivos -ся', k: 'встаю одеваюсь ложусь',
n: `El reflexivo va **pegado al verbo**: -ся (tras consonante) / -сь (tras vocal).
|я одеваюсь|me visto
|он одевается|se viste
|мы встаём|nos levantamos
!«Утром» = en la mañana, «вечером» = en la noche: sin preposición.` },
`просыпаться=despertarse
вставать=levantarse
принимать душ=bañarse=🚿
одеваться=vestirse
ложиться спать=acostarse=🛌
работать=trabajar=💼
учиться=estudiar=📚
утром=en la mañana=🌅
вечером=en la noche=🌃
рано=temprano
поздно=tarde
всегда=siempre
никогда=nunca
потом=luego
часто=seguido
обычно=normalmente`,
`Я встаю в семь часов.=Me levanto a las siete.
Утром она принимает душ.=En la mañana ella se baña.
Мы поздно ложимся спать.=Nos acostamos tarde.
Потом я завтракаю.=Luego desayuno.
Он всегда работает в понедельник.=Él siempre trabaja los lunes.
Обычно я одеваюсь быстро.=Normalmente me visto rápido.`);

RU('A2', 'Свободное время', 'Pasatiempos: играть в / на', '⚽', { t: 'Играть в / играть на', k: 'не в на',
n: `|играть в футбол|jugar futbol (в + deporte)
|играть на гитаре|tocar la guitarra (на + instrumento)
Negación: **не** antes del verbo: «я не танцую».
!Doble negación obligatoria: «я **никогда не** танцую».` },
`футбол=futbol=⚽
музыка=música=🎵
гитара=guitarra=🎸
фильм=película=🎬
сериал=serie=📺
книга=libro=📖
пляж=playa=🏖️
играть=jugar/tocar
плавать=nadar=🏊
танцевать=bailar=💃
петь=cantar=🎤
читать=leer
смотреть=ver/mirar
выходные=fin de semana
вечеринка=fiesta=🎉
вместе=juntos`,
`Я играю в футбол по выходным.=Juego futbol los fines de semana.
Она играет на гитаре.=Ella toca la guitarra.
Я не смотрю телевизор.=No veo la tele.
Мы никогда не танцуем.=Nunca bailamos.
Давай посмотрим фильм вместе.=Veamos una película juntos.
Он читает книгу.=Él lee un libro.`);

RU('A2', 'Погода', 'Clima y oraciones impersonales', '⛅', { t: 'Oraciones sin sujeto', k: 'холодно тепло идёт',
n: `|холодно|hace frío
|жарко|hace calor
|идёт дождь|llueve (literal: «va la lluvia»)
|идёт снег|nieva
!En Moscú el invierno llega a −25 °C. ¡Por eso «шапка» es palabra vital!` },
`солнце=sol=☀️
дождь=lluvia=🌧️
снег=nieve=❄️
ветер=viento=💨
облако=nube=☁️
гроза=tormenta=⛈️
лето=verano=🌞
зима=invierno=⛄
весна=primavera=🌷
осень=otoño=🍂
тепло=templado/cálido
холодно=hace frío=🥶
жарко=hace calor=🥵
зонт=paraguas=☂️
небо=cielo
градус=grado`,
`Сегодня холодно.=Hoy hace frío.
Идёт дождь.=Está lloviendo.
Зимой идёт снег.=En invierno nieva.
Возьми зонт!=¡Llévate el paraguas!
Небо голубое.=El cielo está azul.
Летом жарко.=En verano hace calor.`);

RU('A2', 'Покупки', 'Compras y genitivo', '🛍️', { t: 'El genitivo: «de» y «no hay»', k: 'нет сколько стоит',
n: `El **genitivo** sirve para «de», cantidades y «no hay»:
|нет хлеба|no hay pan
|бутылка воды|una botella de agua
|сколько стоит?|¿cuánto cuesta?
Masculino +**а**, femenino -а → **-ы / -и**.
!«Сдача» = el cambio. «Касса» = la caja.` },
`купить=comprar
продавать=vender
платить=pagar
стоить=costar
сколько=cuánto
цена=precio=🏷️
деньги=dinero=💵
карта=tarjeta=💳
магазин=tienda=🏬
касса=caja
дёшево=barato
дорого=caro
скидка=descuento
рубль=rublo=💰
сдача=cambio
примерить=probarse`,
`Сколько стоит эта футболка?=¿Cuánto cuesta esta playera?
Можно заплатить картой?=¿Puedo pagar con tarjeta?
У нас нет хлеба.=No tenemos pan.
Можно примерить?=¿Me lo puedo probar?
Это очень дорого.=Es muy caro.
Бутылку воды, пожалуйста.=Una botella de agua, por favor.`);

RU('A2', 'Путешествия', 'Viajes y pasado', '✈️', { t: 'El pasado: -л, -ла, -ло, -ли', k: 'был была были ездил',
n: `¡El pasado cambia por **género**, no por persona!
|он был|él fue / estuvo
|она была|ella fue
|оно было|neutro
|они были|ellos fueron
!Una mujer dice «я была», un hombre «я был».` },
`путешествие=viaje=🧳
путешествовать=viajar
самолёт=avión=✈️
поезд=tren=🚆
машина=carro=🚗
аэропорт=aeropuerto
билет=boleto=🎫
паспорт=pasaporte=🛂
чемодан=maleta=🧳
гостиница=hotel=🏨
бронировать=reservar
приехать=llegar
отпуск=vacaciones=🏝️
страна=país
вчера=ayer
опоздать=llegar tarde`,
`Я был в Москве в прошлом году.=Estuve en Moscú el año pasado.
Мы купили билеты вчера.=Compramos los boletos ayer.
Она забронировала гостиницу.=Ella reservó el hotel.
Поезд опоздал.=El tren llegó tarde.
Они ездили в Петербург.=Fueron a San Petersburgo.
Я потерял паспорт.=Perdí mi pasaporte.`);

RU('A2', 'Здоровье', 'Salud: у меня болит', '🩺', { t: 'Me duele: у меня болит', k: 'болит болят',
n: `|у меня болит голова|me duele la cabeza
|у меня болят зубы|me duelen los dientes
«Болит» concuerda con lo que duele (singular/plural).
!«Будьте здоровы!» = ¡salud! (cuando alguien estornuda).` },
`голова=cabeza
глаз=ojo=👁️
нос=nariz=👃
рот=boca=👄
рука=mano/brazo=✋
нога=pierna/pie=🦵
спина=espalda
живот=panza
сердце=corazón=❤️
зуб=diente=🦷
врач=doctor=🩺
больной=enfermo=🤒
температура=fiebre/temperatura
лекарство=medicina=💊
устал=cansado=😴
болеть=doler/estar enfermo`,
`У меня болит голова.=Me duele la cabeza.
Она была у врача.=Ella fue al doctor.
У меня температура.=Tengo fiebre.
Ты болеешь?=¿Estás enfermo?
Я очень устал.=Estoy muy cansado.
Он сломал руку.=Se rompió el brazo.`);

RU('A2', 'Работа', 'Profesiones y futuro', '💼', { t: 'Futuro con буду + infinitivo', k: 'буду будет будем работать',
n: `Futuro imperfectivo: **быть** + infinitivo:
|я буду работать|voy a trabajar / trabajaré
|ты будешь|vas a…
|мы будем|vamos a…
Profesión con instrumental: «Я работаю **врачом**» (trabajo de doctor).
!«Начальник» = jefe. «Коллега» = colega.` },
`работа=trabajo/chamba
офис=oficina=🏢
начальник=jefe
коллега=compañero de trabajo
зарплата=sueldo=💰
совещание=junta/reunión
компания=empresa
юрист=abogado=⚖️
учитель=maestro=👨‍🏫
повар=cocinero=👨‍🍳
официант=mesero
интервью=entrevista
искать=buscar
найти=encontrar
компьютер=computadora=💻
инженер=ingeniero`,
`Я буду искать работу.=Voy a buscar trabajo.
Она будет врачом.=Ella va a ser doctora.
Завтра будет совещание.=Mañana habrá junta.
Мой начальник очень строгий.=Mi jefe es muy estricto.
Он работает инженером.=Él trabaja de ingeniero.
У меня завтра интервью.=Mañana tengo entrevista.`);

RU('A2', 'Школа', 'Escuela: мочь, хотеть, надо', '🎒', { t: 'Мочь, хотеть, надо', k: 'могу хочу надо нужно',
n: `|мочь|могу, можешь, может, можем, можете, могут
|хотеть|хочу, хочешь, хочет, хотим, хотите, хотят
|мне надо / нужно|necesito, tengo que (con dativo)
!«Можно?» = ¿se puede? Útil para todo: entrar, preguntar, sentarse.` },
`урок=clase
экзамен=examen=📝
оценка=calificación
тетрадь=cuaderno=📓
ручка=pluma=🖊️
карандаш=lápiz=✏️
рюкзак=mochila=🎒
домашнее задание=tarea
университет=universidad=🎓
учить=estudiar/aprender
понимать=entender
вопрос=pregunta=❓
ответ=respuesta
библиотека=biblioteca=📚
можно=se puede
надо=hay que/tengo que`,
`Можно задать вопрос?=¿Puedo hacer una pregunta?
Тебе надо сделать домашнее задание.=Tienes que hacer la tarea.
Она хочет учиться в университете.=Ella quiere estudiar en la universidad.
Я не понимаю вопрос.=No entiendo la pregunta.
Мы не можем прийти.=No podemos venir.
Я получил хорошую оценку.=Saqué buena calificación.`);

RU('A2', 'В ресторане', 'Restaurante y dativo', '🍝', { t: 'Me gusta: мне нравится', k: 'мне тебе нравится нравятся',
n: `Como en español, «gustar» funciona al revés:
|мне нравится борщ|me gusta el borsch
|ему нравятся пельмени|le gustan los pelmeni
Dativo de pronombres: мне, тебе, ему, ей, нам, вам, им.
!«Счёт, пожалуйста» = la cuenta, por favor.` },
`меню=menú=📋
блюдо=platillo=🍽️
десерт=postre=🍮
напиток=bebida=🥤
вино=vino=🍷
пиво=cerveza=🍺
счёт=cuenta=🧾
чаевые=propina
вилка=tenedor=🍴
нож=cuchillo=🔪
ложка=cuchara=🥄
стакан=vaso
вкусно=rico/sabroso=😋
острый=picante=🌶️
заказать=pedir/ordenar
пельмени=pelmeni (empanaditas)=🥟`,
`Счёт, пожалуйста.=La cuenta, por favor.
Я хочу заказать пельмени.=Quiero pedir pelmeni.
Мне нравится этот ресторан.=Me gusta este restaurante.
Очень вкусно!=¡Muy rico!
У вас есть столик на двоих?=¿Tienen una mesa para dos?
Ему не нравится острое.=No le gusta lo picante.`);

RU('B1', 'Детство', 'Infancia y aspecto imperfectivo', '🧸', { t: 'El aspecto imperfectivo', k: 'играл жил читала',
n: `Cada verbo tiene dos versiones (aspectos). El **imperfectivo** = acción habitual o en proceso, como tu copretérito:
|я играл|jugaba
|мы жили|vivíamos
|бабушка рассказывала|mi abuela contaba
!Si en español dices «-aba / -ía», en ruso casi siempre va imperfectivo.` },
`детство=infancia
воспоминание=recuerdo
игрушка=juguete=🧸
кукла=muñeca=🪆
мяч=pelota=⚽
сосед=vecino
двор=patio
играть=jugar
расти=crecer
помнить=recordar
рассказывать=contar
застенчивый=tímido
плакать=llorar=😢
смеяться=reír=😂
конфета=dulce=🍬
дача=casa de campo`,
`Когда я был маленьким, я жил в Пуэбле.=Cuando era niño, vivía en Puebla.
Мы играли во дворе.=Jugábamos en el patio.
Бабушка рассказывала сказки.=Mi abuela contaba cuentos.
Он был очень застенчивым.=Él era muy tímido.
Каждое лето мы ездили на дачу.=Cada verano íbamos a la casa de campo.
Я помню свою школу.=Me acuerdo de mi escuela.`);

RU('B1', 'Природа', 'Naturaleza: perfectivo vs imperfectivo', '🌲', { t: 'Perfectivo o imperfectivo', k: 'гуляли начался увидел',
n: `El **perfectivo** = acción completa, un resultado (tu pretérito):
|Мы гуляли…|Paseábamos… (imperfectivo)
|…когда начался дождь.|…cuando empezó a llover. (perfectivo)
Pares: делать / сделать, читать / прочитать, видеть / увидеть.
!Es el reto número uno del ruso. Tú ya tienes la intuición gracias al español.` },
`природа=naturaleza
лес=bosque=🌲
дерево=árbol=🌳
цветок=flor=🌸
река=río=🏞️
озеро=lago
море=mar=🌊
остров=isla=🏝️
птица=pájaro=🐦
лошадь=caballo=🐴
корова=vaca=🐄
медведь=oso=🐻
волк=lobo=🐺
лиса=zorro=🦊
бабочка=mariposa=🦋
гулять=pasear`,
`Мы гуляли в лесу, когда начался дождь.=Paseábamos en el bosque cuando empezó a llover.
Я увидел медведя!=¡Vi un oso!
Птицы пели всё утро.=Los pájaros cantaron toda la mañana.
Байкал — самое глубокое озеро в мире.=El Baikal es el lago más profundo del mundo.
Мы сделали фото у реки.=Tomamos una foto junto al río.
Лиса быстро убежала.=El zorro huyó rápido.`);

RU('B1', 'Технологии', 'Tecnología y futuro perfectivo', '📱', { t: 'Futuro perfectivo', k: 'скачаю напишу отправлю',
n: `El presente de un verbo **perfectivo** = futuro:
|я скачаю|descargaré (y quedará hecho)
|я напишу|escribiré
|я отправлю|enviaré
!«Буду скачивать» = estaré descargando (proceso). «Скачаю» = lo descargo (resultado).` },
`телефон=teléfono/celular=📱
ноутбук=laptop=💻
экран=pantalla=🖥️
клавиатура=teclado=⌨️
мышь=mouse=🖱️
приложение=app/aplicación
пароль=contraseña=🔑
соцсети=redes sociales
сообщение=mensaje=💬
скачать=descargar=⬇️
отправить=enviar/mandar
сохранить=guardar
удалить=borrar
батарея=batería=🔋
зарядка=cargador=🔌
файл=archivo=📁`,
`Завтра я скачаю приложение.=Mañana descargaré la aplicación.
Я забыл пароль.=Olvidé la contraseña.
Отправь мне файл, пожалуйста.=Mándame el archivo, por favor.
У телефона села батарея.=Al celular se le acabó la batería.
Я напишу тебе сообщение.=Te escribiré un mensaje.
Не удаляй этот файл!=¡No borres ese archivo!`);

RU('B1', 'Эмоции', 'Emociones con dativo', '😊', { t: 'Мне грустно: emociones en dativo', k: 'мне грустно скучаю',
n: `Muchos estados van con **dativo + adverbio**:
|мне грустно|estoy triste (a mí triste)
|мне скучно|estoy aburrido
|мне страшно|tengo miedo
!«Я скучаю по тебе» = te extraño.` },
`счастливый=feliz=😊
грустный=triste=😢
сердитый=enojado=😠
волноваться=preocuparse/estar nervioso=😟
удивлённый=sorprendido=😲
гордый=orgulloso
ревновать=sentir celos
бояться=tener miedo=😱
радость=alegría
любовь=amor=❤️
стыдно=da vergüenza
обнимать=abrazar=🤗
улыбаться=sonreír=😄
скучать=extrañar/aburrirse
помогать=ayudar
спокойно=tranquilo`,
`Я скучаю по тебе.=Te extraño.
Мне грустно сегодня.=Hoy estoy triste.
Она боится пауков.=Ella les tiene miedo a las arañas.
Не волнуйся!=¡No te preocupes!
Мне стыдно за ошибку.=Me da pena el error.
Они гордятся сыном.=Están orgullosos de su hijo.`);

RU('B1', 'СМИ', 'Medios y genitivo plural', '📰', { t: 'El genitivo plural', k: 'много новостей статей',
n: `Tras «много», «мало», «сколько» y números de 5 en adelante:
|новость → новостей|noticias
|статья → статей|artículos
|канал → каналов|canales
!СМИ = средства массовой информации (medios de comunicación).` },
`новости=noticias=📰
газета=periódico
журналист=periodista
статья=artículo
телевизор=televisión=📺
радио=radio=📻
канал=canal
передача=programa
реклама=anuncio/publicidad
источник=fuente
опубликовать=publicar
в прямом эфире=en vivo
фейк=noticia falsa
читатель=lector
заголовок=titular
журнал=revista`,
`Я читаю новости в интернете.=Leo las noticias en internet.
По телевизору много рекламы.=En la tele hay mucha publicidad.
Матч идёт в прямом эфире.=El partido es en vivo.
Это фейк.=Es una noticia falsa.
Журналист опубликовал статью.=El periodista publicó un artículo.
Сколько каналов ты смотришь?=¿Cuántos canales ves?`);

RU('B1', 'Мечты', 'Sueños y condicional con бы', '💭', { t: 'El condicional: бы', k: 'бы если',
n: `**pasado + бы** = condicional (¡fácil!):
|я бы поехал|yo iría
|если бы я был богат, я бы…|si fuera rico, yo…
|я хотел бы|me gustaría
!«Бы» puede ir casi en cualquier lugar de la frase, normalmente tras la primera palabra.` },
`мечта=sueño (anhelo)=💭
мечтать=soñar
будущее=futuro
цель=meta=🎯
жизнь=vida
мир=mundo/paz=🌍
удача=suerte=🍀
известный=famoso=⭐
переехать=mudarse=📦
за границей=en el extranjero
надежда=esperanza
надеяться=esperar/ojalá
может быть=tal vez
когда-нибудь=algún día
приключение=aventura
осуществить=cumplir/realizar`,
`Если бы я был богат, я бы путешествовал по миру.=Si fuera rico, viajaría por el mundo.
Я хотел бы жить в Петербурге.=Me gustaría vivir en San Petersburgo.
Ты мог бы мне помочь?=¿Podrías ayudarme?
Когда-нибудь я осуществлю мечту.=Algún día cumpliré mi sueño.
Что бы ты сделал на моём месте?=¿Qué harías en mi lugar?
Я надеюсь, что ты придёшь.=Espero que vengas.`);

RU('B1', 'Мнения', 'Opiniones y чтобы', '🗣️', { t: 'Чтобы: el «subjuntivo» ruso', k: 'чтобы думаю считаю',
n: `**хотеть, чтобы + pasado** = querer que:
|Я хочу, чтобы ты пришёл.|Quiero que vengas.
|Надо, чтобы мы поговорили.|Hace falta que hablemos.
Opinar: «я думаю, что…», «я считаю, что…».
!«По-моему» = en mi opinión. Muy usado.` },
`мнение=opinión
по-моему=en mi opinión
думать=pensar
считать=considerar/opinar
согласен=de acuerdo=👍
прав=tener razón
аргумент=argumento
убедить=convencer
спор=discusión/debate
решение=solución/decisión
проблема=problema
важно=es importante
сомневаться=dudar
конечно=claro/por supuesto
однако=sin embargo
наоборот=al contrario`,
`Я хочу, чтобы ты пришёл.=Quiero que vengas.
По-моему, ты прав.=En mi opinión, tienes razón.
Я не согласен с тобой.=No estoy de acuerdo contigo.
Важно, чтобы мы поговорили.=Es importante que hablemos.
Конечно, я приду!=¡Claro que voy!
Я сомневаюсь, что он знает ответ.=Dudo que él sepa la respuesta.`);

RU('B1', 'Общество', 'Sociedad y который', '🏛️', { t: 'El relativo который', k: 'который которая где',
n: `**который** = que, el cual. Concuerda en género con lo anterior y lleva el caso de su función:
|человек, который говорит|la persona que habla
|книга, которую я читаю|el libro que leo
|город, где я родился|la ciudad donde nací
!Siempre hay coma antes de «который».` },
`общество=sociedad
гражданин=ciudadano
население=población
мэр=alcalde/presidente municipal
здание=edificio=🏢
пробка=embotellamiento/tráfico=🚦
тротуар=banqueta
загрязнение=contaminación=🏭
шум=ruido=🔊
аренда=renta
жильё=vivienda
безопасность=seguridad
волонтёр=voluntario
забастовка=huelga
общественный транспорт=transporte público
пригород=afueras`,
`Это город, где я родился.=Es la ciudad donde nací.
Человек, который говорит, — мэр.=La persona que habla es el alcalde.
Книга, которую я читаю, интересная.=El libro que leo es interesante.
В центре большие пробки.=En el centro hay mucho tráfico.
Аренда слишком дорогая.=La renta es demasiado cara.
Волонтёры, которые помогают, замечательные.=Los voluntarios que ayudan son maravillosos.`);

RU('B2', 'Экология', 'Medio ambiente y prefijos de movimiento', '🌎', { t: 'Prefijos con verbos de movimiento', k: 'пришёл ушёл вошёл',
n: `Los prefijos cambian el movimiento:
|при-|llegar: прийти
|у-|irse: уйти
|в-|entrar: войти
|вы-|salir: выйти
|пере-|cruzar, mudarse: перейти, переехать
!Con esto se describe cualquier movimiento con precisión.` },
`экология=ecología=🌎
климат=clima
глобальное потепление=calentamiento global=🔥
планета=planeta=🌍
возобновляемая энергия=energía renovable
солнечная панель=panel solar=☀️
перерабатывать=reciclar=♻️
мусор=basura=🗑️
пластик=plástico
тратить=gastar/desperdiciar
экономить=ahorrar
защищать=proteger
засуха=sequía
наводнение=inundación=🌊
вырубка лесов=deforestación
выбросы=emisiones`,
`Нужно экономить воду.=Hay que ahorrar agua.
Жаль, что люди выбрасывают так много мусора.=Es una lástima que la gente tire tanta basura.
Надо защищать леса.=Hay que proteger los bosques.
Выбросы должны сократиться.=Las emisiones deben reducirse.
Он вышел из дома и перешёл улицу.=Salió de casa y cruzó la calle.
Мы переехали в другой город.=Nos mudamos a otra ciudad.`);

RU('B2', 'Карьера', 'Carrera y antes de', '📈', { t: 'Secuencia de acciones', k: 'уже перед после',
n: `El ruso no tiene pluscuamperfecto: usa el perfectivo + **уже** (ya):
|Когда я пришёл, совещание уже началось.|Cuando llegué, la junta ya había empezado.
|перед тем как|antes de que
|после того как|después de que
!«Уволиться» = renunciar. «Уволить» = despedir.` },
`карьера=carrera profesional
повышение=ascenso
уволиться=renunciar
уволить=despedir
договор=contrato=📝
стажировка=prácticas profesionales
профсоюз=sindicato
сверхурочные=horas extra
удалёнка=home office/trabajo remoto=🏠
опыт=experiencia
срок=plazo
руководить=dirigir
договариваться=negociar
прибавка=aumento
должность=puesto
неполный день=medio tiempo`,
`Когда я пришёл, совещание уже началось.=Cuando llegué, la junta ya había empezado.
Она уволилась до кризиса.=Ella renunció antes de la crisis.
Мы закончили проект в срок.=Terminamos el proyecto a tiempo.
Я работаю на удалёнке.=Trabajo en home office.
Его повысили в должности.=Lo ascendieron de puesto.
Я попросил прибавку.=Pedí un aumento.`);

RU('B2', 'Искусство', 'Arte y adjetivos cortos', '🎨', { t: 'Adjetivos cortos', k: 'красив готов рад',
n: `Muchos adjetivos tienen forma corta, usada como predicado:
|он красив / она красива|él es / ella es guapo(a)
|я рад(а)|me alegro
|готов(а)|listo(a)
|занят(а)|ocupado(a)
!«Рад» solo existe en forma corta: «Рад тебя видеть» (me alegra verte).` },
`искусство=arte=🎨
картина=cuadro
художник=pintor/artista
живопись=pintura
скульптура=escultura=🗿
выставка=exposición
произведение=obra
шедевр=obra maestra
театр=teatro=🎭
актёр=actor
роман=novela
писатель=escritor=✍️
стихотворение=poema
зрители=público
аплодировать=aplaudir=👏
балет=ballet=🩰`,
`Рад тебя видеть!=¡Me alegra verte!
Эта картина — настоящий шедевр.=Ese cuadro es una auténtica obra maestra.
Зрители долго аплодировали.=El público aplaudió largo rato.
Большой театр знаменит своим балетом.=El Bolshói es famoso por su ballet.
Я занят, позвони позже.=Estoy ocupado, llama más tarde.
Выставка открыта до мая.=La exposición está abierta hasta mayo.`);

RU('B2', 'Политика', 'Política y participios pasivos', '🗳️', { t: 'La voz pasiva', k: 'принят избран построен',
n: `Participio pasivo corto + быть:
|закон был принят|la ley fue aprobada
|президент избран|el presidente es elegido
|дом построен|la casa está construida
!Es la voz de los noticieros y los documentos oficiales.` },
`политика=política
правительство=gobierno
президент=presidente
выборы=elecciones=🗳️
голосовать=votar
голос=voto/voz
депутат=diputado
закон=ley=⚖️
конституция=constitución
демократия=democracia
право=derecho
свобода=libertad=🕊️
равенство=igualdad
налог=impuesto
партия=partido político
власть=poder`,
`Закон был принят парламентом.=La ley fue aprobada por el parlamento.
Президент избран на шесть лет.=El presidente es elegido por seis años.
Налоги будут повышены.=Los impuestos serán aumentados.
Голосовать — это право гражданина.=Votar es un derecho del ciudadano.
Кандидата критиковали в прессе.=Criticaron al candidato en la prensa.
Решение будет принято завтра.=La decisión será tomada mañana.`);

RU('B2', 'Наука', 'Ciencia e hipótesis pasada', '🔬', { t: 'Если бы… (pasado irreal)', k: 'бы если',
n: `En ruso, «si fuera» y «si hubiera sido» se dicen IGUAL: el contexto decide.
|Если бы я знал, я бы пришёл.|Si hubiera sabido, habría venido.
!Mendeléyev (tabla periódica) y Gagarin (primer humano en el espacio) son orgullo nacional.` },
`наука=ciencia=🔬
учёный=científico
исследование=investigación
лаборатория=laboratorio=🧪
открытие=descubrimiento
вакцина=vacuna=💉
вирус=virus=🦠
болезнь=enfermedad
лечение=tratamiento
мозг=cerebro=🧠
кровь=sangre=🩸
кость=hueso=🦴
здоровый=sano
предотвратить=prevenir
теория=teoría
доказать=demostrar`,
`Если бы я знал, я бы пришёл раньше.=Si hubiera sabido, habría venido antes.
Учёные сделали важное открытие.=Los científicos hicieron un descubrimiento importante.
Вакцина спасла миллионы жизней.=La vacuna salvó millones de vidas.
Мозг потребляет много энергии.=El cerebro consume mucha energía.
Менделеев создал периодическую таблицу.=Mendeléyev creó la tabla periódica.
Эту теорию нужно доказать.=Hay que demostrar esta teoría.`);

RU('B2', 'Отношения', 'Relaciones y discurso indirecto', '💞', { t: 'Discurso indirecto', k: 'что ли сказал спросил',
n: `¡En ruso el tiempo NO cambia al reportar!
|«Я тебя люблю.»|Он сказал, что любит меня.
|«Ты придёшь?»|Она спросила, приду **ли** я.
Preguntas sí/no: verbo + **ли**.
!Error típico: «сказал, что любил» cuando el original era presente ✗.` },
`отношения=relación
пара=pareja=💑
парень=novio/chavo
девушка=novia/chava
влюбиться=enamorarse=😍
жениться=casarse (él)=💍
выйти замуж=casarse (ella)
свадьба=boda
развестись=divorciarse
доверие=confianza
ссора=pelea
простить=perdonar
ложь=mentira
правда=verdad
дружба=amistad
ревность=celos`,
`Он сказал, что любит меня.=Me dijo que me amaba.
Она спросила, придём ли мы.=Ella preguntó si íbamos a venir.
Они сказали, что поженятся в мае.=Dijeron que se casarían en mayo.
Я спросил, что он хочет.=Le pregunté qué quería.
Она влюбилась в соседа.=Se enamoró de su vecino.
Можно на тебя положиться?=¿Puedo contar contigo?`);

RU('B2', 'Экономика', 'Economía y gerundios', '💹', { t: 'Деепричастия (gerundios)', k: 'читая сделав экономя',
n: `|imperfectivo -я / -а|haciendo (simultáneo): читая, экономя
|perfectivo -в|habiendo hecho: сделав, прочитав
«Экономя, ты купишь дом» = ahorrando, comprarás una casa.
!Son muy de texto escrito; al hablar se prefieren dos verbos con «и».` },
`экономика=economía=📈
кредит=crédito
долг=deuda
сбережения=ahorros
инвестировать=invertir
инвестиция=inversión
биржа=bolsa de valores
инфляция=inflación
кризис=crisis=📉
рост=crecimiento
прибыль=ganancia
убыток=pérdida
бюджет=presupuesto
потребитель=consumidor
процентная ставка=tasa de interés
банкротство=quiebra`,
`Экономя, ты купишь квартиру.=Ahorrando, comprarás un departamento.
Он разбогател, инвестируя в акции.=Se hizo rico invirtiendo en acciones.
Инфляция выросла в этом году.=La inflación subió este año.
Компания обанкротилась.=La empresa quebró.
Мне нужно вернуть долг.=Necesito pagar una deuda.
Сделав работу, он ушёл.=Tras hacer el trabajo, se fue.`);

RU('B2', 'Русский мир', 'El ruso en el mundo', '🌐', { t: 'Conectores', k: 'однако поэтому хотя потому',
n: `El ruso se habla en Rusia, Bielorrusia, Kazajistán, Kirguistán y es lengua franca en Asia Central.
|поэтому|por eso
|потому что|porque
|хотя|aunque
|однако|sin embargo
!Es el idioma eslavo más hablado: unos 255 millones de hablantes.` },
`Россия=Rusia=🇷🇺
Беларусь=Bielorrusia
Казахстан=Kazajistán=🇰🇿
Москва=Moscú
Сибирь=Siberia
официальный язык=idioma oficial
акцент=acento
поэтому=por eso
потому что=porque
хотя=aunque
однако=sin embargo
благодаря=gracias a
из-за=por culpa de
кроме того=además
то есть=es decir
что касается=en cuanto a`,
`По-русски говорят во многих странах.=Se habla ruso en muchos países.
Хотя было холодно, мы гуляли.=Aunque hacía frío, paseamos.
Благодаря тебе я справился.=Gracias a ti lo logré.
Я устал, поэтому иду спать.=Estoy cansado, por eso me voy a dormir.
Я учу русский, потому что люблю Толстого.=Estudio ruso porque me encanta Tolstói.
Однако русский не такой трудный.=Sin embargo, el ruso no es tan difícil.`);

RU('C1', 'Идиомы I', 'Expresiones idiomáticas', '🎭', { t: 'No traduzcas palabra por palabra', k: 'уши руками',
n: `|вешать лапшу на уши|echar mentiras (colgar fideos en las orejas)
|бить баклуши|holgazanear
|когда рак на горе свистнет|cuando las ranas críen pelo
!Los modismos rusos son muy visuales: apréndelos con su imagen.` },
`вешать лапшу на уши=echar mentiras/cotorrear
бить баклуши=flojear/holgazanear
когда рак на горе свистнет=cuando las ranas críen pelo
делать из мухи слона=hacer de un grano de arena una montaña
водить за нос=tomar el pelo
как с гуся вода=como si nada
у меня руки чешутся=me muero de ganas
ни пуха ни пера=¡mucha suerte!
держать язык за зубами=mantener la boca cerrada
медвежья услуга=favor que perjudica
выйти сухим из воды=salir bien librado
ни рыба ни мясо=ni fu ni fa
витать в облаках=andar en las nubes
работать спустя рукава=trabajar al ahí se va
дело в шляпе=asunto resuelto
сидеть сложа руки=estar de brazos cruzados`,
`Не вешай мне лапшу на уши!=¡No me eches mentiras!
Ни пуха ни пера на экзамене!=¡Mucha suerte en el examen!
Не делай из мухи слона.=No hagas de un grano de arena una montaña.
Он весь день бьёт баклуши.=Se la pasa flojeando todo el día.
Дело в шляпе!=¡Asunto resuelto!
Держи язык за зубами.=No digas nada.`);

RU('C1', 'Дискуссия', 'Argumentar con precisión', '⚖️', { t: 'Conectores de debate', k: 'во-первых кроме итак',
n: `|во-первых|en primer lugar
|кроме того|además
|с одной стороны… с другой стороны|por un lado… por otro
|итак / таким образом|así pues
!«Ни пуха ни пера» se responde «к чёрту!» (¡al diablo!): es una superstición.` },
`аргументировать=argumentar
опровергнуть=refutar
утверждать=afirmar
тезис=tesis
вывод=conclusión
пример=ejemplo
во-первых=en primer lugar
кроме того=además
тем не менее=no obstante
на мой взгляд=a mi parecer
таким образом=así pues
с одной стороны=por un lado
с другой стороны=por otro lado
предрассудок=prejuicio
компромисс=acuerdo/término medio
точка зрения=punto de vista`,
`Во-первых, надо учесть стоимость.=En primer lugar, hay que considerar el costo.
С одной стороны, это дорого, с другой стороны — полезно.=Por un lado es caro, por otro es útil.
На мой взгляд, тезис слабый.=A mi parecer, la tesis es débil.
Таким образом, я не убеждён.=Así pues, no estoy convencido.
Он утверждает, что прав.=Afirma que tiene razón.
Мы нашли компромисс.=Encontramos un acuerdo.`);

RU('C1', 'Литература', 'Literatura rusa', '📚', { t: 'El ruso literario', k: 'писал родился',
n: `Autores clave: Pushkin (padre del ruso literario), Tolstói, Dostoievski, Chéjov, Ajmátova, Bulgákov.
!Leer a Pushkin en el original es un rito para todo estudiante de ruso.` },
`рассказ=cuento/relato
сказка=cuento de hadas
персонаж=personaje
герой=héroe
рассказчик=narrador
сюжет=trama
глава=capítulo
метафора=metáfora
рифма=rima
стих=verso
развязка=desenlace
век=siglo
автор=autor
литература=literatura
поэт=poeta
читатель=lector`,
`Пушкин родился в Москве в 1799 году.=Pushkin nació en Moscú en 1799.
Толстой написал «Войну и мир».=Tolstói escribió «Guerra y paz».
Рассказчик вспоминает детство.=El narrador recuerda su infancia.
Развязка неожиданная.=El desenlace es inesperado.
Достоевский — мастер психологии.=Dostoievski es un maestro de la psicología.
В романе тридцать глав.=La novela tiene treinta capítulos.`);

RU('C1', 'Правосудие', 'Derecho y nominalización', '👨‍⚖️', { t: 'La nominalización', k: 'арест подписание расследование',
n: `|арестовать → арест|arrestar → el arresto
|подписать → подписание|firmar → la firma
|расследовать → расследование|investigar → la investigación
!Los textos jurídicos rusos encadenan genitivos: «рассмотрение дела суда» (la revisión del caso por el tribunal).` },
`правосудие=justicia
суд=tribunal
судья=juez=👨‍⚖️
обвиняемый=acusado
жертва=víctima
свидетель=testigo
доказательство=prueba
преступление=crimen/delito
кража=robo
вор=ladrón
процесс=juicio
виновный=culpable
невиновный=inocente
приговор=sentencia
тюрьма=cárcel=⛓️
штраф=multa`,
`Полиция арестовала подозреваемого.=La policía arrestó al sospechoso.
Судья вынес приговор.=El juez dictó la sentencia.
Его оштрафовали.=Le pusieron una multa.
Против него нет доказательств.=No hay pruebas en su contra.
Свидетель выступил на процессе.=El testigo declaró en el juicio.
Расследование идёт медленно.=La investigación avanza lentamente.`);

RU('C1', 'Философия', 'Filosofía y concesión', '🦉', { t: 'Хотя, несмотря на, как бы ни', k: 'хотя несмотря ни',
n: `|хотя|aunque
|несмотря на + acusativo|a pesar de
|как бы я ни старался|por más que me esfuerce
|что бы ты ни делал|hagas lo que hagas
!Ese «ни» no niega: intensifica. Es muy elegante.` },
`философия=filosofía
мысль=pensamiento
сознание=conciencia
разум=razón
мораль=moral
этика=ética
счастье=felicidad
добродетель=virtud
желание=deseo
существование=existencia
человек=ser humano/persona
душа=alma
знание=conocimiento
сомнение=duda
смысл=sentido
мудрость=sabiduría`,
`Мыслю, следовательно, существую.=Pienso, luego existo.
Хотя он богат, он несчастлив.=Aunque es rico, no es feliz.
Как бы я ни старался, не получается.=Por más que me esfuerzo, no me sale.
Что бы ты ни делал, делай хорошо.=Hagas lo que hagas, hazlo bien.
Несмотря на дождь, мы пошли гулять.=A pesar de la lluvia, salimos a pasear.
Сомнение — начало мудрости.=La duda es el principio de la sabiduría.`);

RU('C1', 'История', 'Historia de Rusia', '🏰', { t: 'Narrar la historia', k: 'был стал правил',
n: `Rus de Kiev (siglo IX), zares (desde 1547), Pedro el Grande, Revolución de 1917, URSS (1922–1991).
«В XX веке» = en el siglo XX.
!San Petersburgo fue fundada por Pedro el Grande en 1703 como «ventana a Europa».` },
`царь=zar=👑
царица=zarina
империя=imperio
война=guerra
мир=paz=☮️
битва=batalla
солдат=soldado
монархия=monarquía
революция=revolución
народ=pueblo
крепость=fortaleza=🏰
Средние века=Edad Media
Советский Союз=la Unión Soviética
победа=victoria
поражение=derrota
завоевать=conquistar`,
`Пётр Первый основал Петербург в 1703 году.=Pedro I fundó San Petersburgo en 1703.
Революция произошла в 1917 году.=La revolución ocurrió en 1917.
Советский Союз распался в 1991 году.=La Unión Soviética se disolvió en 1991.
Гагарин был первым человеком в космосе.=Gagarin fue el primer ser humano en el espacio.
Наполеон дошёл до Москвы в 1812 году.=Napoleón llegó hasta Moscú en 1812.
Кремль — это древняя крепость.=El Kremlin es una antigua fortaleza.`);

RU('C1', 'Бизнес', 'Ruso de negocios', '🤝', { t: 'El registro formal escrito', k: 'уважаемый прилагаю уважением',
n: `|Уважаемый Иван Петрович!|Estimado Iván Petróvich:
|Направляю вам…|Le envío…
|Во вложении…|Adjunto…
|С уважением,|Atentamente
!En contextos formales se usa **nombre + patronímico** (Иван Петрович), nunca el nombre solo.` },
`уважаемый=estimado
с уважением=atentamente
во вложении=adjunto=📎
обращаться=dirigirse/contactar
коммерческое предложение=cotización/propuesta
счёт-фактура=factura
поставщик=proveedor
партнёр=socio
видеоконференция=videollamada
повестка дня=orden del día
протокол=minuta/acta
доставка=entrega=🚚
возврат=reembolso/devolución
жалоба=queja
заключить сделку=cerrar un trato=🤝
генеральный директор=director general`,
`Уважаемый Иван Петрович!=¡Estimado Iván Petróvich!
Во вложении — счёт-фактура.=Adjunto la factura.
Подтвердите, пожалуйста, дату доставки.=Por favor, confirme la fecha de entrega.
Мы заключили сделку с поставщиком.=Cerramos un trato con el proveedor.
По всем вопросам обращайтесь ко мне.=Para cualquier duda, diríjase a mí.
С уважением, Анна Смирнова.=Atentamente, Anna Smirnova.`);

RU('C1', 'Сленг', 'Ruso coloquial', '🛹', { t: 'El ruso hablado', k: 'чё ну типа',
n: `|чё|qué (что)
|щас|ahorita (сейчас)
|ну|pues, bueno
|типа|tipo, como que
!«Норм» = normal, todo bien. Muy usado por jóvenes.` },
`чувак=güey/carnal
круто=padre/chido
классно=chido/genial
прикольно=chistoso/padre
бабки=lana/dinero
тусоваться=salir de fiesta/pasar el rato
тусовка=reventón/fiesta
норм=bien/normal
типа=tipo/como que
щас=ahorita
чё=qué
блин=chin/rayos
офигеть=no manches
халява=algo gratis/de gorra
тачка=nave/carro
кайф=placer/qué rico`,
`Чувак, это круто!=¡Güey, está bien padre!
Блин, я опоздал!=¡Chin, llegué tarde!
Офигеть!=¡No manches!
Всё норм, не волнуйся.=Todo bien, no te preocupes.
Пойдём тусоваться?=¿Vamos de fiesta?
У меня нет бабок.=No tengo lana.`);

RU('C2', 'Идиомы II', 'Expresiones avanzadas', '🐓', { t: 'Expresiones de nativo', k: 'зубы рукой',
n: `|заговаривать зубы|distraer con palabrería
|рукой подать|está a un paso
|душа в пятки ушла|se me fue el alma a los pies
!Usarlas bien te hace sonar como nativo… usarlas mal, como turista.` },
`заговаривать зубы=distraer con palabrería
рукой подать=está muy cerca
душа в пятки ушла=se me fue el alma a los pies
как снег на голову=de repente/sin aviso
навострить уши=parar la oreja
положа руку на сердце=con la mano en el corazón
семь пятниц на неделе=cambia de opinión cada rato
после дождичка в четверг=cuando las ranas críen pelo
как в воду глядел=lo adivinó
игра не стоит свеч=no vale la pena
в ус не дуть=no inmutarse
комар носа не подточит=perfecto, sin falla
считать ворон=estar en la baba
тянуть кота за хвост=darle largas
не в своей тарелке=fuera de lugar/incómodo
лезть из кожи вон=hacer hasta lo imposible`,
`До метро рукой подать.=El metro está a un paso.
У него семь пятниц на неделе.=Cambia de opinión cada rato.
Не тяни кота за хвост!=¡No le des largas!
Я чувствую себя не в своей тарелке.=Me siento fuera de lugar.
Игра не стоит свеч.=No vale la pena.
Он лез из кожи вон, чтобы победить.=Hizo hasta lo imposible por ganar.`);

RU('C2', 'Нюансы', 'Vocabulario abstracto', '🧠', { t: 'Palabras intraducibles', k: 'тоска пошлость',
n: `|тоска|angustia melancólica sin causa clara
|пошлость|vulgaridad pretenciosa
|авось|confiar en la suerte
!Nabokov escribió páginas enteras solo para explicar «пошлость».` },
`двусмысленность=ambigüedad
нюанс=matiz
уместность=pertinencia
препятствие=obstáculo
подход=enfoque
растерянность=desconcierto
увлечение=entusiasmo/afición
тоска=melancolía profunda
доброжелательность=benevolencia
смирение=humildad
иллюзия=ilusión
долговечность=perdurabilidad
самодовольство=complacencia
самопожертвование=abnegación
пошлость=vulgaridad pretenciosa
авось=a ver si sale/confiar en la suerte`,
`Его речи не хватало уместности.=A su discurso le faltaba pertinencia.
Она действовала доброжелательно.=Actuó con benevolencia.
Его охватила тоска.=Lo invadió una profunda melancolía.
Это иллюзия, что всё легко.=Es una ilusión creer que todo es fácil.
Русские часто надеются на авось.=Los rusos a menudo confían en la suerte.
У него интересный подход.=Tiene un enfoque interesante.`);

RU('C2', 'Пресса', 'Prensa y estilo periodístico', '🗞️', { t: 'El estilo de la prensa', k: 'сообщил заявил',
n: `|как сообщает…|según informa…
|по данным…|según datos de…
|заявил|declaró
Titulares sin verbo: «Новый закон о налогах».
!Los medios rusos usan mucho el participio: «принятый закон» (la ley aprobada).` },
`передовица=editorial
колонка=columna
колумнист=columnista
редакция=redacción
главный редактор=jefe de redacción
информационное агентство=agencia de noticias
сенсация=primicia
цензура=censura
свобода слова=libertad de expresión
опрос=encuesta
опровержение=desmentido
опровергнуть=desmentir
распространять=difundir
полемика=polémica
пресс-релиз=comunicado
тираж=tiraje`,
`Министр опроверг слухи.=El ministro desmintió los rumores.
Как сообщает агентство, переговоры продолжаются.=Según informa la agencia, las negociaciones continúan.
Свобода слова — основа демократии.=La libertad de expresión es la base de la democracia.
Опрос будет опубликован в понедельник.=La encuesta se publicará el lunes.
Статья вызвала полемику.=El artículo provocó polémica.
Тираж газеты падает.=El tiraje del periódico baja.`);

RU('C2', 'Науки', 'Ciencia y tecnología avanzada', '🚀', { t: 'El ruso científico', k: 'было установлено',
n: `|было установлено, что…|se estableció que…
|следует отметить|cabe señalar
|в результате|como resultado
Mucho participio y nominalización.
!La palabra «спутник» (compañero de viaje) dio nombre al primer satélite (1957).` },
`астрономия=astronomía=🔭
галактика=galaxia=🌌
звезда=estrella=⭐
чёрная дыра=agujero negro
вселенная=universo
гравитация=gravedad
атом=átomo=⚛️
клетка=célula
эволюция=evolución
алгоритм=algoritmo
данные=datos
ракета=cohete=🚀
спутник=satélite=🛰️
землетрясение=sismo
образец=muestra
космос=espacio exterior`,
`Было установлено, что вселенная расширяется.=Se estableció que el universo se expande.
Ракета была успешно запущена.=El cohete fue lanzado con éxito.
Первый спутник запустили в 1957 году.=El primer satélite se lanzó en 1957.
Каждая клетка содержит ДНК.=Cada célula contiene ADN.
Алгоритм обучается на данных.=El algoritmo aprende de los datos.
Образцы были проанализированы.=Las muestras fueron analizadas.`);

RU('C2', 'Риторика', 'Retórica y estilo', '🎙️', { t: 'Estilo culto', k: 'отнюдь ибо',
n: `Palabras de registro alto:
|ибо|pues, porque
|отнюдь не|en absoluto
|дабы|para que
|сей|este (arcaico)
!La litote rusa: «неплохо» (no está mal) suele ser un gran elogio.` },
`риторика=retórica
красноречие=elocuencia
оратор=orador
речь=discurso
стилистическая фигура=figura retórica
гипербола=hipérbole
эвфемизм=eufemismo
ирония=ironía
парадокс=paradoja
убеждать=persuadir
пленить=cautivar
аудитория=público
тон=tono
ибо=pues/porque
отнюдь=en absoluto
дабы=para que`,
`Это отнюдь не просто.=Esto no es en absoluto sencillo.
Оратор пленил аудиторию.=El orador cautivó al público.
Мы остались, ибо было поздно.=Nos quedamos, pues era tarde.
Неплохо, совсем неплохо!=¡Nada mal, nada mal!
Она говорила с большим красноречием.=Habló con gran elocuencia.
Красота спасёт мир.=La belleza salvará el mundo.`);

RU('C2', 'Варианты', 'Variantes y registros del ruso', '🪆', { t: 'Ruso de Moscú, Petersburgo y más allá', k: 'поребрик бордюр',
n: `|Moscú|Petersburgo
|бордюр|поребрик (bordillo)
|подъезд|парадная (entrada del edificio)
|шаурма|шаверма (shawarma)
!El ruso es muy homogéneo: un moscovita entiende perfectamente a un siberiano.` },
`поребрик=bordillo (Petersburgo)
бордюр=bordillo (Moscú)
парадная=entrada del edificio (Petersburgo)
подъезд=entrada del edificio (Moscú)
шаверма=shawarma (Petersburgo)
шаурма=shawarma (Moscú)
акание=pronunciar la o átona como a
оканье=pronunciar la o tal cual (norte)
говор=habla regional
суржик=mezcla de ruso y ucraniano
масленица=carnaval ruso (blinis)
блины=crepas rusas=🥞
баня=baño de vapor
дача=casa de campo
самовар=samovar
матрёшка=matrioska=🪆`,
`В Петербурге говорят «поребрик».=En Petersburgo dicen «poriébrik».
На Масленицу все едят блины.=En Máslenitsa todos comen blinis.
По выходным мы ездим на дачу.=Los fines de semana vamos a la casa de campo.
После бани пьют чай из самовара.=Después del baño de vapor se toma té del samovar.
Матрёшка — символ России.=La matrioska es un símbolo de Rusia.
В Москве «акают».=En Moscú pronuncian la o como a.`);

RU('C2', 'Психология', 'Psicología y sociedad', '🫶', { t: 'Hablar de lo íntimo', k: 'эмпатия выгорание',
n: `|речь идёт о|se trata de
|справляться с|lidiar con
|переживать|preocuparse, sufrir por algo
!«Душевный разговор» = charla del alma: los rusos aprecian mucho las conversaciones profundas en la cocina.` },
`психология=psicología
поведение=comportamiento
личность=personalidad
самооценка=autoestima
тревога=ansiedad
стресс=estrés
выгорание=burnout/agotamiento
депрессия=depresión
терапия=terapia
эмпатия=empatía
стойкость=resiliencia
травма=trauma
мотивация=motivación
неравенство=desigualdad
одиночество=soledad
травля=acoso/bullying`,
`У неё было выгорание.=Ella tuvo burnout.
Эмпатия важна в отношениях.=La empatía es importante en una relación.
Спорт помогает справляться со стрессом.=El deporte ayuda a manejar el estrés.
Одиночество — серьёзная проблема.=La soledad es un problema serio.
Речь идёт о самооценке.=Se trata de la autoestima.
Надо бороться с травлей в школе.=Hay que luchar contra el acoso escolar.`);

RU('C2', 'Мастерство', 'Maestría: el gran final', '🏆', { t: 'Repaso maestro', k: 'свободно стоило',
n: `Repasas los 6 casos, los aspectos, los verbos de movimiento, el condicional con «бы» y los participios.
!Lee a Chéjov, escucha a Vysotski y habla en la cocina con amigos rusos. Поздравляю!` },
`владеть=dominar
свободно=con fluidez
родной язык=lengua materna
двуязычный=bilingüe
лёгкость=soltura
совершенствовать=perfeccionar
упорство=perseverancia
усилие=esfuerzo
вызов=reto
добиться=lograr
успех=éxito
путь=camino/trayectoria
стоит того=vale la pena
гордость=orgullo
наслаждаться=disfrutar
поздравляю=felicidades=🎉`,
`Я свободно говорю по-русски.=Hablo ruso con fluidez.
Оно того стоило.=Valió la pena.
Тише едешь — дальше будешь.=Poco a poco se anda lejos.
Я добился своей цели.=Logré mi meta.
Поздравляю с успехом!=¡Felicidades por tu éxito!
Русский язык теперь часть меня.=El ruso ahora es parte de mí.`);

GS.extra.ru.ff = `магазин|magazine (revista)|la tienda
фамилия|familia|el apellido
артист|artista plástico|actor, artista escénico
декада|década|diez días
компания|compañía (empresa)|grupo de amigos (y empresa)
аккуратный|acurado|ordenado, cuidadoso
кабинет|gabinete|oficina personal, consultorio
продукты|productos|comestibles, despensa
лунатик|lunático|sonámbulo
троллейбус|tranvía|trolebús
стул|estufa|la silla
мат|mate (bebida)|groserías
банда|banda de música|pandilla
пирог|pirógeno|pastel salado o dulce
район|rayón|zona, barrio
клуб|club deportivo|club, antro
симпатичный|simpático|guapo, atractivo
фабула|fábula|la trama
нация|nación|etnia
кондуктор|conductor (chofer)|cobrador del transporte
пенсия|pensión (hospedaje)|jubilación
тур|tour|ronda (de competencia)
дача|dacha|casa de campo
каникулы|canícula|vacaciones escolares
вокзал|vocal|estación de tren
конфета|confeti|dulce, bombón
сало|salo|tocino de cerdo`;
GS.extra.ru.cult = `¿Qué se dice al brindar en Rusia?|«За здоровье!» o un brindis largo|«Salud» en español|Nada, se toma en silencio
¿Qué es la «дача»?|Una casa de campo para fines de semana|Un baile|Un tipo de pan
¿Qué se come en Máslenitsa?|Blinis (crepas)|Tamales|Sushi
¿Qué es el patronímico?|El segundo nombre derivado del nombre del padre|El apellido materno|Un apodo
¿Cuándo se celebra la Navidad ortodoxa?|El 7 de enero|El 25 de diciembre|El 6 de enero
¿Qué fiesta es la más importante en Rusia?|El Año Nuevo|La Pascua|El 1 de mayo
¿Por qué no se dan flores en número par?|Los ramos pares son para funerales|Da mala suerte en bodas|Es de mala educación
¿Qué no se hace en el umbral de una puerta?|Saludar de mano a través de él|Quitarse los zapatos|Tocar
¿Quién fue el primer ser humano en el espacio?|Yuri Gagarin|Neil Armstrong|Valentina Tereshkova
¿Cuál es la capital de Rusia?|Moscú|San Petersburgo|Kiev
¿Qué es la «баня»?|Un baño de vapor tradicional|Un mercado|Una iglesia
¿Qué se hace al entrar a una casa rusa?|Quitarse los zapatos|Dejarse el abrigo puesto|Tocar tres veces`;
GS.extra.ru.phon = `ы|Vocal que no existe en español: di «i» con la lengua hacia atrás.|ты · мы · сыр
о átona|Sin acento suena «a» (akanie).|молоко · хорошо · Москва
е átona|Sin acento suena casi «i».|телефон · сестра · сейчас
ь (signo blando)|Ablanda la consonante anterior, como una «i» muy breve.|день · мать · соль
ъ (signo duro)|Separa la consonante de la vocal siguiente.|съесть · объект · подъезд
ж|Como la «ll» argentina («zh»).|жена · журнал · ужин
ш|Como «sh» en inglés, con la lengua atrás.|шапка · школа · хорошо
щ|«Sh» suave y larga, como «shsh».|щи · борщ · ещё
х|Como la «j» mexicana, ¡tu ventaja!|хлеб · хорошо · муха
ц|Como «ts».|центр · улица · отец
р|Vibrante, como la «r» de «pero» o «perro».|рыба · Россия · утро
consonante final|Las sonoras se ensordecen al final: б→п, д→т, г→к.|хлеб · сад · друг
ё|Siempre lleva el acento y suena «yo».|ёлка · всё · ещё
acento móvil|No se escribe y cambia de lugar: hay que aprenderlo con cada palabra.|рука · руки · города`;
