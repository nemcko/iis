import { ForumTopicDto } from "../dtos/forum-topic-dto";
import { ForumResponseDto } from "../dtos/forum-response-dto";

export class ForumDetailModel {

    id: string;
    oznamId: string;
    parentId: string;
	description: string;
	author: string;
    modified: string;
    privileges: [string];
    imgUrl: string;
    responses: ForumResponseDto[];

    constructor(obj?: ForumTopicDto) {
        this.id = obj && obj.id || null;
        this.oznamId = obj && obj.oznamId || null;
        this.parentId = obj && obj.parentId || null;
        this.description = obj && obj.description && unescape(obj.description) || "";
        this.author = obj && obj.author || null;
        this.modified = obj && obj.modified || null;
        this.privileges = obj && obj.privileges || null;
        this.imgUrl = obj && obj.imgUrl || null;
        this.responses = obj && obj.responses || [];
    }
}
