/* Grey~Spell — Portugués de Brasil para hispanohablantes de México. 48 unidades A1–C2.
   Palabras: portugués=español/alternativa=emoji · Frases: portugués=español */
window.GS = window.GS || { units: [] };
GS.extra = GS.extra || {};
GS.P = function (c, lv, t, es, ic, g, w, s) { (GS.extra[c] = GS.extra[c] || { units: [] }).units.push({ lv, t, es, ic, g, w, s }); };
GS.extra.pt = GS.extra.pt || { units: [] };
const PT = (...a) => GS.P('pt', ...a);

PT('A1', 'Olá!', 'Saludos y presentaciones', '👋', { t: 'Ser y los pronombres', k: 'sou é somos são você',
n: `En Brasil se usa **você** para «tú» (con verbo en 3.ª persona): «você é».
|eu sou|yo soy
|você é|tú eres / usted es
|ele / ela é|él / ella es
|nós somos|nosotros somos
|vocês são|ustedes son
!«A gente» = nosotros, muy común al hablar: «a gente vai» (vamos).` },
`olá=hola=👋
oi=hola/qué onda
bom dia=buenos días=🌅
boa tarde=buenas tardes
boa noite=buenas noches=🌙
tchau=adiós/bye
obrigado=gracias=🙏
por favor=por favor
de nada=de nada
sim=sí=👍
não=no=👎
desculpa=perdón/disculpa
eu sou=yo soy/soy
você é=tú eres/eres
prazer=mucho gusto=🤝
tudo bem?=¿todo bien?/¿qué tal?`,
`Oi, eu sou a Ana.=Hola, soy Ana.
Tudo bem? Tudo bem!=¿Todo bien? ¡Todo bien!
Eu sou mexicano.=Soy mexicano.
Muito prazer!=¡Mucho gusto!
Você é do Brasil?=¿Eres de Brasil?
Obrigado, tchau!=¡Gracias, adiós!`);

PT('A1', 'A família', 'Familia y artículos', '👨‍👩‍👧', { t: 'Artículos y el verbo ter', k: 'o a os as um uma tenho tem temos têm',
n: `Artículos: **o / a / os / as** (el, la, los, las), **um / uma** (un, una).
|eu tenho|tengo
|você / ele tem|tienes / tiene
|nós temos|tenemos
|vocês / eles têm|tienen
!Los posesivos llevan artículo: «a minha mãe» (mi mamá).` },
`a família=la familia=👨‍👩‍👧
o pai=el papá=👨
a mãe=la mamá=👩
o irmão=el hermano=👦
a irmã=la hermana=👧
o filho=el hijo
a filha=la hija
o avô=el abuelo=👴
a avó=la abuela=👵
o tio=el tío
a tia=la tía
o primo=el primo
o cachorro=el perro=🐶
o gato=el gato=🐱
eu tenho=tengo/yo tengo
o bebê=el bebé=👶`,
`Eu tenho dois irmãos.=Tengo dos hermanos.
A minha mãe se chama Rosa.=Mi mamá se llama Rosa.
Nós temos um cachorro.=Tenemos un perro.
O meu avô é muito alto.=Mi abuelo es muy alto.
Você tem filhos?=¿Tienes hijos?
A minha tia mora em São Paulo.=Mi tía vive en São Paulo.`);

PT('A1', 'Comida', 'Comida y verbos en -ar', '🍽️', { t: 'Presente de los verbos -ar', k: 'como gosto gosta comemos bebo',
n: `Verbos en -ar: falar → eu fal**o**, você fal**a**, nós fal**amos**, eles fal**am**.
-er: comer → como, come, comemos, comem.
**Gostar de**: «eu gosto **de** café» (me gusta el café). ¡Siempre con «de»!
!«Gostar» funciona al revés que en español: tú eres el sujeto.` },
`o pão=el pan=🍞
o queijo=el queso=🧀
a maçã=la manzana=🍎
a água=el agua=💧
o leite=la leche=🥛
o café=el café=☕
a carne=la carne=🥩
o frango=el pollo=🍗
o peixe=el pescado=🐟
o arroz=el arroz=🍚
o feijão=los frijoles=🫘
o suco=el jugo=🧃
o bolo=el pastel=🍰
comer=comer
beber=beber/tomar
o almoço=la comida/el almuerzo`,
`Eu como arroz com feijão.=Como arroz con frijoles.
Ela bebe suco de laranja.=Ella toma jugo de naranja.
Eu gosto de café.=Me gusta el café.
Nós comemos frango no almoço.=Comemos pollo en la comida.
Você gosta de peixe?=¿Te gusta el pescado?
O bolo está delicioso!=¡El pastel está delicioso!`);

PT('A1', 'Os números', 'Números, días y hora', '🔢', { t: 'Números y la hora', k: 'são é horas meia',
n: `Para la hora: «**É** uma hora», «**São** duas horas». «E meia» = y media.
Los días son ordinales: segunda-feira (lunes), terça-feira (martes)…
|um / uma|1 (cambia con el género)
|dois / duas|2 (también)
!«Meia» también significa 6 al dictar números de teléfono.` },
`um=uno
dois=dos
três=tres
quatro=cuatro
cinco=cinco
seis=seis
sete=siete
oito=ocho
nove=nueve
dez=diez=🔟
vinte=veinte
cem=cien
segunda-feira=lunes
sábado=sábado
domingo=domingo
hoje=hoy`,
`Que horas são?=¿Qué hora es?
São três horas.=Son las tres.
Hoje é segunda-feira.=Hoy es lunes.
Eu tenho vinte anos.=Tengo veinte años.
É meio-dia.=Es mediodía.
São oito e meia.=Son las ocho y media.`);

PT('A1', 'A casa', 'La casa y las contracciones', '🏠', { t: 'Tem (hay) y contracciones', k: 'tem no na em do da',
n: `En Brasil «hay» se dice **tem**: «tem um gato na sala».
|em + o = no|en el
|em + a = na|en la
|de + o = do|del
|de + a = da|de la
!«Morar» = vivir (en un lugar): «eu moro no México».` },
`a casa=la casa=🏠
o apartamento=el departamento=🏢
o quarto=la recámara/el cuarto=🛏️
a cozinha=la cocina=🍳
o banheiro=el baño=🛁
a sala=la sala=🛋️
a porta=la puerta=🚪
a janela=la ventana=🪟
a mesa=la mesa
a cadeira=la silla=🪑
a cama=la cama
a chave=la llave=🔑
a geladeira=el refri/el refrigerador
em cima de=encima de
embaixo de=debajo de
perto de=cerca de`,
`Tem um gato embaixo da mesa.=Hay un gato debajo de la mesa.
A chave está em cima da mesa.=La llave está encima de la mesa.
Eu moro num apartamento.=Vivo en un departamento.
O banheiro é perto do quarto.=El baño está cerca del cuarto.
Não tem geladeira na cozinha.=No hay refri en la cocina.
A minha casa tem três quartos.=Mi casa tiene tres recámaras.`);

PT('A1', 'Roupas e cores', 'Ropa, colores y adjetivos', '👕', { t: 'Concordancia de adjetivos', k: 'vermelho vermelha branco branca novos nova',
n: `Igual que en español: masculino **-o**, femenino **-a**, plural **-s**.
|um carro branco|una casa branca
|-ão → -ões / -ães|alemão → alemães
!«Vermelho» es rojo; «roxo» es morado (¡no rojo!). «Ruivo» es pelirrojo.` },
`vermelho=rojo=🔴
azul=azul=🔵
verde=verde=🟢
amarelo=amarillo=🟡
preto=negro=⚫
branco=blanco=⚪
roxo=morado=🟣
a camisa=la camisa=👔
a calça=el pantalón=👖
o vestido=el vestido=👗
a camiseta=la playera=👕
o sapato=el zapato=👞
o tênis=los tenis=👟
o boné=la gorra=🧢
os óculos=los lentes=👓
bonito=bonito`,
`Eu uso uma camisa branca.=Uso una camisa blanca.
O vestido dela é vermelho.=Su vestido es rojo.
Os sapatos pretos são caros.=Los zapatos negros son caros.
Você gosta do meu boné?=¿Te gusta mi gorra?
Ela usa óculos.=Ella usa lentes.
A calça azul é nova.=El pantalón azul es nuevo.`);

