import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { isAxiosError } from '@nestjs/terminus/dist/utils';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export interface Dog {
  name: string;
  type: string;
}

@Injectable()
export class ServiceHealthIndicator extends HealthIndicator {

/**
 * Prepares and throw a HealthCheckError
 * @param key The key which will be used for the result object
 * @param error The thrown error
 *
 * @throws {HealthCheckError}
 */
  private generateHttpError(key: string, error: AxiosError | any) {
    if (isAxiosError(error)) {
      const response: { [key: string]: any } = {
        message: error.message,
      };
      if (error.response) {
        response.statusCode = error.response.status;
        response.statusText = error.response.statusText;
      }
      throw new HealthCheckError(
        error.message,
        this.getStatus(key, false, response),
      );
    }
  }

  /**
   * Checks if the given url respons in the given timeout
   * and returns a result object corresponding to the result
   * @param key The key which will be used for the result object
   * @param url The url which should be request
   * @param options Optional axios options
   *
   * @throws {HealthCheckError} In case the health indicator failed
   *
   * @example
   * httpHealthIndicator.pingCheck('google', 'https://google.com', { timeout: 800 })
   */
   async pingCheck(
    key: string,
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<HealthIndicatorResult> {
    let isHealthy = false;
    // In case the user has a preconfigured HttpService (see `HttpModule.register`)
    // we just let him/her pass in this HttpService so that he/she does not need to
    // reconfigure it.
    // https://github.com/nestjs/terminus/issues/1151
    const httpService = axios;
    let data = {}
    try {
      data = (await httpService.request({ url, ...options })).data;
      isHealthy = true;
    } catch (err) {
      this.generateHttpError(key, err);
    }

    return this.getStatus(key, isHealthy, data);
  }
}

