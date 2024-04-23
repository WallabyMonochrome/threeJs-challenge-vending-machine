import styles from "../style.module.scss";
import TouchButton from "../TouchButton/TouchButton.tsx";
import { useStore } from '../../../store/store.ts';

const Start = () => {
  const { start } = useStore();
  const startSound = new Audio('/sound/start.mp3');
  const startAction = () => {
    startSound.play();
    startSound.volume = 0.5;
    startSound.playbackRate = 2.2;
    start();
  };

  return (
    <>
      <div className={`${styles.screenContainer} ${styles.scanLinesAnimated}`}>
        <div className={`${styles.textDisplay}`}>
          <div className={styles.middleText}>
            <TouchButton onClickAction={() => startAction()}>
              Touch to Start
            </TouchButton>
          </div>
        </div>
      </div>
    </>
  )
}
export default Start;