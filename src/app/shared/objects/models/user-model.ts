import { UserDto } from '../dtos/user-dto';

export class UserModel {

    public fullName: string;
    public positionKey: string;
    public userName: string;
    public roles: [string];
    public access: string;
    public image: string;

    public constructor(obj?: UserDto) {
        this.fullName = obj && obj.fullName || null;
        this.positionKey = obj && obj.positionKey || null;
        this.userName = obj && obj.userName || null;
        this.roles = obj && obj.roles || null;
        this.access = obj && obj.access || null;
        this.image = obj && obj.image || null;
    }
}
