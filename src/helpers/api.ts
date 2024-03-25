import { Product, UserResp, CredentialGoogle, AuthDataResp, FormSignIN, FormSignUP } from '@/types/types';
import axios from 'axios';
import { API_ROUTES } from '@/helpers/constant';
import { commonError } from '@/helpers/helpersFunc';

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`https://online-store-api-7fyt.onrender.com/products`, { cache: 'force-cache' });
    return await res.json();
  } catch (error) {
    console.log('Error', error);
    return [];
  }
}

export async function getProductsQwery(qwery?: string): Promise<Product[]> {
  try {
    const res = await fetch(`https://online-store-api-7fyt.onrender.com/products/?${qwery}`, { cache: 'force-cache' });
    return await res.json();
  } catch (error) {
    console.log('Error', error);
    return [];
  }
}
export async function getProductByID({ id }: { id: string }): Promise<Product | null> {
  try {
    const res = await fetch(`https://online-store-api-7fyt.onrender.com/products/${id}`, { cache: 'force-cache' });
    return await res.json();
  } catch (error) {
    console.log('Error', error);
    return null;
  }
}

export async function signInApi(formSignIN: FormSignIN) {
  try {
    const response: AuthDataResp = await axios({
      method: 'POST',
      url: API_ROUTES.SIGN_IN,
      data: formSignIN,
    });
    return { error: null, data: { ...response.data, authenticated: true } };
  } catch (err) {
    return commonError(err);
  }
}

export async function signInGoogleApi(dataGoogle: CredentialGoogle) {
  const { email, name: login, picture } = dataGoogle;

  try {
    const response: AuthDataResp = await axios({
      method: 'POST',
      url: API_ROUTES.SIGN_IN_GOOGLE,
      data: { email, login, picture, isGoogle: true },
    });
    return { error: null, data: { ...response.data, authenticated: true } };
  } catch (err) {
    return commonError(err);
  }
}

export async function getUser(accessToken: string, idUser: string) {
  try {
    const response: UserResp = await axios({
      method: 'GET',
      url: API_ROUTES.GET_USER + idUser,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { error: null, data: response.data };
  } catch (err) {
    return commonError(err);
  }
}

export async function signUPApi(formSignUP: FormSignUP) {
  try {
    await axios({
      method: 'POST',
      url: API_ROUTES.SIGN_UP,
      data: formSignUP,
    });
    return { error: null };
  } catch (err) {
    return commonError(err);
  }
}

export async function refreshTokensApi(refreshToken: string) {
  try {
    const response: AuthDataResp = await axios({
      method: 'POST',
      url: API_ROUTES.REFRESH,
      headers: {
        Authorization: `Refresh ${refreshToken}`,
      },
    });
    return { error: null, data: { ...response.data, authenticated: true } };
  } catch (err) {
    return commonError(err);
  }
}
