import { ForumResponseDto } from "./forum-response-dto";

export interface ForumTopicDto {

    id: string,
    oznamId: string,
    parentId: string,
	description: string,
	author: string,
    modified: string,
    privileges: [string],
    imgUrl: string,
    responses: ForumResponseDto[]

}
