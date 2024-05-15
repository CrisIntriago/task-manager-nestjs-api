import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as config from "config";

const jwtConfig = config.get("jwt");

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secret,
        });
    }

    async validate(payload: JwtPayload) : Promise<User>{
        const {username} = payload;
        const user = await this.userRepository.findOne({where : {username: username}});
        
        console.log("Testing")
        console.log(user)

        if(!user){
            throw new UnauthorizedException();

        }

        return user;
    }
}