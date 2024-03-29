// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  configname: '',
  SERVER_URL: 'https://dev9ba01.posam.sk',

  PATH_UCHADZACI: '/iis/hr/ciselnik.nsf',
  REST_CURRENT_USER: '../../../assets/mockup/current-user.json',
  REST_UCHADZACI: '../../../assets/mockup/uchadzaci.json',
  REST_OZNAMY: '../../../assets/mockup/oznamy.json',
  REST_OZNAMY_BY_CATEGORY: '../../../assets/mockup/oznamy.json',
  REST_OZNAM: '../../../assets/mockup/oznam.json',
  REST_SET_OZNAM: '',
  REST_CREATE_ID: '../../../assets/mockup/oznam-id.json',
  REST_GET_VOTING: '../../../assets/mockup/voting.json',
  REST_SET_VOTING: '',
  REST_RYCHLY_OZNAM: '../../../assets/mockup/rychly-oznam.json',
  REST_RYCHLA_OTAZKA: '../../../assets/mockup/rychla-otazka.json',
  REST_UDALOSTI: '../../../assets/mockup/udalosti.json',
  REST_EMOTIKON: '../../../assets/mockup/odpoved-emotikon.json',
  SET_EMOTIKON: '',
  SET_ODPOVED: '',
  REST_APLIKACIE: './assets/data/application-links-dev.json',
  REST_IMAGE_UPLOAD: '/iis/appl/oznamy.nsf/rest_upload.xsp',
  REST_FORUM_LIST: './assets/mockup/forum-list.json',
  SET_FORUM_ITEM: '',
  REST_FORUM_SUMAR: './assets/mockup/forum-sumar.json',
  REST_OZNAMY_CATEGORIES: './assets/mockup/oznamy-categories.json',
  REST_GOLEM: './assets/mockup/golem.json',
  REST_PODAKOVANIA: './assets/mockup/podakovania.json',
  REST_SET_PODAKOVANIE: '',
  REST_PODAKOVANIE_REMOVE: '',
  REST_SET_QUESTION_HR: '',

  REST_RP_GET_FAQ_LIST: './assets/mockup/rp-faq-list.json',
  REST_RP_SET_FAQ_QUESTION: '',
  REST_RP_GET_REQUEST_LIST: './assets/mockup/rp-list-all.json',
  REST_RP_GET_REQUEST_LIST_BY_STATUS: './assets/mockup/rp-list-all.json',
  REST_RP_GET_REQUEST_LIST_BY_USER: './assets/mockup/rp-list.json',
  REST_RP_GET_REQUEST: './assets/mockup/rp-ziadost-detail.json',
  REST_RP_GET_TEMPLATE_URL: './assets/mockup/rp-ziadost-vzor.json',
  REST_RP_SET_REQUEST: '',
  REST_RP_GET_CONTRIBUTION: './assets/mockup/rp-contribution.json',
  REST_RP_CREATE_ID: './assets/mockup/rp-id.json',
  REST_RP_GET_WFFN_ACTIONS: './assets/mockup/rp-wffn-actions.json',
  REST_RP_IMAGE_UPLOAD: '',

  REST_ROR_GET_RATINGS: './assets/mockup/ratings-list.json',
  REST_ROR_GET_COMPETENCES: './assets/mockup/pozicie-a-kompetencie.json',
  REST_ROR_GET_RATING: './assets/mockup/rating-detail.json',
  REST_ROR_SET_RATING: '',
  REST_ROR_CREATE_ID: './assets/mockup/rating-id.json',
  REST_ROR_GET_WFFN_ACTIONS: './assets/mockup/rating-wffn-actions.json',

  REST_CP_GET_RATINGS: './assets/mockup/cp-rating-list.json',
  REST_CP_GET_RATING: './assets/mockup/cp-rating.json',
  REST_CP_SET_RATING: '',
  REST_CP_CREATE_ID: './assets/mockup/rating-id.json',
  REST_CP_GET_THEMES: './assets/mockup/cp-otazky.json',
  REST_CP_GET_WFFN_ACTIONS: './assets/mockup/cp-wffn-actions.json',

  REST_CODE_REVIEW_GET_RATINGS: './assets/mockup/code-review-list.json',
  REST_CODE_REVIEW_GET_RATING: './assets/mockup/code-review.json',
  REST_CODE_REVIEW_SET_RATING: '',
  REST_CODE_REVIEW_CREATE: './assets/mockup/code-review-id.json',
  REST_CODE_REVIEW_GET_THEMES: './assets/mockup/code-review-otazky.json',
  REST_CODE_REVIEW_GET_FUNCTIONAL_UNIT_LIST: './assets/mockup/functional-unit-list.json',
  REST_CODE_REVIEW_GET_WFFN_ACTIONS: './assets/mockup/code-review-wffn-actions.json',

  REST_PROJECT_GET_REPORT: './assets/mockup/projectOLD.detail.json',

  REST_THEMES_ITEMS: './assets/mockup/themes.items.json',
  REST_THEMES_REVIEW: './assets/mockup/themes.review.json',
  REST_EVAL_NEWCODE: './assets/mockup/evalcodes.detail.json',
  REST_EVAL_CODES: './assets/mockup/evalcodes.json',
  REST_EVAL_CODE: './assets/mockup/evalcodes.detail.json',

  REST_PROJECT_LIST: './assets/mockup/project.list.json',
  REST_PROJECT_DETAIL: './assets/mockup/project.detail.json',
  REST_PROJECT_USERS: './assets/mockup/users.json',
  REST_PROJECT_WORKGROUPS: './assets/mockup/project.wgrps.json',
  REST_PROJECT_KICKOFF: './assets/mockup/project.kickoff.json',
  REST_PROJECT_CREVAL: './assets/mockup/project.creview.copy.json',



  /////////////////////////////
  REST_POZA: '/proxy',

  REST_LOGGED_USER: '/iis/appl/oznamy.nsf/rest_user.xsp',
  REST_POZA_USRS: '/iis/hr/ciselnik.nsf/rest_pouzivatelia.xsp',
  REST_POZA_USRGRPS: '/iis/hr/ciselnik.nsf/rest_skupiny.xsp',
  REST_POZA_EMPALL: '/iis/hr/ciselnik.nsf/rest_zamestnanci_vsetci.xsp',
  REST_POZA_EMPMY: '/iis/hr/ciselnik.nsf/rest_zamestnanci_moji.xsp',
  REST_POZA_EMPFAV: '/iis/hr/ciselnik.nsf/rest_zamestnanci_oblubeni.xsp',
  REST_POZA_EMPFADD: '/iis/hr/ciselnik.nsf/rest_pridaj_oblubeneho.xsp',
  REST_POZA_EMPFDEL: '/iis/hr/ciselnik.nsf/rest_odober_oblubeneho.xsp',
  REST_POZA_PERSDATA: '/iis/hr/ciselnik.nsf/rest_zamestnanec.xsp',
  REST_POZA_UPDPERSDATA: '/iis/hr/ciselnik.nsf/rest_nastav_zamestnanca.xsp',
  REST_POZA_UPDPERSDOC: '/iis/hr/ciselnik.nsf/rest_zamestnanec_uloz_prilohu.xsp',
  REST_POZA_DELPERSDOC: '/iis/hr/ciselnik.nsf/rest_zamestnanec_zmaz_prilohu.xsp',
  REST_POZA_PROFCOMPS: '/emp/profcomps',
  REST_POZA_PERSCOMPS: '/emp/perscomps',
  REST_POZA_COURSES: '/iis/hr/ciselnik.nsf/rest_skolenia.xsp',
  REST_POZA_COURSE: '/iis/hr/ciselnik.nsf/rest_skolenie.xsp',
  REST_POZA_CERTIFICATES: '/iis/hr/ciselnik.nsf/rest_certifikaty.xsp',
  REST_POZA_CERTIFICATE: '/iis/hr/ciselnik.nsf/rest_certifikat.xsp',
  REST_POZA_TARGETS: '/iis/hr/ror.nsf/rest_rors_goals.xsp',
  REST_POZA_PROJECTS: '/emp/projects',
  REST_POZA_PROJECT: '/emp/project',
  REST_POZA_UPDPROJECT: '/emp/project',
  REST_POZA_PROMEMBERS: '/emp/members',
  REST_POZA_UPDPROMEMBERS: '/emp/updmembers',
  REST_POZA_NEWMEETING: '/iis/hr/ror.nsf/rest_create_id.xsp',
  REST_POZA_MEETINGS: '/iis/hr/ror.nsf/rest_teamleader_meetings.xsp',
  REST_POZA_MEETING: '/iis/hr/ror.nsf/rest_load_teamleader_meeting.xsp',
  REST_POZA_UPDMEETING: '/iis/hr/ror.nsf/rest_save_teamleader_meeting.xsp',
  REST_POZA_NEWREVIEW: '/iis/hr/ror.nsf/rest_create_id.xsp',
  REST_POZA_REVIEWS: '/iis/hr/ror.nsf/rest_code_reviews.xsp',
  REST_POZA_REVIEW: '/iis/hr/ror.nsf/rest_load_code_review.xsp',
  REST_POZA_UPDREVIEW: '/iis/hr/ror.nsf/rest_save_code_review.xsp', 
  REST_POZA_NEWCLOSEOUT: '/iis/hr/ror.nsf/rest_create_id.xsp',
  REST_POZA_CLOSEOUTS: '/iis/hr/ror.nsf/rest_close_outs.xsp',
  REST_POZA_CLOSEOUT: '/iis/hr/ror.nsf/rest_load_close_out.xsp',
  REST_POZA_UPDCLOSEOUT: '/iis/hr/ror.nsf/rest_save_close_out.xsp',
  REST_POZA_NEWROR: '/iis/hr/ror.nsf/rest_create_ror_id.xsp',
  REST_POZA_RORS: '/iis/hr/ror.nsf/rest_close_outs.xsp',
  REST_POZA_ROR: '/iis/hr/ror.nsf/rest_load_ror.xsp',
  REST_POZA_UPDROR: '/iis/hr/ror.nsf/rest_save_ror.xsp',
  REST_POZA_THEMES: '/iis/hr/ciselnik.nsf/rest_temy.xsp',
  REST_POZA_SETTHEME: '/iis/hr/ciselnik.nsf/rest_nastav_temy.xsp',
  REST_POZA_TLCARDS: '/iis/hr/ror.nsf/rest_karta_teamlidra.xsp',
  REST_POZA_PROEVALS: '/emp/proevals',
  REST_POZA_NEWPROEVAL: '/emp/newproeval',
  REST_POZA_PROEVAL: '/emp/proeval',
  REST_POZA_UPDPROEVALUATION: '/emp/saveevaluation',

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