PT('A1', 'Na cidade', 'La ciudad y el verbo ir', '🏙️', { t: 'Ir y las contracciones con a', k: 'vou vai vamos vão ao à',
n: `**Ir**: eu vou, você vai, nós vamos, vocês vão.
|a + o = ao|vou ao banco
|a + a = à|vou à praia
En Brasil se usa mucho **para**: «vou para casa».
!«Ônibus» = camión (autobús). ¡En Brasil «camião/caminhão» es un tráiler!` },
`a cidade=la ciudad=🏙️
a rua=la calle
o banco=el banco=🏦
o hospital=el hospital=🏥
a escola=la escuela=🏫
o museu=el museo=🏛️
o mercado=el mercado
a padaria=la panadería=🥖
a farmácia=la farmacia=💊
o parque=el parque=🌳
o cinema=el cine=🎬
o ônibus=el camión/el autobús=🚌
à esquerda=a la izquierda=⬅️
à direita=a la derecha=➡️
onde=dónde
o bairro=la colonia/el barrio`,
`Eu vou ao banco.=Voy al banco.
Onde fica a farmácia?=¿Dónde está la farmacia?
Nós vamos ao cinema hoje.=Vamos al cine hoy.
Vire à esquerda.=Dé vuelta a la izquierda.
Vocês vão à praia?=¿Van a la playa?
Tem uma padaria no meu bairro.=Hay una panadería en mi colonia.`);

PT('A1', 'Rotina', 'Rutina y verbos reflexivos', '⏰', { t: 'Verbos reflexivos', k: 'me se te nos',
n: `En Brasil el pronombre va **antes** del verbo: «eu **me** levanto».
En Portugal va después: «levanto-**me**».
|eu me levanto|me levanto
|você se levanta|te levantas
|nós nos levantamos|nos levantamos
!«Tomar banho» = bañarse. «Tomar café da manhã» = desayunar.` },
`acordar=despertar
levantar-se=levantarse
tomar banho=bañarse=🚿
vestir-se=vestirse
deitar-se=acostarse=🛌
trabalhar=trabajar=💼
estudar=estudiar=📚
de manhã=en la mañana=🌅
à tarde=en la tarde
à noite=en la noche=🌃
cedo=temprano
tarde=tarde
sempre=siempre
nunca=nunca
depois=después
o café da manhã=el desayuno`,
`Eu me levanto às sete.=Me levanto a las siete.
Ela toma banho de manhã.=Ella se baña en la mañana.
Nós nos deitamos tarde.=Nos acostamos tarde.
Primeiro eu tomo café da manhã.=Primero desayuno.
Ele trabalha de segunda a sexta.=Él trabaja de lunes a viernes.
Eu nunca acordo cedo.=Nunca me despierto temprano.`);

PT('A2', 'Tempo livre', 'Pasatiempos y negación', '⚽', { t: 'Negación y jogar / tocar', k: 'não nada ninguém nunca',
n: `La negación va antes del verbo, como en español: «eu **não** danço».
Doble negación permitida: «não vejo nada».
|jogar futebol|jugar futbol
|tocar violão|tocar guitarra
!En Brasil se puede negar al final: «sei não» (no sé), muy coloquial.` },
`o futebol=el futbol=⚽
a música=la música=🎵
o violão=la guitarra=🎸
o filme=la película=🎬
a série=la serie=📺
o livro=el libro=📖
a praia=la playa=🏖️
jogar=jugar
tocar=tocar
nadar=nadar=🏊
dançar=bailar=💃
cantar=cantar=🎤
ler=leer
assistir=ver (tele, película)
o fim de semana=el fin de semana
a festa=la fiesta=🎉`,
`Eu jogo futebol no fim de semana.=Juego futbol el fin de semana.
Ela toca violão muito bem.=Ella toca muy bien la guitarra.
Eu não assisto televisão.=No veo la tele.
Nós nunca dançamos.=Nunca bailamos.
Vamos assistir um filme juntos?=¿Vemos una película juntos?
Ele não lê nada.=Él no lee nada.`);

PT('A2', 'O tempo', 'Clima y estaciones', '⛅', { t: 'Fazer y estar para el clima', k: 'faz está chovendo calor frio',
n: `|faz calor / frio|hace calor / frío
|está chovendo|está lloviendo
|está nublado|está nublado
|faz sol|hace sol
!«Está um calor!» es muy brasileño para quejarse del calor.` },
`o sol=el sol=☀️
a chuva=la lluvia=🌧️
a neve=la nieve=❄️
o vento=el viento=💨
a nuvem=la nube=☁️
a tempestade=la tormenta=⛈️
o verão=el verano=🌞
o inverno=el invierno=⛄
a primavera=la primavera=🌷
o outono=el otoño=🍂
quente=caliente/caluroso=🥵
frio=frío=🥶
o guarda-chuva=el paraguas=☂️
o céu=el cielo
o arco-íris=el arcoíris=🌈
a previsão do tempo=el pronóstico del clima`,
`Hoje faz muito calor.=Hoy hace mucho calor.
Está chovendo desde cedo.=Está lloviendo desde temprano.
No inverno faz frio no sul.=En invierno hace frío en el sur.
Leva o guarda-chuva!=¡Llévate el paraguas!
O céu está azul.=El cielo está azul.
Está fazendo trinta graus.=Hace treinta grados.`);

PT('A2', 'Compras', 'Compras y demostrativos', '🛍️', { t: 'Este, esse, aquele', k: 'este esta esse essa aquele',
n: `|este / esta|este / esta (cerca de mí)
|esse / essa|ese / esa (cerca de ti)
|aquele / aquela|aquel / aquella
Contracción: em + esse = **nesse**, de + este = **deste**.
!En Brasil al hablar «esse» se usa casi siempre en lugar de «este».` },
`comprar=comprar
vender=vender
pagar=pagar
custar=costar
quanto=cuánto
o preço=el precio=🏷️
o dinheiro=el dinero=💵
o cartão=la tarjeta=💳
o troco=el cambio
a loja=la tienda=🏬
o caixa=la caja
barato=barato
caro=caro
a promoção=la oferta
o real=el real=💰
provar=probarse/probar`,
`Quanto custa essa camisa?=¿Cuánto cuesta esa camisa?
Posso pagar com cartão?=¿Puedo pagar con tarjeta?
Este tênis está em promoção.=Estos tenis están en oferta.
Posso provar aquela calça?=¿Me puedo probar aquel pantalón?
São cinquenta reais.=Son cincuenta reales.
A loja fecha às oito.=La tienda cierra a las ocho.`);

PT('A2', 'Viagens', 'Viajes y pretérito perfecto', '✈️', { t: 'Pretérito perfeito regular', k: 'viajei comprou visitamos chegaram',
n: `= tu pretérito (viajé). Terminaciones:
|-ar|viajei, viajou, viajamos, viajaram
|-er|comi, comeu, comemos, comeram
|-ir|parti, partiu, partimos, partiram
!«Nós viajamos» sirve para presente Y pasado: el contexto decide.` },
`a viagem=el viaje=🧳
viajar=viajar
o avião=el avión=✈️
o trem=el tren=🚆
o carro=el carro=🚗
o aeroporto=el aeropuerto
a passagem=el boleto=🎫
o passaporte=el pasaporte=🛂
a mala=la maleta=🧳
o hotel=el hotel=🏨
reservar=reservar
chegar=llegar
as férias=las vacaciones=🏝️
o país=el país
atrasado=retrasado
a praia=la playa`,
`Eu viajei para o Rio no ano passado.=Viajé a Río el año pasado.
Nós compramos as passagens ontem.=Compramos los boletos ayer.
Você reservou o hotel?=¿Reservaste el hotel?
O avião chegou atrasado.=El avión llegó retrasado.
Eles visitaram muitas praias.=Visitaron muchas playas.
Eu perdi o meu passaporte.=Perdí mi pasaporte.`);

PT('A2', 'Saúde', 'Salud y pretéritos irregulares', '🩺', { t: 'Pretéritos irregulares', k: 'fui foi tive fez estive',
n: `|ser / ir|fui, foi, fomos, foram (¡iguales!)
|ter|tive, teve, tivemos, tiveram
|fazer|fiz, fez, fizemos, fizeram
|estar|estive, esteve, estivemos
!«Dor de cabeça» = dolor de cabeza: «estou com dor de cabeça».` },
`a cabeça=la cabeza
o olho=el ojo=👁️
o nariz=la nariz=👃
a boca=la boca=👄
a mão=la mano=✋
o braço=el brazo=💪
a perna=la pierna=🦵
o pé=el pie=🦶
as costas=la espalda
a barriga=la panza
o coração=el corazón=❤️
o médico=el doctor/el médico=🩺
doente=enfermo=🤒
a febre=la fiebre
o remédio=la medicina=💊
cansado=cansado=😴`,
`Estou com dor de cabeça.=Me duele la cabeza.
Eu fui ao médico ontem.=Fui al doctor ayer.
Ela teve febre a noite toda.=Tuvo fiebre toda la noche.
Você está doente?=¿Estás enfermo?
Eu fiz exercício e fiquei cansado.=Hice ejercicio y quedé cansado.
Ele quebrou o braço.=Se rompió el brazo.`);

