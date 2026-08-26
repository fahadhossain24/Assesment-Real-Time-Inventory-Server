import z from 'zod';

// Validation schema for creating a drop
const createPurchaseZodSchema = z.object({
    body: z.object({
        userId: z
            .number({
                required_error: 'User ID is required!',
            })
            .int('User ID must be an integer!')
            .positive('User ID must be greater than 0!'),

        dropId: z.coerce.number({
            required_error: 'Drop ID is required!',
            invalid_type_error: 'Drop ID must be a number!',
        })
            .int('Drop ID must be an integer!')
            .positive('Drop ID must be greater than 0!'),

        reservationId: z.coerce.number({
            required_error: 'Reservation ID is required!',
            invalid_type_error: 'Reservation ID must be a number!',
        })
            .int('Reservation ID must be an integer!')
            .positive('Reservation ID must be greater than 0!'),
    }),
});

const PurchaseValidationZodSchema = {
    createPurchaseZodSchema,
};

export default PurchaseValidationZodSchema;