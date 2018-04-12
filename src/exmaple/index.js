import ValidationDemoComponentPage from './validation/validation';
import FormExamplePage from './form/index';
import LayoutExampleComponent from './layout/layout';
// import DengExamplePage from './deng/index';
import { TableExample } from './table';
export const FormExample = FormExamplePage;
export const ValidationDemoComponent = ValidationDemoComponentPage;
// export const DengExample = DengExamplePage;

export const exampleRouters = [
    {
        path: "example",
        component: ValidationDemoComponent
    },
    {
        path: "exampleform",
        component: FormExample
    },
    {
        path: "layout",
        component: LayoutExampleComponent
    },
    // {
    //     path: "deng",
    //     component: DengExample
    // },
    {
        path: "table",
        component: TableExample
    }
];