PT('A2', 'Trabalho', 'Profesiones y futuro con ir', '💼', { t: 'Ir + infinitivo', k: 'vou vai vamos vão',
n: `Como en español pero **sin «a»**: «eu **vou trabalhar**» (voy a trabajar).
|eu vou estudar|voy a estudiar
|ela vai viajar|ella va a viajar
!«Escritório» es la oficina; «oficina» en portugués es ¡el taller mecánico!` },
`o trabalho=el trabajo/la chamba
o escritório=la oficina=🏢
o chefe=el jefe
o colega=el compañero de trabajo
o salário=el sueldo=💰
a reunião=la junta/la reunión
a empresa=la empresa
o advogado=el abogado=⚖️
o professor=el maestro=👨‍🏫
o cozinheiro=el cocinero=👨‍🍳
o garçom=el mesero
a entrevista=la entrevista
procurar=buscar
encontrar=encontrar
o computador=la computadora=💻
a oficina=el taller mecánico=🔧`,
`Eu vou procurar um emprego.=Voy a buscar un empleo.
Ela vai ser advogada.=Ella va a ser abogada.
Nós vamos ter uma reunião.=Vamos a tener una junta.
O meu chefe é muito legal.=Mi jefe es muy buena onda.
Amanhã eu tenho uma entrevista.=Mañana tengo una entrevista.
O meu carro está na oficina.=Mi carro está en el taller.`);

PT('A2', 'A escola', 'Escuela: poder, querer, precisar', '🎒', { t: 'Poder, querer, precisar', k: 'posso pode quero quer preciso precisa',
n: `|poder|posso, pode, podemos, podem
|querer|quero, quer, queremos, querem
|precisar de|necesitar: «preciso **de** ajuda»
Con infinitivo, «precisar» no lleva «de»: «preciso estudar».
!«A prova» = el examen. «A nota» = la calificación.` },
`a aula=la clase
a prova=el examen=📝
a nota=la calificación
o caderno=el cuaderno=📓
a caneta=la pluma=🖊️
o lápis=el lápiz=✏️
a borracha=la goma=🧽
a mochila=la mochila=🎒
o dever de casa=la tarea
a faculdade=la universidad=🎓
aprender=aprender
entender=entender
a pergunta=la pregunta=❓
a resposta=la respuesta
a biblioteca=la biblioteca=📚
passar de ano=pasar de año`,
`Posso fazer uma pergunta?=¿Puedo hacer una pregunta?
Você precisa fazer o dever de casa.=Tienes que hacer la tarea.
Ela quer estudar na faculdade.=Ella quiere estudiar en la universidad.
Eu não entendo a pergunta.=No entiendo la pregunta.
Você tem uma borracha?=¿Tienes una goma?
Eu tirei uma nota boa na prova.=Saqué buena calificación en el examen.`);

PT('A2', 'No restaurante', 'Restaurante y pronombres de objeto', '🍝', { t: 'Pronombres de objeto', k: 'o a os as',
n: `Formal: «eu **o** vejo» (lo veo). En el Brasil hablado se dice «eu vejo **ele**».
Tras verbo terminado en -r: comprar + o = «compr**á-lo**».
!«A conta, por favor» = la cuenta. «O garçom» = el mesero.` },
`o cardápio=el menú=📋
o prato=el platillo=🍽️
a sobremesa=el postre=🍮
a bebida=la bebida=🥤
o vinho=el vino=🍷
a cerveja=la cerveza=🍺
a conta=la cuenta=🧾
a gorjeta=la propina
o garfo=el tenedor=🍴
a faca=el cuchillo=🔪
a colher=la cuchara=🥄
o copo=el vaso
gostoso=sabroso/rico=😋
apimentado=picante=🌶️
pedir=pedir/ordenar
a salada=la ensalada=🥗`,
`A conta, por favor.=La cuenta, por favor.
Eu quero pedir o prato do dia.=Quiero pedir el platillo del día.
Essa comida está muito gostosa!=¡Esta comida está muy rica!
Vocês têm cardápio vegetariano?=¿Tienen menú vegetariano?
Eu não o vejo.=No lo veo.
A sobremesa é por conta da casa.=El postre va por cuenta de la casa.`);

PT('B1', 'Infância', 'Recuerdos e imperfecto', '🧸', { t: 'Pretérito imperfeito', k: 'era tinha brincava morava ia',
n: `= copretérito: «jugaba, vivía».
|-ar|brincava, brincávamos
|-er / -ir|comia, comíamos
|ser|era · ter: tinha · ir: ia
!«Brincar» = jugar (niños). «Jogar» = jugar un deporte o juego con reglas.` },
`a infância=la infancia
a lembrança=el recuerdo
o brinquedo=el juguete=🧸
a boneca=la muñeca=🪆
a bola=la pelota=⚽
o vizinho=el vecino
o quintal=el patio
brincar=jugar
crescer=crecer
lembrar=recordar/acordarse
contar=contar
tímido=tímido
chorar=llorar=😢
rir=reír=😂
o doce=el dulce=🍬
o desenho animado=la caricatura=📺`,
`Quando eu era criança, morava em Puebla.=Cuando era niño, vivía en Puebla.
Nós brincávamos no quintal.=Jugábamos en el patio.
A minha avó contava histórias.=Mi abuela contaba historias.
Ele era muito tímido.=Él era muy tímido.
Todo verão a gente ia à praia.=Cada verano íbamos a la playa.
Eu me lembro do meu bairro.=Me acuerdo de mi colonia.`);

PT('B1', 'Natureza', 'Naturaleza: perfeito vs imperfeito', '🌳', { t: 'Perfeito o imperfeito', k: 'caminhávamos começou fazia vimos',
n: `Como en español: imperfeito = fondo; perfeito = acción.
|Caminhávamos…|Caminábamos… (fondo)
|…quando começou a chover.|…cuando empezó a llover.
!La Amazonía (a Amazônia) es el bosque tropical más grande del mundo.` },
`a natureza=la naturaleza
a floresta=el bosque/la selva=🌲
a árvore=el árbol=🌳
a flor=la flor=🌸
o rio=el río=🏞️
o mar=el mar=🌊
a ilha=la isla=🏝️
o pássaro=el pájaro=🐦
o cavalo=el caballo=🐴
a vaca=la vaca=🐄
o macaco=el mono=🐒
a cobra=la serpiente=🐍
a borboleta=la mariposa=🦋
a onça=el jaguar=🐆
a trilha=el sendero/la caminata=🥾
a cachoeira=la cascada`,
`Caminhávamos na floresta quando começou a chover.=Caminábamos en el bosque cuando empezó a llover.
Eu vi um macaco!=¡Vi un mono!
Fazia sol, então fomos à cachoeira.=Hacía sol, así que fuimos a la cascada.
Os pássaros cantavam.=Los pájaros cantaban.
A onça é o maior felino das Américas.=El jaguar es el felino más grande de América.
Fizemos uma trilha na montanha.=Hicimos una caminata en la montaña.`);

PT('B1', 'Tecnologia', 'Tecnología y futuro simple', '📱', { t: 'Futuro do presente', k: 'baixarei farei será terá',
n: `Infinitivo + -ei, -á, -emos, -ão: «eu falar**ei**».
Irregulares: fazer → **far**ei, dizer → **dir**ei, trazer → **trar**ei.
!Al hablar se prefiere «vou baixar» (voy a descargar). El futuro simple suena formal.` },
`o celular=el celular=📱
o notebook=la laptop=💻
a tela=la pantalla=🖥️
o teclado=el teclado=⌨️
o mouse=el mouse=🖱️
o aplicativo=la app/la aplicación
a senha=la contraseña=🔑
a rede social=la red social
a mensagem=el mensaje=💬
baixar=descargar=⬇️
enviar=enviar/mandar
salvar=guardar
apagar=borrar
a bateria=la batería=🔋
o carregador=el cargador=🔌
o arquivo=el archivo=📁`,
`Amanhã eu baixarei o aplicativo.=Mañana descargaré la aplicación.
Os robôs farão muitos trabalhos.=Los robots harán muchos trabajos.
Esqueci a minha senha.=Olvidé mi contraseña.
O meu celular está sem bateria.=Mi celular está sin batería.
Você me manda o arquivo?=¿Me mandas el archivo?
Vai ter wi-fi no hotel.=Va a haber wifi en el hotel.`);

