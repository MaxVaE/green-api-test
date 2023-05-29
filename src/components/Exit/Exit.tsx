import { Button } from '../Button'

interface Props {
  title?: string
  onExit: () => void
}

export const Exit = ({ title, onExit: handleExit }: Props) => (
  <Button className="exit" title={title} onClick={handleExit}>
    <img src="/images/exit.png" alt="" />
  </Button>
)
