
export enum RatingStatusList {
  DRAFT = 'DRAFT',
  UZAVRETY = 'UZAVRETY',
  U_NADRIADENEHO = 'U_NADRIADENEHO',
  VYJADRENIE = 'VYJADRENIE',
  IN_PROCESS = 'IN_PROCESS'
}

export enum RatingStatusListDesc {
  DRAFT = 'Koncept',
  UZAVRETY = 'Uzavretý',
  U_NADRIADENEHO = 'U nadriadeného',
  VYJADRENIE = 'Vyjadrenie zamestnanca',
  IN_PROCESS = 'Prebieha spracovanie'
}

export enum RatingStatusColorList {
  DRAFT = '',
  UZAVRETY = 'text-secondary',
  U_NADRIADENEHO = 'text-tertiary',
  VYJADRENIE = 'text-primary',
  IN_PROCESS = 'text-warning'
}

export enum CompetenceTypeList {
  PERSONAL = 'PERSONAL',
  PROFESSIONAL = 'PROFESSIONAL'
}

export enum RatingWFActions {
  SAVE = 'save',
  SEND_TO_MANAGER = 'ACT_ODOSLAT',
  SEND_TO_RATED = 'ACT_VYJADRENIE',
  FINALIZE_RATING = 'ACT_UZAVRIET',
  EDIT = 'EDIT'
}

export enum RatingFormSections {
  HEADER = 'header',
  TASKS = 'tasks',
  COMPETENCE = 'competence',
  PREPARATION = 'preparation',
  EVALUATION = 'evaluation',
  NOTES = 'notes'
}