PT('B1', 'Emoções', 'Emociones y pronombres lhe, me, te', '😊', { t: 'Objeto indirecto', k: 'lhe me te nos',
n: `«Lhe» = le (a usted / a él), muy formal. En Brasil hablado: «para ele».
|me / te / nos|me / te / nos
|Sinto saudade de você.|Te extraño.
!**Saudade** es la palabra estrella: nostalgia, extrañar algo o a alguien.` },
`feliz=feliz=😊
triste=triste=😢
bravo=enojado=😠
preocupado=preocupado=😟
nervoso=nervioso
surpreso=sorprendido=😲
orgulhoso=orgulloso
com ciúmes=celoso
o medo=el miedo=😱
a alegria=la alegría
o amor=el amor=❤️
a saudade=la nostalgia/el extrañar
a vergonha=la vergüenza/la pena
o abraço=el abrazo=🤗
sorrir=sonreír=😄
ajudar=ayudar`,
`Estou com saudade de você.=Te extraño.
Ela me deu um abraço.=Ella me dio un abrazo.
Ele está bravo comigo.=Él está enojado conmigo.
Tenho medo de aranha.=Les tengo miedo a las arañas.
Que vergonha!=¡Qué pena!
Eles estão orgulhosos do filho.=Están orgullosos de su hijo.`);

PT('B1', 'Mídia', 'Medios y estar + gerundio', '📰', { t: 'Estar + gerúndio', k: 'estou está estamos falando lendo',
n: `En Brasil: «estou **lendo**» (estoy leyendo), igual que en español.
En Portugal: «estou **a ler**».
!«A notícia» = la noticia. «O jornal» = el periódico (y también el noticiero).` },
`a notícia=la noticia=📰
o jornal=el periódico/el noticiero
o jornalista=el periodista
a reportagem=el reportaje
a televisão=la televisión=📺
o rádio=la radio=📻
o canal=el canal
o programa=el programa
o anúncio=el anuncio
a fonte=la fuente
publicar=publicar
ao vivo=en vivo
a notícia falsa=la noticia falsa
o leitor=el lector
a manchete=el titular
a entrevista coletiva=la conferencia de prensa`,
`Estou lendo o jornal.=Estoy leyendo el periódico.
Eles estão falando disso no rádio.=Están hablando de eso en la radio.
Essa notícia é falsa.=Esa noticia es falsa.
O jogo está passando ao vivo.=El partido está pasando en vivo.
A jornalista publicou uma reportagem.=La periodista publicó un reportaje.
Tem anúncio demais na televisão.=Hay demasiados anuncios en la tele.`);

PT('B1', 'Sonhos', 'Planes, sueños y condicional', '💭', { t: 'Futuro do pretérito (condicional)', k: 'faria gostaria poderia viveria',
n: `Infinitivo + -ia, -íamos, -iam: «eu viver**ia**».
**Se + imperfeito do subjuntivo → condicional**: «Se eu fosse rico, viajaria».
!Para pedir con cortesía: «Eu gostaria de…» (me gustaría…).` },
`o sonho=el sueño=💭
sonhar=soñar
o futuro=el futuro
a meta=la meta=🎯
a vida=la vida
o mundo=el mundo=🌍
a sorte=la suerte=🍀
famoso=famoso=⭐
mudar=mudarse/cambiar=📦
o exterior=el extranjero
a esperança=la esperanza
esperar=esperar
talvez=tal vez/quizás
um dia=algún día
a aventura=la aventura
realizar=realizar/cumplir`,
`Se eu fosse rico, daria a volta ao mundo.=Si fuera rico, daría la vuelta al mundo.
Eu gostaria de morar em Lisboa.=Me gustaría vivir en Lisboa.
Você poderia me ajudar?=¿Podrías ayudarme?
Um dia eu vou realizar o meu sonho.=Algún día voy a cumplir mi sueño.
O que você faria no meu lugar?=¿Qué harías en mi lugar?
Eles gostariam de mudar para o exterior.=Les gustaría mudarse al extranjero.`);

PT('B1', 'Opiniões', 'Opiniones y subjuntivo presente', '🗣️', { t: 'Presente do subjuntivo', k: 'venha seja fale faça saiba',
n: `¡Igual que en español! «Quiero que **vengas**» = «Quero que você **venha**».
|ser|seja · estar: esteja · ir: vá · fazer: faça · saber: saiba
!«Acho que» (creo que) va con indicativo; «não acho que» con subjuntivo.` },
`a opinião=la opinión
na minha opinião=en mi opinión
achar=creer/opinar
concordar=estar de acuerdo=👍
discordar=no estar de acuerdo
ter razão=tener razón
o argumento=el argumento
convencer=convencer
o debate=el debate
a solução=la solución
o problema=el problema
é importante que=es importante que
duvidar=dudar
claro=claro/por supuesto
porém=sin embargo
segundo=según`,
`É importante que você venha.=Es importante que vengas.
Quero que vocês sejam felizes.=Quiero que sean felices.
Na minha opinião, você tem razão.=En mi opinión, tienes razón.
Duvido que ele saiba a resposta.=Dudo que él sepa la respuesta.
Não concordo com você.=No estoy de acuerdo contigo.
Talvez chova amanhã.=Tal vez llueva mañana.`);

PT('B1', 'Sociedade', 'Sociedad y relativos', '🏛️', { t: 'Que, onde, cujo', k: 'que onde cujo quem',
n: `|que|que (casi todo)
|onde|donde: a cidade onde nasci
|cujo / cuja|cuyo / cuya
|quem|quien (con preposición): a pessoa com quem falo
!«Prefeito» = presidente municipal. «Prefeitura» = la presidencia municipal.` },
`a sociedade=la sociedad
o cidadão=el ciudadano
a população=la población
o prefeito=el presidente municipal
o prédio=el edificio=🏢
o trânsito=el tráfico=🚦
a calçada=la banqueta
o pedestre=el peatón
a poluição=la contaminación=🏭
o barulho=el ruido=🔊
o aluguel=la renta
a favela=la favela/el asentamiento
a segurança=la seguridad
o voluntário=el voluntario
a greve=la huelga
o transporte público=el transporte público`,
`Essa é a cidade onde eu nasci.=Esta es la ciudad donde nací.
O homem que fala é o prefeito.=El hombre que habla es el presidente municipal.
O aluguel está caro demais.=La renta está demasiado cara.
Tem muito trânsito no centro.=Hay mucho tráfico en el centro.
A pessoa com quem falei é médica.=La persona con quien hablé es doctora.
A poluição é um grande problema.=La contaminación es un gran problema.`);

PT('B2', 'Meio ambiente', 'Medio ambiente y subjuntivo de emoción', '🌎', { t: 'Subjuntivo con emociones', k: 'desapareçam reciclemos esteja',
n: `Emoción + que + subjuntivo:
|fico triste que…|me pone triste que…
|tenho medo que…|tengo miedo de que…
|é pena que…|es una lástima que…
!«Reciclar», «desmatamento» (deforestación) y «queimadas» (incendios) son temas diarios en Brasil.` },
`o meio ambiente=el medio ambiente=🌎
o clima=el clima
o aquecimento global=el calentamiento global=🔥
o planeta=el planeta=🌍
a energia renovável=la energía renovable
o painel solar=el panel solar=☀️
reciclar=reciclar=♻️
o lixo=la basura=🗑️
o plástico=el plástico
desperdiçar=desperdiciar
economizar=ahorrar
proteger=proteger
a seca=la sequía
a enchente=la inundación=🌊
o desmatamento=la deforestación
sustentável=sustentable`,
`Fico triste que as florestas desapareçam.=Me pone triste que los bosques desaparezcan.
É preciso que a gente recicle mais.=Es necesario que reciclemos más.
Tenho medo que o planeta esteja em perigo.=Tengo miedo de que el planeta esté en peligro.
Precisamos economizar água.=Necesitamos ahorrar agua.
É pena que se desperdice tanta comida.=Es una lástima que se desperdicie tanta comida.
O desmatamento ameaça a Amazônia.=La deforestación amenaza la Amazonía.`);

PT('B2', 'Carreira', 'Mundo laboral y pluscuamperfecto', '📈', { t: 'Mais-que-perfeito composto', k: 'tinha tinham começado terminado',
n: `**ter (imperfeito) + participio**: «eu **tinha terminado**» (había terminado).
También existe la forma simple literaria: «eu terminara».
!«Pedir demissão» = renunciar. «Ser demitido» = ser despedido.` },
`a carreira=la carrera profesional
a promoção=el ascenso
pedir demissão=renunciar
demitir=despedir
o contrato=el contrato=📝
o estágio=las prácticas profesionales
o sindicato=el sindicato
as horas extras=las horas extra
o home office=el home office=🏠
a experiência=la experiencia
o prazo=el plazo
gerenciar=gestionar/administrar
negociar=negociar
o aumento=el aumento
o cargo=el puesto
meio período=medio tiempo`,
`Quando cheguei, a reunião já tinha começado.=Cuando llegué, la junta ya había empezado.
Ela tinha pedido demissão antes da crise.=Ella había renunciado antes de la crisis.
Nós tínhamos terminado o projeto no prazo.=Habíamos terminado el proyecto a tiempo.
Ele foi promovido ontem.=Lo ascendieron ayer.
Eu trabalho meio período.=Trabajo medio tiempo.
Pedi um aumento ao meu chefe.=Le pedí un aumento a mi jefe.`);

