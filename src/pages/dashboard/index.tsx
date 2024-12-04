import { openUrl } from '@/utils/url'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'

const DashboardIndexPage: React.FC = () => {
  return (
    <section className="flex-col gap-4 px-10 py-8 md:py-10 w-[800px] max-w-full h-auto  justify-center relative flex items-center rounded-lg overflow-hidden mx-auto my-3">
      <Card className="w-full" isBlurred>
        <CardHeader className="justify-center text-2xl font-bold text-danger-400">
          帮助我们变得更好
        </CardHeader>
        <CardBody>
          <p className="text-center text-danger-200">
            在开源之前，我们需要收集您的需求和建议，以便我们更好地改进WebUI。
          </p>
        </CardBody>
        <CardFooter className="justify-center">
          <Button
            size="lg"
            color="danger"
            radius="full"
            variant="flat"
            onClick={() => {
              openUrl('https://docs.qq.com/form/page/DWmFwRFRHbXdEQVZp')
            }}
          >
            填写问卷
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

export default DashboardIndexPage
