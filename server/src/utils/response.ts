export const successResponse = (data: any, message = 'Success') => ({
  success: true,
  message,
  data,
})

export const errorResponse = (message = 'An error occurred', statusCode = 500) => ({
  success: false,
  message,
  statusCode,
})
