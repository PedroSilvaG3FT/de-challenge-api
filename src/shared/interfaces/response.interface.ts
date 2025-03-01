export interface IAppResponse<T = null> {
  data?: T;
  status: number;
  details?: any[];
  success: boolean;
  messages?: string[];
}
