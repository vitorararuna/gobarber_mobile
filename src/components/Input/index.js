import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

function Input({ style, icon, ...rest }, ref) { //ref serve para termos a referência direta ao elemento do input
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), //ou um objeto, ou um array com vários objetos
};

Input.defaultProps = { //não é obrigatória
  icon: null,
  style: {},
};

export default forwardRef(Input); //agr se a gente passar uma ref para o nosso input, ela é passada como 2° parâmetro do input, só ver la em cima. E podemos repassar ela para outro component
