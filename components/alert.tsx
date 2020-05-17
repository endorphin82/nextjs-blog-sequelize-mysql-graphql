import styles from "./alert.module.css"
import cn from "classnames"

export default function Alert({ children, type }: {
  children: React.ReactNode
  type: string
}) {
  return (
    <div
      className={cn({
        [styles.success]: type === "success",
        [styles.error]: type === "error"
      })}
    >
      {children}
    </div>
  )
}
