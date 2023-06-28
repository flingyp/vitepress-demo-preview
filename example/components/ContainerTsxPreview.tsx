import { defineComponent, ref } from 'vue'
import { NButton } from 'naive-ui'

export default defineComponent({
  setup() {
    const num = ref(0)
    return () => (
      <>
        <div>
          <NButton
            type="primary"
            size="small"
            onClick={() => {
              num.value += 2
            }}
          >
            点击新增
          </NButton>
          <span style="margin-left: 20px">{num.value}</span>
        </div>
      </>
    )
  }
})
