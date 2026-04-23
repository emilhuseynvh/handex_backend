import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sitemap_lastmod')
export class SitemapLastmodEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    key: string;

    @Column()
    path: string;

    @Column({ type: 'datetime', precision: 3 })
    lastmod: Date;
}
