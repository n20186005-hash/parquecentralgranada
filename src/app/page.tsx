import { redirect } from 'next/navigation';

// For dynamic deployments, the middleware will intercept requests to `/`
// and redirect to the default locale (`/es`, Spanish — the primary market).
export default function RootPage() {
  redirect('/es');
}