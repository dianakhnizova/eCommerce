export type ApiError = {
  statusCode: number;
  message: string;
  errors?: {
    code: string;
    message: string;
    field?: string;
    duplicateValue?: string;
  }[];
};
