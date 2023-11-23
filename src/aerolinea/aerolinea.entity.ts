import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class AerolineaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;
    
    @Column()
    fechaFundacion: Date;
    
    @Column()
    paginaWeb: string;

    //ManyToMany con AeropuertoEntity
    @ManyToMany(type => AeropuertoEntity, aeropuerto => aeropuerto.aerolineas)
    @JoinTable()
    aeropuertos: AeropuertoEntity[];
}