import { useCallback, useRef } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/modal'
import CodeEditor from '@/components/code_editor'
import type { CodeEditorRef } from '@/components/code_editor'
import { Button } from '@nextui-org/button'
import toast from 'react-hot-toast'

export interface OneBotSendModalProps {
  sendMessage: (msg: string) => void
}

const OneBotSendModal: React.FC<OneBotSendModalProps> = (props) => {
  const { sendMessage } = props
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const editorRef = useRef<CodeEditorRef | null>(null)

  const handleSendMessage = useCallback(
    (onClose: () => void) => {
      const msg = editorRef.current?.getValue()
      if (!msg) {
        toast.error('消息不能为空')
        return
      }
      try {
        sendMessage(msg)
        toast.success('消息发送成功')
        onClose()
      } catch (error) {
        toast.error('消息发送失败')
      }
    },
    [sendMessage]
  )

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        className="col-span-2 md:w-fit"
        radius="full"
        variant="flat"
      >
        构造消息发送
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="5xl"
        scrollBehavior="outside"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                构造消息发送
              </ModalHeader>
              <ModalBody>
                <div className="h-96 dark:bg-[rgb(30,30,30)] p-2 rounded-md border border-default-100">
                  <CodeEditor
                    height="100%"
                    defaultLanguage="json"
                    defaultValue={`{
  "action": "get_group_list"
}`}
                    ref={editorRef}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="danger"
                  onPress={() => handleSendMessage(onClose)}
                >
                  发送
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default OneBotSendModal
