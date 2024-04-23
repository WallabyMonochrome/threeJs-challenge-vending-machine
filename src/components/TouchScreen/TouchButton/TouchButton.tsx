import styles from "./style.module.scss";
const TouchButton = ({children, onClickAction}: { children: any, onClickAction: Function }) => {
  return(
    <>
    <button onClick={() => onClickAction()} className={styles.buttonTouch}>{children}</button>
    </>
  )
}
export default TouchButton;