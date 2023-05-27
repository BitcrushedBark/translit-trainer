export interface GenericStyleProps {
  pl?: string;
  pr?: string;
  pt?: string;
  pb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  mb?: string;
  fontSize?: string;
  width?: string;
}

export const applyGenericStyleProps = (props: GenericStyleProps) => `
  ${props.pl ? `padding-left: ${props.pl}` : ''};
  ${props.pr ? `padding-right: ${props.pr}` : ''};
  ${props.pt ? `padding-top: ${props.pt}` : ''};
  ${props.pb ? `padding-bottom: ${props.pb}` : ''};
  ${props.ml ? `margin-left: ${props.ml}` : ''};
  ${props.mr ? `margin-right: ${props.mr}` : ''};
  ${props.mt ? `margin-top: ${props.mt}` : ''};
  ${props.mb ? `margin-bottom: ${props.mb}` : ''};
  ${props.fontSize ? `font-size: ${props.fontSize}` : ''};
  ${props.width ? `width: ${props.width}` : ''};
`;
