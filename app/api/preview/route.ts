import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const id = searchParams.get('id')

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response('Token invalid', { status: 401 })
  }

  if (!slug) {
    return new Response('Slug lipsă', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(`/articol/${slug}?preview=true&id=${id}`)
}