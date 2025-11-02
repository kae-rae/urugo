import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: client.Registry;

  constructor() {
    this.registry = new client.Registry();
    
    // Add default metrics (eventLoop, process, etc)
    client.collectDefaultMetrics({ register: this.registry });

    // Custom metrics
    new client.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path', 'status'],
      registers: [this.registry]
    });

    new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'path', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5],
      registers: [this.registry]
    });

    new client.Gauge({
      name: 'active_properties',
      help: 'Number of active property listings',
      registers: [this.registry]
    });
  }

  incrementHttpRequests(method: string, path: string, status: number) {
    const counter = this.registry.getSingleMetric('http_requests_total') as client.Counter<string>;
    counter.labels(method, path, status.toString()).inc();
  }

  observeHttpRequestDuration(method: string, path: string, status: number, duration: number) {
    const histogram = this.registry.getSingleMetric('http_request_duration_seconds') as client.Histogram<string>;
    histogram.labels(method, path, status.toString()).observe(duration);
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}