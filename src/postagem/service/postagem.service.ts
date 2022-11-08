import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entities";

@Injectable()
export class PostagemService {
    
    constructor(
        @InjectRepository(Postagem)
        private PostagemRepository: Repository<Postagem>
        ){}

     //Get All
        async findAll(): Promise<Postagem[]>{
            return await this.PostagemRepository.find({
                relations:{
                    tema: true,
                    usuario: true
                },
            })
        }

     //Get por ID
        async findById(id: number): Promise<Postagem>{
            let postagem = await this.PostagemRepository.findOne({
                where: {
                    id
                }, relations:{
                    tema:true,
                    usuario:true
                }
            }) 

            if (!postagem)
            throw new HttpException('Postagem não existe',HttpStatus.NOT_FOUND)

            return postagem

        }

    //Get por Texto
        async findByTexto(texto: string): Promise<Postagem[]>{
            return await this.PostagemRepository.find({
                where: {
                    texto: ILike(`%${texto}%`)
                },
                relations: {
                    tema: true,
                    usuario: true
                }
            })
        }
        
     //Get por Titulo
        async findByTitulo(titulo: string): Promise<Postagem>{
            return await this.PostagemRepository.findOne({
                where: {
                    titulo: ILike(`%${titulo}%`)
            },
            relations: {
                tema: true,
                usuario: true
            }
        })
    }

    //Create linha
        async create(postagem: Postagem): Promise<Postagem>{
            return this.PostagemRepository.save(postagem)
        }

    //Alteração linha
        async update(postagem: Postagem): Promise<Postagem>{
            let buscarPostagem = await this.findById(postagem.id)

            if(!buscarPostagem || !postagem.id)
            throw new HttpException('Postagem Não Existe',HttpStatus.NOT_FOUND)

            return await this.PostagemRepository.save(postagem)
        }

    //Deletar linha
        async delete(id:number): Promise <DeleteResult>{
            let buscarPostagem = await this.findById(id)

            if(!buscarPostagem)
                throw new HttpException('Postagem Não Encontrada', HttpStatus.NOT_FOUND)

                return await this.PostagemRepository.delete(id)
        }
    }