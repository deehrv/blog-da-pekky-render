import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Postagem } from "../entities/postagem.entities";

import { PostagemService } from "../service/postagem.service";

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller("/postagens")
@ApiBearerAuth()
export class PostagemController{
    constructor(private readonly PostagemService: PostagemService){}

    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]>{
        return this.PostagemService.findAll();
    }

    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id:number): Promise<Postagem>{
        return this.PostagemService.findById(id)
    }

  
    @Get('/Texto/:texto')
    @HttpCode(HttpStatus.OK)
    findByTexto(@Param('texto') texto:string): Promise<Postagem[]>{
        return this.PostagemService.findByTexto(texto)
    }

    @Get('/Titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo')titulo:string): Promise<Postagem>{
        return this.PostagemService.findByTitulo(titulo)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.PostagemService.create(postagem)
    }

    
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.PostagemService.update(postagem)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.PostagemService.delete(id)
    }
}