PT('B2', 'Arte', 'Arte e infinitivo personal', '🎨', { t: 'El infinitivo personal', k: 'irmos fazermos saírem',
n: `¡Exclusivo del portugués! El infinitivo se conjuga:
|para eu sair|para que yo salga
|para nós sairmos|para que salgamos
|para eles saírem|para que ellos salgan
«É melhor **voltarmos**» = es mejor que regresemos.
!Sustituye muchos subjuntivos del español. Suena muy natural en Brasil.` },
`a arte=el arte=🎨
o quadro=el cuadro
o pintor=el pintor
a pintura=la pintura
a escultura=la escultura=🗿
a exposição=la exposición
a obra=la obra
a obra-prima=la obra maestra
o teatro=el teatro=🎭
o ator=el actor
o romance=la novela
o escritor=el escritor=✍️
o poema=el poema
o público=el público
aplaudir=aplaudir=👏
o show=el concierto=🎤`,
`É melhor voltarmos cedo.=Es mejor que regresemos temprano.
O museu fechou antes de chegarmos.=El museo cerró antes de que llegáramos.
Comprei ingressos para irmos ao teatro.=Compré boletos para que vayamos al teatro.
O público aplaudiu de pé.=El público aplaudió de pie.
Esse romance é uma obra-prima.=Esa novela es una obra maestra.
Tarsila do Amaral pintou o Abaporu.=Tarsila do Amaral pintó el Abaporu.`);

PT('B2', 'Política', 'Política y voz pasiva', '🗳️', { t: 'Voz pasiva', k: 'foi foram será aprovada por',
n: `**ser + participio + por**: «A lei **foi aprovada pelo** Senado».
Pasiva con «se»: «Vendem-**se** casas» (se venden casas).
!En Brasil el voto es obligatorio de los 18 a los 70 años.` },
`a política=la política
o governo=el gobierno
o presidente=el presidente
a eleição=la elección=🗳️
votar=votar
o voto=el voto
o deputado=el diputado
o senado=el senado
a lei=la ley=⚖️
a democracia=la democracia
o direito=el derecho
a liberdade=la libertad=🕊️
a igualdade=la igualdad
o imposto=el impuesto
a corrupção=la corrupción
o candidato=el candidato`,
`A lei foi aprovada pelo Senado.=La ley fue aprobada por el Senado.
O presidente é eleito pelo povo.=El presidente es elegido por el pueblo.
Os impostos serão aumentados.=Los impuestos serán aumentados.
O voto é obrigatório no Brasil.=El voto es obligatorio en Brasil.
O candidato foi criticado pela imprensa.=El candidato fue criticado por la prensa.
Vendem-se apartamentos.=Se venden departamentos.`);

PT('B2', 'Ciência', 'Ciencia y futuro del subjuntivo', '🔬', { t: 'Futuro do subjuntivo', k: 'for tiver quiser puder',
n: `¡Un tiempo que el español ya casi no usa! Va tras **quando, se, enquanto** con sentido futuro:
|quando eu for|cuando vaya / sea
|se você tiver tempo|si tienes tiempo
|quem quiser|quien quiera
!Error típico del mexicano: «quando eu vou» ✗ → «quando eu **for**» ✓.` },
`a ciência=la ciencia=🔬
o pesquisador=el investigador
a pesquisa=la investigación
o laboratório=el laboratorio=🧪
a descoberta=el descubrimiento
a vacina=la vacuna=💉
o vírus=el virus=🦠
a doença=la enfermedad
o tratamento=el tratamiento
o cérebro=el cerebro=🧠
o sangue=la sangre=🩸
o osso=el hueso=🦴
saudável=sano
prevenir=prevenir
a teoria=la teoría
comprovar=comprobar`,
`Quando eu for ao Brasil, vou visitar você.=Cuando vaya a Brasil, te voy a visitar.
Se você tiver tempo, me liga.=Si tienes tiempo, llámame.
Quem quiser pode participar da pesquisa.=Quien quiera puede participar en la investigación.
A vacina salvou milhões de vidas.=La vacuna salvó millones de vidas.
Os pesquisadores fizeram uma descoberta.=Los investigadores hicieron un descubrimiento.
O cérebro consome muita energia.=El cerebro consume mucha energía.`);

PT('B2', 'Relações', 'Relaciones y discurso indirecto', '💞', { t: 'Discurso indirecto', k: 'que se disse perguntou',
n: `|«Eu te amo.»|Ele disse que me amava.
|«Vamos?»|Ela perguntou se nós íamos.
|«Vou chegar.»|Ele disse que ia chegar.
!«Namorado / namorada» = novio / novia. «Noivo» = prometido (comprometido para casarse).` },
`o relacionamento=la relación
o casal=la pareja=💑
o namorado=el novio
a namorada=la novia
o noivo=el prometido
apaixonar-se=enamorarse=😍
casar=casarse=💍
o casamento=la boda/el matrimonio
divorciar-se=divorciarse
a confiança=la confianza
a briga=la pelea
perdoar=perdonar
a mentira=la mentira
a verdade=la verdad
a amizade=la amistad
o ciúme=los celos`,
`Ele disse que me amava.=Me dijo que me amaba.
Ela perguntou se nós íamos à festa.=Ella preguntó si íbamos a la fiesta.
Eles disseram que iam casar em maio.=Dijeron que se iban a casar en mayo.
Eu me apaixonei pela minha vizinha.=Me enamoré de mi vecina.
Posso contar com você?=¿Puedo contar contigo?
Eles fizeram as pazes depois da briga.=Se reconciliaron después de la pelea.`);

PT('B2', 'Economia', 'Economía y conectores', '💹', { t: 'Gerundio y conectores', k: 'economizando investindo portanto',
n: `|economizando|ahorrando
|portanto|por lo tanto
|entretanto / no entanto|sin embargo
|apesar de|a pesar de
!«A bolsa» es la bolsa de valores. Tu bolsa de mano también es «bolsa».` },
`a economia=la economía=📈
o crédito=el crédito
o empréstimo=el préstamo
a dívida=la deuda
a poupança=el ahorro
investir=invertir
a bolsa de valores=la bolsa de valores
a inflação=la inflación
a crise=la crisis=📉
o crescimento=el crecimiento
o lucro=la ganancia
o prejuízo=la pérdida
o orçamento=el presupuesto
o consumidor=el consumidor
a taxa de juros=la tasa de interés
a falência=la quiebra`,
`Economizando, você vai comprar uma casa.=Ahorrando, vas a comprar una casa.
Ele ficou rico investindo na bolsa.=Se hizo rico invirtiendo en la bolsa.
A inflação subiu este ano.=La inflación subió este año.
A empresa foi à falência.=La empresa quebró.
Preciso pagar o meu empréstimo.=Necesito pagar mi préstamo.
Apesar da crise, o lucro cresceu.=A pesar de la crisis, la ganancia creció.`);

PT('B2', 'Lusofonia', 'El mundo que habla portugués', '🌐', { t: 'Conectores y lusofonía', k: 'porém embora portanto enquanto',
n: `El portugués es oficial en 9 países: Brasil, Portugal, Angola, Mozambique, Cabo Verde, Guinea-Bisáu, Santo Tomé, Timor Oriental y Guinea Ecuatorial.
|embora + subjuntivo|aunque
|enquanto|mientras
!Unos 260 millones de hablantes: más que el francés como lengua materna.` },
`a lusofonia=la lusofonía
Portugal=Portugal=🇵🇹
Angola=Angola=🇦🇴
Moçambique=Mozambique=🇲🇿
Cabo Verde=Cabo Verde=🇨🇻
a língua oficial=el idioma oficial
o sotaque=el acento
porém=sin embargo
embora=aunque
portanto=por lo tanto
enquanto=mientras
graças a=gracias a
por causa de=por culpa de
além disso=además
ou seja=es decir
quanto a=en cuanto a`,
`Fala-se português em quatro continentes.=Se habla portugués en cuatro continentes.
Embora chovesse, nós saímos.=Aunque llovía, salimos.
Graças a você, eu consegui.=Gracias a ti, lo logré.
O sotaque de Portugal é bem diferente.=El acento de Portugal es muy diferente.
Ela gosta de chá, enquanto ele prefere café.=A ella le gusta el té, mientras que él prefiere café.
Estou cansado, portanto vou dormir.=Estoy cansado, por lo tanto me voy a dormir.`);

