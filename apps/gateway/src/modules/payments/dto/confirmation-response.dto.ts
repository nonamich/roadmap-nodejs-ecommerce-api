import { ApiProperty } from "@nestjs/swagger";

export class ConformationResponseDto {
  @ApiProperty()
  clientSecret!: string;
}
