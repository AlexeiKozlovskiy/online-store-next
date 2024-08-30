'use client';

export default function ErrorProductPage() {
  return (
    <div className="error-page">
      <h4>Something went wrong!</h4>
      <p>
        If you loading this page first one, wait a few minutes, and try again. Currently I use a free backend and database hosts,
        backend have a &#34;cold start&#34;.
      </p>
      <button className="error-page__button button-buy-now" onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  );
}
