const asignaturas = [
    {
        nombre: 'Teoría del Conocimiento',
        clave: '1156',
        claveLicenciatura: ['308', '309', '310'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Análisis Diseño e Implantación de Algoritmos',
        clave: '1164',
        claveLicenciatura: ['308'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Contabilidad',
        clave: '1165',
        claveLicenciatura: ['308'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Matemáticas I (Álgebra Lineal)',
        clave: '1168',
        claveLicenciatura: ['308'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Informática I (Fundamentos)',
        clave: '1169',
        claveLicenciatura: ['308'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Principios y Técnicas de Investigación',
        clave: '1765',
        claveLicenciatura: ['308'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Introducción a la Programación',
        clave: '1167',
        claveLicenciatura: ['308'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Administración',
        clave: '1215',
        claveLicenciatura: ['308'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Informática II (Administración de Requerimientos)',
        clave: '1216',
        claveLicenciatura: ['308'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Matemáticas II (Razonamiento lógico matemático para la toma de decisiones)',
        clave: '1217',
        claveLicenciatura: ['308'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Soporte Técnico',
        clave: '1269',
        claveLicenciatura: ['308'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Ética en las Organizaciones',
        clave: '1850',
        claveLicenciatura: ['308', '309', '309'],
        claveSemestre: ['002', '004', '003']
    },
    {
        nombre: 'Conceptos Jurídicos Fundamentales',
        clave: '1151',
        claveLicenciatura: ['308', '309', '310'],
        claveSemestre: ['003', '001']
    },
    {
        nombre: 'Recursos Humanos',
        clave: '1260',
        claveLicenciatura: ['308'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Entorno de las Organizaciones',
        clave: '1347',
        claveLicenciatura: ['308'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Informática III  (Análisis y Diseño de Sistemas Estructurado)',
        clave: '1348',
        claveLicenciatura: ['308'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Matemáticas III (Cálculo diferencial e integral)',
        clave: '1349',
        claveLicenciatura: ['308'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Programación (Estructura de datos)',
        clave: '1361',
        claveLicenciatura: ['308'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Arquitectura de Computadoras',
        clave: '1364',
        claveLicenciatura: ['308'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Matemáticas Financieras',
        clave: '1154',
        claveLicenciatura: ['308', '309', '310'],
        claveSemestre: ['004', '005', '001']
    },
    {
        nombre: 'Sistemas Operativos Multiusuarios',
        clave: '1268',
        claveLicenciatura: ['308'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Bases de Datos',
        clave: '1365',
        claveLicenciatura: ['308'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Informática IV (Análisis y Diseño Orientado a Objetos)',
        clave: '1445',
        claveLicenciatura: ['308'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Matemáticas IV (Estadística descriptiva e inferencial)',
        clave: '1446',
        claveLicenciatura: ['308'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Derecho Informático',
        clave: '1564',
        claveLicenciatura: ['308'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Telecomunicaciones I (Redes Locales)',
        clave: '1467',
        claveLicenciatura: ['308'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Desarrollo de Aplicaciones en Manejadores de Bases de Datos Relacionales',
        clave: '1547',
        claveLicenciatura: ['308'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Matemáticas V (Matemáticas discretas)',
        clave: '1566',
        claveLicenciatura: ['308'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Informática V (Programación Orientada a Objetos)',
        clave: '1568',
        claveLicenciatura: ['308'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Finanzas Corporativas',
        clave: '1625',
        claveLicenciatura: ['308', '309'],
        claveSemestre: ['005', '006']
    },
    {
        nombre: 'Mercadotecnia',
        clave: '1908',
        claveLicenciatura: ['308'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Costos y Presupuestos',
        clave: '1264',
        claveLicenciatura: ['308'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Telecomunicaciones II (Redes Globales)',
        clave: '1567',
        claveLicenciatura: ['308'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Desarrollo de Sitios Web con Transacciones en Línea',
        clave: '1655',
        claveLicenciatura: ['308'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Informática VI (Programación e implementación de sistemas)',
        clave: '1656',
        claveLicenciatura: ['308'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Matemáticas VI (Investigación de Operaciones)',
        clave: '1667',
        claveLicenciatura: ['308'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Programación de Dispositivos Móviles',
        clave: '1668',
        claveLicenciatura: ['308'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Auditoría en Informática',
        clave: '1664',
        claveLicenciatura: ['308'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Creación de Negocios de Tecnología',
        clave: '1727',
        claveLicenciatura: ['308'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Informática VII (Ingeniería de Software)',
        clave: '1728',
        claveLicenciatura: ['308'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Planeación de Proyectos Informáticos',
        clave: '1729',
        claveLicenciatura: ['308'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Seguridad Informática',
        clave: '1767',
        claveLicenciatura: ['308'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Servicios de Tecnología',
        clave: '1767',
        claveLicenciatura: ['308'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Entorno de las organizaciones',
        clave: '1141',
        claveLicenciatura: ['309'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Estadística Descriptiva',
        clave: '1142',
        claveLicenciatura: ['309'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Fundamentos de Administración',
        clave: '1143',
        claveLicenciatura: ['309'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Tecnologías de Información y Comunicación',
        clave: '1144',
        claveLicenciatura: ['309'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Derecho Laboral',
        clave: '1352',
        claveLicenciatura: ['309', '310'],
        claveSemestre: ['002', '004']
    },
    {
        nombre: 'Estadística Inferencial',
        clave: '1242',
        claveLicenciatura: ['309'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Información Financiera',
        clave: '1243',
        claveLicenciatura: ['309'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Macroeconomía',
        clave: '1254',
        claveLicenciatura: ['309'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Organización y Procedimientos',
        clave: '1244',
        claveLicenciatura: ['309'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Principios y Técnicas de Investigación',
        clave: '1255',
        claveLicenciatura: ['309'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Comportamiento en las Organizaciones',
        clave: '1343',
        claveLicenciatura: ['309'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Costos',
        clave: '1351',
        claveLicenciatura: ['309'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Derecho Corporativo Empresarial',
        clave: '1344',
        claveLicenciatura: ['309'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Desarrollo Sustentable y las Organizaciones',
        clave: '1345',
        claveLicenciatura: ['309'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Dirección',
        clave: '1533',
        claveLicenciatura: ['309'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Fundamentos de Mercadotecnia',
        clave: '1346',
        claveLicenciatura: ['309'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Microeconomía',
        clave: '1355',
        claveLicenciatura: ['309', '310'],
        claveSemestre: ['003', '002']
    },
    {
        nombre: 'Planeación e Integración de los Recursos Humanos',
        clave: '1422',
        claveLicenciatura: ['309'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Planeación y Control',
        clave: '1423',
        claveLicenciatura: ['309'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Presupuestos',
        clave: '1454',
        claveLicenciatura: ['309', '310'],
        claveSemestre: ['004', '007']
    },
    {
        nombre: 'Razonamiento Lógico Matemático para la Toma de Decisiones',
        clave: '1424',
        claveLicenciatura: ['309'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Sistemas de Información de Mercadotecnia',
        clave: '1425',
        claveLicenciatura: ['309'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Administración de Cadenas de Suministro',
        clave: '1426',
        claveLicenciatura: ['309'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Desarrollo y Calidad de Vida para los Recursos Humanos',
        clave: '1427',
        claveLicenciatura: ['309'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Plan de Mercadotecnia',
        clave: '1526',
        claveLicenciatura: ['309'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Técnicas, Enfoques y Temas Administrativos Contemporáneos',
        clave: '1527',
        claveLicenciatura: ['309'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Administración de la Remuneración',
        clave: '1623',
        claveLicenciatura: ['309'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Administración de Organizaciones del Sector Social',
        clave: '1622',
        claveLicenciatura: ['309'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Administración Estratégica de Operaciones de Bienes y Servicios',
        clave: '1624',
        claveLicenciatura: ['309'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Técnicas de Negociación Empresarial',
        clave: '1626',
        claveLicenciatura: ['309'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Administración Pública',
        clave: '1721',
        claveLicenciatura: ['309'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Administración Táctica de Operaciones de Bienes y Servicios',
        clave: '1722',
        claveLicenciatura: ['309'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Creación de Organizaciones',
        clave: '1723',
        claveLicenciatura: ['309'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Instrumentos Financieros',
        clave: '1724',
        claveLicenciatura: ['309'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Administración de Proyectos de Inversión',
        clave: '1825',
        claveLicenciatura: ['309'],
        claveSemestre: ['008']
    },
    {
        nombre: 'Administración Estratégica',
        clave: '1824',
        claveLicenciatura: ['309'],
        claveSemestre: ['008']
    },
    {
        nombre: 'Administración Básica',
        clave: '1157',
        claveLicenciatura: ['310'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Administración Básica',
        clave: '1157',
        claveLicenciatura: ['310'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Contabilidad I',
        clave: '1158',
        claveLicenciatura: ['310'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Macroeconomía',
        clave: '1159',
        claveLicenciatura: ['310'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Tecnologías de Información y Comunicación I',
        clave: '1160',
        claveLicenciatura: ['310'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Diagnóstico de Mercados',
        clave: '1213',
        claveLicenciatura: ['310'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Contabilidad II',
        clave: '1257',
        claveLicenciatura: ['310'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Derecho Mercantil',
        clave: '1252',
        claveLicenciatura: ['310'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Principios y Técnicas de la Investigación',
        clave: '1259',
        claveLicenciatura: ['310'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Tecnologías de Información y Comunicación II',
        clave: '1214',
        claveLicenciatura: ['310'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Contabilidad III',
        clave: '1357',
        claveLicenciatura: ['310'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Derecho Fiscal',
        clave: '1452',
        claveLicenciatura: ['310'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Análisis del Entorno Económico, Político y Social',
        clave: '1322',
        claveLicenciatura: ['310'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Estadística II',
        clave: '1353',
        claveLicenciatura: ['310'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Operaciones',
        clave: '1360',
        claveLicenciatura: ['310'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Sistemas de Control Interno',
        clave: '1461',
        claveLicenciatura: ['310'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Contabilidad IV',
        clave: '1457',
        claveLicenciatura: ['310'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Costos I',
        clave: '1358',
        claveLicenciatura: ['310'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Finanzas I (Finanzas Básicas)',
        clave: '1428',
        claveLicenciatura: ['310'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Contribuciones Indirectas y al Comercio Exterior',
        clave: '1659',
        claveLicenciatura: ['310'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Razonamiento Lógico Matemático',
        clave: '1429',
        claveLicenciatura: ['310'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Auditoría I',
        clave: '1528',
        claveLicenciatura: ['310'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Contabilidad V',
        clave: '1558',
        claveLicenciatura: ['310'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Costos II',
        clave: '1459',
        claveLicenciatura: ['310'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Finanzas II (Finanzas Corporativas)',
        clave: '1529',
        claveLicenciatura: ['310'],
        claveSemestre: ['005']
    },
    {
        nombre: 'ISR a Salarios y Seguridad Social',
        clave: '1545',
        claveLicenciatura: ['310'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Personas Morales I',
        clave: '1546',
        claveLicenciatura: ['310'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Auditoría II',
        clave: '1627',
        claveLicenciatura: ['310'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Control de Gestión',
        clave: '1458',
        claveLicenciatura: ['310'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Finanzas III (Mercados Financieros)',
        clave: '1628',
        claveLicenciatura: ['310'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Personas Morales II',
        clave: '1654',
        claveLicenciatura: ['310'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Personas Físicas',
        clave: '1629',
        claveLicenciatura: ['310'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Auditoría III',
        clave: '1725',
        claveLicenciatura: ['310'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Auditoría Interna',
        clave: '1658',
        claveLicenciatura: ['310'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Finanzas IV (Proyectos de Inversión)',
        clave: '1726',
        claveLicenciatura: ['310'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Finanzas V (Ingeniería Financiera)',
        clave: '1826',
        claveLicenciatura: ['310'],
        claveSemestre: ['008']
    },
    {
        nombre: 'Administración',
        clave: '1170',
        claveLicenciatura: ['311'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Asuntos Internacionales I',
        clave: '1171',
        claveLicenciatura: ['311'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Contabilidad y Administración financiera',
        clave: '1172',
        claveLicenciatura: ['311'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Economía I',
        clave: '1173',
        claveLicenciatura: ['311'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Ética I',
        clave: '1174',
        claveLicenciatura: ['311'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Inglés (primer semestre)',
        clave: '1175',
        claveLicenciatura: ['311'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Matemáticas',
        clave: '1176',
        claveLicenciatura: ['311'],
        claveSemestre: ['001']
    },
    {
        nombre: 'Asuntos Internacionales II',
        clave: '1218',
        claveLicenciatura: ['311'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Comportamiento Organizacional',
        clave: '1219',
        claveLicenciatura: ['311'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Economía II',
        clave: '1220',
        claveLicenciatura: ['311'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Estadística',
        clave: '1221',
        claveLicenciatura: ['311'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Estados y Mercados',
        clave: '1222',
        claveLicenciatura: ['311'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Ética II',
        clave: '1223',
        claveLicenciatura: ['311'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Inglés (segundo semestre)',
        clave: '1224',
        claveLicenciatura: ['311'],
        claveSemestre: ['002']
    },
    {
        nombre: 'Derecho Corporativo',
        clave: '1323',
        claveLicenciatura: ['311'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Inglés (tercer semestre)',
        clave: '1324',
        claveLicenciatura: ['311'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Innovación y Tecnología',
        clave: '1325',
        claveLicenciatura: ['311'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Mercadotecnia',
        clave: '1326',
        claveLicenciatura: ['311'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Métodos de Investigación organizacional',
        clave: '1327',
        claveLicenciatura: ['311'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Microeconomía',
        clave: '1328',
        claveLicenciatura: ['311'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Sociología del Trabajo',
        clave: '1329',
        claveLicenciatura: ['311'],
        claveSemestre: ['003']
    },
    {
        nombre: 'Administración de Proyectos',
        clave: '1447',
        claveLicenciatura: ['311'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Derecho Internacional',
        clave: '1448',
        claveLicenciatura: ['311'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Economía Aplicada',
        clave: '1449',
        claveLicenciatura: ['311'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Inglés (cuarto semestre)',
        clave: '1468',
        claveLicenciatura: ['311'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Responsabilidad Social y Sustentabilidad',
        clave: '1469',
        claveLicenciatura: ['311'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Tic en la Gestión Empresarial',
        clave: '1470',
        claveLicenciatura: ['311'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Trabajo, Organizaciones y Sociedad',
        clave: '1471',
        claveLicenciatura: ['311'],
        claveSemestre: ['004']
    },
    {
        nombre: 'Administración Estratégica Internacional',
        clave: '1524',
        claveLicenciatura: ['311'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Inglés (quinto semestre)',
        clave: '1525',
        claveLicenciatura: ['311'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Plan de Negocios',
        clave: '1548',
        claveLicenciatura: ['311'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Seminario Negocios Internacionales I',
        clave: '1549',
        claveLicenciatura: ['311'],
        claveSemestre: ['005']
    },
    {
        nombre: 'Estancia de Practicas Profesionales',
        clave: '1646',
        claveLicenciatura: ['311'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Inglés (sexto semestre)',
        clave: '1647',
        claveLicenciatura: ['311'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Seminario Negocios Internacionales II',
        clave: '1648',
        claveLicenciatura: ['311'],
        claveSemestre: ['006']
    },
    {
        nombre: 'Inglés(séptimo semestre)',
        clave: '1748',
        claveLicenciatura: ['311'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Seminario Negocios Internacionales III',
        clave: '1749',
        claveLicenciatura: ['311'],
        claveSemestre: ['007']
    },
    {
        nombre: 'Inglés (octavo semestre)',
        clave: '1827',
        claveLicenciatura: ['311'],
        claveSemestre: ['008']
    },
    {
        nombre: 'Seminario de Negocios Internacionales IV',
        clave: '1828',
        claveLicenciatura: ['311'],
        claveSemestre: ['008']
    },
];

module.exports = {
    asignaturas,
};
