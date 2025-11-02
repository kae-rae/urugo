import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    
    // Record response using response-time pattern
    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000;
      const path = req.route?.path || req.path;
      
      this.metricsService.incrementHttpRequests(req.method, path, res.statusCode);
      this.metricsService.observeHttpRequestDuration(req.method, path, res.statusCode, duration);
    });

    next();
  }
}