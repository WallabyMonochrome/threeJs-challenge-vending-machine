import styles from "./style.module.scss";
const OutlineButton = ({children, isLarge, onClick}: { onClick: any, children: any, isLarge?: boolean }) => {
  if(isLarge) {
    return (
      <>
        <button onClick={onClick} className={styles.buttonTouchLarge}>{children}</button>
      </>
    )
  }
  return (
    <>
      <button onClick={onClick} className={styles.buttonTouch}>{children}</button>
    </>
  )
}
export default OutlineButton;