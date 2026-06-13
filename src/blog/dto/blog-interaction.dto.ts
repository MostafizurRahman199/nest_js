import { IsString, IsOptional } from 'class-validator';

export class AddViewDto {
  @IsString()
  blogId: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

export class AddShareDto {
  @IsString()
  blogId: string;

  @IsString()
  sharedBy: string;

  @IsString()
  platform: string;
}

export class AddReactDto {
  @IsString()
  blogId: string;

  @IsString()
  reactedBy: string;

  @IsString()
  reactionType: string;
}

export class AddCommentDto {
  @IsString()
  blogId: string;

  @IsString()
  commentedBy: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  parentComment?: string;
}
