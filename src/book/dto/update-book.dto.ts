import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

@InputType()
export class UpdateBookDto extends PartialType(CreateBookDto) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  _id: string;
}
