import { PerformerEntity } from '../performer/performer.entity';
import { TrackEntity } from '../track/track.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    fechaLanzamiento: Date;

    @Column()
    descripcion: string;

    //ManyToMany con PerformerEntity
    @ManyToMany(type => PerformerEntity, performer => performer.albumes)
    @JoinTable()
    performers: PerformerEntity[];

    //OneToMany con TrackEntity
    @OneToMany(type => TrackEntity, track => track.album)
    tracks: TrackEntity[];
}