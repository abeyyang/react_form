import rules from './rules';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';

import Textarea from '../components/Textarea/Textarea';

import inputFactory from '../factories/inputFactory';

import textareaFactory from '../factories/textareaFactory';

export default {
    rules,
    components: {
        Form,
        Input,
        Textarea
       
    },
    factories: {
        inputFactory,
        textareaFactory
    }
};
