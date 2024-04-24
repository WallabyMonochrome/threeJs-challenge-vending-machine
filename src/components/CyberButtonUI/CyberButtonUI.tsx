import styles from "./style.module.scss";

const CyberButtonUI = ({onClick, children}: any) => {
  return(
    <>
      <button className={styles.buttonCyberUI} onClick={() => onClick()}> {children}</button>
    </>
  )
}

export default CyberButtonUI;