import './aboutPage.scss';

export default async function About() {
  return (
    <main className="aboutPage__container wrapper">
      <section className="aboutPage__text">
        <h2 className="aboutPage__title">About project</h2>
        <p>
          This fullstack project is an online store made using Next, Nest and PrismaDB. You can read a detailed description in the
          corresponding repositories of my Github.
        </p>
        <p className="aboutPage-container__text">
          <a target="_blank" rel="noreferrer" href="https://github.com/AlexeiKozlovskiy/online-store-next">
            Next code.
          </a>
          For next setting ci/cd, you will see actions and PR comments and details.
        </p>
        <p className="aboutPage-container__text">
          <a target="_blank" rel="noreferrer" href="https://github.com/AlexeiKozlovskiy/online-store-nest">
            Nest code.{' '}
          </a>
        </p>
        <p className="aboutPage-container__text">
          <a target="_blank" rel="noreferrer" href="https://github.com/AlexeiKozlovskiy/online-store-react">
            React code.{' '}
          </a>
          Previously I developed this application in react.
        </p>
        <p className="aboutPage-container__text">
          <a target="_blank" rel="noreferrer" href="https://github.com/users/AlexeiKozlovskiy/projects/1/views/1">
            Task board.{' '}
          </a>
          I managed a common board task.
        </p>
        <br />
        <p className="aboutPage-container__text">
          <b>Please take note. </b>
          Due to the use of a free deployment service for the backend, database, and the application itself, there may be delays
          in response. For example, a click on a product card, or the first request for a geting list of products. First fetching
          data is can take near 1-3 minutes, further is fast. You may need to reload the page.
        </p>
      </section>
    </main>
  );
}
