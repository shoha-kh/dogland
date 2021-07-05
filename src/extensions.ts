import VCalendar from 'v-calendar'

// Components for global use
import Alert from '@/components/global/basic/Alert.vue'
import Button from '@/components/global/basic/Button.vue'
import Confirm from '@/components/global/basic/Confirm.vue'
import Loading from '@/components/global/basic/Loading.vue'
import Modal from '@/components/global/basic/Modal.vue'
import Select from '@/components/global/basic/Select.vue'
import SvgIcon from '@/components/global/SvgIcon.vue'

const directives = (app: any) => {
    // Detect click outside @click="focused = !focused" v-out="close <= method"
    app.directive('out', {
        beforeMount (el, binding) {
            el.clickOutsideEvent = event => {
                // Check that click was outside the el and his children
                if (!(el == event.target || el.contains(event.target))) {
                    // Call method provided in attribute value
                    binding.value();
                }
            };
            document.addEventListener("click", el.clickOutsideEvent);
        },
        unmounted (el) {
            document.removeEventListener("click", el.clickOutsideEvent);
        }
    })
}

// Globally used components
const globalComponents = (app: any) => {
    app.component('v-alert', Alert)
    app.component('v-button', Button)
    app.component('v-confirm', Confirm)
    app.component('v-loading', Loading)
    app.component('v-modal', Modal)
    app.component('v-select', Select)
    app.component("svg-icon", SvgIcon)

    // v-calendar plugin
    // TODO: Calendar Defaults not work!
    app.use(VCalendar, {
        locales: {
            'en-US': {
                masks: {
                    input: 'MM-DD-YYYY',

                    // title: 'MMMM YYYY',
                    // weekdays: 'W',
                    // navMonths: 'MMM',
                    // input: ['L', 'MM-DD-YYYY', 'MM/DD/YYYY'],
                    // dayPopover: 'WWW, MMM D, YYYY',
                    // data: ['L', 'MM-DD-YYYY', 'MM/DD/YYYY'],
                }
            }
        }
    })
}

export default (app: any) => {
    directives(app)
    globalComponents(app)
}