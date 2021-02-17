import {ErrorRequestHandler } from "express";
import { ValidationError } from "yup";
import EmailNotFoundError from "./EmailNotFoundError";
import InputError from "./InputError";
import PasswordNotMatchError from "./PasswordNotMatchError";
import ZoneExistsError from "./ZoneExistsError";
import RfidExistsError from "./RfidExistsError";

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        })

        return res.status(400).json({ message: "Validation fails", errors: errors });
    }
    
    if (error instanceof InputError) {
        return res.status(400).json({ message: error.message });
    }

    if (error instanceof PasswordNotMatchError) {
        return res.status(400).json({ message: error.message });
    }

    if (error instanceof EmailNotFoundError) {
        return res.status(400).json({ message: error.message });
    }

    if (error instanceof ZoneExistsError) {
        return res.status(400).json({ message: error.message });
    }

    if (error instanceof RfidExistsError) {
        return res.status(400).json({ message: error.message });
    }

    console.error(error);

    return res.status(500).json({ message: "Internal server error. " + error });
};

export default errorHandler;