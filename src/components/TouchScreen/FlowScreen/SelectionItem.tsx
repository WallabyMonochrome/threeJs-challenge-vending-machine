import styles from "../style.module.scss";
import OutlineButton from "../OutlineButton/OutlineButton.tsx";
import {useStore} from "../../../store/store.ts";

const SelectionItem = () => {
  const { buyItem, nextItem, previousItem, itemsLength, currentItem } = useStore();

  const buySound = new Audio('/sound/beepBuy.mp3');
  const nextSound = new Audio('/sound/beep2.mp3');
  const prevSound = new Audio('/sound/beep3.mp3');
  const playBuySound = () => {
    buySound.play();
    buySound.volume = 0.3;

    buyItem();
  };

  const playNextSound = () => {
    nextSound.play();
    nextSound.volume = 0.3;

    nextItem();
  };

  const playPrevSound = () => {
    prevSound.play();
    nextSound.volume = 0.3;
    previousItem();
  };

  const endOfItems = currentItem !== itemsLength - 1;
  const startOfItems = currentItem !== 0;
  return (<>
    <div className={`${styles.screenContainer} ${styles.scanLinesAnimated}`}>
      <div className={styles.textDisplay}>
        <div className={styles.topText}>
          S.C.M.S 2.12
        </div>
        <div className={styles.topButton}>
          <OutlineButton onClick={() =>playBuySound()} isLarge={true}>Buy</OutlineButton>
        </div>
        <div className={styles.bottomButton}>

          { startOfItems &&  <OutlineButton isLarge={!endOfItems} onClick={() => playPrevSound()}>Prev</OutlineButton>}
          { endOfItems && <OutlineButton isLarge={!startOfItems} onClick={() => playNextSound()}>Next</OutlineButton>}
        </div>
      </div>
    </div>
  </>)
}

export default SelectionItem;