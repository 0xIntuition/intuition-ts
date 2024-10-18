import { createServerClient } from "@supabase/auth-helpers-remix";

export const createSupabaseServerClient = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  console.log('Creating supabase server client')
  console.log(process.env.SUPABASE_URL)
  console.log(process.env.SUPABASE_KEY)

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    { request, response }
  )
}