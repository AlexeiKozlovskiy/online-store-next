import './footer.scss';
import { roboto } from '@/styles/nextFonts';

export default function Footer() {
  return (
    <footer data-testid="footer" className={roboto.className + ' footer'}>
      <div className="footer__container wrapper">
        <div className="footer__github">
          <a className="github-link" href="https://github.com/AlexeiKozlovskiy">
            <span className="github-link__img"></span>
            <span className="github-link__person">Alexei Kozlovskiy</span>
          </a>
        </div>
        <div className="footer__about">
          <p>This is Pet-project</p>
          <p>You can not buy goods here</p>
          <p>No need to enter payment real data here</p>
        </div>
        <div className="footer-task">Online Store 2024</div>
      </div>
    </footer>
  );
}
