export const environment = {
  production: true,
  configname: 'iis',
  SERVER_URL: 'http://iis.posam.sk',
  PATH_UCHADZACI: '/iis/hr/ciselnik.nsf',
  REST_CURRENT_USER: '/iis/appl/oznamy.nsf/rest_user.xsp',
  REST_UCHADZACI: '/iis/hr/ciselnik.nsf/rest_uchadzaci.xsp',
  REST_OZNAMY: '/iis/appl/oznamy.nsf/rest_oznamy.xsp',
  REST_OZNAMY_BY_CATEGORY: '/iis/appl/oznamy.nsf/rest_oznamy_kat.xsp',
  REST_OZNAM: '/iis/appl/oznamy.nsf/rest_oznamy.xsp',
  REST_CREATE_ID: '/iis/appl/oznamy.nsf/rest_create_id.xsp',
  REST_SET_OZNAM: '/iis/appl/oznamy.nsf/rest_create_oznam.xsp',
  REST_GET_VOTING: '/iis/appl/oznamy.nsf/rest_voting.xsp',
  REST_SET_VOTING: '/iis/appl/oznamy.nsf/rest_create_voting.xsp',
  REST_RYCHLY_OZNAM: '/iis/appl/oznamy.nsf/rest_rychly_oznam.xsp',
  REST_RYCHLA_OTAZKA: '/iis/appl/oznamy.nsf/rest_rychla_otazka.xsp',
  REST_UDALOSTI: '/iis/appl/oznamy.nsf/rest_udalosti.xsp',
  REST_EMOTIKON: '/iis/appl/oznamy.nsf/rest_emotikon.xsp',
  SET_EMOTIKON: '/iis/appl/oznamy.nsf/rest_create_emotikon.xsp',
  SET_ODPOVED: '/iis/appl/oznamy.nsf/rest_create_odpoved.xsp',
  REST_APLIKACIE: './assets/data/application-links-prod.json',
  REST_IMAGE_UPLOAD: '/iis/appl/oznamy.nsf/rest_upload.xsp',
  REST_FORUM_LIST: '/iis/appl/oznamy.nsf/rest_prispevky.xsp',
  SET_FORUM_ITEM: '/iis/appl/oznamy.nsf/rest_create_prispevok.xsp',
  REST_FORUM_SUMAR: '/iis/appl/oznamy.nsf/rest_prispevky_prehlad.xsp',
  REST_OZNAMY_CATEGORIES: '/iis/appl/oznamy.nsf/rest_oznamy_categories.xsp',
  REST_GOLEM: '/iis/appl/oznamy.nsf/rest_org.xsp',
  REST_PODAKOVANIA: '/iis/appl/oznamy.nsf/rest_podakovania.xsp',
  REST_SET_PODAKOVANIE: '/iis/appl/oznamy.nsf/rest_create_thanks.xsp',
  REST_PODAKOVANIE_REMOVE: '/iis/appl/oznamy.nsf/rest_remove_thanks.xsp',
  REST_SET_QUESTION_HR: '/iis/appl/oznamy.nsf/rest_create_question_hr.xsp',

  REST_RP_GET_FAQ_LIST: '/iis/hr/poukazy.nsf/rest.xsp/getFAQ',
  REST_RP_SET_FAQ_QUESTION: '/iis/hr/poukazy.nsf/rest_create_faq.xsp',
  REST_RP_GET_REQUEST_LIST: '/iis/hr/poukazy.nsf/rest.xsp/getallrequests',
  REST_RP_GET_REQUEST_LIST_BY_STATUS: '/iis/hr/poukazy.nsf/rest_requests_kat.xsp',
  REST_RP_GET_REQUEST_LIST_BY_USER: '/iis/hr/poukazy.nsf/rest.xsp/getrequests',
  REST_RP_GET_REQUEST: '/iis/hr/poukazy.nsf/rest_request.xsp',
  REST_RP_GET_TEMPLATE_URL: '/iis/hr/poukazy.nsf/rest_template_url.xsp',
  REST_RP_SET_REQUEST: '/iis/hr/poukazy.nsf/rest_create_request.xsp',
  REST_RP_GET_CONTRIBUTION: '/iis/hr/poukazy.nsf/rest_contribution.xsp',
  REST_RP_CREATE_ID: '/iis/hr/poukazy.nsf/rest_create_id.xsp',
  REST_RP_GET_WFFN_ACTIONS: '/iis/hr/poukazy.nsf/rest_wffn.xsp',
  REST_RP_IMAGE_UPLOAD: '/iis/hr/poukazy.nsf/rest_upload.xsp',
  
  REST_ROR_GET_RATINGS: '/iis/hr/ror.nsf/rest.xsp/getROR',
  REST_ROR_GET_COMPETENCES: './assets/mockup/pozicie-a-kompetencie.json',
  REST_ROR_GET_RATING: '/iis/hr/ror.nsf/rest_ror.xsp',
  REST_ROR_SET_RATING: '/iis/hr/ror.nsf/rest_create_ror.xsp',
  REST_ROR_CREATE_ID: '/iis/hr/ror.nsf/rest_create_id.xsp',
  REST_ROR_GET_WFFN_ACTIONS: '/iis/hr/ror.nsf/rest_wffn.xsp',
  
  REST_CP_GET_RATINGS: './assets/mockup/cp-rating-list.json',
  REST_CP_GET_RATING: './assets/mockup/cp-rating.json',
  REST_CP_SET_RATING: '',
  REST_CP_CREATE_ID: './assets/mockup/rating-id.json',
  REST_CP_GET_THEMES: './assets/mockup/cp-otazky.json',
  REST_CP_GET_WFFN_ACTIONS: './assets/mockup/rating-wffn-actions.json',

  REST_CODE_REVIEW_GET_RATINGS: './assets/mockup/code-review-list.json',
  REST_CODE_REVIEW_GET_RATING: './assets/mockup/code-review.json',
  REST_CODE_REVIEW_SET_RATING: '',
  REST_CODE_REVIEW_CREATE: '',
  REST_CODE_REVIEW_GET_THEMES: './assets/mockup/code-review-otazky.json',
  REST_CODE_REVIEW_GET_FUNCTIONAL_UNIT_LIST: './assets/mockup/functional-unit-list.json',
  REST_CODE_REVIEW_GET_WFFN_ACTIONS: './assets/mockup/code-review-wffn-actions.json',

  REST_PROJECT_GET_REPORT: './assets/mockup/project-report.json',
};