PT('C1', 'Expressões I', 'Expresiones idiomáticas', '🎭', { t: 'No traduzcas palabra por palabra', k: 'saco pé abacaxi',
n: `|encher o saco|dar lata, fastidiar
|pagar o pato|pagar los platos rotos
|descascar o abacaxi|resolver un problemón
!Muchas tienen equivalente mexicano directo. Apréndelas como bloque.` },
`encher o saco=dar lata/fastidiar
pagar o pato=pagar los platos rotos
descascar o abacaxi=resolver un problemón
estar com a pulga atrás da orelha=estar con la espina/sospechar
chutar o balde=mandar todo al diablo
dar com a língua nos dentes=irse de la lengua
pisar na bola=regarla/meter la pata
custar os olhos da cara=costar un ojo de la cara
ficar de molho=quedarse en cama/reposar
quebrar o galho=echar la mano/sacar del apuro
ter um parafuso a menos=estar mal de la azotea
cair a ficha=caer el veinte
fazer uma vaquinha=hacer una coperacha
ir pro brejo=irse al traste
dar um jeitinho=buscar la manera/arreglárselas
estar morrendo de fome=morirse de hambre`,
`Para de encher o saco!=¡Deja de dar lata!
Você pisou na bola comigo.=La regaste conmigo.
Só agora caiu a ficha.=Apenas ahorita me cayó el veinte.
Vamos fazer uma vaquinha para o presente.=Hagamos una coperacha para el regalo.
Ele sempre dá um jeitinho.=Él siempre se las arregla.
Esse carro custou os olhos da cara.=Ese carro costó un ojo de la cara.`);

PT('C1', 'Debate', 'Argumentar y subjuntivo imperfecto', '⚖️', { t: 'Imperfeito do subjuntivo', k: 'fosse tivesse pudesse soubesse',
n: `= «si yo **fuera**»: «se eu **fosse**», «se eu **tivesse**».
|ser / ir|fosse
|ter|tivesse
|fazer|fizesse
Conectores: **além disso**, **no entanto**, **em suma**, **vale ressaltar que**.
!En un debate formal se usa «a meu ver» (a mi parecer).` },
`argumentar=argumentar
refutar=refutar
sustentar=sostener
a tese=la tesis
a premissa=la premisa
a conclusão=la conclusión
o exemplo=el ejemplo
em primeiro lugar=en primer lugar
além disso=además
no entanto=no obstante
a meu ver=a mi parecer
em suma=en suma
vale ressaltar=cabe destacar
o preconceito=el prejuicio
o ponto de vista=el punto de vista
o consenso=el consenso`,
`Se eu fosse você, aceitaria a proposta.=Si yo fuera tú, aceptaría la propuesta.
A meu ver, a tese é fraca.=A mi parecer, la tesis es débil.
Além disso, é preciso considerar o custo.=Además, hay que considerar el costo.
Se tivéssemos dados, poderíamos comprovar.=Si tuviéramos datos, podríamos comprobarlo.
Em suma, não estou convencido.=En suma, no estoy convencido.
Vale ressaltar que houve avanços.=Cabe destacar que hubo avances.`);

PT('C1', 'Literatura', 'Literatura brasileña', '📚', { t: 'El portugués literario', k: 'fora dissera fizera',
n: `En literatura aparece el **mais-que-perfeito simples**: «ele **fizera**» = había hecho.
Autores clave: Machado de Assis, Clarice Lispector, Jorge Amado, Fernando Pessoa (Portugal).
!«Dom Casmurro» de Machado de Assis es lectura obligada para un C1.` },
`o conto=el cuento
a personagem=el personaje
o herói=el héroe
o narrador=el narrador
o enredo=la trama
o capítulo=el capítulo
a metáfora=la metáfora
a rima=la rima
o verso=el verso
o desfecho=el desenlace
o século=el siglo
o autor=el autor
a literatura=la literatura
a crônica=la crónica
o romance=la novela
o leitor=el lector`,
`Machado de Assis nasceu no Rio de Janeiro.=Machado de Assis nació en Río de Janeiro.
O narrador conta a sua juventude.=El narrador cuenta su juventud.
Ele já fizera tudo o que podia.=Él ya había hecho todo lo que podía.
O desfecho é surpreendente.=El desenlace es sorprendente.
Clarice Lispector escrevia de forma única.=Clarice Lispector escribía de forma única.
A crônica é um gênero muito brasileiro.=La crónica es un género muy brasileño.`);

PT('C1', 'Justiça', 'Derecho y nominalización', '👨‍⚖️', { t: 'La nominalización', k: 'prisão assinatura investigação',
n: `|prender → a prisão|detener → la detención
|assinar → a assinatura|firmar → la firma
|investigar → a investigação|investigar → la investigación
!«Prender» en portugués = detener/arrestar (¡no encender!). Encender es «acender».` },
`a justiça=la justicia
o tribunal=el tribunal
o juiz=el juez=👨‍⚖️
o réu=el acusado
a vítima=la víctima
a testemunha=el testigo
a prova=la prueba
o crime=el crimen
o roubo=el robo
o ladrão=el ladrón
o julgamento=el juicio
culpado=culpable
inocente=inocente
condenar=condenar
a prisão=la cárcel/la detención=⛓️
a multa=la multa`,
`A polícia prendeu o suspeito.=La policía detuvo al sospechoso.
O juiz anunciou a sentença.=El juez anunció la sentencia.
Ele foi condenado a pagar uma multa.=Fue condenado a pagar una multa.
Não há provas contra ele.=No hay pruebas en su contra.
A testemunha falou no julgamento.=El testigo habló en el juicio.
A investigação avança devagar.=La investigación avanza despacio.`);

PT('C1', 'Filosofia', 'Filosofía y concesión', '🦉', { t: 'Embora, mesmo que, por mais que', k: 'embora mesmo seja faça',
n: `|embora + subjuntivo|aunque
|mesmo que + subjuntivo|aunque, incluso si
|por mais que + subjuntivo|por más que
|o que quer que|lo que sea que
!«Mesmo que chova» = aunque llueva (siempre subjuntivo).` },
`a filosofia=la filosofía
o pensamento=el pensamiento
a consciência=la conciencia
a razão=la razón
a moral=la moral
a ética=la ética
a felicidade=la felicidad
a virtude=la virtud
o desejo=el deseo
a existência=la existencia
o ser humano=el ser humano
a alma=el alma
o conhecimento=el conocimiento
a dúvida=la duda
o sentido=el sentido
a sabedoria=la sabiduría`,
`Penso, logo existo.=Pienso, luego existo.
Embora seja rico, ele não é feliz.=Aunque es rico, no es feliz.
Por mais que eu tente, não consigo.=Por más que lo intento, no puedo.
Mesmo que chova, eu vou sair.=Aunque llueva, voy a salir.
A dúvida é o princípio da sabedoria.=La duda es el principio de la sabiduría.
O que quer que você faça, faça bem.=Hagas lo que hagas, hazlo bien.`);

PT('C1', 'História', 'Historia de Brasil y Portugal', '🏰', { t: 'Narrar la historia', k: 'foi chegaram proclamada',
n: `Fechas clave: 1500 (llegada de Cabral), 1822 (independencia), 1888 (abolición), 1889 (república).
«No século XIX» = en el siglo XIX.
!Brasil fue la única colonia que fue sede de un imperio europeo: la corte portuguesa se mudó a Río en 1808.` },
`o rei=el rey=👑
a rainha=la reina
o império=el imperio
a guerra=la guerra
a paz=la paz=☮️
a batalha=la batalla
o soldado=el soldado
a monarquia=la monarquía
a república=la república
o povo=el pueblo
a colônia=la colonia
a independência=la independencia
a escravidão=la esclavitud
a abolição=la abolición
o descobrimento=el descubrimiento
a ditadura=la dictadura`,
`Os portugueses chegaram ao Brasil em 1500.=Los portugueses llegaron a Brasil en 1500.
A independência foi proclamada em 1822.=La independencia fue proclamada en 1822.
A escravidão foi abolida em 1888.=La esclavitud fue abolida en 1888.
A corte portuguesa se mudou para o Rio.=La corte portuguesa se mudó a Río.
A ditadura durou vinte e um anos.=La dictadura duró veintiún años.
O Brasil virou república em 1889.=Brasil se volvió república en 1889.`);

