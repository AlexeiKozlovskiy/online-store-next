'use client';
import useUpdateTitle from '@/hooks/updateTitle';

interface Ititle {
  title: string;
}

export default function GenerateTitle({ title }: Ititle) {
  useUpdateTitle(title);

  return <></>;
}
