import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Role } from '../../users/entities/roles.enum';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Only admin users are allowed to perform this operation',
      );
    }

    return super.canActivate(context);
  }
}
