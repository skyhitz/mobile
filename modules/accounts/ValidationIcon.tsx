import React from 'react';
import Colors from 'app/constants/Colors';
import CheckIcon from 'app/modules/ui/icons/check';
import CloseIcon from 'app/modules/ui/icons/x';

const validationIcon = (props) => {
  if (props.isFieldValid) {
    return <CheckIcon color={Colors.valid} />;
  }
  if (props.isFieldValid === false) {
    return <CloseIcon size={24} color={Colors.errorBackground} />;
  }
  return null;
};

export default validationIcon;
