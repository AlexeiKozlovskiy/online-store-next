import { Metadata } from 'next';
import { headers } from 'next/headers';

function isSSR() {
  return headers().get('accept')?.includes('text/html');
}

const fallback: Metadata = {
  title: 'Loading...',
};

type GenerateMetadata<T> = (params: T) => Promise<Metadata>;

const getMetadataWithFallback =
  <Params>(generateMetadata: GenerateMetadata<Params>, staticMetadata?: Partial<Metadata>) =>
  (params: Params) => {
    return isSSR() ? generateMetadata(params) : Promise.resolve({ ...fallback, ...staticMetadata });
  };

export default getMetadataWithFallback;