PT('C1', 'Negócios', 'Portugués de negocios', '🤝', { t: 'Registro formal escrito', k: 'prezado atenciosamente anexo segue',
n: `|Prezado(a) senhor(a),|Estimado(a) señor(a):
|Segue em anexo…|Adjunto encontrará…
|Fico à disposição.|Quedo a sus órdenes.
|Atenciosamente,|Atentamente
!En correos formales brasileños se usa «o senhor / a senhora» en lugar de «você».` },
`prezado=estimado
atenciosamente=atentamente
em anexo=adjunto=📎
fico à disposição=quedo a sus órdenes
o orçamento=la cotización/el presupuesto
a nota fiscal=la factura
o fornecedor=el proveedor
o sócio=el socio
a videoconferência=la videollamada
a pauta=el orden del día
a ata=la minuta
a entrega=la entrega=🚚
o reembolso=el reembolso
a reclamação=la queja
fechar negócio=cerrar un trato=🤝
o diretor-geral=el director general`,
`Segue em anexo a nota fiscal.=Adjunto encontrará la factura.
Fico à disposição para qualquer dúvida.=Quedo a sus órdenes para cualquier duda.
Prezado senhor, agradeço o contato.=Estimado señor, agradezco su contacto.
Poderia confirmar a data de entrega?=¿Podría confirmar la fecha de entrega?
Fechamos negócio com o fornecedor.=Cerramos el trato con el proveedor.
Atenciosamente, Pedro Souza.=Atentamente, Pedro Souza.`);

PT('C1', 'Gírias', 'Portugués coloquial de Brasil', '🛹', { t: 'El Brasil hablado', k: 'cara legal beleza',
n: `|tô / tá|estoy / está (estou, está)
|pra|para
|a gente|nosotros
|cadê?|¿dónde está?
!«Legal» = padre/chido. «Beleza» = va, órale. «Cara» = güey/carnal.` },
`cara=güey/carnal
legal=padre/chido
beleza=va/órale
massa=increíble/chido
valeu=gracias/va
mano=carnal/hermano
bagunça=desmadre/desorden
grana=lana/dinero
trampo=chamba
rolê=salida/vuelta
zoar=burlarse/echar relajo
cadê=dónde está
tô=estoy
pra=para
de boa=tranqui/relajado
balada=antro/fiesta`,
`Valeu, cara!=¡Gracias, carnal!
Esse filme é muito legal.=Esa película está bien padre.
Vamos dar um rolê?=¿Vamos a dar la vuelta?
Tô sem grana hoje.=Hoy ando sin lana.
Cadê o meu celular?=¿Dónde está mi celular?
Tô de boa, beleza?=Estoy tranqui, ¿va?`);

PT('C2', 'Expressões II', 'Expresiones avanzadas', '🐓', { t: 'Expresiones de nativo', k: 'mão cabeça boi',
n: `|enfiar o pé na jaca|pasarse de copas, excederse
|dar nome aos bois|llamar las cosas por su nombre
|ter jogo de cintura|tener mucha habilidad para salir de líos
!«Jeitinho brasileiro»: el arte de encontrar una solución creativa (a veces informal).` },
`enfiar o pé na jaca=excederse/pasarse
dar nome aos bois=llamar las cosas por su nombre
ter jogo de cintura=tener colmillo/saber torear
chorar sobre o leite derramado=llorar sobre la leche derramada
botar a mão no fogo=meter las manos al fuego
pôr a carroça na frente dos bois=empezar la casa por el tejado
estar com a faca e o queijo na mão=tener la sartén por el mango
ficar em cima do muro=no definirse/nadar de muertito
dourar a pílula=suavizar una mala noticia
ser um pão-duro=ser codo
falar pelos cotovelos=hablar hasta por los codos
tirar o cavalinho da chuva=irse olvidando de algo
mal-entendido=malentendido
pegar no pé=estar encima/molestar
matar dois coelhos com uma cajadada só=matar dos pájaros de un tiro
quem não chora não mama=el que no llora no mama`,
`Ontem eu enfiei o pé na jaca.=Ayer me pasé de copas.
Vamos dar nome aos bois.=Llamemos las cosas por su nombre.
Ele é muito pão-duro.=Él es muy codo.
Pode tirar o cavalinho da chuva.=Ya te puedes ir olvidando.
Ela fala pelos cotovelos.=Ella habla hasta por los codos.
Ele sempre fica em cima do muro.=Él nunca se define.`);

PT('C2', 'Nuances', 'Vocabulario abstracto', '🧠', { t: 'Sufijos y matices', k: 'pertinência ambiguidade sutileza',
n: `|-dade|-dad: ambiguidade, sutileza
|-agem|-aje: abordagem (enfoque), coragem (valor)
|-mento|-miento: engajamento
!Ojo con «esquisito» = raro (¡no exquisito!).` },
`a ambiguidade=la ambigüedad
a sutileza=la sutileza
a pertinência=la pertinencia
o percalço=el contratiempo
a abordagem=el enfoque
o desamparo=el desamparo
o engajamento=el compromiso/la participación
o cansaço=el cansancio/el hastío
a gentileza=la amabilidad
a desenvoltura=la soltura
a ilusão=la ilusión/el engaño
a perenidade=la perdurabilidad
a complacência=la complacencia
a abnegação=la abnegación
o despeito=el despecho
esquisito=raro/extraño`,
`O discurso carecia de pertinência.=El discurso carecía de pertinencia.
Ela agiu com gentileza.=Actuó con amabilidad.
A abordagem dele é coerente.=Su enfoque es coherente.
Que comida esquisita!=¡Qué comida tan rara!
É uma ilusão achar que tudo é fácil.=Es una ilusión creer que todo es fácil.
Houve um percalço no caminho.=Hubo un contratiempo en el camino.`);

PT('C2', 'Imprensa', 'Prensa y futuro compuesto', '🗞️', { t: 'Futuro composto', k: 'terei terá teremos',
n: `**ter (futuro) + participio** = habré hecho: «Amanhã **terei terminado**».
|até lá|para entonces
|quando você ler isto|cuando leas esto
!Titulares: frases nominales y presente: «Governo anuncia reforma».` },
`o editorial=el editorial
a coluna=la columna
o colunista=el columnista
a redação=la redacción
o editor-chefe=el jefe de redacción
a agência de notícias=la agencia de noticias
o furo=la primicia
a censura=la censura
a liberdade de imprensa=la libertad de prensa
a pesquisa de opinião=la encuesta
o desmentido=el desmentido
desmentir=desmentir
divulgar=divulgar
a polêmica=la polémica
o comunicado=el comunicado
a tiragem=el tiraje`,
`Quando você ler isto, eu terei partido.=Cuando leas esto, me habré ido.
Até amanhã, o jornal terá publicado a notícia.=Para mañana, el diario habrá publicado la noticia.
O ministro desmentiu o boato.=El ministro desmintió el rumor.
A liberdade de imprensa é fundamental.=La libertad de prensa es fundamental.
Esse editorial gerou polêmica.=Ese editorial generó polémica.
Teremos terminado antes do meio-dia.=Habremos terminado antes del mediodía.`);

PT('C2', 'Ciências', 'Ciencia y tecnología avanzada', '🚀', { t: 'El portugués científico', k: 'foram devem ser',
n: `Muchos cognados (átomo, galáxia). Rasgos:
|voz pasiva|«As amostras foram analisadas»
|se impersonal|«Observa-se que…»
!«Experimento» y «experiência» se distinguen: experiencia vivida vs experimento.` },
`a astronomia=la astronomía=🔭
a galáxia=la galaxia=🌌
a estrela=la estrella=⭐
o buraco negro=el agujero negro
o universo=el universo
a gravidade=la gravedad
o átomo=el átomo=⚛️
a célula=la célula
a evolução=la evolución
o algoritmo=el algoritmo
o dado=el dato
o foguete=el cohete=🚀
o satélite=el satélite=🛰️
o terremoto=el sismo/el terremoto
a amostra=la muestra
verificar=verificar`,
`Os dados devem ser verificados.=Los datos deben ser verificados.
O foguete foi lançado com sucesso.=El cohete fue lanzado con éxito.
Observa-se que o universo se expande.=Se observa que el universo se expande.
Cada célula contém DNA.=Cada célula contiene ADN.
A amostra foi analisada no microscópio.=La muestra fue analizada en el microscopio.
O algoritmo aprende com os dados.=El algoritmo aprende de los datos.`);

