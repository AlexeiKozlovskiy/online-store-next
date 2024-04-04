import { useLayoutEffect } from 'react';

export default function useUpdateTitle(title?: string) {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
