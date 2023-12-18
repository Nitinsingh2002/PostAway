import { body, validationResult } from "express-validator";


async function ValidateSignUp(req, res, next) {
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').notEmpty().withMessage("Email is required"),
        body('password').notEmpty().withMessage("Password is required")
    ]

    await Promise.all(rules.map((rule) => rule.run(req)))
    let validatonError = validationResult(req)

    if (!validatonError.isEmpty()) {
        return res.status(400).json({ errorMessages: validatonError.array().map(error => error.msg) });
    } else {
        next();
    }
}


async function ValidateLogIn(req, res, next) {
    const rules = [
        body('email').notEmpty().withMessage("Email is required"),
        body('password').notEmpty().withMessage("password is required")
    ]

    await Promise.all(rules.map((rule) => rule.run(req)))
    let validationError = validationResult(req)

    if (!validationError.isEmpty()) {
        return res.status(400).json({ errorMessages: validationError.array().map(error => error.msg) });
    }
    else {
        next();
    }
}


async function ValidateAddPost(req, res, next) {
    const rules = [
        body('description').notEmpty().withMessage("Caption can't be empty"),
        body('imageUrl')
            .custom((value, { req }) => {
                // Check if 'imageUrl' field exists and has a file
                if (!req.file || !req.file.mimetype) {
                    return Promise.reject('Image file is required');
                }

                // Check file types (allow only PNG or JPG)
                const allowedTypes = ['image/png', 'image/jpeg'];
                if (!allowedTypes.includes(req.file.mimetype)) {
                    return Promise.reject('Only PNG or JPG images are allowed');
                }

                return true; // Validation passed
            })
            .withMessage((value, { req }) => {
                // Custom error messages based on the failed validation
                if (!req.file || !req.file.mimetype) {
                    return 'Image file is required';
                }
                return 'Only PNG or JPG images are allowed';
            })
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));

    let validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        return res.status(400).json({ errorMessages: validationError.array().map(error => error.msg) });
    } else {
        next();
    }
}


async function ValidateUpdate(req, res, next) {
    const rules = [
        body('description').notEmpty().withMessage("description is required"),
    ];
    await Promise.all(rules.map((rule) => rule.run(req)));
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return res.status(400).json({ errorMessages: validationError.array().map(error => error.msg) });
    } else {
        next();
    }
}





export { ValidateLogIn, ValidateSignUp, ValidateAddPost, ValidateUpdate }