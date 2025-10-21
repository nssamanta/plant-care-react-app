import styles from './About.module.css';

function About() {
  return (
    <div className={styles.textCard}>
      <h2>What is Plant Care?</h2>
      <p>
        This app is designed to help keep your house plants hydrated, happy, and
        healthy.
      </p>
      <p>
       You can keep track of your plant's name, watering frequency, and last watered date. The app will automatically calculate a status to show exactly when it's time to water your plants again so you never forget.
      </p>
    </div>
  );
}
export default About;
