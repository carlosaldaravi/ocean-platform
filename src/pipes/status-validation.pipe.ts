import { PipeTransform, BadRequestException } from '@nestjs/common';
import { status } from '../shared/entity-status.enum';

export class StatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [status.ACTIVE, status.INACTIVE];

  transform(value: any) {
    value = value.status.toUpperCase();

    if (!this.isSizeValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isSizeValid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
