'use client';

export default function ErrorProductPage() {
  return (
    <div className="error-page">
      <h4>Something went wrong!</h4>
      <p>
        If you loading this page first one, wait a few minutes, and try again. I use a free database host, and his have a
        &#34;cold start&#34;. Currently I don&#39;t know how to fix it. First loading is slow.
      </p>
      <button className="error-page__button button-buy-now" onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  );
}
