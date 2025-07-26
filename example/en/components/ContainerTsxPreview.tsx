import { defineComponent, ref } from 'vue';
import './ContainerTsxPreview.css';

export default defineComponent({
  setup() {
    const num = ref(0);
    const addNum = () => {
      num.value += 2;
    };
    return () => (
      <>
        <div class="container-preview">
          <p>Container Form</p>
          <div>
            <span>Count: {num.value}</span>
            <button onClick={addNum} class="btn">
              Button
            </button>
          </div>
        </div>
      </>
    );
  },
});
