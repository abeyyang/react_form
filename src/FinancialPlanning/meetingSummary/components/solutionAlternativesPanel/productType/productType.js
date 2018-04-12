import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';

const ProductType = (props) => {
     const { data } = props;
        return (
            <div>
                   <span>{data.alternativeProductAttributeValue}</span>
            </div>
        );
    }

export default ProductType;
