import { RatingDto } from "../dtos/rating-dto";
import { CompetenceAreaDto } from "../dtos/competence-area-dto";
import { RorConstants } from "src/app/ror/objects/values/constants";
import { TaskModel } from "./task-model";

export class RatingModel {

  id: string;
  dateMeeting: string;
  ratedUser: string;
  ratedUserFN: string;
  ratedUserPositionKey: string;
  ratedUserPositionDesc: string;
  status: string;
  competencesPersonal: CompetenceAreaDto[];
  competencesProfessional: CompetenceAreaDto[];
  tasks: TaskModel[];
  yearSummary: string;
  nextDevelopment: string;
  recommendation: string;
  finalEvaluationUser: string;
  finalEvaluationManager: string;
  notesUser: string;
  notesManager: string;
  manager: string;
  managerKey: string;
  managerFN: string;

  constructor(obj?: RatingDto) {
    
    this.id = obj && obj.id || null;
    this.dateMeeting = obj && obj.dateMeeting || null;
    this.ratedUser = obj && obj.ratedUser || '';
    this.ratedUserFN = obj && obj.ratedUserFN || '';
    this.ratedUserPositionKey = obj && obj.ratedUserPositionKey || '';
    this.ratedUserPositionDesc = obj && obj.ratedUserPositionDesc || '';
    this.status = obj && obj.status || RorConstants.DEFAULT_STATUS_RATING;
    this.competencesPersonal = obj && obj.competencesPersonal || null;
    this.competencesProfessional = obj && obj.competencesProfessional || null;
    this.tasks = obj && obj.tasks || null;
    this.yearSummary = obj && unescape(obj.yearSummary) || '';
    this.nextDevelopment = obj && unescape(obj.nextDevelopment) || '';
    this.recommendation = obj && unescape(obj.recommendation) || '';
    this.finalEvaluationManager = obj && unescape(obj.finalEvaluationManager) || '';
    this.finalEvaluationUser = obj && unescape(obj.finalEvaluationUser) || '';
    this.notesManager = obj && unescape(obj.notesManager) || '';
    this.notesUser = obj && unescape(obj.notesUser) || '';
    this.manager = obj && obj.manager || '';
    this.managerKey = obj && obj.managerKey || '';
    this.managerFN = obj && obj.managerFN || '';

  }

}
