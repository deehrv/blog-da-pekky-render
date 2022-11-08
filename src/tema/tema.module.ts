import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaController } from "./controlle/tema.controller";
import { Tema } from "./entities/tema.entities";
import { TemaService } from "./service/tema.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    providers: [TemaService],
    controllers: [TemaController],
    exports:[TypeOrmModule]
})

export class TemaModule { }