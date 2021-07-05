import { shallowMount, mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
  it('Check login button text', async () => {
    const wrapper = mount(Login)
    // const inputField: HTMLInputElement = wrapper.find("[type=email]").element as HTMLInputElement
    // const value = inputField.value
    await wrapper.find("[type=email]").setValue("admin@test.com")
    await wrapper.find("[type=password]").setValue("Test123123")
    expect(wrapper.find("v-button").text()).toBe('Login')
  })
})
