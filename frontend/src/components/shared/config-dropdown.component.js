import { Radio, RadioGroup } from '@chakra-ui/react';

export default function ConfigDropdown(props) {
  return (
    <RadioGroup onChange={(value) => props.submitMethod(value)} defaultValue={props.item.config || 'all'}>
      {['all', 'any'].map((conf) => (
        <Radio colorScheme={'cyan'} size='sm' value={conf} key={conf}>
          {conf}
        </Radio>
      ))}
    </RadioGroup>
  );
}
