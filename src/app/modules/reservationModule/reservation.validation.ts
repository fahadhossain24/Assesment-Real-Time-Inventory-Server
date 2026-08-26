import z from 'zod';

// Validation schema for creating a drop
const createReservationZodSchema = z.object({
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
    }),
});

const ReservationValidationZodSchema = {
    createReservationZodSchema,
};

export default ReservationValidationZodSchema;