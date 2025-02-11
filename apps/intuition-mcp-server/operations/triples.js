import { z } from 'zod';
export const ExtractTriplesSchema = z.object({
    input: z.string().describe('Input from the user to extract triples from'),
});
export async function extractTriples(input) {
    return [
        ['foo', 'is', 'bar'],
        ['bar', 'is', 'foo'],
    ];
}
