import { RequestHandler } from '@nestjs/common/interfaces';

export default function requestHandler(config: RequestHandler) {
  return config;
}
