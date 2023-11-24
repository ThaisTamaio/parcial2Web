import { AlbumEntity } from '../album/album.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';

@Entity()
export class PerformerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    imagen: string;

    @Column()
    descripcion: string;

    //ManyToMany con AlbumEntity
    @ManyToMany(type => AlbumEntity, album => album.performers)
    @JoinTable()
    albumes: AlbumEntity[];
}