// import Link from 'next/link';
// import styles from '@/styles/not-found.module.scss';

// export default function Custom404() {
//   return (
//     <div className={styles.page404__container}>
//       <p>Whoops!</p>
//       <p>Looks like you got lost.</p>
//       <p>
//         {`Go back to the `}
//         <Link className={styles.page404__link} href="/">
//           home
//         </Link>
//         {` page?`}
//       </p>
//     </div>
//   );
// }

import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect('/not-found');
}
