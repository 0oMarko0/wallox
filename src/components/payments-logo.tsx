import { ComponentType, ImgHTMLAttributes } from 'react';

const icons = import.meta.glob('../assets/icons/*.png', { eager: true }) as Record<string, { default: string }>;

type PaymentMethodsType = Record<string, ComponentType<ImgHTMLAttributes<HTMLImageElement>>>;

const PaymentMethods: PaymentMethodsType = {};

Object.keys(icons).forEach((filePath) => {
  const componentName = filePath.split('/').pop()?.replace('.png', '');

  if (componentName && icons[filePath]) {
    const imagePath = icons[filePath].default;
    PaymentMethods[componentName] = (props) => <img src={imagePath} alt={componentName} {...props} />;
  }
});

console.log('paymentMethods', PaymentMethods);
export default PaymentMethods;
