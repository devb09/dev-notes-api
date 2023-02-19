import { UnprocessableEntityException } from '@nestjs/common';

export const HandleMongoError = (code: number) => {
  switch (code) {
    case 11000:
      throw new UnprocessableEntityException(`It already exists`);
    default:
      throw new UnprocessableEntityException(`Not processable`);
  }
};