PT('C2', 'Retórica', 'Retórica y mesóclisis', '🎙️', { t: 'Colocación pronominal culta', k: 'far-se-á dir-se-ia',
n: `En registro muy formal, el pronombre va **dentro** del verbo en futuro y condicional (mesóclisis):
|far-se-á|se hará
|dir-se-ia|se diría
|dar-lhe-ei|le daré
!Hoy suena solemne o irónico; aparece en leyes y discursos.` },
`a retórica=la retórica
a eloquência=la elocuencia
o orador=el orador
o discurso=el discurso
a figura de linguagem=la figura retórica
a hipérbole=la hipérbole
o eufemismo=el eufemismo
a ironia=la ironía
o paradoxo=la paradoja
persuadir=persuadir
cativar=cautivar
a plateia=el público
o tom=el tono
a norma culta=el registro culto
sem dúvida=sin duda
mal=apenas (mal chegou)`,
`Far-se-á justiça.=Se hará justicia.
Dir-se-ia que ele estava cansado.=Se diría que estaba cansado.
O orador cativou a plateia.=El orador cautivó al público.
Mal chegou, já foi embora.=Apenas llegó, ya se fue.
Sem dúvida, ele tem razão.=Sin duda, tiene razón.
Não é nada mau.=No está nada mal.`);

PT('C2', 'Brasil e Portugal', 'Variantes del portugués', '🇵🇹', { t: 'Brasil vs Portugal', k: 'comboio autocarro pequeno-almoço',
n: `|Brasil|Portugal
|trem|comboio
|ônibus|autocarro
|café da manhã|pequeno-almoço
|celular|telemóvel
|estou falando|estou a falar
!En Portugal «você» puede sonar distante; se usa «tu» con amigos.` },
`o comboio=el tren (Portugal)
o autocarro=el camión (Portugal)
o pequeno-almoço=el desayuno (Portugal)
o telemóvel=el celular (Portugal)
a casa de banho=el baño (Portugal)
o frigorífico=el refri (Portugal)
a bica=el café exprés (Lisboa)
fixe=padre/chido (Portugal)
o miúdo=el niño (Portugal)
a rapariga=la muchacha (Portugal)
o sumo=el jugo (Portugal)
o ecrã=la pantalla (Portugal)
o rato=el mouse (Portugal)
estar a fazer=estar haciendo (Portugal)
o fado=el fado (canto de Lisboa)
o cafuné=la caricia en el cabello (Brasil)`,
`Em Lisboa eu apanho o autocarro.=En Lisboa tomo el camión.
O meu telemóvel não tem rede.=Mi celular no tiene señal.
Estou a trabalhar agora.=Estoy trabajando ahorita.
Que fixe!=¡Qué padre!
Queres uma bica?=¿Quieres un café exprés?
A casa de banho fica à direita.=El baño está a la derecha.`);

PT('C2', 'Psique', 'Psicología y sociedad', '🫶', { t: 'Hablar de lo íntimo', k: 'empatia resiliência autoestima',
n: `|trata-se de|se trata de
|lidar com|lidiar con, manejar
|enfrentar|enfrentar
!«Fazer terapia» es muy común y bien visto en Brasil.` },
`a psicologia=la psicología
o comportamento=el comportamiento
a personalidade=la personalidad
a autoestima=la autoestima
a ansiedade=la ansiedad
o estresse=el estrés
o esgotamento=el agotamiento/el burnout
a depressão=la depresión
a terapia=la terapia
a empatia=la empatía
a resiliência=la resiliencia
o trauma=el trauma
a motivação=la motivación
a desigualdade=la desigualdad
a solidariedade=la solidaridad
o assédio=el acoso`,
`Ela faz terapia toda semana.=Ella va a terapia cada semana.
A empatia é essencial numa relação.=La empatía es esencial en una relación.
O esporte ajuda a lidar com o estresse.=El deporte ayuda a manejar el estrés.
É preciso combater o assédio.=Hay que combatir el acoso.
A resiliência se desenvolve com o tempo.=La resiliencia se desarrolla con el tiempo.
Trata-se de um problema social.=Se trata de un problema social.`);

PT('C2', 'Maestria', 'Maestría: el gran final', '🏆', { t: 'Repaso maestro', k: 'fluentemente vale pena',
n: `Repasas todos los tiempos: presente, perfeito, imperfeito, futuro, condicional, subjuntivo (presente, imperfeito y futuro) e infinitivo personal.
!Lee a Machado, escucha bossa nova, mira novelas: el idioma ya es tuyo. Parabéns!` },
`dominar=dominar
fluentemente=con fluidez
a língua materna=la lengua materna
bilíngue=bilingüe
o falso amigo=el falso amigo
a desenvoltura=la soltura
aperfeiçoar=perfeccionar
a persistência=la perseverancia
o esforço=el esfuerzo
o desafio=el reto
conseguir=lograr
o sucesso=el éxito
a trajetória=la trayectoria
valer a pena=valer la pena
o orgulho=el orgullo
parabéns=felicidades=🎉`,
`Eu falo português fluentemente.=Hablo portugués con fluidez.
Valeu a pena todo o esforço.=Valió la pena todo el esfuerzo.
Devagar se vai ao longe.=Poco a poco se anda lejos.
Eu alcancei a minha meta.=Alcancé mi meta.
Parabéns pela sua persistência!=¡Felicidades por tu perseverancia!
O português agora faz parte de mim.=El portugués ahora es parte de mí.`);

GS.extra.pt.ff = `exquisito|exquisito|raro, extraño (se escribe esquisito)
borracha|borracha|la goma de borrar
polvo|polvo|el pulpo
apelido|apellido|el apodo
oficina|oficina|el taller mecánico
escritório|escritorio|la oficina
cadeira|cadera|la silla
salada|salada|la ensalada
largo|largo|ancho (largo = comprido)
esquisito|exquisito|raro, extraño
ninho|niño|el nido
rato|rato|el ratón
assinatura|asignatura|la firma
cena|cena|la escena (cena = jantar)
prender|prender|detener, arrestar
ligar|ligar|llamar por teléfono, encender
batata|batata|la papa
fechar|fechar|cerrar
pegar|pegar|agarrar, tomar
acordar|acordar|despertar
balcão|balcón|el mostrador
taça|taza|la copa
tirar|tirar|quitar, sacar
contestar|contestar|refutar, cuestionar
embaraçada|embarazada|apenada, avergonzada
propina|propina|el soborno (propina = gorjeta)
garrafa|garrafa|la botella
sobremesa|sobremesa|el postre
engraçado|engrasado|chistoso
copo|copo|el vaso`;
GS.extra.pt.cult = `¿Cómo se saludan los amigos en Brasil?|Con besos en la mejilla y abrazos|Con reverencia|Solo con la mano
¿Qué es el «jeitinho brasileiro»?|Encontrar una solución creativa a un problema|Un baile típico|Un postre de coco
¿Qué es la «feijoada»?|Un guiso de frijoles negros con carne|Una fiesta en la playa|Un tipo de pan
¿Cuándo es el Carnaval?|Antes de la Cuaresma, entre febrero y marzo|En diciembre|En julio
¿Qué ritmo nació en Río a fines de los años 50?|La bossa nova|El tango|La cumbia
¿Cuál es la capital de Brasil?|Brasilia|Río de Janeiro|São Paulo
¿Qué es el «cafezinho»?|Un café pequeño que se ofrece como cortesía|Una cafetería|Un postre
¿Qué significa «saudade»?|Nostalgia, extrañar a alguien o algo|Saludo|Salud
¿Qué gesto con la mano es positivo en Brasil?|El pulgar arriba|El «OK» con el círculo|Mostrar la palma
¿Qué es el «pão de queijo»?|Un panecillo de queso de Minas Gerais|Un sándwich|Una pizza
¿Qué país tiene más hablantes de portugués?|Brasil|Portugal|Angola
¿Qué es el «fado»?|Un canto melancólico de Lisboa|Un deporte|Una danza brasileña`;
GS.extra.pt.phon = `ão|Vocal nasal: como «aún» pero por la nariz y sin la n.|não · pão · mão
-m final|La m final no se pronuncia: nasaliza la vocal.|bom · sim · também
lh|Como la «ll» en «llave» de forma muy marcada (como «li»).|filho · trabalho · mulher
nh|Igual que la «ñ».|vinho · amanhã · ninho
-e final|En Brasil la e final átona suena «i».|leite · tarde · noite
-o final|La o final átona suena «u».|carro · obrigado · livro
t / d + i|En Brasil «ti» suena «chi» y «di» suena «yi».|tia · dia · cidade
r inicial|La r inicial y la rr suenan como una j suave.|rio · carro · Roberto
s entre vocales|Suena como z de zumbido (sonora).|casa · mesa · rosa
j / g + e, i|Como la «ll» argentina («sh» sonora).|janela · gente · hoje
ç|Siempre suena s.|açúcar · coração · moça
x|Puede sonar «sh», «s», «ks» o «z».|xícara · próximo · táxi · exame`;
