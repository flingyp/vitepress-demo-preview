import { defineComponent, ref } from 'vue'
import { NButton } from 'naive-ui'
import './ContainerTsxPreview.css'

export default defineComponent({
  setup() {
    const num = ref(0)
    const addNum = () => {
      num.value += 2
    }
    return () => (
      <>
        <div class="container-preview">
          <p>Container Form</p>
          <div class="add-container">
            <span>新增：{num.value}</span>
            <NButton type="primary" size="small" onClick={addNum}>
              按钮
            </NButton>
          </div>
        </div>
      </>
    )
  }
})
