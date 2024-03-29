'use client';
import './snow.scss';

interface ISnow {
  children?: React.ReactNode;
}
export default function Snow({ children }: ISnow) {
  return (
    <label htmlFor="find-input">
      <div className="snow-container">
        <div className="snow-blocks">
          <div className="snow-blocks__snow1"></div>
          <div className="snow-blocks__snow2"></div>
        </div>
        <h2 className="snow-title">Find Christmas decorations to create a festive atmosphere at your home</h2>
        {children}
      </div>
    </label>
  );
}
