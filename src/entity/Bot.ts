import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Length } from 'class-validator'

@Entity()
export class Bot {
    @PrimaryGeneratedColumn('uuid')
      id: string

    @Column({ name: 'bot_name' })
    @Length(5, 20, {
      message: 'Bot Name length should be between 5 to 20 long'
    })
      botName: string

    @Column({ name: 'bot_purpose' })
    @Length(5, 45, {
      message: 'Bot Name length should be between 5 to 20 long'
    })
      botPurpose: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
      createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
      updatedAt: Date
}
