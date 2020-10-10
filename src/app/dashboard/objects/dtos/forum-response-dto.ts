export interface ForumResponseDto {

    id: string,
    oznamId: string,
    parentId: string,
	description: string,
	author: string,
    modified: string,
    privileges: [string],
    imgUrl: string

}
