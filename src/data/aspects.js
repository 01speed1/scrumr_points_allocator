export default {
  thirdPartyAspects: [
    {
      aspect: "La implementación requiere la creación de un feature flag",
      points: 1
    },
    {
      aspect:
        "La implementación requiere algún componente externo (Gema, JS Package)",
      points: 3
    },
    {
      aspect:
        "Requiere configuración de infraestructura (Semaphore, Producción, etc)",
      points: 3
    },
    { aspect: "La implementación requiere crear workers", points: 1 }
  ],
  appearance: [
    { aspect: "Requiere cambios en HTML/HAML de páginas", points: 1 },
    { aspect: "Requiere cambios en HTML/HAML de mailers", points: 1 },
    {
      aspect: "Requiere cambios en CSS que impliquen layout en páginas",
      points: 2
    },
    {
      aspect: "Requiere cambios en CSS diferentes a layout en páginas",
      points: 2
    },
    { aspect: "Requiere cambios en CSS en mailers", points: 2 },
    { aspect: "Requiere crear nuevos presenters", points: 1 },
    { aspect: "Requiere modificar presenters existentes", points: 2 }
  ],
  rooting: [
    { aspect: "Requiere cambios en las rutas", points: 1 },
    { aspect: "Requiere crear nuevos controladores", points: 1 },
    { aspect: "Requiere modificar controladores existentes", points: 2 }
  ],
  modeling: [
    { aspect: "Requiere crear nuevos libraries", points: 1 },
    { aspect: "Requiere modificar libraries existentes", points: 2 },
    { aspect: "Requiere crear nuevos servicio", points: 2 },
    { aspect: "Requiere modificar servicios existentes", points: 2 },
    {
      aspect: "Requiere crear servicios de gemas como ActivedAdmin",
      points: 2
    },
    { aspect: "Requiere crear nuevos modelos AR", points: 1 },
    { aspect: "Requiere modificar modelos de AR existentes", points: 1 },
    { aspect: "Requiere crear migraciones", points: 1 }
  ],
  mailers: [
    { aspect: "Requiere crear nuevos mailers", points: 1 },
    { aspect: "Requiere modificar mailers existentes", points: 1 }
  ],
  webServices: [],
  traslation: [{ aspect: "Requiere traducciones", points: 1 }],
  configuration: [
    {
      aspect: "Requiere cambios en la configuración de Rails",
      points: 2
    },
    {
      aspect: "Requiere cambios en la configuración de Javascript",
      points: 2
    }
  ],
  javascript: [
    { aspect: "Requiere crear componente de React", points: 1 },
    { aspect: "Requiere modificar componente de React", points: 2 },
    { aspect: "El componente requiere de peticiones al API", points: 2 },
    { aspect: "Se requiere crear una vista", points: 2 },
    { aspect: "Se requiere configuracion de cache", points: 1 }
  ],
  script: [
    { aspect: "Requiere consultas en la base de datos", points: 1 },
    {
      aspect: "Requiere presentación especial de la información PDF",
      points: 3
    },
    { aspect: "Requiere actualizaciones y ejecución de código", points: 3 }
  ],
  externalFactors: [
    {
      aspect:
        "La implementación requiere definicion de reglas de negocio externas (departamento de mercadeo, dirección, etc)",
      points: 3
    },
    {
      aspect:
        "Requiere análisis y redacción de textos para humanos(análisis de watson, documentaciones de auditoría, informes, etc)",
      points: 2
    },
    {
      aspect:
        "La implementación requiere aprobaciones externas (financieras, aprobación de clientes, etc)",
      points: 2
    }
  ],
  testing: [
    { aspect: "Requiere implementar pruebas Rails", points: 2 },
    { aspect: "Requiere modificar pruebas existentes Rails", points: 2 },
    { aspect: "Requiere implementar pruebas Javscript", points: 2 },
    { aspect: "Requiere modificar pruebas existentes Javscript", points: 2 }
  ],
  others: [{ aspect: "Tengo miedo!!! :C", points: 0 }]
};
