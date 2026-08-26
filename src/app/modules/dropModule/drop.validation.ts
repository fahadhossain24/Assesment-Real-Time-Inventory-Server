import z from 'zod';

// Validation schema for creating a drop
const createDropZodSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: 'Name is required!',
            })
            .trim()
            .min(1, 'Name must not be empty!'),

        price: z.coerce.number({
            required_error: 'Price is required!',
            invalid_type_error: 'Price must be a number!',
        })
            .positive('Price must be greater than 0!'),

        totalStock: z.coerce.number({
            required_error: 'Total stock is required!',
                invalid_type_error: 'Total stock must be a number!',
            })
            .int('Total stock must be an integer!')
            .positive('Total stock must be greater than 0!'),

        startTime: z.coerce.date({
            required_error: 'Start time is required!',
            invalid_type_error: 'Start time must be a valid date!',
        }),
    }),
});

const DropValidationZodSchema = {
    createDropZodSchema,
};

export default DropValidationZodSchema;