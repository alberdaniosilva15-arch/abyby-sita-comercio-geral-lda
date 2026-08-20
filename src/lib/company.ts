/**
 * Dados centralizados da empresa ABYBY SITA COMÉRCIO GERAL, LDA.
 * Fonte única de verdade para todos os componentes, prompts e metadados.
 */

export const COMPANY = {
  name: 'ABYBY SITA COMÉRCIO GERAL, LDA',
  shortName: 'Abyby Sita',
  slogan: 'Soluções Globais. Confiança Local.',
  nif: '5417121665',

  address: {
    street: 'Rua Direita do Patriota, Condomínio Vila Kuditemo, Casa nº 18',
    condo: 'Vila Kuditemo',
    houseNumber: '18',
    zone: 'Lar do Patriota',
    municipality: 'Talatona',
    city: 'Luanda',
    country: 'Angola',
    full: 'Rua Direita do Patriota, Condomínio Vila Kuditemo, Casa nº 18, Lar do Patriota, Talatona, Luanda, Angola',
    lat: -8.962,
    lng: 13.205,
    mapQuery: 'Condomínio Vila Kuditemo, Rua Direita do Patriota, Talatona, Luanda',
    mapsUrl: 'https://maps.google.com/maps?q=Condom%C3%ADnio+Vila+Kuditemo,+Rua+Direita+do+Patriota,+Talatona,+Luanda&t=&z=16&ie=UTF8&iwloc=B&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=Condom%C3%ADnio+Vila+Kuditemo,+Rua+Direita+do+Patriota,+Talatona,+Luanda',
  },

  phones: {
    commercial: ['+244 935 403 327', '+244 951 058 417'],
    primary: '+244 935 403 327',
  },

  email: 'info.geral@abybysita.com',
  emails: {
    geral: 'info.geral@abybysita.com',
    comercial: 'comercial@abybysita.com',
    recrutamento: 'recrutamento@abybysita.com',
    suporte: 'suporte@abybysita.com',
    direcao: 'direcao@abybysita.com',
  },
  website: 'https://www.abybysita.com',

  hours: 'Segunda a Sexta-feira, das 08h00 às 17h00 (Hora de Luanda)',

  whatsapp: {
    number: '244935403327',
    url: 'https://wa.me/244935403327',
  },
} as const;
