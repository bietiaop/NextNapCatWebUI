import { Button } from '@nextui-org/button'
import { Tooltip } from '@nextui-org/tooltip'
import { BsDice3Fill } from 'react-icons/bs'

import useShowStructuredMessage from '@/hooks/use_show_strcuted_message'

const DiceInsert = () => {
  const showStructuredMessage = useShowStructuredMessage()

  return (
    <Tooltip content="发送骰子">
      <Button
        color="danger"
        variant="flat"
        isIconOnly
        radius="full"
        onPress={() => {
          showStructuredMessage([
            {
              type: 'dice'
            }
          ])
        }}
      >
        <BsDice3Fill className="text-lg" />
      </Button>
    </Tooltip>
  )
}

export default DiceInsert
