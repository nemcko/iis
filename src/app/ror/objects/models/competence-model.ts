import { CompetenceDto } from "../dtos/competence-dto";

export class CompetenceModel {

  id: string;
  title: string;
  rating: string;

  constructor(obj?: CompetenceDto) {

    this.id = obj && obj.id || '';
    this.rating = obj && obj.rating || '';
    this.title = obj && obj.title || '';
    
  }
}
