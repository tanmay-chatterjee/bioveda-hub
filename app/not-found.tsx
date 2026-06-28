import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-8xl font-bold text-surface-300">404</p>
      <h1 className="mb-3 text-2xl font-bold text-text">Page Not Found</h1>
      <p className="mb-8 text-text-muted">The page you're looking for doesn't exist.</p>
      <Link href="/" className="rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-medium text-surface hover:bg-primary-400 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
