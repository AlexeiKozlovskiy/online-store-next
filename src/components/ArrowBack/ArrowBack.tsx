'use client';
import './ArrowBack.scss';
import { useRouter } from 'next/navigation';

export function ArrowBack() {
  const router = useRouter();

  return <button className="arrow-back" onClick={() => router.back()}></button>;
}
