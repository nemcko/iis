import { TaskDto } from "./task-dto";
import { CompetenceAreaDto } from "./competence-area-dto";

export interface RatingDto {

  id: string,
  dateMeeting: string,
  ratedUser: string,
  ratedUserFN: string,
  ratedUserPositionKey: string,
  ratedUserPositionDesc: string,
  status: string,
  competencesPersonal: CompetenceAreaDto[],
  competencesProfessional: CompetenceAreaDto[],
  tasks: TaskDto[],
  yearSummary: string,
  nextDevelopment: string,
  recommendation: string,
  finalEvaluationUser: string,
  finalEvaluationManager: string,
  notesUser: string,
  notesManager: string,
  manager: string,
  managerKey: string,
  managerFN: string
}
