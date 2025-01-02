import { z } from 'zod'

export const postTodoDto = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title is required'
        }),
        content:z.string({
            required_error:'content is required'
        })
    }),
})