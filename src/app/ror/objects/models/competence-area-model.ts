import { CompetenceModel } from "./competence-model";
import { CompetenceAreaDto } from "../dtos/competence-area-dto";

export class CompetenceAreaModel {

  category: string;
  competenceList: CompetenceModel[];

  constructor(obj?: CompetenceAreaDto) {
    this.category = obj && obj.category || '';
    this.competenceList = obj && obj.competenceList || [];
  }
  
}
