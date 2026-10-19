<script setup>
const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: undefined },
  minlength: { type: [String, Number], default: undefined },
  required: { type: Boolean, default: true },
  trim: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  const value = event.target.value
  emit('update:modelValue', props.trim ? value.trim() : value)
}
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      class="form-control"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :minlength="minlength"
      :required="required"
      @input="updateValue"
    />
    <slot />
  </div>
</template>
