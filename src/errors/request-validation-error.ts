import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((e) => {
      let field = "";
      switch (e.type) {
        case "field":
          field = e.path;
      }

      return {
        ...(field ? { field } : {}),
        message: e.msg,
      };
    });
  }
}
